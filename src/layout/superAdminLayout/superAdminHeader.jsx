import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import Heartfulnesswhitelogo from "../../assets/images/heartfulness-white-logo.png";
import Logo from "../../assets/images/proposal-logo.png";
import Bellicon from "../../assets/images/feather-bell.png";
import logouticon from "../../assets/images/logout-svgrepo-com.png";
import { useHistory } from "react-router-dom";
import { lStorage } from "../../utils/storage";
import NotifyMe from "react-notification-timeline";
import { DocumentVerificationServices } from "../../services/admin/documentverification.service";
const SuperadminHeader = () => {
  const adminApi = new DocumentVerificationServices();
  const [notificationData, setNotificationData] = useState("");
  const historyOut = useHistory();
  const logOut = () => {
    lStorage.clear();
    historyOut.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
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
          setNotificationData(dropdownOptions);
        }
      })
      .catch((err) => {});
  };

  useEffect(() => {
    notificationList();
  }, []);

  return (
    <section className="SuperadminHeader">
      <Navbar collapseOnSelect expand="lg" className="super-admin-navitem">
        <Container fluid className="top-wrapper-padding">
          <Navbar.Brand href="/">
            <div className="bg-dark-blue">
              <img
                src={Heartfulnesswhitelogo}
                alt="Heartfulnesswhitelogo"
                className=""
              />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse
            id="responsive-navbar-nav"
            className="custom-superadmin-menu"
          >
            <Nav className="me-auto">
              <img
                src={Logo}
                alt="bell"
                className="img-fluid proposal-logo-mobile proposal-logo-size "
              />
            </Nav>
            <Nav className="nav-right-icons">
              {/* <span className="bell-icon-top cursor">
                <img src={Bellicon} alt="bell" className="img-fluid" />
              </span> */}
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
    </section>
  );
};
export default SuperadminHeader;
