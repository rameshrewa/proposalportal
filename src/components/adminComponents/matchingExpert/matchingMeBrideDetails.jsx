import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
// import Folderopengrey from "../../../assets/images/folder-open-grey.svg";
// import Imagelinegrey from "../../../assets/images/image-line-grey.svg";
import professionalicon from "../../../assets/images/professional-icon.svg";
import Mailorangeicon from "../../../assets/images/mail-orange.svg";
import pdficon from "../../../assets/images/pdf-icon.svg";
// import Priyabigwating from "../../../assets/images/priya-big-awaiting.png";
import handsymbolicon from "../../../assets/images/hand-symbol-icon.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import HistorySection from "../../shared/historySection";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { lStorage } from "../../../utils/storage";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";
import { Modal } from "react-bootstrap";
import Loading from "../../shared/common/loading";
const MatchingMeBrideDetails = ({ oneMatching, logDetails, imageBaseUrl }) => {
  const getDocumentData = new DocumentVerificationServices();
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };
  const downloadPdf = () => {
    setLoading(true);
    const candidateId = oneMatching.data;
    getDocumentData
      .downloadProfile(candidateId.candidate_id)
      .then((res) => {
        const binaryString = window.atob(res.data.data);
        const byteArray = Uint8Array.from(binaryString, (value) =>
          value.charCodeAt(0)
        );
        const blob = new Blob([byteArray], {
          type: "application/pdf;charset=utf-8",
        });
        setLoading(false);
        saveAs(blob, `${candidateId.name}.pdf`);
      })
      .catch((err) => {
        setLoading(false);
        return Promise.reject({ Error: "Something Went Wrong", err });
      });
  };
  return (
    <>
      <div className="matchingbride-wrapper">
        <div className="container">
          {oneMatching && oneMatching !== "" ? (
            <>
              <div className="row">
                <div className="col-md-6">
                  <h4 className="admin-heading-title-h4 pad-20-0">
                    {" "}
                    {oneMatching?.data?.name} <span> </span>
                  </h4>
                  <p className="blue-hfn-id-text">
                    {oneMatching?.data?.hfn_id}
                  </p>
                  <div>
                    <span style={{ marginRight: "1px" }}>
                      {" "}
                      <img
                        src={Mailorangeicon}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      {oneMatching?.data?.photo_count}
                    </span>
                    <span>
                      <span className="bride-age-num religion-gap ml-1">
                        Age
                      </span>
                      <span className="bride-age-num religion-gap">
                        {oneMatching?.data?.candidate_age}
                      </span>{" "}
                    </span>
                    <span className="bride-resonse-text religion-gap">
                      {" "}
                      <span className="mg-right10">
                        {" "}
                        <img
                          src={handsymbolicon}
                          alt="Icon"
                          className="img-fluid bride-gallery-icon"
                        />{" "}
                      </span>{" "}
                      {oneMatching?.data?.religion}
                    </span>

                    <span className="bride-resonse-text">
                      {" "}
                      <span className="mg-right10">
                        {" "}
                        <img
                          src={professionalicon}
                          alt="Icon"
                          className="img-fluid bride-gallery-icon"
                        />{" "}
                      </span>{" "}
                      {oneMatching?.data?.professionData?.profession}
                    </span>
                  </div>
                </div>
                <div className="col-md-6 button-text-right">
                  <div>
                    <Link to="/admin/matchingexpert" className="btn btn-back">
                      {" "}
                      Back{" "}
                    </Link>
                  </div>
                  <button
                    className="btn btn-white-reject"
                    onClick={downloadPdf}
                  >
                    {" "}
                    Download Profile{" "}
                    <span>
                      <img src={pdficon} alt="Icon" className="img-fluid" />
                    </span>
                  </button>
                </div>
              </div>
              <h4 className="admin-heading-title-h4 pad-20-0"> Photos</h4>
              <div className="row">
                <div className="col-md-12">
                  <div className="flex-container">
                    {oneMatching?.data?.photoData?.map((item, index) => {
                      return (
                        <div key={index} className="photo-attchements-pic">
                          <img
                            src={`${imageBaseUrl}${item.candidate_photo_url}`}
                            alt="Icon"
                            className="img-fluid"
                          />
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
              <h4 className="admin-heading-title-h4 pad-20-0">
                Detailed Profile
              </h4>
              <div className="row">
                <div className="col-md-12">
                  <Tabs
                    defaultActiveKey="personal"
                    id="justify-tab-example"
                    className="mb-12 super-admin-dashboard-tab"
                    justify
                  >
                    <Tab eventKey="personal" title={<span> Personal</span>}>
                      <Table className="personal-histroy-tabs matching-bride-table">
                        <tbody>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Name
                            </td>
                            <td className="table-custom-profile-style-td">
                              {" "}
                              {oneMatching?.data?.name}{" "}
                            </td>
                          </tr>

                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Gender{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {" "}
                              {oneMatching?.data?.gender}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Mobile Number{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.contact_number}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Email Address{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.email_address}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Marital Status{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.marital_status}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Height{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.height}{" "}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Weight{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.weight}{" "}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Age{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {/* {AgeCalculator.getAgeIn(new Date(items.dob), "years")} */}
                              {oneMatching?.data?.candidate_age}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Blood Group{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.blood_group?.name}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Language Spoken{" "}
                            </td>
                            {/* <td className="table-custom-profile-style-td">{oneMatching?.data?.blood_group?.name}</td> */}
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.languages_spoken.map(
                                (item, index) => {
                                  return (
                                    <span key={index}>
                                      {item.language_name}{" "}
                                    </span>
                                  );
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Father{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.father_name}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Occupation{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.fathers_occupation}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Contact number{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.father_contact}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Mother{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.mother_name}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Occupation{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.mothers_occupation}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Profession{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.professionData?.profession}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Education{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.educationData?.map(
                                (item, index) => {
                                  return (
                                    <span key={index}>{item.course_name} </span>
                                  );
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              Designation{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.professionData?.designation}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Working with Annual Income{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.professionData?.annual_ctc}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              HR{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.professionData?.hr_name}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              HR Email
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.professionData?.hr_email_id}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              HR Number
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.professionData?.hr_contact}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Religion
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.religion}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Nationality{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.nationality?.nationality}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Mother Tongue
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.mother_tongue.map(
                                (item, index) => {
                                  return (
                                    <span key={index}>
                                      {item.language_name}
                                      {""}
                                    </span>
                                  );
                                }
                              )}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Contact Numbers{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.contact_number}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Siblings{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.siblings}
                            </td>
                          </tr>
                          <tr>
                                <td className="table-custom-name-profile-td">
                                  Under Medication
                                </td>
                                <td className="table-custom-profile-style-td">
                                { oneMatching?.data?.under_medication == 1 ?
                                  <span> Yes</span>
                                  :
                                  <span> No</span>
                                  }
                                
                                </td>
                              </tr>
              
                           {oneMatching?.data?.under_medication == 1 &&
                              <tr>
                                <td className="table-custom-name-profile-td">
                                Medication Comments
                                </td>
                                <td className="table-custom-profile-style-td">
                                  {oneMatching?.data?.medication_details}
                                </td>
                              </tr>
                            }
                              <tr>
                                <td className="table-custom-name-profile-td">
                                  Smoking
                                </td>
                                <td className="table-custom-profile-style-td">
                                { oneMatching?.data?.smoking == 'Y' ?
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
                                {oneMatching?.data?.alcohol == 'Y' &&
                                 <span>Yes</span>
                                }
                                 {oneMatching?.data?.alcohol == 'N' &&
                                 <span>No</span>
                                }
                                {oneMatching?.data?.alcohol == 'O' &&
                                 <span>Occasionally</span>
                                }
                                </td>
                              </tr>

                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Preceptor{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.preceptor_name}
                            </td>
                          </tr>
                          {/* <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Contact Numbers
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.preceptor_contact}
                            </td>
                          </tr>
                          <tr>
                            <td className="table-custom-name-profile-td">
                              {" "}
                              Financial Status{" "}
                            </td>
                            <td className="table-custom-profile-style-td">
                              {oneMatching?.data?.financial_status}
                            </td>
                          </tr> */}
                        </tbody>
                      </Table>
                    </Tab>
                    <Tab eventKey="histroy" title={<span> History </span>}>
                      <div className="timeline-account-list">
                        <HistorySection
                          logDetails={logDetails}
                          oneMatching={oneMatching}
                        />
                      </div>
                    </Tab>
                  </Tabs>
                </div>
              </div>
            </>
          ) : null}
        </div>
      </div>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};

export default MatchingMeBrideDetails;
