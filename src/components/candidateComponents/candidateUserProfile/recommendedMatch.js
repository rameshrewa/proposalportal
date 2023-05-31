import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import SeoHead from "../../../layout/Seo/seoBlock";
import Header from "../candidateHeader/mainHeader";
import Sidebar from "../candidateHeader/leftSideMenus";
import AboutMeBlock from "../../shared/aboutMeSection";
import BasicInfoBlock from "../../shared/basicInfoBlock";
import CandidateService from "../../../services/admin/candidate.service";
import PhotoSliderSection from "../../shared/photoSliderBlock";
import { Modal } from "react-bootstrap";
import Loading from "../../shared/common/loading";
import Editadminicon from "../../../assets/images/edit-icon.svg";
import CarrerIcon from "../../../assets/images/careerIcon.png";
import familyIcons from "../../../assets/images/familIcon.png";
import LifeStyleIcon from "../../../assets/images/lifestyleIcon.png";
import { lStorage } from "../../../utils/storage";
import ProfileInfo from "../../../utils/common/profileInfo";
import { toast } from "react-toastify";

const RecommendedMatch = () => {
  const candidateApi = new CandidateService();
  let history = useHistory();
  const [regInfo, setRegInfo] = useState("");
  const [candidateRegInfo, setCandidateRegInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const Logout = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };
  const Logininfo = () => {
    setLoading(true);
    candidateApi
      .recommendedMatch()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setRegInfo(response.data.data);
          setLoading(false);
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
  const LoginRecinfo = () => {
    setLoading(true);
    candidateApi
      .userReginfoApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setCandidateRegInfo(response.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const ActionAccept = (type) => {
    let payLoad;
    if (candidateRegInfo.gender === "M") {
      payLoad = [
        {
          bg_bride_id: regInfo.candidate_id,
          bg_match_id: regInfo.bg_match_id,
          match_status: type === "accept" ? 1 : 0,
        },
      ];
    } else {
      payLoad = [
        {
          bg_groom_id: regInfo.candidate_id,
          bg_match_id: regInfo.bg_match_id,
          match_status: type === "accept" ? 1 : 0,
        },
      ];
    }
    candidateApi
      .matchStatus(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          Logininfo();
          if (type === "accept") {
            toast.success("Match accepted successfully");
          }
          if (type === "reject") {
            toast.success("Match rejected successfully");
          }
        } else {
          setLoading(false);
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    Logininfo();
    LoginRecinfo();
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Recommonded Match | Proposal Portal"}
        HeadDescription={"Recommonded Match"}
      />
      <section className="bg-white mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Sidebar aboutInfo={candidateRegInfo} />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 profile-information">
              <Header />
              {regInfo && regInfo !== "" && regInfo.length !== 0 ? (
                <div className="MainContent pt-4 mt-5 candidate-recom-top">
                  <div className="row pt-3 mt-6">
                    <div className="col-lg-4 col-md-6 col-sm-12">
                      <PhotoSliderSection
                        UserPhotos={regInfo.photoData}
                        typeValue="recommended"
                      />
                    </div>
                    <div className="col-lg-8 col-md-6 col-sm-12">
                      <h5 className="mt-3">My Documents</h5>

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
                              </li>
                              <li
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
                              </li>
                              {regInfo &&
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
                                {regInfo.professionData &&
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
                                )}
                              {regInfo.professionData &&
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
                                    Salary Slip
                                  </li>
                                )} */}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row pt-3">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <h5 className="mt-4">{regInfo && regInfo.hfn_id}</h5>
                      <h4>
                        <b>{regInfo && regInfo.name}</b>
                      </h4>
                      <p>
                        Age <b>{regInfo && regInfo.candidate_age}</b>
                      </p>
                      <AboutMeBlock aboutInfo={regInfo.about_me} />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12 font-size-li">
                      <h5 className="mt-4">Basic Details</h5>
                      <BasicInfoBlock aboutInfo={regInfo} />
                    </div>
                  </div>
                  <div className="row pt-3 font-size-li">
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <h5 className="mt-4">Lifestyle</h5>

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
                            value: regInfo && regInfo.alcohol==="Y"?"Yes":(regInfo.alcohol==="O"?'Occasional':'No')
                          },
                          {
                            label: "smoking",
                            value: regInfo && regInfo.smoking ==="Y" ?"yes":"no",
                          },
                        ]}
                        imageshow={LifeStyleIcon}
                      />
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-12">
                      <h5 className="mt-4">Career Details</h5>

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
                            value:
                              regInfo && regInfo.professionData.designation,
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
                      <h5 className="mt-4">Family Details</h5>
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
                            value: regInfo && regInfo.father_abhyasi_id !== null &&
                                   regInfo && regInfo.father_abhyasi_id !== ''
                            ?"Yes  " +"( " +regInfo.father_abhyasi_id + " )"
                            :"No"
                          },
                          {
                            label: "Father Occupation",
                            value: regInfo && regInfo.fathers_occupation,
                          },
                          {
                            label: "Mother Abhyasi",
                            value: regInfo && regInfo.mother_abhyasi_id !== null &&
                                   regInfo && regInfo.mother_abhyasi_id !== ''
                            ?"Yes  " +"( " +regInfo.mother_abhyasi_id + " )"
                            :"No"
                          },
                          {
                            label: "Mother Occupation",
                            value: regInfo && regInfo.mothers_occupation,
                          },
                        ]}
                        imageshow={familyIcons}
                      />
                    </div>
                  </div>
                  {candidateRegInfo &&
                    candidateRegInfo.gender === "F" &&
                    regInfo &&
                    regInfo.bride_accept_status !== "1" && (
                      <div className="row mt-5 mb-5">
                        <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                          <div className="recommendedConfrimCol">
                            <div className="recommended-Left">
                              <button
                                className="recommended-Decline"
                                onClick={() => ActionAccept("reject")}
                              >
                                Decline
                              </button>
                            </div>
                            <div className="recommended-Right">
                              <button
                                className="recommended-Confirm"
                                onClick={() => ActionAccept("accept")}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  {candidateRegInfo &&
                    candidateRegInfo.gender === "M" &&
                    regInfo &&
                    regInfo.groom_accept_status !== "1" && (
                      <div className="row mt-5 mb-5">
                        <div className="col-lg-12 col-md-12 col-sm-12 text-right">
                          <div className="recommendedConfrimCol">
                            <div className="recommended-Left">
                              <button
                                className="recommended-Decline"
                                onClick={() => ActionAccept("reject")}
                              >
                                Decline
                              </button>
                            </div>
                            <div className="recommended-Right">
                              <button
                                className="recommended-Confirm"
                                onClick={() => ActionAccept("accept")}
                              >
                                Accept
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                </div>
              ) : (
                <div className="MainContent pt-4 mt-5 candidate-recom-top">
                  <div className="row pt-3 mt-6 auto-left">
                    No Matchings found
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};

export default RecommendedMatch;
