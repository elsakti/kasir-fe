import React from "react";
import { Card } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const Menus = ({ menu, addToCart }) => {
  return (
    <Card className="product-card" onClick={() => addToCart(menu)}>
      <Card.Img
        variant="top"
        src={
          "assets/images/" +
          menu.category.name.toLowerCase() +
          "/" +
          menu.image
        }
        alt={menu.name}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title style={{ fontSize: '1rem', marginBottom: '0.5rem', lineHeight: '1.4' }}>
          {menu.name}
        </Card.Title>
        <div className="d-flex justify-content-between align-items-center mt-auto">
          <Card.Text className="mb-0" style={{ fontSize: '1.2rem', fontWeight: '700' }}>
            Rp. {numberWithCommas(menu.price)}
          </Card.Text>
          <span
            style={{
              fontSize: '0.75rem',
              color: '#6c757d',
              background: '#f8f9fa',
              padding: '0.25rem 0.5rem',
              borderRadius: '6px',
              fontWeight: '600'
            }}
          >
            {menu.code}
          </span>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Menus;
