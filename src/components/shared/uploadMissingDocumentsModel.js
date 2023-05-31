import React from "react";
//import { Link, useLocation } from "react-router-dom";
import MissingDocumentImage from "../../assets/images/missing-docus.png";
import Modal from "react-bootstrap/Modal";

const UploadMissingDocumentsModelSection = (props) => {
  const rejectValues = props.data && props.data ? props.data : "";
  return (
    <>
      <Modal
        show={props.show}
        onHide={props.handleChange}
        size="lg"
        keyboard={true}
        backdrop="static"
        className="Suspended-model mt-5"
      >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center">
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <div className="py-2">
              <img src={MissingDocumentImage} alt="MissingDocumentImage" />
              <div className="text-right p-3 mobile-open">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={props.handleChange}
                ></button>
              </div>
              <h4 className="mt-4" style={{ fontWeight: "600" }}>
                Upload missing documents
              </h4>
              <p className="mt-3">
                Your profile verification is Pending <br />
                due to the missing document(s)
              </p>
              <ul className="missing-documents mb-4">
                {/* {rejectData.data.personal_doc &&
                  rejectData.data.personal_doc.names.map((item, index) => {
                    return (
                      <li className="document-yes">{item.pan_document} ss</li>
                    );
                  })} */}

                {rejectValues.education_doc &&
                  rejectValues.education_doc.map((item, index) => {
                    return (
                      <li className="document-no" key={index + 1}>
                        {item.degree_name}
                      </li>
                    );
                  })}
                {rejectValues.photo_doc &&
                  rejectValues.photo_doc.map((item, index) => {
                    return (
                      <li className="document-no" key={index + 1}>
                        personal photo rejected
                      </li>
                    );
                  })}
                {rejectValues.profession_doc &&
                  rejectValues.profession_doc.names.map((item, index) => {
                    return (
                      <li className="document-no" key={index + 1}>
                        {item.type}
                      </li>
                    );
                  })}
                {rejectValues.personal_doc &&
                  rejectValues.personal_doc.names.map((item, index) => {
                    return (
                      <li className="document-no" key={index + 1}>
                        {item.type}
                      </li>
                    );
                  })}
                {/* {rejectValues.data.photo_doc &&
                  rejectData.data.photo_doc.names.map((item, index) => {
                    return (
                      <li className="document-yes">
                        {item.type} photo
                      </li>
                    );
                  })} */}
                {/* <li className="document-yes">cascascasc</li>
                <li className="document-no">cascascasc</li>
                <li className="document-yes">cascascasc</li>
                <li className="document-no">cascascasc</li> */}
              </ul>
            </div>
            <br />
          </div>
          <p>
            <label>
              Admin Comment :{" "}
              {rejectValues.admin_comment &&
                rejectValues.admin_comment[0].admin_comment}
            </label>
          </p>
          <div className="py-2 mg-top-10">
            <span
              className="submit-button"
              style={{ padding: "10px 60px" }}
              onClick={props.handleChange}
            >
              Upload
            </span>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default UploadMissingDocumentsModelSection;
