import React, { Component } from "react";
import { Col, ListGroup } from "react-bootstrap";
import axios from "axios";
import { API_URL } from "../utils/constants";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faCoffee,
  faCheese,
  faThLarge,
} from "@fortawesome/free-solid-svg-icons";

const Icon = ({ name }) => {
  if (name === "Makanan")
    return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
  if (name === "Minuman") return <FontAwesomeIcon icon={faCoffee} className="mr-2" />;
  if (name === "Cemilan")
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />;

  return <FontAwesomeIcon icon={faUtensils} className="mr-2" />;
};

export default class ListCategories extends Component {
  constructor(props) {
    super(props);

    this.state = {
      categories: [],
    };
  }

  componentDidMount() {
    axios
      .get(API_URL + "categories")
      .then((res) => {
        const categories = res.data;
        this.setState({ categories });
      })
      .catch((error) => {
        console.log("Error yaa ", error);
      });
  }

  render() {
    const { categories } = this.state;
    const { changeCategory, selectedCategory } = this.props;
    return (
      <div className="categories-section">
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
              <FontAwesomeIcon icon={faThLarge} style={{ color: 'white', fontSize: '1.3rem' }} />
            </div>
            <div>
              <h5 className="mb-0" style={{ fontWeight: '700', fontSize: '1.1rem' }}>
                Categories
              </h5>
              <small style={{ color: '#6c757d', fontSize: '0.8rem' }}>Filter by type</small>
            </div>
          </div>
        </div>

        <ListGroup className="category-list">
          {categories &&
            categories.map((category) => (
              <ListGroup.Item
                key={category.id}
                onClick={() => changeCategory(category.name)}
                className={selectedCategory === category.name ? "category-aktif" : ""}
                style={{
                  cursor: 'pointer',
                  padding: '1rem',
                  fontSize: '0.95rem'
                }}
              >
                <div className="d-flex align-items-center">
                  <Icon name={category.name} />
                  <span style={{ fontWeight: selectedCategory === category.name ? '700' : '500' }}>
                    {category.name}
                  </span>
                </div>
              </ListGroup.Item>
            ))}
        </ListGroup>
      </div>
    );
  }
}
