import React from "react";
//import Adminlayout from "../../adminlayout/inner";
import SeoHead from "../../../layout/Seo/seoBlock";
import mythpic from "../../../assets/images/the-myth-img1.png";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Table from "react-bootstrap/Table";
import filelist from "../../../assets/images/file-list-line.png";

export default function Resubmittedcandidate() {
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Resubmitted Candidate | Proposal Portal"}
        HeadDescription={"Admin Resubmitted Candidate"}
      />

      {/* <Adminlayout /> */}

      <div className="resubmitted-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                <div className="col-md-3">
                  <h4 className="admin-heading-title-h4 pad-20-0">
                    {" "}
                    Re-Summited Candidates
                  </h4>

                  <div className="flex-column-container">
                    <div className="column-white-box active">
                      <span className="thumbnail-candidate-pic">
                        {" "}
                        <img src={mythpic} alt="Icon" className="img-fluid" />
                      </span>{" "}
                      <p className="candidate-submitted-name">
                        {" "}
                        Thamiziharasan L{" "}
                      </p>
                      <p className="candidate-submitted-id">
                        {" "}
                        HFN000012345ABC{" "}
                      </p>
                      <h6 className="posted-on-date">
                        {" "}
                        <span> Posted on - 12/06/2022 </span>{" "}
                      </h6>
                    </div>
                    <div className="column-white-box">
                      <span className="thumbnail-candidate-pic">
                        {" "}
                        <img src={mythpic} alt="Icon" className="img-fluid" />
                      </span>{" "}
                      <p className="candidate-submitted-name">
                        {" "}
                        Thamiziharasan L{" "}
                      </p>
                      <p className="candidate-submitted-id">
                        {" "}
                        HFN000012345ABC{" "}
                      </p>
                      <h6 className="posted-on-date">
                        {" "}
                        <span> Posted on - 12/06/2022 </span>{" "}
                      </h6>
                    </div>
                    <div className="column-white-box">
                      <span className="thumbnail-candidate-pic">
                        {" "}
                        <img src={mythpic} alt="Icon" className="img-fluid" />
                      </span>{" "}
                      <p className="candidate-submitted-name">Ramkumar K </p>
                      <p className="candidate-submitted-id">
                        {" "}
                        HFN000012345ABC{" "}
                      </p>
                      <h6 className="posted-on-date">
                        {" "}
                        <span> Posted on - 12/06/2022 </span>{" "}
                      </h6>
                    </div>
                    <div className="column-white-box">
                      <span className="thumbnail-candidate-pic">
                        {" "}
                        <img src={mythpic} alt="Icon" className="img-fluid" />
                      </span>{" "}
                      <p className="candidate-submitted-name">
                        {" "}
                        Srinivasan S.G{" "}
                      </p>
                      <p className="candidate-submitted-id">
                        {" "}
                        HFN000012345ABC{" "}
                      </p>
                      <h6 className="posted-on-date">
                        {" "}
                        <span> Posted on - 12/06/2022 </span>{" "}
                      </h6>
                    </div>
                  </div>
                </div>

                <div className="col-md-9">
                  <div className="row">
                    <div className="col-sm-7">
                      <h4 className="admin-heading-title-h4 pad-20-0">
                        {" "}
                        Thamiziharasan L
                      </h4>
                      <p> HFN000012345ABC</p>
                    </div>

                    <div className="col-sm-5" style={{ textAlign: "right" }}>
                      <button
                        className="btn btn-white-reject"
                        style={{ marginRight: "20px" }}
                      >
                        {" "}
                        Reject{" "}
                      </button>
                      <button className="btn btn-approve-blue">
                        {" "}
                        Approve{" "}
                      </button>
                    </div>
                    <div className="col-md-12">
                      <span className="vertical-line-wr"></span>
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-12">
                      <p className="pad-20-0">
                        {" "}
                        <span> Rejected </span> 2{" "}
                      </p>

                      <div className="flex-container">
                        <div className="document-attachments-box-wrapper wid25-attchments">
                          <span>
                            {" "}
                            <img
                              src={filelist}
                              alt="Icon"
                              className="img-fluid"
                            />
                          </span>{" "}
                          Employee salary slip
                        </div>

                        <div className="document-attachments-box-wrapper">
                          <span>
                            {" "}
                            <img
                              src={filelist}
                              alt="Icon"
                              className="img-fluid"
                            />
                          </span>{" "}
                          Aadhaar Card
                        </div>
                      </div>

                      <h4 className="admin-heading-title-h4 pad-20-0">
                        {" "}
                        Detailed Profile <span> </span>
                      </h4>

                      <Tabs
                        defaultActiveKey="about"
                        id="justify-tab-example"
                        className="mb-3 super-admin-dashboard-tab"
                        justify
                      >
                        <Tab eventKey="about" title={<span> About </span>}>
                          <div className="row">
                            <Table striped hover className="wid35">
                              <tbody>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Name
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    Tamilarasan
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Gender
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    Male
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    DOB
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    23 Auguest 1998
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Mobile Number
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    +9845677445
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Email Address
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    Tamilarasan@volunteer.com
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Maritial Status
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    {" "}
                                    Never Married
                                  </td>
                                </tr>

                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Height
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    4 th 11in -16pcm
                                  </td>
                                </tr>
                              </tbody>
                            </Table>

                            <Table striped hover className="wid35">
                              <tbody>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Name
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    Tamilarasan
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Gender
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    Male
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    DOB
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    23 Auguest 1998
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Mobile Number
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    +9845677445
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Email Address
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    Tamilarasan@volunteer.com
                                  </td>
                                </tr>
                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Maritial Status
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    {" "}
                                    Never Married
                                  </td>
                                </tr>

                                <tr>
                                  <td className="table-custom-name-profile-td">
                                    Height
                                  </td>
                                  <td className="table-custom-profile-style-td">
                                    4 th 11in -16pcm
                                  </td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Tab>

                        <Tab eventKey="histroy" title={<span> History </span>}>
                          <div className="timeline-account-list">
                            <div className="outer-name-list">
                              <div className="card-account-name">
                                <div className="info-document">
                                  <h3 className="document-submitted-text">
                                    Account Created on 08-06-22
                                  </h3>
                                  <p className="name-by-text histroy-by-name-text">
                                    {" "}
                                    By Tamilarasan
                                  </p>
                                </div>
                              </div>

                              <div className="card-account-name">
                                <div className="info-document">
                                  <h3 className="document-submitted-text">
                                    Documents submitted 0n 08-06-22
                                  </h3>
                                  <p className="name-by-text histroy-by-name-text">
                                    {" "}
                                    By Tamilarasan{" "}
                                  </p>
                                </div>
                              </div>

                              <div className="card-account-name">
                                <div className="info-document">
                                  <h3 className="document-submitted-text">
                                    Document verified 0n 09-06-22
                                  </h3>
                                  <h3 className="document-submitted-text">
                                    {" "}
                                    <span> 2 </span> <span> Document </span>{" "}
                                  </h3>
                                  <p className="name-by-text histroy-by-name-text">
                                    {" "}
                                    <span> Birth Certificate </span>{" "}
                                    <span> Aadhaar Card</span>{" "}
                                  </p>
                                  <p className="name-by-text histroy-by-name-text">
                                    {" "}
                                    By Admin veried team
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Tab>
                      </Tabs>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
