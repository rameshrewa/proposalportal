import React, { useCallback, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/proposal-logo.png";
import LogoutIcon from "../../../assets/images/logout-icon.png";
import MenuSquared from "../../../assets/images/menu-squared.png";
import LeftArrow from "../../../assets/images/Icon-arrow-down.png";
import ProfileDeleteModel from "../../shared/profileDeleteModel";
import { lStorage } from "../../../utils/storage";
import NotifyMe from "react-notification-timeline";
import CandidateService from "../../../services/admin/candidate.service";

const MainHeader = () => {
  const candidateApi = new CandidateService();
  let history = useHistory();
  const [showDropdown, setShowDropdown] = React.useState(false);
  const [showDropdownSub, setShowDropdownSub] = React.useState(false);
  const [notificationData, setNotificationData] = useState("");

  const Logout = useCallback(() => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  });
  const profileData = lStorage.get("hfn-profile-me");
  const profileStatus = lStorage.get("status");

  const notification = () => {
    // console.log("its notinfy");
    let payLoad = [
      {
        type: "candidate",
      },
    ];
    candidateApi
      .listNotification(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          let dropdownOptions = response.data.data.map((value) => {
            return {
              update: value.notification_message,
              timestamp: Date.parse(value.created_at),
            };
          });
          setNotificationData(dropdownOptions);
        }
      })
      .catch((err) => {});
  };

  const customMarkAsRead = () => {
    // console.log("its notinfy");
    let payLoad = [
      {
        allClear: 1,
      },
    ];

    candidateApi
      .updateNotification(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          notification();
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    notification();
  }, []);

  return (
    <div className="MainHeader bg-white">
      <div className="row p-3 mainHeaderBorder">
        <div className="col-lg-3 col-md-6 col-sm-12">
          <div className="row">
            <div className="col">
              <img src={Logo} alt="logo" />
            </div>
            <div className="col text-right">
              <div className="mobileViews">
                <div
                  className="MenuIcons cursor"
                  onClick={() => {
                    if (showDropdown === true) {
                      setShowDropdown(false);
                    } else {
                      setShowDropdown(true);
                    }
                  }}
                >
                  <img src={MenuSquared} alt="MenuSquared" />
                </div>
              </div>
            </div>
          </div>
          <div
            className={
              showDropdown === true
                ? "show mt-5 responsiveMenu"
                : "d-none responsiveMenu"
            }
          >
            <div className="LeftMenus">
              <ul className="navbar-nav">
                <li className="dropdown nav-item">
                  <Link to="/user-information">
                    <div className="LeftMenu-active">User Information</div>
                  </Link>
                </li>
                <li className="dropdown nav-item">
                  <Link to="/recommended-match">
                    <div className="LeftMenu-RingsIcon">Recommended Match</div>
                  </Link>
                </li>
                <li className="dropdown nav-item">
                  <Link to={"/confirm-wedding"}>
                    <div className="LeftMenu-WeddingIcon">Confirm wedding</div>
                  </Link>
                </li>
                <li className="dropdown nav-item">
                  <Link
                    to={"#"}
                    onClick={() => {
                      if (showDropdownSub === true) {
                        setShowDropdownSub(false);
                      } else {
                        setShowDropdownSub(true);
                      }
                    }}
                  >
                    <div className="LeftMenu-Settings">Profile</div>
                  </Link>
                  <div
                    className="text-right mt-1 cursor"
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
                    <li>
                      {profileStatus && profileStatus === "active"
                        ? "Active"
                        : "Inactive"}
                    </li>
                    <li>
                      <ProfileDeleteModel />
                    </li>
                  </ul>
                </li>
                <li className="dropdown nav-item">
                  <a href="/" onClick={Logout} className="UserLogout cursor">
                    <img src={LogoutIcon} alt="LogoutIcon" />
                    <span style={{ marginLeft: "7px" }}>Signout</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="col-lg-9 col-md-6 col-sm-12 NotificationSection">
          <ul className="TopmenuList">
            <li>
              <div>
                Welcome <b>{profileData.me.name}</b>
              </div>
            </li>

            {/* <img src={Featherbell} alt="Featherbell" /> */}
            {notificationData && (
              <NotifyMe
                data={notificationData}
                storageKey="notific_key"
                notific_key="timestamp"
                notific_value="update"
                heading="Notification Alerts"
                sortedByKey={false}
                showDate={true}
                size={27}
                color="white"
                markAsReadFn={() => customMarkAsRead(notificationData.id)}
              />
            )}

            <li onClick={Logout} className="cursor">
              <img src={LogoutIcon} alt="LogoutIcon" />
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MainHeader;
