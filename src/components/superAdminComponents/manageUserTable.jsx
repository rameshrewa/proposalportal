import React, { useEffect, useState } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPencilAlt } from "react-icons/fa";
import { toast } from "react-toastify";
import { FaTrash } from "react-icons/fa";
import { SuperadminServices } from "../../services/superadmin/superadminData.service";
import EdituserData from "./editUser";
import ConfirmationPopup from "../shared/common/confirmationPopup";

const Manageusertable = (props) => {
  const [manageUserData, setManageUserData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [putUserData, setPutUserData] = useState([]);
  const [putUserCon, setUserCon] = useState(false);
  const superadminGetApi = new SuperadminServices();

  const manageGetUserData = () => {
    superadminGetApi
      .standardDataGetApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "400"
        ) {
          // setManageUserData(response?.data?.data);
          const optionsArr = response?.data?.data.map((item) => {
            let dropdownOptions =
              item.role &&
              item.role.map((value) => {
                return { label: value.role_name, value: value.role_id };
              });
            return {
              user_id: item.user_id,
              last_name: item?.last_name,
              first_name: item?.first_name,
              email_id: item?.email_id,
              role_id: item && item.role[0] && item.role[0].role_id,
              role_name:
                item &&
                item.role.map((roleItems, index) => {
                  return (
                    <span>
                      {roleItems.role_name + " "}{" "}
                      {index === item.role.length - 1 ? "" : ", "}
                    </span>
                  );
                }),
            };
          });
          setManageUserData(optionsArr);
        } else {
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const openDelete = (user_id) => {
    setUser_id(user_id);
    setDeleteConfirm(true);
  };
  const closeDelete = () => {
    setUser_id("");
    setDeleteConfirm(false);
  };
  const deleteUserDetails = () => {
    superadminGetApi.standardDataDeleteApi(user_id).then((res) => {
      if (res.status === 200) {
        toast.success("deleted successfully");
        manageGetUserData();
        closeDelete();
      } else {
        toast.error("something went wrong");
      }
    });
  };

  const handleModelClick = (user_id) => {
    setModalShow(true);
    superadminGetApi.standardDataPutGetOneUserApi(user_id).then((res) => {
      if (res.data.isError === false || res.data.statusCode === "400") {
        const optionsArr = res?.data?.data.map((item) => {
          let dropdownOptions =
            item.role &&
            item.role.map((value) => {
              return { label: value.role_name, value: value.role_id };
            });
          return {
            last_name: item?.last_name,
            first_name: item?.first_name,
            email_id: item?.email_id,
            abhyasi_id: item?.abhyasi_id,
            user_id,
            type: dropdownOptions,
          };
        });
        setPutUserData(optionsArr);
        setUserCon(true);
      } else {
        setUserCon(false);
      }
    });
  };

  const columns = [
    // {
    //   dataField:"photo",
    //   text: "",
    //   formatter: imageFormatter,
    // },
    {
      dataField: "Name",
      text: "Name",
      formatter: nameFormatter,
    },
    {
      dataField: "email_id",
      text: "Email ID",
    },
    {
      dataField: "role_name",
      text: "Roles",
    },
    {
      dataField: "edit",
      text: "Action",
      formatter: rankFormatter,
      headerAttrs: { width: 100 },
      attrs: { width: 100, class: "EditRow" },
    },
  ];

  function nameFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <p>
        <span>
          {row.first_name} {row.last_name}
        </span>
      </p>
    );
  }
  function rankFormatter(cell, row, rowIndex, formatExtraData) {
    return (
      <div
        style={{ textAlign: "center", cursor: "pointer", lineHeight: "normal" }}
      >
        <button
          onKeyDown={() => setModalShow(true)}
          onClick={() => {
            handleModelClick(row.user_id);
          }}
          role="button"
          tabIndex="0"
          className="editIcon-btn"
        >
          <FaPencilAlt
            className="mg-right20"
            style={{ fontSize: 14 }}
            //  color="disabled"
          />
        </button>
        <FaTrash
          style={{ fontSize: 14 }}
          //  color="disabled"
          onClick={() => openDelete(row.user_id)}
        />
      </div>
    );
  }

  function imageFormatter(cell) {
    return (
      <span>
        <img
          className="mg-right20"
          style={{ width: 35 }}
          src={`https://s3.ap-south-1.amazonaws.com/heartfulcampuseportal/${cell}`}
        />
      </span>
    );
  }
  const closeModal = (data) => {
    setModalShow(false);
    if (data === "formSubmitted") manageGetUserData();
  };

  useEffect(() => {
    manageGetUserData();
  }, [props]);

  return (
    <>
      <div className="admin-user-table">
        <BootstrapTable
          keyField="id"
          data={manageUserData}
          columns={columns}
          bordered={false}
          hover
          pagination={paginationFactory({ sizePerPage: 5 })}
          search={{ searchFormatted: true }}
          classes="custom-user-table"
        />
      </div>
      <EdituserData
        show={modalShow}
        onHide={closeModal}
        putUserData={putUserData}
      />
      {deleteConfirm && (
        <ConfirmationPopup
          deletePlan={deleteUserDetails}
          handleClose={closeDelete}
          type="Delete"
        />
      )}
    </>
  );
};

export default Manageusertable;
