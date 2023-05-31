import React from "react";

export default function   SuperAdminCards({ props, key }) {
  return (
    <>
      <div className="white-dashboard-staus">
        {/* <span className="dashoard-icon-status">
          <img src={props.image && props.image} alt="Icon" className="img-fluid" />
        </span> */}
        <span className="count">
          {" "}
          <span>
            {props && props.count } 
          </span>
        </span>{" "}
        &nbsp;&nbsp;&nbsp;
        <span className="dashboard-name">{props && props.label.replaceAll("_"," ")}
        </span>
      </div>
    </>
  );
}
