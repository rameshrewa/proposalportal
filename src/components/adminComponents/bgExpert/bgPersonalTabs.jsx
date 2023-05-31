import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import { yearconvert } from "../../../utils/common/dateConvertion";

export default function BgPersonaltab(props) {
  const profileDetails = props && props.personalData;
  const candidateHistory = props && props.candidateHistory;
  return (
    <>
      <div className="bg-personal-hist-wrapper">
        <Tabs
          defaultActiveKey="personal"
          id="justify-tab-example"
          className="mb-3 super-admin-dashboard-tab"
          justify
        >
          <Tab eventKey="personal" title={<span> Personal</span>}>
            <div className="table-responsive">
              <Table className="personal-histroy-tabs">
                <tbody>
                  <tr>
                    <td className="table-custom-name-profile-td"> Name</td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails && profileDetails.name}
                    </td>
                  </tr>

                  <tr>
                    <td className="table-custom-name-profile-td"> Gender </td>
                    <td className="table-custom-profile-style-td">
                      {" "}
                      {profileDetails && profileDetails.gender === "M"
                        ? "Male"
                        : "Female"}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">
                      Mobile Number{" "}
                    </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails && profileDetails.contact_number}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">
                      Email Address{" "}
                    </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails && profileDetails.email_address}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">
                      Marital Status{" "}
                    </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails && profileDetails.marital_status}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">Height </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails && profileDetails.height} Cm
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">Weight </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails && profileDetails.weight} Kg{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">Age </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails && profileDetails.candidate_age}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">
                      Blood Group{" "}
                    </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails &&
                        profileDetails.blood_group &&
                        profileDetails.blood_group.name}{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">
                      Profession{" "}
                    </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails &&
                        profileDetails.professionData &&
                        profileDetails.professionData.profession}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">Education </td>
                    <td className="table-custom-profile-style-td">
                      computers{" "}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">
                      Designation{" "}
                    </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails.professionData &&
                        profileDetails.professionData.designation}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td">
                      {" "}
                      Working with Annual Income{" "}
                    </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails.professionData &&
                        profileDetails.professionData.annual_ctc}
                    </td>
                  </tr>
                  <tr>
                    <td className="table-custom-name-profile-td"> HR </td>
                    <td className="table-custom-profile-style-td">
                      {profileDetails.professionData &&
                        profileDetails.professionData.hr_name}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Tab>

          <Tab eventKey="histroy" title={<span> History </span>}>
            <div className="timeline-account-list">
              <div className="outer-name-list">
                
              {candidateHistory && candidateHistory.map((history, index) => {
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
    </>
  );
}
