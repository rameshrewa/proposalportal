import React from "react";
import { Link } from "react-router-dom";
import DeleteIcon from "../../assets/images/delete-Icon.png";
import { useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import DatePicker from "react-datepicker";

const SuspendedModelSection = () => {
  const [FromDate, setFromDate] = React.useState(new Date());
  const [ToDate, setToDate] = React.useState(new Date());

  const [show, setShow] = React.useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {};

  return (
    <>
      <Link
        href="/#"
        className="LeftMenu-DeleteIcon"
        style={{ marginTop: "-5px" }}
        onClick={handleShow}
      >
        Suspended
        <span className="text-right" style={{ float: "right" }}>
          <img src={DeleteIcon} alt="DeleteIcon" />
        </span>
      </Link>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        keyboard={true}
        backdrop="static"
        className="Suspended-model mt-5"
      >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12">
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <div className="py-2">
              <div className="text-right p-3 mobile-open">
                <button
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  onClick={handleClose}
                ></button>
              </div>
              <h6 style={{ fontWeight: "600" }}>
                Please let us Know the reason for Suspension
              </h6>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="PaymentProccesForm"
              >
                <div className="form-group">
                  <label htmlFor="Reason">
                    Reason<span className="requiredColor">*</span>
                  </label>
                  <textarea
                    className="form-control Current_Address"
                    name="Reason"
                    {...register("Reason", { required: true })}
                  />
                  <span className="error_validation ml-3">
                    {errors.Reason?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="From">From</label>
                  <DatePicker
                    className="form-control"
                    name="From"
                    selected={FromDate}
                    dateFormat="MM-dd-yyyy"
                    onChange={(date) => setFromDate(date)}
                  />
                  <span className="error_validation ml-3">
                    {errors.From?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
                <div className="form-group">
                  <label htmlFor="To">To</label>
                  <DatePicker
                    className="form-control"
                    name="To"
                    selected={ToDate}
                    dateFormat="MM-dd-yyyy"
                    onChange={(date) => setToDate(date)}
                  />
                  <span className="error_validation ml-3">
                    {errors.To?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="mt-5 w-50 btn btn-primary btn-block submit-button"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default SuspendedModelSection;
