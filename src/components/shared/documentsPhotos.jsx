import React from "react";
import { Modal } from "react-bootstrap";
import config from "../../assets/config";
import DocViewer, { DocViewerRenderers } from "@cyntler/react-doc-viewer";

import GoogleDocsViewer from "react-google-docs-viewer";

function DocumentsPhotos(props) {
  const imageBaseUrl = config.imageUrl;
  const docs = [{ uri: `${imageBaseUrl}${props.imgOne}` }];
  const headers = {
    "Access-Control-Allow-Origin": "*",
  };

  const fileExt = props.imgOne.split(".").pop();
  const fileExt1 = fileExt.split("?").shift();
  const fileExt2 = fileExt1.split("?").pop();
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="cent-item">
          {/* <div>
                  <img
                       src={`${imageBaseUrl}${props.imgOne}`}
                       alt="Icon"
                       className="img-fluid"
                   />
            </div>  */}
     
          {fileExt2 == "pdf" || fileExt2 == "doc" || fileExt2 == "docx" ? (
            <GoogleDocsViewer
              width="450px"
              height="450px"
              fileUrl={docs[0].uri}
            />
          ) : (
            <img
                      style={{ height: "auto", width: "100%" }}
                      src={docs[0].uri}
                      alt="Icon"
                      className="img-fluid"
                    />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default DocumentsPhotos;
