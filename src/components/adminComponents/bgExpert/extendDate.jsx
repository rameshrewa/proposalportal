import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import Modal from "react-bootstrap/Modal";
import ReactDatePicker from "react-datepicker";
import DateIcon from "../../../assets/images/Icon-date.png";

import { dateconvert } from "../../../utils/common/dateConvertion";
import { useEffect } from "react";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { toast } from "react-toastify";
const ExtendDate = (props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const getDocumentData = new DocumentVerificationServices();
  const onSubmit = (data) => {
    const payload = [
      {
        candidate_id: String(props.propsData.candidate_id),
        extend_duedate: dateconvert(data.dueDate),
        extend_comments: data.comment,
        evaluator_user_type: props.tab,
        extend_count: 1,
      },
    ];
    props.extendedDate(payload);
  };
  useEffect(() => {
    const extendedDatesubmit = () => {
      const payLoad = [
        {
          candidate_id: props && String(props.propsData.candidate_id),
          evaluator_user_type: props.tab,
        },
      ];
      getDocumentData.bgExtendDateGet(payLoad).then((res) => {
        if (res.data.statusCode === 200) {
        } else {
          toast.error("something went wrong");
        }
      });
    };
    extendedDatesubmit();
  });
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
          <Modal.Title
            id="contained-modal-title-vcenter"
            className="modal-title-extend-date"
          >
            Extend due date
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="PaymentProccesForm"
            >
              <div>
                <label htmlFor="doj">Extend Due Date</label>
                <div>
                  <Controller
                    control={control}
                    name="dueDate"
                    rules={{
                      required: true,
                    }}
                    render={(props) => {
                      return (
                        <ReactDatePicker
                          {...props.field}
                          onChange={props.field.onChange}
                          selected={props.field.value}
                          className="date-input"
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown={true}
                          showYearDropdown
                          showMonthDropdown
                          placeholderText="MM-DD-YYYY"
                        />
                      );
                    }}
                  />
                  <span className="error_validation ml-3">
                    {errors.dueDate?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div>
                <div className="form-group">
                  <label htmlFor="comment">
                    Add Comment<span className="requiredColor">*</span>
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
                    value="Submit"
                    className="btn btn-primary btn-block login-button"
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

export default ExtendDate;
