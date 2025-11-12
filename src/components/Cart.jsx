import React, { Component } from "react";
import { Badge, Card, ListGroup } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import CartModal from "./CartModal";
import CheckoutButton from "./CheckoutButton";
import { API_URL } from "../utils/constants";
import axios from "axios";
import swal from "sweetalert";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

export default class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showModal: false,
      cartDetail: false,
      quantity: 0,
      notes: "",
      totalPrice: 0,
    };
  }

  handleShow = (cartItem) => {
    this.setState({
      showModal: true,
      cartDetail: cartItem,
      quantity: cartItem.quantity,
      notes: cartItem.notes,
      totalPrice: cartItem.total_price,
    });
  };

  handleClose = () => {
    this.setState({
      showModal: false,
    });
  };

  increment = () => {
    this.setState({
      quantity: this.state.quantity + 1,
      totalPrice:
        this.state.cartDetail.product.price * (this.state.quantity + 1),
    });
  };

  decrement = () => {
    if (this.state.quantity !== 1) {
      this.setState({
        quantity: this.state.quantity - 1,
        totalPrice:
          this.state.cartDetail.product.price * (this.state.quantity - 1),
      });
    }
  };

  handleNotesChange = (event) => {
    this.setState({
      notes: event.target.value,
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.handleClose();

    const data = {
      quantity: this.state.quantity,
      notes: this.state.notes,
    };

    axios
      .put(API_URL + "carts/" + this.state.cartDetail.id, data)
      .then((res) => {
        this.props.fetchCartItems();
        swal({
          title: "Cart Updated!",
          text:
            "Successfully updated " + this.state.cartDetail.product.name,
          icon: "success",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  removeFromCart = (id) => {
    this.handleClose();

    axios
      .delete(API_URL + "carts/" + id)
      .then((res) => {
        this.props.fetchCartItems();
        swal({
          title: "Item Removed!",
          text:
            "Successfully removed " + this.state.cartDetail.product.name,
          icon: "error",
          button: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  };

  render() {
    const { cartItems } = this.props;
    return (
      <div className="cart-section">
        <div className="mb-3">
          <div className="d-flex align-items-center mb-3">
            <div style={{
              background: 'linear-gradient(135deg, #22668A 0%, #1a5270 100%)',
              width: '50px',
              height: '50px',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: '0.75rem',
              boxShadow: '0 4px 15px rgba(34, 102, 138, 0.3)'
            }}>
              <FontAwesomeIcon icon={faShoppingCart} style={{ color: 'white', fontSize: '1.3rem' }} />
            </div>
            <div>
              <h5 className="mb-0" style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                Your Cart
              </h5>
              <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
              </small>
            </div>
          </div>
        </div>

        {cartItems.length !== 0 ? (
          <Card style={{ maxHeight: '500px', overflowY: 'auto' }}>
            <ListGroup variant="flush">
              {cartItems.map((cartItem) => (
                <ListGroup.Item
                  key={cartItem.id}
                  onClick={() => this.handleShow(cartItem)}
                  style={{
                    cursor: 'pointer',
                    padding: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                  className="cart-item"
                >
                  <div className="d-flex align-items-start">
                    <Badge
                      pill
                      bg="success"
                      style={{
                        fontSize: '0.9rem',
                        padding: '0.5rem 0.75rem',
                        minWidth: '45px',
                        marginRight: '0.75rem'
                      }}
                    >
                      {cartItem.quantity}×
                    </Badge>
                    <div className="flex-grow-1">
                      <h6 className="mb-1" style={{ fontSize: '0.95rem', fontWeight: '600' }}>
                        {cartItem.product.name}
                      </h6>
                      <p className="mb-0" style={{ fontSize: '0.85rem', color: '#6c757d' }}>
                        Rp. {numberWithCommas(cartItem.product.price)}
                      </p>
                    </div>
                    <div className="text-end">
                      <strong style={{ fontSize: '1rem', color: '#22668A' }}>
                        Rp. {numberWithCommas(cartItem.total_price)}
                      </strong>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </Card>
        ) : (
          <Card className="text-center" style={{ padding: '2rem 1rem' }}>
            <div style={{ opacity: 0.5 }}>
              <FontAwesomeIcon icon={faShoppingCart} size="3x" style={{ color: '#dee2e6', marginBottom: '1rem' }} />
              <p style={{ color: '#6c757d', margin: 0 }}>Your cart is empty</p>
            </div>
          </Card>
        )}

        <CartModal
          handleClose={this.handleClose}
          {...this.state}
          increment={this.increment}
          decrement={this.decrement}
          handleNotesChange={this.handleNotesChange}
          handleSubmit={this.handleSubmit}
          removeFromCart={this.removeFromCart}
        />

        <CheckoutButton cartItems={cartItems} {...this.props} />
      </div>
    );
  }
}
