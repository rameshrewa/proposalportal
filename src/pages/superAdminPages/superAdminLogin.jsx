import React, { useState, useEffect, useRef, useCallback } from "react";

// router
import { useHistory } from "react-router-dom";

// components
import {
  HfnFirebaseAuth,
  signOut,
} from "@heartfulnessinstitute/react-hfn-profile";
import { DocumentVerificationServices } from "../../services/admin/documentverification.service";

import SeoHead from "../../layout/Seo/seoBlock";

// assets
import Logo from "../../assets/images/proposal-logo.png";
import { lStorage } from "../../utils/storage";
import { Modal } from "react-bootstrap";
import Loading from "../../components/shared/common/loading";
import { toast } from "react-toastify";
const SuperAdminLogin = () => {
  let history = useHistory();
  const getDocumentData = new DocumentVerificationServices();
  const [loginCheck, setLoginCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const reloadPage = () => {
    lStorage.set("logOut", "refreshed");
    window.location.reload();
  };
  useEffect(() => {
    const authVal = lStorage.get("authInfo-sadmin");
    const logVal = lStorage.get("logOut");
    const authInfo = authVal ? JSON.parse(authVal) : null;
    if (authInfo?.token) history.push("/superadmin/dashboard");
    else signOut();
    if (logVal === "slogOut") {
      reloadPage();
    }
  }, [history]);

  const firebaseRef = useRef(null);

  const processLogin = useCallback(
    ({ myInfo }) => {
      if (myInfo && firebaseRef.current) {
        firebaseRef.current.authFn.onAuthStateChanged((firebaseUser) => {
          if (firebaseUser)
            firebaseUser.getIdToken().then((srcmToken) => {
              setLoginCheck(true);
              if (myInfo.id) {
                lStorage.set(
                  "authInfo-sadmin",
                  JSON.stringify({ token: srcmToken })
                );
                getDocumentData.getRoles().then((res) => {
                  setLoading(true);
                  if (
                    res.data.isError === false ||
                    res.data.statusCode === "200"
                  ) {
                    setLoading(false);
                    const datatt = res.data.data.type;
                    lStorage.set("admin-roles", datatt);
                    if (datatt === "superadmin") {
                      history.push("/superadmin/dashboard");
                    } else if (datatt === "admin") {
                      history.push("/admin/registeredcandidate");
                    } else {
                      toast.error("you are not a authorised user");
                      history.push("/superadmin/login");
                      lStorage.clear();
                      lStorage.set("logOut", "slogOut");
                    }
                  } else {
                    setLoading(false);
                    toast.error("Something went wrong");
                    history.push("/superadmin/login");
                    lStorage.clear();
                    lStorage.set("logOut", "slogOut");
                  }
                });
              }
            });
        });
      }
    },
    [loading]
  );

  return (
    <>
      <SeoHead
        HeadTitle={"Login | Proposal Portal"}
        HeadDescription={"Login User Information"}
      />
      <section className="LoginSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 col">
              <div className="LoginSignBg">
                <div className="login-signlogo py-5">
                  <img src={Logo} alt="Logo" />
                </div>
                <h1>Log In</h1>
                <HfnFirebaseAuth
                  ref={firebaseRef}
                  titleText=""
                  doLogin={processLogin}
                />
                {loginCheck ? (
                  <div className="p-text-center p-m-4 p-text-bold">
                    {" "}
                    Fetching info...{" "}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mobile-loginBg"></div>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};

export default SuperAdminLogin;
