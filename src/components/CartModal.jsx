import { faMinus, faPlus, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { numberWithCommas } from "../utils/utils";

const CartModal = ({
  showModal,
  handleClose,
  cartDetail,
  quantity,
  notes,
  increment,
  decrement,
  handleNotesChange,
  handleSubmit,
  totalPrice,
  removeFromCart
}) => {
  if (cartDetail) {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {cartDetail.product.name}{" "}
            <strong>
              (Rp. {numberWithCommas(cartDetail.product.price)})
            </strong>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Total Price:</Form.Label>
              <p>
                <strong>
                  Rp. {numberWithCommas(totalPrice)}
                </strong>
              </p>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlInput1">
              <Form.Label>Quantity:</Form.Label>
              <br />
              <Button variant="primary" size="sm" className="mr-2" onClick={ () => decrement()}>
                <FontAwesomeIcon icon={faMinus} />
              </Button>

              <strong>{quantity}</strong>

              <Button variant="primary" size="sm" className="ml-2" onClick={ () => increment()}>
                <FontAwesomeIcon icon={faPlus} />
              </Button>
            </Form.Group>

            <Form.Group controlId="exampleForm.ControlTextarea1">
              <Form.Label>Notes:</Form.Label>
              <Form.Control
                as="textarea"
                rows="3"
                name="notes"
                placeholder="Example: Extra spicy, less rice"
                value={notes}
                onChange={(event) => handleNotesChange(event)}
              />
            </Form.Group>
            <Button variant="primary" type="submit">
                Save
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={() => removeFromCart(cartDetail.id)}>
            <FontAwesomeIcon icon={faTrash} /> Remove Item
          </Button>
        </Modal.Footer>
      </Modal>
    );
  } else {
    return (
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Empty</Modal.Title>
        </Modal.Header>
        <Modal.Body>No item selected</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
};

export default CartModal;
