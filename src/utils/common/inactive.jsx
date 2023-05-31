import React from "react";
import { useCallback } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { lStorage } from "../storage";

export default function Inactive() {
  let history = useHistory();
  const Logout = useCallback(() => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  });
  return (
    <Modal
      show={true}
      size="lg"
      keyboard={true}
      backdrop="static"
      className="Suspended-model mt-5"
    >
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12 text-center">
          <Modal.Header>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <h6 className="mt-4 mb-5" style={{ fontWeight: "600" }}>
            Your profile is in inactive state,
            <br /> Kindly email proposal@heartfulness.org to re-activate the
            same
          </h6>
          <button
            type="submit"
            value="Log out"
            className="btn btn-dark-blue"
            onClick={Logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </Modal>
  );
}
