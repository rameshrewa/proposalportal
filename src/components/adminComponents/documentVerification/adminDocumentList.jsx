import React, { useEffect, useState } from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import { useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { useForm } from "react-hook-form";
import config from "../../../assets/config";
const AdminDocumentList = () => {
  const getDocumentData = new DocumentVerificationServices();
  const imageBaseUrl = config.imageUrl;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  let history = useHistory();
  let location = useLocation();
  if (location.state === undefined) {
    history.push("/admin/candidateverification");
  }
  const locationCandidateId = location.state.candidate_id;
  const stateData = location.state;
  const handleBackCancelPage = () => {
    history.push("/admin/candidateverification");
  };
  const [adminGetData, setAdminGetData] = useState([]);
  const [valueNull, setValueNull] = useState(null);
  const [countryValue, setCountryValue] = useState("India");
  const [maritalStatus, setMaritalStatus] = useState("Divorced");
  useEffect(() => {
    setAdminGetData(stateData);
  }, [stateData]);
  const onSubmit = (data) => {
    const eduList = { ...data.candidate_education_id };
    Object.keys(eduList).forEach(function (key, index) {
      return (eduList[key] = eduList[key] === true ? 0 : 1);
    });
    // let photoList = [];
    // let removePhoto = data && data.candidate_photo_id.filter((e) => e);
    // photoList = removePhoto.map((item) => {
    //   return item === true ? 0 : 1;
    // });
    const newData = { ...data.candidate_photo_id };
    Object.keys(newData).forEach(function (key, index) {
      return (newData[key] = newData[key] === true ? 0 : 1);
    });
    const approve = [
      {
        type: "Reject",
        candidate_id: locationCandidateId,
        personal_occupation_documents: {
          // pan_proof_verified: data.pan_proof_verified === true ? 1 : 1,
          // aadhaar_back_proof_verified:
          //   data.aadhar_document_back === true ? 1 : 1,
          // aadhaar_front_proof_verified:
          //   data.aadhar_document_front === true ? 1 : 1,
          // passport_proof_verified:
          //   data.passport_proof_verified === true ? 1 : 1,
          decree_of_divorce_verified:
            data.decree_of_divorce_verified === true ? 0 : 1,
          dob_proof_verified: data.dob_proof_verified === true ? 0 : 1,
          // letter_of_appointment_verified:
            // data.letter_of_appointment_verified === true ? 1 : 1,
          // emp_idcard_verified: data.emp_idcard_verified === true ? 1 : 1,
          salary_slip_verified: data.salary_slip_verified === true ? 0 : 1,
          admin_comment: data.admin_comment,
        },
        qualification_documents: eduList,

        photo: newData,
      },
    ];
    getDocumentData
      .candidateVerificationProfileDocStatus(approve)
      .then((res) => {
        if (res.data.statusCode === 200) {
          toast.success("Rejected for candidate successfully");
          setTimeout(() => {
            history.push("/admin/candidateverification");
          }, 2000);
        } else {
          toast.error("Rejected for candidate faild");
        }
      });
  };
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Document List | Proposal Portal"}
        HeadDescription={"Admin Document List"}
      />
      {/* <Adminlayout /> */}
      <div className="document-list-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <div>
                <h4
                  className="admin-heading-title-h4 pad-20-0"
                  disabled={
                    adminGetData.oneCandidate &&
                    adminGetData.oneCandidate.profile_sub_status === 5
                      ? true
                      : false
                  }
                >
                  {" "}
                  Reject{" "}
                  <span className="spa-id">
                    {" "}
                    ({adminGetData?.oneCandidate?.abhyasi_id}){" "}
                  </span>
                </h4>
              </div>
              <h4 className="admin-heading-title-h4 pad-20-0">
                Documents List
              </h4>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex-container">
                  <div className="form-check-gap-input">
                    <div className="form-check">
                      <input
                        {...register("dob_proof_verified")}
                        className="form-check-input"
                        disabled={
                          adminGetData?.oneCandidate
                            ?.birth_certificate_document === valueNull
                        }
                        type="checkbox"
                        value=""
                        id="birth"
                        name="dob_proof_verified"
                      />
                      <label
                        // className="form-check-label"
                        className={`${
                          adminGetData?.oneCandidate
                            ?.birth_certificate_document === valueNull
                            ? "br-red-list"
                            : "form-check-label"
                        }`}
                        for="flexCheckDefault"
                      >
                        Birth certificate
                      </label>
                    </div>
                  </div>

                  {adminGetData?.oneCandidate?.professionData.map((item) => {
                    return (
                      <>
                       
                        <div className="form-check-gap-input">
                          <div className="form-check">
                            <input
                              {...register("salary_slip_verified")}
                              className="form-check-input"
                              disabled={item.employee_salary_slip === valueNull}
                              type="checkbox"
                              value=""
                              id="offerletter"
                              name="salary_slip_verified"
                            />
                            <label
                              // className="form-check-label"
                              className={`${
                                item.employee_salary_slip === valueNull
                                  ? "br-red-list"
                                  : "form-check-label"
                              }`}
                              for="flexCheckDefault"
                            >
                              Income Proof
                            </label>
                          </div>
                        </div>

                       
                      </>
                    );
                  })}


                  {adminGetData?.oneCandidate?.divorcee_document !== null?(
                    <div className="form-check-gap-input">
                      <div className="form-check">
                        <input
                          {...register("decree_of_divorce_verified")}
                          className="form-check-input"
                          disabled={
                            adminGetData?.oneCandidate?.divorcee_document ===
                            valueNull
                          }
                          type="checkbox"
                          value=""
                          id="divorce"
                          name="decree_of_divorce_verified"
                        />
                        <label
                          // className="form-check-label"
                          className={`${
                            adminGetData?.oneCandidate?.divorcee_document ===
                            valueNull
                              ? "br-red-list"
                              : "form-check-label"
                          }`}
                          for="flexCheckDefault"
                        >
                          Divorce Certificate
                        </label>
                      </div>
                    </div>
                  ) : null}

                  {adminGetData?.oneCandidate?.educationData?.map((item) => {
                    return (
                      <div className="form-check-gap-input">
                        <div className="form-check">
                          <input
                            {...register(
                              `candidate_education_id.${item.candidate_education_id}`
                            )}
                            className="form-check-input"
                            disabled={
                              item.candidate_education_doc === valueNull
                            }
                            type="checkbox"
                            value=""
                            id={item.candidate_education_id}
                          />
                          <label
                            // className="form-check-label"
                            className={`${
                              item.candidate_education_doc === valueNull
                                ? "br-red-list"
                                : "form-check-label"
                            }`}
                            for="flexCheckDefault"
                          >
                            {item.degree_name}
                            {item.other_course != '' &&
                                          <span> ({item.other_course}) </span>
                                          }
                          </label>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <h4 className="admin-heading-title-h4 pad-20-0">
                  Photos Attached{" "}
                </h4>
                <div className="flex-container">
                  {adminGetData?.oneCandidate?.photoData?.map((item) => {
                    return (
                      <div className="photo-attchements-pic">
                        <input
                          type="checkbox"
                          {...register(
                            `candidate_photo_id.${item.candidate_photo_id}`
                          )}
                          id="myCheckbox1"
                        />
                        <label for="myCheckbox1">
                          <img
                            style={{ height: "164px", width: "200px" }}
                            src={`${imageBaseUrl}${item.candidate_photo_url}`}
                            alt="Icon"
                            className="img-fluid"
                          />
                        </label>
                      </div>
                    );
                  })}
                </div>
                <h4 className="admin-heading-title-h4 pad-20-0 mt-4">
                  {" "}
                  Reason On Rejection<span className="requiredColor">*</span>
                </h4>
                <div className="mb-3">
                  <textarea
                    {...register("admin_comment", {
                      required: true,
                    })}
                    className="form-control textarea-height"
                    id="admin_comment"
                    name="admin_comment"
                    rows="3"
                  />
                  <span className="error_validation ml-3">
                    {errors.admin_comment?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
                <div className="pb-4">
                  <button
                    className="btn btn-white-reject"
                    onClick={handleBackCancelPage}
                  >
                    {" "}
                    Cancel{" "}
                  </button>
                  <button className="btn btn-approve-blue" type="submit">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
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
};

export default AdminDocumentList;
