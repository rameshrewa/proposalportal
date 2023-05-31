import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import compareImg from "../../../assets/images/matching-img.png";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { toast, ToastContainer } from "react-toastify";
import { useHistory } from "react-router-dom";

function CompareMatchingPopup(props) {
  const getDocumentData = new DocumentVerificationServices();
  let histroy = useHistory();
  const handlePostData = (data) => {
    const brideId = props.popupCandidateId;
    let matchSubmit;
    if (props.oneMatching.data && props.oneMatching.data.gender === "M") {
      matchSubmit = [
        {
          bg_groom_id: props.oneMatching.data.candidate_id,
          bg_bride_id: brideId,
        },
      ];
    } else {
      matchSubmit = [
        {
          bg_groom_id: brideId,
          bg_bride_id: props.oneMatching.data.candidate_id,
        },
      ];
    }
    getDocumentData
      .candidateMatchingExpertMatchSubmitApi(matchSubmit)
      .then((res) => {
        if (res.status === 200) {
          toast.success("Match pair Successfull");
          props.setModalShow(false);
          histroy.push("/admin/matchingexpert");
        } else {
          toast.error("Match pair faild");
        }
      });
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <div>
            <div className="text-center mb-5 mt-4">
              <img src={compareImg} alt="Icon" className="img-fluid" />
            </div>
            <p className="text-center">
              <b> {props.name}</b> is Match with
              <b> {props.oneMatching?.data?.name}</b> and the profile details of
              the Groom will be will be send to the bride
            </p>
            <div className="text-center mt-5 mb-4">
              <button
                type="button"
                className="compare-btn"
                onClick={() =>
                  handlePostData(props.oneMatching?.data?.candidate_id)
                }
              >
                Submit
              </button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
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

export default CompareMatchingPopup;
