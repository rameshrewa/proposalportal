import React, { useState, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { toast, ToastContainer } from "react-toastify";

function ConfirmWeddingPopup(props) {
  const getDocumentData = new DocumentVerificationServices();
  const propsValues = props && props;
  const [valuePut] = useState({});

  const initialFormState = { ...valuePut };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });
  const onSubmit = (data) => {
    const approve = [
      {
        bg_match_id:
          propsValues.type === "edit"
            ? propsValues.matchId.bg_match_id
            : props.matchId,
        bg_wedding_date: data.bg_wedding_date,
        bg_wedding_time: data.bg_wedding_time,
        bg_wedding_location: data.bg_wedding_location,
      },
    ];
    getDocumentData
      .candidateMatchingExpertConfirmWeddingPopupApi(approve)
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success("Wedding Confirm Successfully");
          props.setModalShow(false);
        } else {
          toast.error("Wedding confirm faild");
        }
      });
  };
  useEffect(() => {
    if (propsValues.type === "edit") {
      const fields = [
        "bg_wedding_location",
        "bg_wedding_date",
        "bg_wedding_time",
      ];
      if (props && props.matchId !== "") {
        fields.forEach((field) => setValue(field, propsValues.matchId[field]));
      }
    }
  }, [props]);
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="register-popup-head-bg" closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            <h4> Confirm Wedding </h4>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label htmlFor="location">Add Location <span className="requiredColor">*</span></label>

                <input
                  {...register("bg_wedding_location", { required: true })}
                  type="text"
                  className="form-control"
                  id="bg_wedding_location"
                  placeholder=""
                />
                {errors.bg_wedding_location && (
                  <p style={{ color: "red" }}>Field is required</p>
                )}
              </div>

              
              <div className="form-group">
                <label htmlFor="date">Add Date <span className="requiredColor">*</span></label>
                <input
                  {...register("bg_wedding_date", { required: true })}
                  type="date"
                  min={new Date()}
                  className="form-control input-flexbox"
                  id="bg_wedding_date"
                  placeholder=""
                  
                />
                {errors.bg_wedding_date && (
                  <p style={{ color: "red" }}>Field is required</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="date">Add Time <span className="requiredColor">*</span></label>
                <input
                  {...register("bg_wedding_time", { required: true })}
                  type="text"
                  className="form-control"
                  id="bg_wedding_time"
                  placeholder=""
                />
                {errors.bg_wedding_time && (
                  <p style={{ color: "red" }}>Field is required</p>
                )}
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-dark-blue">
                  Submit
                </button>
              </div>
            </form>
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

export default ConfirmWeddingPopup;
