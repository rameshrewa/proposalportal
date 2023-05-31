import React from "react";
import { FileUploader } from "react-drag-drop-files";

import { imageUrl } from "../../assets/config";
import pdfImage from "../../assets/images/pdf.png";

const FileUploadDocs = (props) => {
  console.log('printing props', props)
  return (
    <>
      {props.uploads &&
        props.uploads.map((list, index) => {
          return (
            <div className="col-lg-2 col-md-3 col-sm-12" key={index}>
              <div className="form-group">
                <div className="border-items">
                  <span className="btn-file">
                    <i className="icon icon-plus-lg plus-symbol-custom-icon"></i>
                    <input
                      type="file"
                      disabled={list.doc_verified === 1}
                      onChange={(file) => {
                        props.handleChange(file, list);
                      }}
                      accept="image/png, image/gif, image/jpeg, application/pdf"
                    />
                    <div className="inner-drag">
                      <span className="inner-name">
                        upload your{" "}
                        {list.course_name === "Others"
                          ? list.other_course
                          : list.course_name}
                      </span>
                      <span title="types: JPG,PNG,GIF,PDF" className="file-types">
                        JPG,PNG,GIF,PDF
                      </span>
                    </div>
                  </span>
                </div>
                <p
                  className={
                    list.doc_verified === 0
                      ? "uploadFileName-red"
                      : "uploadFileName"
                  }
                >
                  {list.course_name === "Others"
                    ? list.other_course
                    : list.course_name}{" "}
                  <span className="requiredColor">*</span>
                </p>
                <>
              {props.uploads && props.uploads[0]?.candidate_education_doc?.includes(".pdf") ?
          <img
            src={pdfImage}
            className="img-fluid"
            alt="Add List"
            style={{height:'100px', width:'100px'}}
          />
          : <img
                    src={imageUrl + list.candidate_education_doc}
                    className="img-fluid"
                    alt=""
                    tyle={{height:'100px', width:'100px'}}
                  />
                }
        </>
                {/* {list && list.candidate_education_doc !== null ? (
                  <img
                    src={imageUrl + list.candidate_education_doc}
                    className="img-fluid"
                    alt="Add image List"
                    width="140px"
                    height="70px"
                  />
                ) :  <img
            src={pdfImage}
            className="img-fluid"
            alt="Add List"
            height="100px"
            width="100px"
          />} */}
              </div>
            </div>
          );
        })}
    </>
  );
};

export default FileUploadDocs;
