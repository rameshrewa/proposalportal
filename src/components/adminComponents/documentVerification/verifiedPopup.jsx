import React, { useEffect, useState } from "react";
import { Modal } from "react-bootstrap";

import verfiediconpopup from "../../../assets/images/verified-icon-popup.svg";
import { useHistory } from "react-router-dom";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { toast, ToastContainer } from "react-toastify";
import ConfirmationPopup from "../../shared/common/confirmationPopup";
function MyVerticallyCenteredModal(props) {
  const [getApproveData, setApproveData] = useState([]);
  useEffect(() => {
    setApproveData(props.approveData);
  }, [props.approveData]);

  const handleClose = () => {
    props.successClose();
  };

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="cent-item">
          <img src={verfiediconpopup} alt="Icon" className="img-fluid" />
          <h4> Verified Successfully </h4>
          <p className="mt-4">The Candidate : {getApproveData.name}</p>
          <p> HFN ID : {getApproveData.abhyasi_id}</p>
          <div className="text-center mg-top20 mt-5 pb-4">
            <button
              className="btn btn-approve-blue"
              onClick={() => handleClose()}
            >
              Ok
            </button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Verifiedpopup({ oneCandidate }) {
  const [modalShow, setModalShow] = React.useState(false);
  const [successScreen, setSuccessScreen] = React.useState(false);
  const [approveData, setApproveData] = React.useState([]);
  const getDocumentData = new DocumentVerificationServices();
  let history = useHistory();
  React.useEffect(() => {
    setApproveData(oneCandidate);
  }, [oneCandidate]);
  const successClose = () => {
    setSuccessScreen(false);
    history.push("/admin/candidateverification");
  };
  const handleApproveCandidate = () => {
    const approve = [
      {
        type: "Approve",
        candidate_id: approveData.candidate_id,
      },
    ];
    getDocumentData
      .candidateVerificationProfileDocStatus(approve)
      .then((res) => {
        if (res.status === 200) {
          setModalShow(false);
          setSuccessScreen(true);
        } else {
          toast.error("Approved for payment faild");
        }
      });
  };
  const closeDelete = () => {
    setModalShow(false);
  };
  return (
    <>
      <div
        style={{ display: "contents" }}
        onKeyDown={() => setModalShow(true)}
        onClick={() => setModalShow(true)}
        role="button"
        tabIndex="0"
      >
        <button className="btn btn-approve-blue"> Approve </button>
      </div>
      <MyVerticallyCenteredModal
        show={successScreen}
        onHide={() => setSuccessScreen(false)}
        approveData={approveData}
        successClose={successClose}
      />
      {modalShow && (
        <ConfirmationPopup
          deletePlan={handleApproveCandidate}
          handleClose={closeDelete}
          type="Approve"
        />
      )}
      <div>
        <ToastContainer
          position="top-right"
          autoClose={3000}
          newestOnTop={false}
          hideProgressBar
          closeOnClick
          rtl={false}
        />
      </div>
    </>
  );
}

export default Verifiedpopup;
