import React from "react";
import { Button, Modal } from "react-bootstrap";

export default function ConfirmationPopup(props) {
  return (
    <>
      <Modal show={true} centered>
        <Modal.Header closeButton onClick={props.handleClose}>
          <Modal.Title className="first-caps">{props.type}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to{" "}
          <span className="first-caps">{props.type}</span>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="whiteColor"
            style={{ color: "black" }}
            onClick={props.handleClose}
          >
            No
          </Button>
          <Button
            variant="primary"
            className="first-caps"
            onClick={props.deletePlan}
          >
            {props.type}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
