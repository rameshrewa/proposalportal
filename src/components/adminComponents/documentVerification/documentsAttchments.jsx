import React, { useState, useEffect, useCallback } from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import filelist from "../../../assets/images/file-list-line.png";
import Folderopengrey from "../../../assets/images/folder-open-grey.svg";
import Imagelinegrey from "../../../assets/images/image-line-grey.svg";
import Calendergrey from "../../../assets/images/calder-line-grey.svg";
import Verifiedpopup from "./verifiedPopup";
import { useLocation } from "react-router-dom";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { useHistory } from "react-router-dom";
import DocumentsPhotos from "../../shared/documentsPhotos";
import config from "../../../assets/config";
import { Modal } from "react-bootstrap";
import AdminDocumentList from "./adminDocumentList";
import { yearconvert } from "../../../utils/common/dateConvertion";
import { ProfileStatus } from "../../../utils/common/profileStatus";
import { lStorage } from "../../../utils/storage";
import { toast } from "react-toastify";
import Loading from "../../shared/common/loading";
export default function DocumentAttachments(props) {
  const getDocumentData = new DocumentVerificationServices();
  const imageBaseUrl = config.imageUrl;
  let history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  const [imgOne, setImageOne] = useState();
  const [valueNull, setValueNull] = useState(null);
  const [countryValue, setCountryValue] = useState("India");
  const [maritalStatus, setMaritalStatus] = useState("Divorced");
  const [loading, setLoading] = useState(false);
  let location = useLocation();
  if (location.state === undefined) {
    history.push("/admin/candidateverification");
  }
  const locationCandidateId = location.state.candidate_id;
  const [oneCandidate, setOneCandidate] = useState([]);
  const [logDetails, setLogDetails] = useState([]);
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };
  const getOneProfile = useCallback(
    (candidate_id) => {
      getDocumentData
        .candidateVerificationOneProfile(candidate_id)
        .then((res) => {
          if (res.data.isError === false || res.data.statusCode === "200") {
            setOneCandidate(res?.data?.data);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error("Your login session has expired please login again");
            logOut();
            setLoading(false);
          } else {
            toast.error("something went wrong");
            setLoading(false);
          }
        });
    },
    [getDocumentData]
  );
  const logDetailsApiGet = useCallback(
    (candidate_id) => {
      getDocumentData
        .candidateVerificationLogDetails(candidate_id)
        .then((res) => {
          if (res.data.isError === false || res.data.statusCode === "200") {
            setLogDetails(res?.data?.data);
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            toast.error("Your login session has expired please login again");
            logOut();
            setLoading(false);
          } else {
            toast.error("something went wrong");
            setLoading(false);
          }
        });
    },
    [getDocumentData]
  );
  useEffect(() => {
    getOneProfile(locationCandidateId);
    logDetailsApiGet(locationCandidateId);
  }, [locationCandidateId]);
  const handleRejectPage = (candidate_id) => {
    history.push("/admin/documentlist", {
      oneCandidate,
      candidate_id: candidate_id,
    });
  };
  const handlerDocumentsPhotos = () => {
    setModalShow(true);
  };
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Document Attchments | Proposal Portal"}
        HeadDescription={"Admin Document Attchments"}
      />
      {/* <Adminlayout /> */}
      <div className="document-attchments-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            {oneCandidate && oneCandidate !== "" ? (
              <div className="col-md-12 admin-white-bg-wrapper">
                <div className="row">
                  <div className="col-md-6">
                    <h4 className="admin-heading-title-h4 pad-20-0">
                      {" "}
                      {oneCandidate.name} (
                      <ProfileStatus status={oneCandidate.profile_sub_status} />
                      )<span> </span>
                    </h4>
                    {/* <p>{oneCandidate.candidate_id}</p> */}
                    <p className="blue-hfn-id-text">
                      {oneCandidate.abhyasi_id}
                    </p>
                    <div>
                      <span>
                        {" "}
                        <img
                          src={Folderopengrey}
                          alt="Icon"
                          className="img-fluid"
                        />{" "}
                        {oneCandidate.document_count}
                      </span>
                      <span>
                        {" "}
                        <img
                          src={Imagelinegrey}
                          alt="Icon"
                          className="img-fluid"
                        />{" "}
                        {oneCandidate.photo_count}{" "}
                      </span>
                      <span>
                        {" "}
                        <img
                          src={Calendergrey}
                          alt="Icon"
                          className="img-fluid"
                        />{" "}
                        Posted on {yearconvert(oneCandidate.posted_at)}
                      </span>
                    </div>
                  </div>
                  <div className="col-md-6 button-text-right">
                    <button
                      className="btn btn-white-reject"
                      style={{ marginRight: "20px" }}
                      onClick={() => {
                        handleRejectPage(`${oneCandidate.candidate_id}`);
                      }}
                      disabled={
                        oneCandidate && oneCandidate.profile_sub_status === 5
                          ? true
                          : false
                      }
                    >
                      {" "}
                      Reject{" "}
                    </button>
                    <Verifiedpopup oneCandidate={oneCandidate} />
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <h4 className="admin-heading-title-h4 pad-20-0">
                      {" "}
                      Documents <span> </span>
                    </h4>
                    <div className="flex-container">
                      {/* <button className="document-attachments-box-wrapper"
                       type="button" 
                      onClick={()=>{handlerDocumentsPhotos(setImageOne(`${oneCandidate.birth_certificate_document}`))}}
                      >
                        <span>
                          {" "}
                          <img src={filelist} alt="Icon" className="img-fluid" />
                        </span>{" "}
                        Birth certificate
                      </button> */}

                      <button
                        //  className={oneCandidate === null ? "br-red":"document-attachments-box-wrapper"}
                        className={`${
                          oneCandidate.dob_proof_verified === 0
                            ? "br-red"
                            : oneCandidate.dob_proof_verified === 1
                            ? "br-green"
                            : oneCandidate.dob_proof_verified === 2
                            ? "br-orange"
                            : "document-attachments-box-wrapper"
                        }`}
                        disabled={
                          oneCandidate.birth_certificate_document === valueNull
                        }
                        type="button"
                        onClick={() => {
                          handlerDocumentsPhotos(
                            setImageOne(
                              `${oneCandidate.birth_certificate_document}`
                            )
                          );
                        }}
                      >
                        <span>
                          {" "}
                          <img
                            src={filelist}
                            alt="Icon"
                            className="img-fluid"
                          />
                        </span>{" "}
                        DOB certificate
                      </button>


                      {/* {oneCandidate?.country?.country_name === countryValue ? (
                        <>
                          <button
                            type="button"
                            className={`${
                              oneCandidate.pan_proof_verified === 0
                                ? "br-red"
                                : oneCandidate.pan_proof_verified === 1
                                ? "br-green"
                                : oneCandidate.pan_proof_verified === 2
                                ? "br-orange"
                                : "document-attachments-box-wrapper"
                            }`}
                            disabled={oneCandidate.pan_document === valueNull}
                            // className="document-attachments-box-wrapper"
                            onClick={() => {
                              handlerDocumentsPhotos(
                                setImageOne(`${oneCandidate.pan_document}`)
                              );
                            }}
                          >
                            <span>
                              {" "}
                              <img
                                src={filelist}
                                alt="Icon"
                                className="img-fluid"
                              />
                            </span>{" "}
                            Pan Card
                          </button>
                          <button
                            type="button"
                            className={`${
                              oneCandidate.aadhaar_front_proof_verified === 0
                                ? "br-red"
                                : oneCandidate.aadhaar_front_proof_verified ===
                                  1
                                ? "br-green"
                                : oneCandidate.aadhaar_front_proof_verified ===
                                  2
                                ? "br-orange"
                                : "document-attachments-box-wrapper"
                            }`}
                            disabled={
                              oneCandidate.aadhar_document_front === valueNull
                            }
                            onClick={() => {
                              handlerDocumentsPhotos(
                                setImageOne(
                                  `${oneCandidate.aadhar_document_front}`
                                )
                              );
                            }}
                          >
                            <span>
                              {" "}
                              <img
                                src={filelist}
                                alt="Icon"
                                className="img-fluid"
                              />
                            </span>{" "}
                            Aadhaar Card Front
                          </button>
                          <button
                            type="button"
                            className={`${
                              oneCandidate.aadhaar_back_proof_verified === 0
                                ? "br-red"
                                : oneCandidate.aadhaar_back_proof_verified === 1
                                ? "br-green"
                                : oneCandidate.aadhaar_back_proof_verified === 2
                                ? "br-orange"
                                : "document-attachments-box-wrapper"
                            }`}
                            disabled={
                              oneCandidate.aadhar_document_back === valueNull
                            }
                            onClick={() => {
                              handlerDocumentsPhotos(
                                setImageOne(
                                  `${oneCandidate.aadhar_document_back}`
                                )
                              );
                            }}
                          >
                            <span>
                              {" "}
                              <img
                                src={filelist}
                                alt="Icon"
                                className="img-fluid"
                              />
                            </span>{" "}
                            Aadhaar Card Back
                          </button>
                        </>
                      ) : null} */}

                      {oneCandidate?.country?.country_name !== countryValue ? (
                        <button
                          type="button"
                          className={`${
                            oneCandidate.passport_proof_verified === 0
                              ? "br-red"
                              : oneCandidate.passport_proof_verified === 1
                              ? "br-green"
                              : oneCandidate.passport_proof_verified === 2
                              ? "br-orange"
                              : "document-attachments-box-wrapper"
                          }`}
                          disabled={
                            oneCandidate.passport_document === valueNull
                          }
                          onClick={() => {
                            handlerDocumentsPhotos(
                              setImageOne(`${oneCandidate.passport_document}`)
                            );
                          }}
                        >
                          <span>
                            {" "}
                            <img
                              src={filelist}
                              alt="Icon"
                              className="img-fluid"
                            />
                          </span>{" "}
                          Passport document
                        </button>
                      ) : null}


                      {oneCandidate?.marital_status === maritalStatus ? (
                        <button
                          type="button"
                          className={`${
                            oneCandidate.divorce_proof_verified === 0
                              ? "br-red"
                              : oneCandidate.divorce_proof_verified === 1
                              ? "br-green"
                              : oneCandidate.divorce_proof_verified === 2
                              ? "br-orange"
                              : "document-attachments-box-wrapper"
                          }`}
                          disabled={
                            oneCandidate.divorcee_document === valueNull
                          }
                          onClick={() => {
                            handlerDocumentsPhotos(
                              setImageOne(`${oneCandidate.divorcee_document}`)
                            );
                          }}
                        >
                          <span>
                            {" "}
                            <img
                              src={filelist}
                              alt="Icon"
                              className="img-fluid"
                            />
                          </span>{" "}
                          Divorcee document
                        </button>
                      ) : null}

                      {oneCandidate?.educationData?.map((edu, index) => {
                        return (
                          <button
                            key={index + 1}
                            type="button"
                            className={`${
                              edu.doc_verified === 0
                                ? "br-red"
                                : edu.doc_verified === 1
                                ? "br-green"
                                : edu.doc_verified === 2
                                ? "br-orange"
                                : "document-attachments-box-wrapper"
                            }`}
                            disabled={
                              oneCandidate.candidate_education_doc === valueNull
                            }
                            onClick={() => {
                              handlerDocumentsPhotos(
                                setImageOne(`${edu.candidate_education_doc}`)
                              );
                            }}
                          >
                            <span>
                              {" "}
                              <img
                                src={filelist}
                                alt="Icon"
                                className="img-fluid"
                              />
                            </span>{" "}
                            {edu.degree_name}  {edu.other_course != '' &&
                                          <span> ({edu.other_course}) </span>
                                          }
                          </button>
                        );
                      })}

                      {oneCandidate?.professionData?.map((items, index) => {
                        return (
                          <>

                            {/* <button
                              key={index + 1}
                              type="button"
                              className={`${
                                oneCandidate.emp_idcard_verified === 0
                                  ? "br-red"
                                  : oneCandidate.emp_idcard_verified === 1
                                  ? "br-green"
                                  : oneCandidate.emp_idcard_verified === 2
                                  ? "br-orange"
                                  : "document-attachments-box-wrapper"
                              }`}
                              disabled={items.employee_idcard_url === valueNull}
                              onClick={() => {
                                handlerDocumentsPhotos(
                                  setImageOne(`${items.employee_idcard_url}`)
                                );
                              }}
                            >
                              <span>
                                {" "}
                                <img
                                  src={filelist}
                                  alt="Icon"
                                  className="img-fluid"
                                />
                              </span>{" "}
                              Employee ID card
                            </button> */}
                            {/* <button
                              type="button"
                              className={`${
                                oneCandidate.letter_of_appointment_verified ===
                                0
                                  ? "br-red"
                                  : oneCandidate.letter_of_appointment_verified ===
                                    1
                                  ? "br-green"
                                  : oneCandidate.letter_of_appointment_verified ===
                                    2
                                  ? "br-orange"
                                  : "document-attachments-box-wrapper"
                              }`}
                              disabled={
                                items.employee_appointent_letter === valueNull
                              }
                              onClick={() => {
                                handlerDocumentsPhotos(
                                  setImageOne(
                                    `${items.employee_appointent_letter}`
                                  )
                                );
                              }}
                            >
                              <span>
                                {" "}
                                <img
                                  src={filelist}
                                  alt="Icon"
                                  className="img-fluid"
                                />
                              </span>{" "}
                              Employee Appointment letter
                            </button> */}

                            <button
                              type="button"
                              className={`${
                                oneCandidate.salary_slip_verified === 0
                                  ? "br-red"
                                  : oneCandidate.salary_slip_verified === 1
                                  ? "br-green"
                                  : oneCandidate.salary_slip_verified === 2
                                  ? "br-orange"
                                  : "document-attachments-box-wrapper"
                              }`}
                              disabled={
                                items.employee_salary_slip === valueNull
                              }
                              onClick={() => {
                                handlerDocumentsPhotos(
                                  setImageOne(`${items.employee_salary_slip}`)
                                );
                              }}
                            >
                              <span>
                                {" "}
                                <img
                                  src={filelist}
                                  alt="Icon"
                                  className="img-fluid"
                                />
                              </span>{" "}
                              Income Proof
                            </button>
                          </>
                        );
                      })}
                    </div>
                    <h4 className="admin-heading-title-h4 pad-20-0"> Photos</h4>
                    <div className="flex-container">
                      {oneCandidate?.photoData?.map((item, index) => {
                        return (
                          <div
                            className="photo-attchements-pic"
                            key={index + 1}
                          >
                            <img
                              src={`${imageBaseUrl}${item.candidate_photo_url}`}
                              alt="Icon"
                              className="img-fluid"
                            />
                          </div>
                        );
                      })}
                    </div>
                    <h4 className="admin-heading-title-h4 pad-20-0">
                      {" "}
                      Detailed Profile<span> </span>
                    </h4>
                    <Tabs
                      defaultActiveKey="personal"
                      id="justify-tab-example"
                      className="mb-3 super-admin-dashboard-tab"
                      justify
                    >
                      <Tab eventKey="personal" title={<span> Personal </span>}>
                        <div className="row">
                          <Table striped hover className="wid30">
                            <tbody>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Name
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.name}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Gender
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.gender}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  DOB
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.dob}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Mobile Number
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.contact_number}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Email Address
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.email_address}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Maritial Status
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {" "}
                                  {oneCandidate.marital_status}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Father Abyasi Id
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {" "}
                                  {oneCandidate.father_abhyasi_id}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Mother Abyasi Id
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {" "}
                                  {oneCandidate.mother_abhyasi_id}
                                </td>
                              </tr>

                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Height (cm)
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.height}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Weight (kg)
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.weight}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Age
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.candidate_age}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Blood Group
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.blood_group?.name}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Language Spoken
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.languages_spoken?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.language_name} {"  "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              {/* <tr>
                                <td className="table-custom-name-profile-td">
                                  Zone
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.zone_id && oneCandidate?.zone_name }
                                </td>
                              </tr> */}
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Center
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.center}
                                </td>
                              </tr>
                             
                            </tbody>
                          </Table>
                          <Table striped hover className="wid30">
                            <tbody>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Profession
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.professionData?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.profession}{" "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Education
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.educationData?.map(
                                    (item, index) => {
                                      return (
                                        <p key={index + 1}>
                                          {" "}
                                          {item.degree_name}  
                                          {item.other_course != '' &&
                                          <span> ({item.other_course}) </span>
                                          }
                                        </p>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Designation
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.professionData?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.designation}{" "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Working with
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.professionData?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.org_name}{" "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Annual Income
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.professionData?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.ctc_range}{" "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  HR
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {" "}
                                  {oneCandidate?.professionData?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.hr_name}{" "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  HR Email
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.professionData?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.hr_email_id}{" "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  HR Number
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.professionData?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.hr_contact}{" "}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Religion
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.religion}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Nationality
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.nationality?.nationality}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Mother Tongue
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.mother_tongue?.map(
                                    (item, index) => {
                                      return (
                                        <span key={index + 1}>
                                          {item.language_name}
                                        </span>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                              
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Under Medication
                                </td>
                                <td className="table-custom-profile-style-td">
                                { oneCandidate.under_medication == 1 ?
                                  <span> Yes</span>
                                  :
                                  <span> No</span>
                                  }
                                
                                </td>
                              </tr>
              
                           {oneCandidate.under_medication == 1 &&
                              <tr>
                                <td className="table-custom-name-profile-td">
                                Medication Comments
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.medication_details}
                                </td>
                              </tr>
                            }
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Smoking
                                </td>
                                <td className="table-custom-profile-style-td">
                                { oneCandidate.smoking == 'Y' ?
                                  <span> Yes</span>
                                  :
                                  <span> No</span>
                                  }
                                  
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                 Alcohol
                                </td>
                                <td className="table-custom-profile-style-td">
                                {oneCandidate.alcohol == 'Y' &&
                                 <span>Yes</span>
                                }
                                 {oneCandidate.alcohol == 'N' &&
                                 <span>No</span>
                                }
                                {oneCandidate.alcohol == 'O' &&
                                 <span>Occasionally</span>
                                }
                                </td>
                              </tr>
                            </tbody>
                          </Table>
                          <Table striped hover className="wid30">
                            <tbody>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Father
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.father_name}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Fathers Occupation
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.fathers_occupation}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Contact number
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.father_contact}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Mother
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.mother_name}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Mother Occupation
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.mothers_occupation}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Contact number
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {" "}
                                  {oneCandidate.mother_contact}
                                </td>
                              </tr>

                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Siblings
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.siblings}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Preceptor
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.preceptor_name}
                                </td>
                              </tr>
                              {/* <tr>
                                <td className="table-custom-name-profile-td">
                                  Contact number
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.preceptor_contact}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Financial status
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.financial_status}
                                </td>
                              </tr> */}
                            </tbody>
                          </Table>
                        </div>
                        <div className="row">
                       {/*   <Table
                            striped
                            hover
                            className="wid30 top-set-table"
                            style={{ marginRight: "10px" }}
                          >
                            <thead>
                              <tr>
                                <td colSpan={2}>
                                  {" "}
                                  <h4 className="admin-heading-title-h4 pad-20-0">
                                    {" "}
                                    Verification Details <span> </span>
                                  </h4>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Aadhaar Number
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.aadhar_number}
                                </td>
                              </tr> 
                               <tr>
                                <td className="table-custom-name-profile-td">
                                  Pan Number
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.pan_number}
                                </td>
                              </tr>
                              {oneCandidate.nationality?.nationality_id !== 106 && (
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Passport Number
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    {oneCandidate.passport_number}
                                  </td>
                                </tr>
                              )} 
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Education
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate?.educationData?.map(
                                    (item, index) => {
                                      return (
                                        <p key={index + 1}>
                                          {" "}
                                          {item.degree_name}
                                        </p>
                                      );
                                    }
                                  )}
                                </td>
                              </tr>
                            </tbody>
                          </Table> */}
                          <Table
                            striped
                            hover
                            className="wid30 top-set-table"
                            style={{ marginRight: "10px" }}
                          >
                            <thead>
                              <tr>
                                <td colSpan={2}>
                                  {" "}
                                  <h4 className="admin-heading-title-h4 pad-20-0">
                                    {" "}
                                    Perfect Details <span> </span>
                                  </h4>
                                </td>
                              </tr>
                            </thead>
                            <tbody>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Id
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.preceptor_id}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Name
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.preceptor_name}
                                </td>
                              </tr>
                              {/* <tr>
                                <td className="table-custom-name-profile-td">
                                  Phone
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.preceptor_contact}
                                </td>
                              </tr>
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Email
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneCandidate.preceptor_email}
                                </td>
                              </tr> */}
                            </tbody>
                          </Table>
                        </div>
                      </Tab>
                      <Tab eventKey="histroy" title={<span> History </span>}>
                        <div className="timeline-account-list">
                          <div className="outer-name-list">
                            
                          {logDetails.map((history, index) => {
                              return (
                                <div className="card-account-name">
                                <div className="info-document">
                                  <h3 className="document-submitted-text">
                                  {history.logger_message}
                                  <br></br> on{" "}
                                    {history &&
                                      yearconvert(history.created_at)}
                                  </h3>
                                
                                </div>
                              </div>
                              );
                            })}
                            
                            
                          </div>
                        </div>
                      </Tab>
                    </Tabs>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
      {modalShow && modalShow && (
        <DocumentsPhotos
          show={modalShow}
          onHide={() => setModalShow(false)}
          oneCandidate={oneCandidate}
          imgOne={imgOne}
        />
      )}
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
}
