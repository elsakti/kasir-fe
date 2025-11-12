import React, { Component } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Cart, ListCategories, Menus } from "../components";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBoxOpen } from "@fortawesome/free-solid-svg-icons";

export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      products: [],
      selectedCategory: "Makanan",
      cartItems: [],
    };
  }

  componentDidMount() {
    this.fetchProducts();
    this.fetchCartItems();
  }

  fetchProducts = () => {
    axios
      .get(API_URL + "products?category=" + this.state.selectedCategory)
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  fetchCartItems = () => {
    axios
      .get(API_URL + "carts")
      .then((res) => {
        const cartItems = res.data;
        this.setState({ cartItems });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  changeCategory = (value) => {
    this.setState({
      selectedCategory: value,
      products: [],
    });

    axios
      .get(API_URL + "products?category=" + value)
      .then((res) => {
        const products = res.data;
        this.setState({ products });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  addToCart = (value) => {
    axios
      .get(API_URL + "carts?product_id=" + value.id)
      .then((res) => {
        if (res.data.length === 0) {
          const cartItem = {
            product_id: value.id,
            quantity: 1,
            notes: "",
          };

          axios
            .post(API_URL + "carts", cartItem)
            .then((res) => {
              this.fetchCartItems();
              swal({
                title: "Added to Cart",
                text: "Successfully added " + value.name + " to cart",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        } else {
          const cartItem = {
            quantity: res.data[0].quantity + 1,
            notes: res.data[0].notes || "",
          };

          axios
            .put(API_URL + "carts/" + res.data[0].id, cartItem)
            .then((res) => {
              this.fetchCartItems();
              swal({
                title: "Updated Cart",
                text: "Successfully updated " + value.name + " quantity",
                icon: "success",
                button: false,
                timer: 1500,
              });
            })
            .catch((error) => {
              console.log("Error: ", error);
            });
        }
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  render() {
    const { products, selectedCategory, cartItems } = this.state;
    return (
      <div style={{ minHeight: '100vh', paddingBottom: '150px' }}>
        <Container fluid style={{ maxWidth: '1400px', padding: '2rem 1.5rem' }}>
          <Row className="g-4">
            {/* Categories Sidebar */}
            <Col lg={2} md={3} sm={12}>
              <div className="sticky-top" style={{ top: '100px' }}>
                <ListCategories
                  changeCategory={this.changeCategory}
                  selectedCategory={selectedCategory}
                />
              </div>
            </Col>

            {/* Products Section */}
            <Col lg={7} md={6} sm={12}>
              <div className="products-section">
                <div className="d-flex align-items-center mb-4">
                  <div style={{
                    background: 'linear-gradient(135deg, #22668A 0%, #1a5270 100%)',
                    width: '55px',
                    height: '55px',
                    borderRadius: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '1rem',
                    boxShadow: '0 4px 15px rgba(34, 102, 138, 0.3)'
                  }}>
                    <FontAwesomeIcon icon={faBoxOpen} style={{ color: 'white', fontSize: '1.6rem' }} />
                  </div>
                  <div>
                    <h3 className="mb-1" style={{ fontSize: '1.75rem', fontWeight: '700', color: '#2c3e50' }}>
                      Our Products
                    </h3>
                    <p className="mb-0" style={{ color: '#6c757d', fontSize: '0.95rem' }}>
                      Choose your favorite items • {products.length} products available
                    </p>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="products-grid">
                  {products && products.length > 0 ? (
                    products.map((product) => (
                      <Menus
                        key={product.id}
                        menu={product}
                        addToCart={this.addToCart}
                      />
                    ))
                  ) : (
                    <div className="text-center py-5">
                      <p style={{ color: '#6c757d', fontSize: '1.1rem' }}>No products available in this category</p>
                    </div>
                  )}
                </div>
              </div>
            </Col>

            {/* Cart Sidebar */}
            <Col lg={3} md={3} sm={12}>
              <div className="sticky-top" style={{ top: '100px' }}>
                <Cart
                  cartItems={cartItems}
                  fetchCartItems={this.fetchCartItems}
                  {...this.props}
                />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}
