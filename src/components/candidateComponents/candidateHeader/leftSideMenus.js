import React, { useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import HeartfulnessLogo from "../../../assets/images/heartfulnessLogo.png";
import LeftArrow from "../../../assets/images/Icon-arrow-down.png";
//import DeleteIcon from "../../../images/delete-Icon.png"
import ConfirmationPopup from "../../shared/common/confirmationPopup";
import CandidateService from "../../../services/admin/candidate.service";
import { toast } from "react-toastify";
import { imageUrl } from "../../../assets/config";
import { lStorage } from "../../../utils/storage";
const LeftSideMenus = ({ aboutInfo }) => {
  const [showDropdownSub, setShowDropdownSub] = useState(false);
  const [active, setActive] = useState("");
  const [typeVal, setTypeVal] = useState("");
  const [loading, setLoading] = useState("");
  const [regInfo, setRegInfo] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState(false);
  const candidateApi = new CandidateService();
  const history = useHistory();
  // const location = useLocation();
  // React.useEffect(() => {
  //     const path = location.pathname
  //     setActive(path)
  // }, [location])

  // const navigateCandidate = () => {
  //   return <Redirect to="/recommendedMatch" />;
  // };
  const openDelete = (type) => {
    setDeleteConfirm(true);
    setTypeVal(type);
  };
  const closeDelete = () => {
    setDeleteConfirm(false);
  };
  const deleteUserDetails = () => {
    let payload = [
      {
        status: typeVal,
      },
    ];
    candidateApi.profileStatus(payload).then((res) => {
      if (res.status === 200) {
        toast.success(`candidate profile status is updated successfully`);
        closeDelete();
        loadingData();
      } else {
        toast.error("something went wrong");
      }
    });
  };
  const Logout = useCallback(() => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  });
  const loadingData = () => {
    candidateApi
      .userReginfoApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          if (response.data.data.account_status === "delete") {
            Logout();
            toast.success("Your profile deleted successfully");
          } else {
            setRegInfo(response.data.data);
          }
          setLoading(true);
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    loadingData();
  }, []);
  return (
    <>
      <div className="p-3 sidebarRightBorder">
        <div className="row ">
          <div className="col-lg-12 col">
            <img
              src={HeartfulnessLogo}
              alt="Heartfulness"
              className="HeartfulnessLogo"
            />
          </div>
        </div>
        <div className="row mt-5">
          <div className="col-lg-12 col">
            <img
              src={`${imageUrl}${
                aboutInfo &&
                aboutInfo.photoData &&
                aboutInfo.photoData[0].candidate_photo_url
              }`}
              alt="Heartfulness"
              className="profile-img-01"
            />
            <p className="user-info">HFN ID {aboutInfo && aboutInfo.hfn_id}</p>
            <p className="user-name">{aboutInfo && aboutInfo.name}</p>
            <p className="user-info">Age {aboutInfo.candidate_age}</p>
          </div>
        </div>
        <div className="row mt-5 text-left">
          <div className="col-lg-12 col">
            <div className="LeftMenus">
              <ul>
                <li>
                  <Link to={"/user-information"}>
                    {active === "/user-information" ? (
                      <div className="LeftMenu-active">User Information</div>
                    ) : (
                      <div className="LeftMenu-UserIcon">User Information</div>
                    )}
                  </Link>
                </li>
                <li>
                  <Link to="/recommendedMatch">
                    <div className="LeftMenu-RingsIcon">Recommended Match</div>
                  </Link>
                </li>
                <li>
                  <Link to={"/confirmWedding"}>
                    <div className="LeftMenu-WeddingIcon">Confirm wedding</div>
                  </Link>
                </li>
                <li>
                  <div
                    onClick={() => {
                      if (showDropdownSub === true) {
                        setShowDropdownSub(false);
                      } else {
                        setShowDropdownSub(true);
                      }
                    }}
                  >
                    <div className="LeftMenu-Settings cursor">Profile</div>
                  </div>
                  <div
                    className="text-right mt-1"
                    style={{ cursor: "pointer" }}
                    onClick={() => {
                      if (showDropdownSub === true) {
                        setShowDropdownSub(false);
                      } else {
                        setShowDropdownSub(true);
                      }
                    }}
                  >
                    {showDropdownSub === true ? (
                      <img
                        src={LeftArrow}
                        alt="LeftArrow"
                        className="downArrow"
                      />
                    ) : (
                      <img src={LeftArrow} alt="LeftArrow" />
                    )}
                  </div>
                  <ul
                    className={
                      showDropdownSub === true
                        ? "show responsiveSubMenu"
                        : "d-none responsiveSubMenu"
                    }
                    style={{ marginLeft: "11px" }}
                  >
                    <li
                      className="LeftMenu-DeleteIcon cursor"
                      onClick={() => {
                        openDelete(
                          regInfo && regInfo.account_status === "active"
                            ? "inactive"
                            : "active"
                        );
                      }}
                    >
                      {regInfo &&
                      regInfo.account_status &&
                      regInfo.account_status === "active"
                        ? "Inactive"
                        : "Active"}
                    </li>
                    <li>
                      <li
                        className="LeftMenu-DeleteIcon cursor"
                        onClick={() => {
                          openDelete("delete");
                        }}
                      >
                        Delete
                      </li>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {deleteConfirm && (
        <ConfirmationPopup
          deletePlan={deleteUserDetails}
          handleClose={closeDelete}
          type={typeVal}
        />
      )}
    </>
  );
};

export default LeftSideMenus;
