import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../utils/constants";

export default class Success extends Component {
  componentDidMount() {
    axios
      .get(API_URL + "carts")
      .then((res) => {
        const cartItems = res.data;
        cartItems.map(function(item) {
            return axios
                .delete(API_URL+"carts/"+item.id)
                .then((res) => console.log(res))
                .catch((error) => console.log(error))
        })
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
  }

  render() {
    return (
      <div className="mt-5 text-center" style={{ minHeight: '70vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="success-container" style={{ maxWidth: '600px', padding: '2rem' }}>
          <div style={{
            background: 'linear-gradient(135deg, #22668A 0%, #1a5270 100%)',
            width: '120px',
            height: '120px',
            borderRadius: '60px',
            margin: '0 auto 2rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 40px rgba(34, 102, 138, 0.3)'
          }}>
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 6L9 17L4 12" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: '700',
            color: '#2c3e50',
            marginBottom: '1rem'
          }}>
            Order Successful!
          </h1>
          <p style={{
            fontSize: '1.2rem',
            color: '#6c757d',
            marginBottom: '2rem'
          }}>
            Thank you for your order! Your transaction has been completed successfully.
          </p>
          <Button
            variant="primary"
            as={Link}
            to="/"
            size="lg"
            style={{
              padding: '1rem 3rem',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    );
  }
}
