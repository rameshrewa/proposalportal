import React, { useState, useEffect, useCallback } from "react";
// import SuperadminHeader from "./superadminHeader";
import Manageusertable from "./manageUserTable";
import EdituserData from "./editUser";
import SeoHead from "../../layout/Seo/seoBlock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Dashboardicon from "../../assets/images/dashboard-line.svg";

import Usersettingline from "../../assets/images/user-settings-line.svg";
import { SuperadminServices } from "../../services/superadmin/superadminData.service";
import { toast } from "react-toastify";
import ConfirmationPopup from "../shared/common/confirmationPopup";
import SuperAdminCards from "../shared/common/superAdminCards";
import UserList from "./userList";
import AddUser from "./userAdd";
import { DocumentVerificationServices } from "../../services/admin/documentverification.service";
import { Modal } from "react-bootstrap";
import Loading from "../shared/common/loading";
import { useHistory } from "react-router-dom";
import { lStorage } from "../../utils/storage";

const SuperadminDashboard = () => {
  let history = useHistory();
  const [userData, setuserData] = useState();
  const [user_id, setUser_id] = useState("");
  const [addMessage, setAddMessage] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [addUserOpen, setAddUserOpen] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const [putUserData, setPutUserData] = useState([]);
  const [dashBoard, setDashBoard] = useState([]);
  const [putUserCon, setUserCon] = useState(false);
  const [roleDetails, setRoleDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const superAdminGetAllUsersApi = new SuperadminServices();
  const getDocumentData = new DocumentVerificationServices();
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };

  const getUserDetails = useCallback(() => {
    superAdminGetAllUsersApi
      .standardDataGetApi()
      .then((response) => {
        setLoading(true);
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          setuserData(response?.data?.data);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response.status === 401) {
          toast.error("Your login session has expired please login again");
          logOut();
          setLoading(false);
        } else {
          toast.error("something went wrong");
          setLoading(false);
        }
      });
  }, [userData]);
  const dashboardTopCount = useCallback(() => {
    superAdminGetAllUsersApi
      .sadminDashboardTopCount()
      .then((response) => {
        setLoading(true);
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          let dropdownOptions = Object.entries(response.data.data).map(
            ([key, value, index]) => {
              return {
                label: key,
                count: value,
                index: index,
              };
            }
          );
          setLoading(false);
          setDashBoard(dropdownOptions);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [dashBoard]);
  const openDelete = (user_id) => {
    setUser_id(user_id);
    setDeleteConfirm(true);
  };
  const closeDelete = () => {
    setUser_id("");
    setDeleteConfirm(false);
  };
  const closeModal = (data) => {
    setModalShow(false);
    if (data === "formSubmitted") getUserDetails();
  };
  const closeAddModal = (data) => {
    setAddUserOpen(false);
    getUserDetails();
    setAddMessage(data && data);
  };

  const deleteUserDetails = () => {
    superAdminGetAllUsersApi.standardDataDeleteApi(user_id).then((res) => {
      if (res.status === 200) {
        toast.success("deleted successfully");
        getUserDetails();
        closeDelete();
      } else {
        toast.error("something went wrong");
      }
    });
  };
  const rolesDetailsApiGet = useCallback(() => {
    getDocumentData
      .getRoles()
      .then((res) => {
        setLoading(true);
        if (res.data.isError === false || res.data.statusCode === "200") {
          setLoading(false);
          setRoleDetails(res?.data?.data);
        } else {
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [getDocumentData]);

  const handleModelClick = (user_id) => {
    setModalShow(true);
    superAdminGetAllUsersApi
      .standardDataPutGetOneUserApi(user_id)
      .then((res) => {
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
              srcm_id: item?.srcm_id,
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
  const addUser = () => {
    setAddUserOpen(true);
  };
  useEffect(() => {
    const roles = lStorage.get("admin-roles");
    console.log(roles, "reoleee");
    if (roles === "superadmin") {
      dashboardTopCount();
      getUserDetails();
      rolesDetailsApiGet();
    } else {
      toast.error("your are not a super admin");
      setTimeout(() => {
        logOut();
      }, 2000);
    }
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Super Admin Dashboard | Proposal Portal"}
        HeadDescription={"Admin Dashboard"}
      />
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
      <section className="SuperadminDashboard-wrapper">
        <div className="container-fluid">
          <div className="row custom-row-dashboard">
            <div className="col-md-12">
              <Tabs
                defaultActiveKey="dashboard"
                id="justify-tab-example"
                className="mb-3 super-admin-dashboard-tab"
                justify
              >
                <Tab
                  eventKey="dashboard"
                  title={
                    <span>
                      <img
                        src={Dashboardicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                      Dashboard
                    </span>
                  }
                >
                  {/* <span>
                    <img src={Dashboardicon} alt="Icon" className="img-fluid" />
                  </span> */}

                 <div>
                  <div className="flex-container">
                    {dashBoard &&
                      dashBoard.map((item, index) => {
                        return <SuperAdminCards props={item} key={index} />;
                        
                      })}
                  </div>
                 </div> 
                 

                  <h3 className="admin-heading-user-text">
                    Recently added users
                  </h3>

                  <div className="container containerpad">
                    <div className="row pb-5">
                      {userData?.map((item) => {
                        return (
                          <UserList
                            data={item}
                            handleModelClick={handleModelClick}
                            openDelete={openDelete}
                          />
                        );
                      })}
                    </div>
                  </div>
                </Tab>
                <Tab
                  eventKey="manageuser"
                  title={
                    <span>
                      <img
                        src={Usersettingline}
                        alt="Icon"
                        className="img-fluid"
                      />
                      Manage user
                    </span>
                  }
                >
                  <div>
                    <div className="wid40">
                      <h3 className="admin-heading-user-text"> Admin Users </h3>
                    </div>
                    <div className="wid60 pull-right">
                      <button className="btn buton-sky-blue" onClick={addUser}>
                        {" "}
                        Add Data
                      </button>
                    </div>
                  </div>

                  <Manageusertable addMessage={addMessage} />
                </Tab>
              </Tabs>
            </div>
            {/* <div className="col-md-1"></div> */}
          </div>
        </div>
      </section>
      <EdituserData
        show={modalShow}
        onHide={closeModal}
        putUserData={putUserData}
      />
      <AddUser show={addUserOpen} onHide={closeAddModal} />
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

export default SuperadminDashboard;
