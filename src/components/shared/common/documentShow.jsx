import React from "react";
import { imageUrl } from "../../../assets/config";
import pdfImage from "../../../assets/images/pdf.png";
export default function DocumentShow(props) {
  const propvalue = props && props.imageData ? props.imageData[0] : "";
  let fileExtension =
    propvalue.typeValue === "personal"
      ? propvalue.info.regInfo[propvalue.value]
      : propvalue.info.regInfo.professionData[propvalue.value];
  let knowfiletype = fileExtension && fileExtension.split(".").pop();
  const fileExt1 = knowfiletype&& knowfiletype.split("?").shift();
  knowfiletype =  fileExt1 && fileExt1.split("?").pop();
  return (
    <>
      {knowfiletype === "pdf" ? (
        <>
          <img
            src={pdfImage}
            className="img-fluid"
            alt="Add List"
            height="100px"
            width="100px"
          />
        </>
      ) : (
        <>
          {propvalue &&
          propvalue.info.regInfo !== "" &&
          propvalue.typeValue === "occupation" &&
          propvalue.info.regInfo.professionData[propvalue.value] !== null &&
          knowfiletype === "pdf" ? (
            <img
              src={
                imageUrl +
                propvalue.info.regInfo.professionData[propvalue.value]
              }
              className="img-fluid"
              alt="Add image List"
            />
          ) : null}
          {propvalue &&
          propvalue.info.regInfo !== "" &&
          propvalue.typeValue === "occupation" &&
          propvalue.info.regInfo.professionData[propvalue.value] !== null ? (
            <img
              src={
                imageUrl +
                propvalue.info.regInfo.professionData[propvalue.value]
              }
              className="img-fluid "
              alt="Add List"
            />
          ) : null}
          {propvalue &&
          propvalue.typeValue === "personal" &&
          propvalue.info.regInfo[propvalue.value] !== null ? (
            <img
              src={imageUrl + propvalue.info.regInfo[propvalue.value]}
              className="img-fluid"
              alt="Add List"
            />
          ) : null}
        </>
      )}
    </>
  );
}
