import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";
import React, { Component } from "react";
import { Button, Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";
import { API_URL } from '../utils/constants'

export default class CheckoutButton extends Component {
  checkout = (totalAmount) => {
      const items = this.props.cartItems.map(item => ({
          product_id: item.product_id,
          quantity: item.quantity,
          notes: item.notes || ""
      }));

      const order = {
          items: items
      }

      axios.post(API_URL+"orders", order).then((res) => {
          this.props.history.push('/success')
      })
  };

  render() {
    const totalAmount = this.props.cartItems.reduce(function (result, item) {
      return result + item.total_price;
    }, 0);

    return (
      <div className="checkout-section mt-4">
        <Card style={{
          border: '2px solid #22668A',
          background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)'
        }}>
          <Card.Body style={{ padding: '1.5rem' }}>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h5 className="mb-0" style={{ fontWeight: '700', color: '#2c3e50' }}>
                Total Amount
              </h5>
              <h4 className="mb-0" style={{
                fontWeight: '700',
                color: '#22668A',
                fontSize: '1.75rem'
              }}>
                Rp. {numberWithCommas(totalAmount)}
              </h4>
            </div>
            <Button
              variant="primary"
              size="lg"
              className="w-100"
              onClick={() => this.checkout(totalAmount)}
              disabled={this.props.cartItems.length === 0}
              style={{
                padding: '1rem',
                fontSize: '1.1rem',
                fontWeight: '700',
                letterSpacing: '0.5px'
              }}
            >
              <FontAwesomeIcon icon={faShoppingCart} className="me-2" />
              CHECKOUT NOW
            </Button>
          </Card.Body>
        </Card>
      </div>
    );
  }
}
