import React from "react";
import { useCallback } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { lStorage } from "../storage";

export default function AbhyasiModal() {
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
            Congratulations on your wedding.
            <br /> We are sorry your profile details are deactivated on our
            system.
            <br />
            Please email to proposal@heartfulness.org incase you have any
            queries.
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
