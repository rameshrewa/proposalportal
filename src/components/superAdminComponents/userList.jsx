import React from "react";
import Editadminicon from "../../assets/images/edit-icon.svg";
import Binadminicon from "../../assets/images/bin-admin-icon.svg";

export default function UserList({ data, handleModelClick, openDelete }) {
  return (
    <>
      <div key={data.user_id} className="col-lg-3 mt-4">
        <div className="white-added-userbox">
          <span className="edit-admin-icon">
            <button
              onClick={() => {
                handleModelClick(`${data.user_id}`);
              }}
              role="button"
              tabIndex="0"
              className="editIcon-btn"
            >
              <img src={Editadminicon} alt="Icon" nn className="img-fluid" />
            </button>
          </span>

          <span className="bin-delete-icon">
            <img
              src={Binadminicon}
              alt="Icon"
              className="img-fluid cursor"
              onClick={() => openDelete(data.user_id)}
            />
          </span>
          <p className="admin-user-name-text">
            {data?.first_name} {data?.last_name}
          </p>
          <p className="admin-user-id-text mt-1">{data?.email_id}</p>

          {/* {data && data.role[0] && data.role[0].role_name} */}
          <p>
            {data &&
              data.role.map((roledatas, index) => {
                return (
                  <span className="verification-team-text" key={index + 1}>
                    {roledatas.role_name}{" "}
                    {index === data.role.length - 1 ? "" : ", "}
                  </span>
                );
              })}
          </p>
        </div>
      </div>
    </>
  );
}
