import React, { useEffect, useRef, useState } from "react";

//import Logo from 'assets/images/logo/forest-logo.png';

import { Navbar, Container } from "react-bootstrap";

import verfificationicon from "../../assets/images/verification-icon.svg";

//import submitttedverfificationicon from "../../assets/images/summited-verfification.svg";

import documentverficationicon from "../../assets/images/document-verification-icon.svg";

import whitebgcheckicon from "../../assets/images/white-bg-check.png";

import bluedocumentattchments from "../../assets/images/blue-document-attchments.png";

import whitematchingexperticon from "../../assets/images/matching-expert-white.png";

import whitedashboardicon from "../../assets/images/white-dashboardicon.png";

import Nav from "react-bootstrap/Nav";

import logouticon from "../../assets/images/logout.png";
import Pathshape from "../../assets/images/path-shape.png";
import Proposaliconsmall from "../../assets/images/proposal-icon-small.svg";
import Menuiconblue from "../../assets/images/menu-icon-blue.svg";
import Menucheckblue from "../../assets/images/menu-check-blue.svg";
import Menuheartblue from "../../assets/images/menu-heart-icon.svg";
import { useHistory, useLocation } from "react-router-dom";
import registerationicon from "../../assets/images/registeration-icon.svg";
import { lStorage } from "../../utils/storage";
import { slide as Menu } from "react-burger-menu";
import NotifyMe from "react-notification-timeline";
import { DocumentVerificationServices } from "../../services/admin/documentverification.service";
import moment from "moment";

function toTimestamp(strDate) {
  var datum = Date.parse(strDate);
  return datum / 1000;
}

const AdminHeader = ({ isSticky, props }) => {
  const adminApi = new DocumentVerificationServices();

  const [isMobile, setIsMobile] = useState(false);
  const [notificationData, setNotificationData] = useState("");
  const profileData = lStorage.get("hfn-profile-me");

  const handleResize = () => {
    if (window.innerWidth < 991) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
    }
  };

  const customMarkAsRead = () => {
    let payLoad = [
      {
        allClear: 1,
      },
    ];
    adminApi
      .adminupdateNotification(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          notificationList();
        }
      })
      .catch((err) => {});
  };
  const ref = useRef(null);
  let location = useLocation();
  let path = location && location.pathname;
  let history = useHistory();
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };
  const scrollToSection = () => {
    document.querySelectorAll("a.scroller").forEach(function (a) {
      a.addEventListener("click", function (event) {
        if (event.target.getAttribute("href")) {
          event.preventDefault();
          const hash = event.target.getAttribute("href");
          const hashSection = hash.split("/#").pop();
          const scrollTarget = document.querySelector(`#${hashSection}`);
          const headerHeight = 60;
          if (scrollTarget) {
            window.scrollTo({
              top: scrollTarget.offsetTop - headerHeight,
              behavior: "smooth",
            });
          }
        }
      });
    });
  };

  const notificationList = () => {
    // console.log("its notinfy");
    let payLoad = [
      {
        type: "admin",
      },
    ];
    adminApi
      .adminlistNotification(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          // console.log(response);
          let dropdownOptions = response.data.data.map((value) => {
            return {
              update: value.notification_message,
              timestamp: Date.parse(value.created_at),
              id: value.notification_id,
            };
          });
          // console.log(dropdownOptions);
          handleResize();
          setNotificationData(dropdownOptions);
        }
        // if (response.data.isError === false || response.data.statusCode === "200") {
        //   setLoading(false);
        //   toast.success("Wedding accepted successfully");
        //   setCongratulation(true);
        // } else {
        //   setLoading(false);
        //   toast.error("something went wrong");
        // }
      })
      .catch((err) => {});
  };

  // console.log(notificationData)
  useEffect(() => {
    window.addEventListener("resize", handleResize);
    scrollToSection();
    if (isSticky) {
      const handleScroll = () => {
        if (ref.current && ref.current.classList) {
          if (window.scrollY > 10) {
            ref.current.classList.add("sticky");
          } else {
            ref.current.classList.remove("sticky");
          }
        }
      };

      window.addEventListener("scroll", handleScroll);

      return () => {
        window.removeEventListener("scroll", () => handleScroll);
      };
    }

    notificationList();
  }, [isSticky, isMobile]);

  // console.log("isMobile", notificationData);
  return (
    <header id="header">
      <div className="AdminHeader">
        <Navbar
          collapseOnSelect
          expand="lg"
          className="super-admin-navitem mg-left-navbar"
        >
          <Container className="top-wrapper-padding">
            <Navbar.Brand href="/"></Navbar.Brand>
            <p className="proposal-tile-mobile"> Proposal Portal </p>
            <Navbar.Toggle
              aria-controls="responsive-navbar-nav"
              className="nav-user-icon"
            />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="custom-superadmin-menu"
            >
              <div className="me-auto mobile-me">
                {/* <img src={heartfulnessLogo} alt="bell" className="img-fluid mobile-heartfulness-logo-wi" /> */}
                <div>
                  <h4 className="admin-blue-title-text"> Admin </h4>
                </div>
                <div>
                  <h6 className="proposal-grey-text"> PROPOSAL PORTAL </h6>
                </div>
              </div>
              <Nav className="nav-right-icons admin-logout-feature-icons">
                {/* <span className="bell-icon-top">
                  <img src={Bellicon} alt="bell" className="img-fluid" />
                </span> */}
                <div className="name-pad-5p">
                  Welcome <b>{profileData && profileData.me.name}</b>
                </div>
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

                <span className="logout-icon-amin-top cursor" onClick={logOut}>
                  <img src={logouticon} alt="bell" className="img-fluid" />
                </span>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>

        {isMobile ? (
          <Menu {...props} className="">
            <div className="two-equl-wrapper">
              <div className="blue-sidebar-wrapper">
                <nav id="sidebar-item">
                  <div className="sidebar-wrapper-style">
                    <Navbar.Brand href="#logo">
                      {" "}
                      <img
                        src={Proposaliconsmall}
                        alt="bell"
                        className="img-fluid propo-small-blue-con"
                      />{" "}
                    </Navbar.Brand>
                    <Nav.Link
                      href="/admin/dashboard"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Dashboard"
                    >
                      {" "}
                      {path === "/admin/dashboard" ||
                      path === "/admin/dashboard" ? (
                        <img
                          src={whitedashboardicon}
                          alt="bell"
                          className="img-fluid "
                        />
                      ) : (
                        <img
                          src={Menuiconblue}
                          alt="bell"
                          className="img-fluid "
                        />
                      )}
                    </Nav.Link>
                    <Nav.Link
                      href="/admin/registeredcandidate"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Registration Candidate"
                    >
                      {" "}
                      {path === "/admin/registeredcandidate" ||
                      path === "/admin/resubmittedcandidate" ||
                      path === "/admin/documentattchments" ||
                      path === "/admin/documentlist" ||
                      path === "/admin/candidateverification" ? (
                        <img
                          src={Pathshape}
                          alt="bell"
                          className="img-fluid "
                        />
                      ) : (
                        <img
                          src={bluedocumentattchments}
                          alt="bell"
                          className="img-fluid "
                        />
                      )}
                    </Nav.Link>

                    <Nav.Link
                      href="/admin/bgChecking"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Background Verification"
                    >
                      {path === "/admin/bgChecking" ||
                      path === "/admin/bgRejected" ||
                      path === "/admin/bgapprovaldetails" ? (
                        <img
                          src={whitebgcheckicon}
                          alt="bg check"
                          className="img-fluid "
                        />
                      ) : (
                        <img
                          src={Menucheckblue}
                          alt="bell"
                          className="img-fluid "
                        />
                      )}
                    </Nav.Link>
                    <Nav.Link
                      href="/admin/matchingexpert"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Matching Expert"
                    >
                      {" "}
                      {path === "/admin/matchingexpert" ||
                      path === "/admin/matchingbride" ||
                      path === "/admin/suitablematch" ||
                      path === "/admin/matchstatus" ||
                      path === "/admin/rejectedMatches" ||
                      path === "/admin/requestforwedding" ? (
                        <img
                          src={whitematchingexperticon}
                          alt="bell"
                          className="img-fluid "
                        />
                      ) : (
                        <img
                          src={Menuheartblue}
                          alt="bell"
                          className="img-fluid "
                        />
                      )}
                    </Nav.Link>
                  </div>
                </nav>
              </div>

              <div className="vertical-nav-item-bg-white">
                {(path === "/admin/registeredcandidate" ||
                  path === "/admin/resubmittedcandidate" ||
                  path === "/admin/documentattchments" ||
                  path === "/admin/documentlist" ||
                  path === "/admin/candidateverification") && (
                  <Nav
                    defaultActiveKey="/admin/registeredcandidate"
                    activeKey={path}
                    className="flex-column veritical-document-nav"
                  >
                    <Nav.Link
                      href="/admin/registeredcandidate"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Document verification"
                    >
                      <span className="blue-icon-dis">
                        <img
                          src={documentverficationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      Document verification
                    </Nav.Link>
                    <Nav.Link
                      href="/admin/registeredcandidate"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Registration"
                    >
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      Registration
                    </Nav.Link>
                    <Nav.Link
                      href="/admin/candidateverification"
                      data-toggle="tooltip"
                      data-placement="top"
                      title="Verification"
                    >
                      {" "}
                      <span className="blue-icon-dis">
                        <img
                          src={verfificationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      Verification
                    </Nav.Link>
                    {/* <Nav.Link href="/admin/resubmittedcandidate">
                  {" "}
                  <span className="blue-icon-dis">
                    <img
                      src={submitttedverfificationicon}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </span>{" "}
                  Re-Summited For Verification{" "}
                </Nav.Link> */}
                  </Nav>
                )}

                {(path === "/admin/bgChecking" ||
                  path === "/admin/bgRejected" ||
                  path === "/admin/bgapprovaldetails") && (
                  <Nav
                    defaultActiveKey="/admin/bgChecking"
                    activeKey={path}
                    className="flex-column veritical-document-nav"
                  >
                    <Nav.Link href="/admin/bgChecking">
                      <span className="blue-icon-dis">
                        <img
                          src={documentverficationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      Bg Expert
                    </Nav.Link>
                    <Nav.Link href="/admin/bgChecking">
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      BG Check
                    </Nav.Link>
                    <Nav.Link href="/admin/bgRejected">
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      BG Rejected
                    </Nav.Link>
                  </Nav>
                )}
                {(path === "/admin/matchingexpert" ||
                  path === "/admin/matchingbride" ||
                  path === "/admin/suitablematch" ||
                  path === "/admin/matchstatus" ||
                  path === "/admin/rejectedMatches" ||
                  path === "/admin/requestforwedding") && (
                  <Nav
                    defaultActiveKey="/admin/matchingexpert"
                    activeKey={path}
                    className="flex-column veritical-document-nav"
                  >
                    <Nav.Link href="/admin/matchingexpert">
                      <span className="blue-icon-dis">
                        <img
                          src={documentverficationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>{" "}
                      Matching Expert
                    </Nav.Link>
                    <Nav.Link href="/admin/matchingexpert">
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      Candidates
                    </Nav.Link>
                    <Nav.Link href="/admin/matchingbride">
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      Match Brides
                    </Nav.Link>
                    <Nav.Link href="/admin/matchstatus">
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      Match Status
                    </Nav.Link>
                    <Nav.Link href="/admin/requestforwedding">
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      Request for Wedding
                    </Nav.Link>
                    <Nav.Link href="/admin/rejectedMatches">
                      {" "}
                      <span className="blue-icon-dis active">
                        <img
                          src={registerationicon}
                          alt="Icon"
                          className="img-fluid"
                        />
                      </span>
                      Rejected Matches
                    </Nav.Link>
                  </Nav>
                )}

                {/* <div className="admin-bottom-text-item">
                <h4 className="admin-blue-title-text"> Admin </h4>
                <h6 className="proposal-grey-text"> PROPOSAL PORTAL </h6>
              </div> */}
              </div>
            </div>
          </Menu>
        ) : (
          <div className="two-equl-wrapper">
            <div className="blue-sidebar-wrapper">
              <nav id="sidebar-item">
                <div className="sidebar-wrapper-style">
                  <Navbar.Brand href="#logo">
                    {" "}
                    <img
                      src={Proposaliconsmall}
                      alt="bell"
                      className="img-fluid propo-small-blue-con"
                    />{" "}
                  </Navbar.Brand>
                  <Nav.Link
                    href="/admin/dashboard"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Dashboard"
                  >
                    {" "}
                    {path === "/admin/dashboard" ||
                    path === "/admin/dashboard" ? (
                      <img
                        src={whitedashboardicon}
                        alt="bell"
                        className="img-fluid "
                      />
                    ) : (
                      <img
                        src={Menuiconblue}
                        alt="bell"
                        className="img-fluid "
                      />
                    )}
                  </Nav.Link>
                  <Nav.Link
                    href="/admin/registeredcandidate"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Registration Candidate"
                  >
                    {" "}
                    {path === "/admin/registeredcandidate" ||
                    path === "/admin/resubmittedcandidate" ||
                    path === "/admin/documentattchments" ||
                    path === "/admin/documentlist" ||
                    path === "/admin/candidateverification" ? (
                      <img src={Pathshape} alt="bell" className="img-fluid " />
                    ) : (
                      <img
                        src={bluedocumentattchments}
                        alt="bell"
                        className="img-fluid "
                      />
                    )}
                  </Nav.Link>

                  <Nav.Link
                    href="/admin/bgChecking"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Background Verification"
                  >
                    {path === "/admin/bgChecking" ||
                    path === "/admin/bgRejected" ||
                    path === "/admin/bgapprovaldetails" ? (
                      <img
                        src={whitebgcheckicon}
                        alt="bg check"
                        className="img-fluid "
                      />
                    ) : (
                      <img
                        src={Menucheckblue}
                        alt="bell"
                        className="img-fluid "
                      />
                    )}
                  </Nav.Link>
                  <Nav.Link
                    href="/admin/matchingexpert"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Matching Expert"
                  >
                    {" "}
                    {path === "/admin/matchingexpert" ||
                    path === "/admin/matchingbride" ||
                    path === "/admin/suitablematch" ||
                    path === "/admin/matchstatus" ||
                    path === "/admin/rejectedMatches" ||
                    path === "/admin/requestforwedding" ? (
                      <img
                        src={whitematchingexperticon}
                        alt="bell"
                        className="img-fluid "
                      />
                    ) : (
                      <img
                        src={Menuheartblue}
                        alt="bell"
                        className="img-fluid "
                      />
                    )}
                  </Nav.Link>
                </div>
              </nav>
            </div>

            <div className="vertical-nav-item-bg-white">
              {(path === "/admin/registeredcandidate" ||
                path === "/admin/resubmittedcandidate" ||
                path === "/admin/documentattchments" ||
                path === "/admin/documentlist" ||
                path === "/admin/candidateverification") && (
                <Nav
                  defaultActiveKey="/admin/registeredcandidate"
                  activeKey={path}
                  className="flex-column veritical-document-nav"
                >
                  <Nav.Link
                    href="/admin/registeredcandidate"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Document verification"
                  >
                    <span className="blue-icon-dis">
                      <img
                        src={documentverficationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>{" "}
                    Document verification
                  </Nav.Link>
                  <Nav.Link
                    href="/admin/registeredcandidate"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Registration"
                  >
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    Registration
                  </Nav.Link>
                  <Nav.Link
                    href="/admin/candidateverification"
                    data-toggle="tooltip"
                    data-placement="top"
                    title="Verification"
                  >
                    {" "}
                    <span className="blue-icon-dis">
                      <img
                        src={verfificationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>{" "}
                    Verification
                  </Nav.Link>
                  {/* <Nav.Link href="/admin/resubmittedcandidate">
        {" "}
        <span className="blue-icon-dis">
          <img
            src={submitttedverfificationicon}
            alt="Icon"
            className="img-fluid"
          />
        </span>{" "}
        Re-Summited For Verification{" "}
      </Nav.Link> */}
                </Nav>
              )}

              {(path === "/admin/bgChecking" ||
                path === "/admin/bgRejected" ||
                path === "/admin/bgapprovaldetails") && (
                <Nav
                  defaultActiveKey="/admin/bgChecking"
                  activeKey={path}
                  className="flex-column veritical-document-nav"
                >
                  <Nav.Link href="/admin/bgChecking">
                    <span className="blue-icon-dis">
                      <img
                        src={documentverficationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>{" "}
                    Bg Expert
                  </Nav.Link>
                  <Nav.Link href="/admin/bgChecking">
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    BG Check
                  </Nav.Link>
                  <Nav.Link href="/admin/bgRejected">
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    BG Rejected
                  </Nav.Link>
                </Nav>
              )}
              {(path === "/admin/matchingexpert" ||
                path === "/admin/matchingbride" ||
                path === "/admin/suitablematch" ||
                path === "/admin/matchstatus" ||
                path === "/admin/rejectedMatches" ||
                path === "/admin/requestforwedding") && (
                <Nav
                  defaultActiveKey="/admin/matchingexpert"
                  activeKey={path}
                  className="flex-column veritical-document-nav"
                >
                  <Nav.Link href="/admin/matchingexpert">
                    <span className="blue-icon-dis">
                      <img
                        src={documentverficationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>{" "}
                    Matching Expert
                  </Nav.Link>
                  <Nav.Link href="/admin/matchingexpert">
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    Candidates
                  </Nav.Link>
                  <Nav.Link href="/admin/matchingbride">
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    Match Brides
                  </Nav.Link>
                  <Nav.Link href="/admin/matchstatus">
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    Match Status
                  </Nav.Link>
                  <Nav.Link href="/admin/requestforwedding">
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    Request for Wedding
                  </Nav.Link>
                  <Nav.Link href="/admin/rejectedMatches">
                    {" "}
                    <span className="blue-icon-dis active">
                      <img
                        src={registerationicon}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>
                    Rejected Matches
                  </Nav.Link>
                </Nav>
              )}

              {/* <div className="admin-bottom-text-item">
      <h4 className="admin-blue-title-text"> Admin </h4>
      <h6 className="proposal-grey-text"> PROPOSAL PORTAL </h6>
    </div> */}
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default AdminHeader;
