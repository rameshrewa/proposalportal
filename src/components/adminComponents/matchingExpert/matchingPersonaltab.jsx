import React, { useState, useCallback, useEffect } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
// import mythfragile from "../../../assets/images/myth-fragile.png";
//  import matchingbigpic from "../../../assets/images/matching-bigpic.png";
import config from "../../../assets/config";
import CompareMatchingPopup from "./compareMatchingPopup";
import handsymbolicon from "../../../assets/images/namaste-religion-svgrepo-com.png";
import professionalicon from "../../../assets/images/Layer_x0020_1.png";
// import {DocumentVerificationServices} from "../../../services/admin/documentverification.service";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

const MatchingPersonaltab = ({
  oneMatching,
  candidatematchId,
  getOneProfile,
  suitableMatch,
  indexData,
  name,
}) => {
  // const getDocumentData = new DocumentVerificationServices();
  const imageBaseUrl = config.imageUrl;
  const [modalShow, setModalShow] = useState(false);
  const [oneMatchings, setOneMatching] = useState([]);
  const popupCandidateId = candidatematchId;

  const index = indexData;

  const initialState = 1;
  const [state, setState] = useState({
    count: initialState,
    bool: false,
    incValue: 1,
  });

  useEffect(() => {
    if (state.count >= 10 || state.count <= -10) {
      setState({ ...state, incValue: 1 });
    }
  }, [state.count]);

  const rightCandidateArrow = () => {
    setState((prevState) => {
      return {
        ...state,
        count: prevState.count + state.incValue,
      };
    });

    setOneMatching(
      getOneProfile(`${suitableMatch?.data[state.count + index]?.candidate_id}`)
    );
  };

  const leftCandidateArrow = () => {
    setState((prevState) => {
      return {
        ...state,
        count: prevState.count - state.incValue,
      };
    });
    setOneMatching(
      getOneProfile(`${suitableMatch?.data[state.count - index]?.candidate_id}`)
    );
  };

  useEffect(() => {
    setOneMatching(oneMatching);
  }, [oneMatching]);

  return (
    <>
      <div className="matchingpersontab-wrapper">
        <div className="match-profile-details-slide">
          <div className="flex-container">
            <div className="verified-user-wrapper">
              <div className="verify-img-bg">
                {
                  <div className="suitable-Img">
                    <img
                      src={`${imageBaseUrl}${oneMatchings?.data?.photoData[0].candidate_photo_url}`}
                      alt="Icon"
                      className="img-fluid suitable-Img"
                    />
                  </div>
                }
                <div>
                  <button
                    type="button"
                    className={`button_arrow ${
                      state.count === initialState ? "disable" : "enable"
                    }`}
                    // disabled={`${state.count === initialState}`}
                    onClick={leftCandidateArrow}
                  >
                    <IoIosArrowBack />
                  </button>
                  <button
                    type="button"
                    onClick={rightCandidateArrow}
                    className={`button_arrow ${
                      state.count >= oneMatchings ? "disable" : "enable"
                    }`}
                  >
                    <IoIosArrowForward />
                  </button>
                </div>
              </div>
              <div className="bg-name-verify">
                <p className="mt-3 mb-0"> {oneMatchings?.data?.name}</p>
                <span>
                  {" "}
                  Age <span> {oneMatchings?.data?.candidate_age} </span>{" "}
                </span>
                <p className="mb-0 mt-1">
                  <img
                    src={handsymbolicon}
                    alt="Icon"
                    className="img-fluid bride-gallery-icon mr-1"
                  />{" "}
                  {oneMatchings?.data?.religion}
                </p>
                <p className="mt-1">
                  <img
                    src={professionalicon}
                    alt="Icon"
                    className="img-fluid bride-gallery-icon mr-1"
                  />{" "}
                  {oneMatchings?.data?.professionData?.profession}
                </p>
                <button
                  className="btn btn-white"
                  type="button"
                  onClick={() => setModalShow(true)}
                >
                  Match Profile
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-personal-hist-wrapper">
          <Tabs
            defaultActiveKey="personal"
            id="justify-tab-example"
            className="mb-3 match-fliter-tab"
            justify
          >
            <Tab eventKey="personal" title={<span> Personal</span>}>
              <div className="table-responsive">
                <Table
                  className="personal-histroy-tabs"
                  style={{ border: "1px solid #ddd" }}
                >
                  <tbody>
                    <tr>
                      <td className="table-custom-name-profile-td"> Name</td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">Gender</td>
                      <td className="table-custom-profile-style-td">
                        {" "}
                        {oneMatchings?.data?.gender}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Mobile Number
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.contact_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Email Address
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.email_address}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Marital Status{" "}
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.marital_status}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">Height</td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.height}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">Weight</td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.weight}{" "}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">Age </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.candidate_age}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Blood Group
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.blood_group?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Marital Status
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.blood_group?.name}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Language Spoken
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.languages_spoken.map(
                          (item, index) => {
                            return (
                              <span key={index}>{item.language_name} </span>
                            );
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">Father</td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.father_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Occupation
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.fathers_occupation}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Contact number
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.father_contact}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">Mother</td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.mother_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Occupation
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.mothers_occupation}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Profession
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.professionData?.profession}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Education
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.educationData?.map(
                          (item, index) => {
                            return <span key={index}>{item.course_name} </span>;
                          }
                        )}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Designation
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.professionData?.designation}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        Working with Annual Income
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.professionData?.annual_ctc}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td"> HR </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.professionData?.hr_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        HR Email
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.professionData?.hr_email_id}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        HR Number
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.professionData?.hr_contact}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        Religion
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.religion}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        Nationality{" "}
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.nationality?.nationality}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        Mother Tongue
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.mother_tongue.map(
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
                        {oneMatchings?.data?.contact_number}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        Siblings{" "}
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.siblings}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        Preceptor{" "}
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.preceptor_name}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        Contact Numbers
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.preceptor_contact}
                      </td>
                    </tr>
                    <tr>
                      <td className="table-custom-name-profile-td">
                        {" "}
                        Financial Status{" "}
                      </td>
                      <td className="table-custom-profile-style-td">
                        {oneMatchings?.data?.financial_status}
                      </td>
                    </tr>
                  </tbody>
                </Table>
              </div>
            </Tab>
            <Tab eventKey="photos" title={<span> Photos </span>}>
              <div className="" style={{ marginBottom: "15px" }}>
                {oneMatchings?.data?.photoData?.map((item, index) => {
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
            </Tab>
          </Tabs>
        </div>
      </div>
      <CompareMatchingPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        oneMatching={oneMatchings}
        name={name}
        popupCandidateId={popupCandidateId}
        setModalShow={setModalShow}
      />
    </>
  );
};

export default MatchingPersonaltab;
