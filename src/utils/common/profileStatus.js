import React from "react";

const ProfileStatus = (props) => {
  return (
    <>
      {props && props.status === 5
        ? "Pending Docs"
        : props.status === 6
        ? "Profile Resubmitted"
        : props.status === 4
        ? "Profile Submitted"
        : ""}
    </>
  );
};
const AdminProfileStatus = (props) => {
  return (
    <>
      {props && props.value === "1" ? (
        <span className="status-green">Accepted</span>
      ) : props && props.value === "0" ? (
        <span className="status-red">Rejected</span>
      ) : (
        <span className="status-orange">Pending</span>
      )}
    </>
  );
};
export { ProfileStatus, AdminProfileStatus };
