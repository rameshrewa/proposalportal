import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SeoHead from "../../../layout/Seo/seoBlock";
import Header from "../candidateHeader/mainHeader";
import Sidebar from "../candidateHeader/leftSideMenus";
import AboutMeBlock from "../../shared/aboutMeSection";
import BasicInfoBlock from "../../shared/basicInfoBlock";
import CandidateService from "../../../services/admin/candidate.service";
import PhotoSliderSection from "../../shared/photoSliderBlock";
import UploadMissingDocumentsModelSection from "../../shared/uploadMissingDocumentsModel";
import { Modal } from "react-bootstrap";
import Loading from "../../shared/common/loading";
import Editadminicon from "../../../assets/images/edit-icon.svg";
import CarrerIcon from "../../../assets/images/careerIcon.png";
import familyIcons from "../../../assets/images/familIcon.png";
import LifeStyleIcon from "../../../assets/images/lifestyleIcon.png";
import { lStorage } from "../../../utils/storage";
import ProfileInfo from "../../../utils/common/profileInfo";
import { toast } from "react-toastify";
import { yearconvert } from "../../../utils/common/dateConvertion";

const ProfileInformation = () => {
  const candidateApi = new CandidateService();
  const profileData = lStorage.get("hfn-profile-me");
  let history = useHistory();
  const [regInfo, setRegInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [openReject, setOpenReject] = useState(false);
  const [editValue, setEditValue] = useState("");
  const [regDoc, setRegDoc] = useState("");
  const editEnable =
    regInfo && regInfo.profile_sub_status === 5
      ? regInfo && regInfo.profile_sub_status === 5
      : "";
  const handleChange = () => {
    lStorage.set("edit", "closed");
    setOpenReject(false);
  };
  const Logout = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };
  const docsMove = () => {
    history.push("/upload-documents");
  };
  const Logininfo = () => {
    const authVal = lStorage.get("edit");
    const authInfo = authVal ? authVal : null;
    setEditValue(authInfo);
    candidateApi
      .userReginfoApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setRegInfo(response.data.data);
          setLoading(true);
          if (
            response.data.data &&
            response.data.data.profile_sub_status === 5
          ) {
            setOpenReject(
              response.data.data && response.data.data.profile_sub_status === 5
                ? true
                : false
            );
            candidateApi.userMissingDoc().then((response) => {
              if (
                response.data.isError === false ||
                response.data.statusCode === "200"
              ) {
                setRegDoc(response.data.data);
                const authVal = lStorage.get("edit");
                const authInfo = authVal ? authVal : null;
                setEditValue(authInfo);
                setLoading(false);
              } else {
                setLoading(false);
              }
            });
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Your login session has expired please login again");
          Logout();
          setLoading(false);
        } else {
          toast.error("something went wrong");
          setLoading(false);
        }
      });
  };
  const editCandiateDetails = (data) => {
    history.push(data);
  };
  const resubmit = () => {
    let payload = {
      action_type: "profile_resubmitted",
    };
    candidateApi.profileResumit(payload).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setLoading(false);
        toast.success("Form Resubmitted Successfully");
        Logininfo();
      } else {
        setLoading(false);
        toast.error("something went wrong");
      }
    });
  };

  useEffect(() => {
    const authVal = lStorage.get("logInfo");
    const todayDat = new Date();
    const abhyasiValidation = profileData.me.user_roles.find(
      (value) => value === "seeker"
    );
    if (3 <= authVal.match_request_declined_count) {
      setLoading(false);
      history.push("/error");
    } else if (
      authVal.wedding_fixed_date !== null &&
      yearconvert(authVal.wedding_fixed_date) < yearconvert(todayDat)
    ) {
      setLoading(false);
      history.push("/error");
    } else if (
      authVal.wedding_fixed_date !== null &&
      yearconvert(authVal.wedding_fixed_date) > yearconvert(todayDat)
    ) {
      setLoading(false);
      history.push("/confirmWedding");
    } else if (abhyasiValidation !== "seeker") {
      Logininfo();
    } else {
      history.push("/error");
    }
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"User Information | Proposal Portal"}
        HeadDescription={"User Information"}
      />
      <section className="bg-white mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Sidebar aboutInfo={regInfo} />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 profile-information">
              <Header />
              <div className="MainContent pt-4 mt-5">
                <div className="row pt-3 mt-5-user">
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <PhotoSliderSection UserPhotos={regInfo.photoData} />
                  </div>
                  <div className="col-lg-8 col-md-6 col-sm-12">
                    <h5 className="mt-3">
                      My Documents{" "}
                      {editEnable && (
                        <button
                          className="float-rg btn btn-resubmit-blue"
                          onClick={() => {
                            resubmit();
                          }}
                        >
                          Submit for Approval
                        </button>
                      )}
                    </h5>
                    {editEnable ? (
                      <div className="row mt-3 font-size-li">
                        <div className="col-lg-4 col-sm-12">
                          <div className="box-withUL">
                            <ul className="checking-documents mb-4 ">
                              {/* <li
                                className={
                                  regInfo && regInfo.pan_proof_verified === 1
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Pan Card <br />
                                {regInfo && regInfo.pan_proof_verified === 0 ? (
                                  <span onClick={docsMove} className="add-btn">
                                    + Add
                                  </span>
                                ) : null}
                              </li> */}
                              {/* <li
                                className={
                                  regInfo &&
                                  regInfo.aadhaar_front_proof_verified === 1
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Aadhar Card Front
                                <br />
                                {regInfo &&
                                  regInfo.aadhaar_front_proof_verified ===
                                    0 && (
                                    <span
                                      onClick={docsMove}
                                      className="add-btn"
                                    >
                                      + Add
                                    </span>
                                  )}
                              </li> */}
                              {/* <li
                                className={
                                  regInfo &&
                                  regInfo.aadhaar_back_proof_verified === 1
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Aadhar Card Back
                                <br />
                                {regInfo &&
                                  regInfo.aadhaar_back_proof_verified === 0 && (
                                    <span
                                      onClick={docsMove}
                                      className="add-btn"
                                    >
                                      + Add
                                    </span>
                                  )}
                              </li> */}
                              {/* {regInfo &&
                                regInfo.nationality.nationality !==
                                  "Indian" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.passport_proof_verified === 1
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Passport <br />
                                    {regInfo &&
                                      regInfo.passport_proof_verified === 0 && (
                                        <span
                                          onClick={docsMove}
                                          className="add-btn"
                                        >
                                          + Add
                                        </span>
                                      )}
                                  </li>
                                )} */}
                              <li
                                className={
                                  regInfo && regInfo.dob_proof_verified === 1
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Birth Certificate <br />
                                {regInfo &&
                                  regInfo.dob_proof_verified === 0 && (
                                    <span
                                      onClick={docsMove}
                                      className="add-btn"
                                    >
                                      + Add
                                    </span>
                                  )}
                                {regInfo.professionData && (
                                    <li
                                      className={
                                        regInfo &&
                                        regInfo.salary_slip_verified === 1
                                          ? "checking-yes"
                                          : "checking-no"
                                      }
                                    >
                                      Income Proof <br />
                                      {regInfo &&
                                        regInfo.salary_slip_verified === 0 && (
                                          <span
                                            onClick={docsMove}
                                            className="add-btn"
                                          >
                                            + Add
                                          </span>
                                        )}
                                    </li>
                                  )}
                              </li>
                              {regInfo &&
                                regInfo.marital_status === "Divorced" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.divorce_proof_verified === 1
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Decree of Divorce <br />
                                    {regInfo &&
                                      regInfo.divorce_proof_verified === 0 && (
                                        <span
                                          onClick={docsMove}
                                          className="add-btn"
                                        >
                                          + Add
                                        </span>
                                      )}
                                  </li>
                                )}
                              {/* {regInfo.professionData &&
                              regInfo.professionData.org_name !== null &&
                              regInfo.professionData.org_name !== "" && 
                               (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.professionData
                                        .employee_salary_slip !== null
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Income Proof
                                  </li>
                                )} */}
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <div className="box-withUL">
                            {regInfo &&
                              regInfo.educationData.map((item, index) => {
                                return (
                                  <ul
                                    className="checking-documents mb-4"
                                    key={index + 1}
                                  >
                                    <li
                                      key={index + 1}
                                      className={
                                        item.doc_verified === 1
                                          ? "checking-yes"
                                          : "checking-no"
                                      }
                                    >
                                      {item.course_name}
                                      <br />
                                      {item.doc_verified === 0 && (
                                        <span
                                          onClick={docsMove}
                                          className="add-btn"
                                        >
                                          + Add
                                        </span>
                                      )}
                                    </li>
                                  </ul>
                                );
                              })}
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <div className="box-withUL">
                            <ul className="checking-documents mb-4">
                              {/* {regInfo &&
                                regInfo.marital_status === "Divorced" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.divorce_proof_verified === 1
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Decree of Divorce<br />
                                    {regInfo &&
                                      regInfo.divorce_proof_verified === 0 && (
                                        <span
                                          onClick={docsMove}
                                          className="add-btn"
                                        >
                                          + Add
                                        </span>
                                      )}
                                  </li>
                                )} */}
                              {/* {regInfo.professionData &&
                                regInfo.professionData.org_name !== null &&
                                regInfo.professionData.org_name !== "" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.letter_of_appointment_verified ===
                                        1
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Employment Letter <br />
                                    {regInfo &&
                                      regInfo.letter_of_appointment_verified ===
                                        0 && (
                                        <span
                                          onClick={docsMove}
                                          className="add-btn"
                                        >
                                          + Add
                                        </span>
                                      )}
                                  </li>
                                )} */}
                              {/* {regInfo.professionData &&
                                regInfo.professionData.org_name !== null &&
                                regInfo.professionData.org_name !== "" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.emp_idcard_verified === 1
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Employee ID Card <br />
                                    {regInfo &&
                                      regInfo.emp_idcard_verified === 0 && (
                                        <span
                                          onClick={docsMove}
                                          className="add-btn"
                                        >
                                          + Add
                                        </span>
                                      )}
                                  </li>
                                )} */}
                              {/* {regInfo.professionData &&
                                regInfo.professionData.org_name !== null &&
                                regInfo.professionData.org_name !== "" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.salary_slip_verified === 1
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Salary Slip <br />
                                    {regInfo &&
                                      regInfo.salary_slip_verified === 0 && (
                                        <span
                                          onClick={docsMove}
                                          className="add-btn"
                                        >
                                          + Add
                                        </span>
                                      )}
                                  </li>
                                )} */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="row mt-3 font-size-li">
                        <div className="col-lg-4 col-sm-12">
                          <div className="box-withUL">
                            <ul className="checking-documents mb-4 ">
                              {/* <li
                                className={
                                  regInfo && regInfo.pan_document !== null
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Pan Card{" "}
                              </li> */}
                              {/* <li
                                className={
                                  regInfo &&
                                  regInfo.aadhar_document_front !== null
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Aadhar Card Front <br />
                              </li>
                              <li
                                className={
                                  regInfo &&
                                  regInfo.aadhar_document_back !== null
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Aadhar Card back
                                <br />
                              </li> */}
                              {/* {regInfo &&
                                regInfo.nationality.nationality !==
                                  "Indian" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.passport_document !== null
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Passport
                                  </li>
                                )} */}
                              <li
                                className={
                                  regInfo &&
                                  regInfo.birth_certificate_document !== null
                                    ? "checking-yes"
                                    : "checking-no"
                                }
                              >
                                Birth Certificate
                              </li>
                              {regInfo &&
                                regInfo.marital_status === "Divorced" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.divorcee_document !== null
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Decree of Divorce
                                  </li>
                                )}

                              {regInfo.professionData && (
                                <li
                                  className={
                                    regInfo &&
                                    regInfo.professionData
                                      .employee_salary_slip !== null
                                      ? "checking-yes"
                                      : "checking-no"
                                  }
                                >
                                  Income Proof
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <div className="box-withUL">
                            {regInfo &&
                              regInfo.educationData.map((item, index) => {
                                return (
                                  <ul
                                    className="checking-documents mb-4"
                                    key={index + 1}
                                  >
                                    <li
                                      key={index + 1}
                                      className={
                                        item.candidate_education_doc !== null
                                          ? "checking-yes"
                                          : "checking-no"
                                      }
                                    >
                                      {item.course_name}
                                    </li>
                                  </ul>
                                );
                              })}
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-12">
                          <div className="box-withUL">
                            <ul className="checking-documents mb-4">
                              {/* {regInfo &&
                                regInfo.marital_status === "Divorced" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.divorcee_document !== null
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Decree of Divorce
                                  </li>
                                )} */}

                              {/* {regInfo.professionData &&
                                regInfo.professionData.org_name !== null &&
                                regInfo.professionData.org_name !== "" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.professionData
                                        .employee_appointent_letter !== null
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Employment Letter
                                  </li>
                                )} */}
                              {/* {regInfo.professionData &&
                                regInfo.professionData.org_name !== null &&
                                regInfo.professionData.org_name !== "" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.professionData
                                        .employee_idcard_url !== null
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Employee ID Card
                                  </li>
                                )} */}
                              {/* {regInfo.professionData &&
                                regInfo.professionData.org_name !== null &&
                                regInfo.professionData.org_name !== "" && (
                                  <li
                                    className={
                                      regInfo &&
                                      regInfo.professionData
                                        .employee_salary_slip !== null
                                        ? "checking-yes"
                                        : "checking-no"
                                    }
                                  >
                                    Income Proof
                                  </li>
                                )} */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="row pt-3 font-size-li">
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div>
                      {" "}
                      <h5 className="mt-4">
                        About me{" "}
                        {editEnable && (
                          <span
                            className="float-rg"
                            onClick={() => {
                              editCandiateDetails("/lifestyle");
                            }}
                          >
                            <img
                              src={Editadminicon}
                              alt="Icon"
                              nn
                              className="img-fluid"
                            />
                          </span>
                        )}
                      </h5>
                    </div>
                    <AboutMeBlock aboutInfo={regInfo.about_me} />
                  </div>
                  <div className="col-lg-8 col-md-8 col-sm-12">
                    <h5 className="mt-4">
                      Basic Details{" "}
                      {editEnable && (
                        <span
                          className="float-rg"
                          onClick={() => {
                            editCandiateDetails("/personal-detail");
                          }}
                        >
                          <img
                            src={Editadminicon}
                            alt="Icon"
                            nn
                            className="img-fluid"
                          />
                        </span>
                      )}
                    </h5>
                    <BasicInfoBlock aboutInfo={regInfo} />
                  </div>
                </div>
                <div className="row pt-3 font-size-li">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5 className="mt-4">
                      Lifestyle{" "}
                      {editEnable && (
                        <span
                          className="float-rg"
                          onClick={() => {
                            editCandiateDetails("/lifestyle");
                          }}
                        >
                          <img
                            src={Editadminicon}
                            alt="Icon"
                            nn
                            className="img-fluid"
                          />
                        </span>
                      )}
                    </h5>

                    <ProfileInfo
                      aboutInfo={[
                        {
                          label: "Marital Status",
                          value: regInfo && regInfo.marital_status,
                        },
                        {
                          label: "Health Info",
                          value: regInfo && regInfo.health_condition,
                        },
                        {
                          label: "Diet",
                          value: regInfo && regInfo.diet,
                        },
                        {
                          label: "Disability",
                          value: regInfo && regInfo.disability,
                        },
                        {
                          label: "Habits",
                          value: regInfo && regInfo.habits,
                        },
                        {
                          label: "Alcohol",
                          value:
                            regInfo && regInfo.alcohol === "Y"
                              ? "Yes"
                              : regInfo.alcohol === "O"
                              ? "Occasional"
                              : "No",
                        },
                        {
                          label: "smoking",
                          value:
                            regInfo && regInfo.smoking === "Y" ? "yes" : "no",
                        },
                      ]}
                      imageshow={LifeStyleIcon}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5 className="mt-4">
                      Career Details{" "}
                      {editEnable && (
                        <span
                          className="float-rg"
                          onClick={() => {
                            editCandiateDetails("/personal-detail");
                          }}
                        >
                          <img
                            src={Editadminicon}
                            alt="Icon"
                            nn
                            className="img-fluid"
                          />
                        </span>
                      )}
                    </h5>

                    <ProfileInfo
                      aboutInfo={[
                        {
                          label: "Profession",
                          value: regInfo && regInfo.professionData.profession,
                        },
                        {
                          label: "Education",
                          value:
                            regInfo &&
                            regInfo.educationData.map((item) => {
                              return item.course_name;
                            }),
                        },
                        {
                          label: "Designation",
                          value: regInfo && regInfo.professionData.designation,
                        },
                        {
                          label: "Working With",
                          value: regInfo && regInfo.professionData.org_name,
                        },
                        {
                          label: "Annual Income",
                          value: regInfo && regInfo.professionData.annual_ctc,
                        },
                      ]}
                      imageshow={CarrerIcon}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5 className="mt-4">
                      Family Details{" "}
                      {editEnable && (
                        <span
                          className="float-rg"
                          onClick={() => {
                            editCandiateDetails("/personal-detail");
                          }}
                        >
                          <img
                            src={Editadminicon}
                            alt="Icon"
                            nn
                            className="img-fluid"
                          />
                        </span>
                      )}
                    </h5>
                    <ProfileInfo
                      aboutInfo={[
                        {
                          label: "Father",
                          value: regInfo && regInfo.father_name,
                        },
                        {
                          label: "Mother",
                          value: regInfo && regInfo.mother_name,
                        },
                        {
                          label: "Siblings",
                          value: regInfo && regInfo.siblings,
                        },
                        {
                          label: "Father Abhyasi",
                          value:
                            regInfo &&
                            regInfo.father_abhyasi_id !== null &&
                            regInfo &&
                            regInfo.father_abhyasi_id !== ""
                              ? "Yes  " +
                                "( " +
                                regInfo.father_abhyasi_id +
                                " )"
                              : "No",
                        },
                        {
                          label: "Father Occupation",
                          value: regInfo && regInfo.fathers_occupation,
                        },
                        {
                          label: "Mother Abhyasi",
                          value:
                            regInfo &&
                            regInfo.mother_abhyasi_id !== null &&
                            regInfo &&
                            regInfo.mother_abhyasi_id !== ""
                              ? "Yes  " +
                                "( " +
                                regInfo.mother_abhyasi_id +
                                " )"
                              : "No",
                        },
                        {
                          label: "Mother Occupation",
                          value: regInfo && regInfo.mothers_occupation,
                        },
                      ]}
                      imageshow={familyIcons}
                    />
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <h5 className="mt-4">
                      Preceptor Details{" "}
                      {editEnable && (
                        <span
                          className="float-rg"
                          onClick={() => {
                            editCandiateDetails("/personal-detail");
                          }}
                        >
                          <img
                            src={Editadminicon}
                            alt="Icon"
                            nn
                            className="img-fluid"
                          />
                        </span>
                      )}
                    </h5>
                    <ProfileInfo
                      aboutInfo={[
                        {
                          label: "Preceptor Id",
                          value: regInfo && regInfo.preceptor_id,
                        },
                        {
                          label: "Preceptor Name",
                          value: regInfo && regInfo.preceptor_name,
                        },
                      ]}
                      imageshow={CarrerIcon}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
      {openReject && (editValue === null || editValue === "") && (
        <UploadMissingDocumentsModelSection
          show={openReject}
          data={regDoc}
          handleChange={handleChange}
        />
      )}
    </>
  );
};

export default ProfileInformation;
