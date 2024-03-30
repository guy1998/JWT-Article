import Modal from "react-bootstrap/Modal";
import React from "react";

function PopUp(props) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      className="pop-up"
    >
      <Modal.Body className="pop-up-body">
        <h5>You have to sign in to gain permission.</h5>
        {props.children}
      </Modal.Body>
    </Modal>
  );
}

export default PopUp;