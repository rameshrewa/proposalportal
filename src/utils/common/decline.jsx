import React from "react";
import { useCallback } from "react";
import { Modal } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { lStorage } from "../storage";

export default function Decline() {
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
            Regret to inform you that we do not have suitable matches for your
            profile at this time. We are Sorry!.
            <br /> Our team is requesting you to find your soulmate/partner on
            your own.
            <br />
            You are always welcome to get back for the wedding date if you wish
            for Revered Daaji on proposal@heartfulness.org to solemnize your
            wedding.
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
