import React from //{ useState, useEffect, useRef, useCallback }
"react";
//import AdminHeader from "./adminHeader";
import SeoHead from "../../../layout/Seo/seoBlock";
// import Nav from "react-bootstrap/Nav";
// import documentverficationicon from "../../assets/images/document-verification-icon.svg";
// import verfificationicon from "../../assets/images/verification-icon.svg";

// import submitttedverfificationicon from "../../assets/images/summited-verfification.svg";
// import registerationicon from "../../assets/images/registeration-icon.svg";
import thumbnailverificationpic from "../../../assets/images/thumbnail-verification-pic.png";
import folderopenline from "../../../assets/images/folder-open-line.svg";
import imageline from "../../../assets/images/image-line.svg";
import calenderline from "../../../assets/images/calender-line2.svg";
//import Adminlayout from "../../adminlayout/inner";
import Pathmenuicon from "../../../assets/images/path-2326.svg";
import Listcheckicon from "../../../assets/images/list-check-2.svg";
import { FaSistrix } from "react-icons/fa";
import Pagination from "react-bootstrap/Pagination";

const Candidateverification = () => {
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Candidate Verification | Proposal Portal"}
        HeadDescription={"Admin Candidate Verification"}
      />

      {/* <AdminHeader /> */}

      {/* <Adminlayout /> */}

      <div className="candidate-verication-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                <div className="col-sm-7">
                  <h4 className="admin-heading-title-h4 pad-20-0">
                    {" "}
                    Candidate Verification
                  </h4>
                </div>
                <div className="col-sm-5 dis-search-item">
                  <div className="form-group has-search wid248">
                    <span className="form-control-feedback">
                      {" "}
                      <FaSistrix />{" "}
                    </span>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>

                  <img src={Pathmenuicon} alt="Icon" className="img-fluid" />
                  <img src={Listcheckicon} alt="Icon" className="img-fluid" />
                </div>
              </div>

              <div className="flex-container">
                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>

                <div className="verification-box-user">
                  <div>
                    <img
                      src={thumbnailverificationpic}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>

                  <div className="verification-name-list">
                    <p className="verfication-name-text"> Thamiziharasan L</p>
                    <p className="verfication-id-text"> HFN000012345ABC </p>
                    <span>
                      {" "}
                      <img
                        src={folderopenline}
                        alt="Icon"
                        className="img-fluid"
                      />{" "}
                      6{" "}
                    </span>
                    <span>
                      {" "}
                      <img src={imageline} alt="Icon" className="img-fluid" /> 4
                    </span>
                    <p>
                      {" "}
                      <span>
                        {" "}
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      02/05/2022
                    </p>
                  </div>
                </div>
              </div>

              <Pagination className="custom-pagi">
                <Pagination.First />
                <Pagination.Item active>{1}</Pagination.Item>
                <Pagination.Item>{2}</Pagination.Item>
                <Pagination.Item>{3}</Pagination.Item>
                <Pagination.Item>{5}</Pagination.Item>
                <Pagination.Last />
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Candidateverification;
