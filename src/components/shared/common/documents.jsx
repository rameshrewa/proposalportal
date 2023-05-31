import React from "react";
//import { FileUploader } from "react-drag-drop-files";
import DocumentShow from "./documentShow";

export default function Documents(props) {
  const propvalue = props && props.uploads ? props.uploads[0] : "";
  return (
    <>
      {propvalue && propvalue.info.regInfo !== "" ? (
        <div className="col-lg-2 col-md-3 col-sm-12">
          <div className="form-group" key={propvalue.name}>
            {/* <FileUploader
              label={"Or Drag & Drop " + propvalue.name}
              handleChange={(file) => {
                props.handleChange(file, propvalue);
              }}
              name="file"
              multiple={false}
              types={propvalue.fileTypes}
            /> */}
            <div
              className={
                propvalue.typeValue === "personalPhoto"
                  ? "border-custom-widht"
                  : "border-items "
              }
            >
              <span className="btn-file">
                <i className="icon icon-plus-lg plus-symbol-custom-icon"></i>
                <input
                  className={
                    propvalue.typeValue === "personalPhoto"
                      ? "document-selct-file"
                      : ""
                  }
                  type="file"
                  disabled={propvalue.info.regInfo[propvalue.disableKey] === 1}
                  onChange={(file) => {
                    props.handleChange(file, propvalue);
                  }}
                  accept="image/png, image/gif, image/jpeg"
                />
                <div className="inner-drag">
                  <span className="inner-name">
                    upload your {propvalue.name}
                  </span>
                </div>
              </span>
            </div>
            <p
              className={
                propvalue.info.regInfo[propvalue.disableKey] === 0
                  ? "uploadFileName-red"
                  : "uploadFileName"
              }
            >
              {propvalue && propvalue.name}{" "}
              <span className="requiredColor">*</span>
            </p>
            <DocumentShow imageData={props.uploads} />
          </div>
        </div>
      ) : null}
    </>
  );
}
