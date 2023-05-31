import React from "react";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
const CandidateReject = (props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const reject = [
      {
        candidate_id: props.propsData.candidate_id,
        status: "rejected_for_payment",
        comment: data.comment,
      },
    ];
    props.handleRejectdDatadd(reject);
  };

  return (
    <>
      <Modal
        show={true}
        onHide={props.handleClose}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="register-popup-head-bg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Reject</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="PaymentProccesForm"
            >
              <div>
                <div className="form-group">
                  <label htmlFor="comment">
                    Comments<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="comment"
                    {...register("comment", {
                      required: true,
                      pattern: /^[a-z\d\-_\s]+$/i,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.comment?.type === "required" &&
                      "This field is required."}
                    {errors.comment && errors.comment.type === "maxLength" && (
                      <span>Max length exceeded</span>
                    )}
                    {errors.comment && errors.comment.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>

              <div className="btn-aln-center">
                <div className="popup-aprove-btn">
                  <input
                    type="submit"
                    value="Cancel"
                    className="btn btn-secondary"
                    onClick={props.handleClose}
                  />
                </div>
                <div className="popup-aprove-btn">
                  <input
                    type="submit"
                    value="Submit"
                    className="btn btn-primary"
                  />
                </div>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CandidateReject;
