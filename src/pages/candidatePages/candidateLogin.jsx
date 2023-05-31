import React, { useState, useEffect, useRef, useCallback } from "react";

// router
import { useHistory } from "react-router-dom";

// components
import {
  HfnFirebaseAuth,
  signOut,
} from "@heartfulnessinstitute/react-hfn-profile";

import SeoHead from "../../layout/Seo/seoBlock";

// assets
import Logo from "../../assets/images/proposal-logo.png";
import { lStorage } from "../../utils/storage";
import Loading from "../../components/shared/common/loading";
import { Modal } from "react-bootstrap";
import CandidateService from "../../services/admin/candidate.service";
import { toast } from "react-toastify";
import AbhyasiModal from "../../utils/common/abhyasiModal";
import Decline from "../../utils/common/decline";
import Inactive from "../../utils/common/inactive";
import { dateconvert } from "../../utils/common/dateConvertion";
import NonUser from "../../utils/common/nonUser";

const CandidateLogin = () => {
  let history = useHistory();
  const candidateApi = new CandidateService();

  const [loginCheck, setLoginCheck] = useState(false);
  const [loading, setLoading] = useState(false);
  const [reloading, setReloading] = useState(false);
  const [inactive, setInactive] = useState(false);
  const firebaseRef = useRef(null);

  const processLogin = useCallback(
    ({ myInfo }) => {
      if (myInfo && firebaseRef.current) {
        setLoading(true);
        firebaseRef.current.authFn.onAuthStateChanged((firebaseUser) => {
          if (firebaseUser)
            firebaseUser.getIdToken().then((srcmToken) => {
              setLoginCheck(true);
              if (myInfo.id) {
                setLoading(false);
                setLoginCheck(false);
                lStorage.set("authInfo", JSON.stringify({ token: srcmToken }));
                const registerData = lStorage.get("hfn-profile-me");
                const abhyasiValidation =
                  registerData &&
                  registerData.me.user_roles.find(
                    (value) => value === "seeker"
                  );
                if (abhyasiValidation !== "seeker") {
                  Logininfo();
                } else {
                  history.push("/error");
                }
              } else {
                setLoginCheck(false);
                setLoading(false);
              }
            });
        });
        setLoading(false);
      }
    },
    [history]
  );
  const reloadPage = () => {
    lStorage.set("logOut", "refreshed");
    window.location.reload();
  };
  const Logininfo = () => {
    try {
      const todayDat = new Date();
      setLoading(true);
      candidateApi
        .userLogininfoApi()
        .then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            lStorage.set("logInfo", response.data.data);
            if (3 <= response.data.data.match_request_declined_count) {
              history.push("/error");
              setLoading(false);
            } else if (
              response.data.data.wedding_fixed_date &&
              dateconvert(todayDat) >
              dateconvert(
                  response.data.data.wedding_fixed_date !== null &&
                    response.data.data.wedding_fixed_date
                )
            ) {
              history.push("/error");
              setLoading(false);
            } else if (
              response.data.data.wedding_fixed_date &&
              dateconvert(
                response.data.data.wedding_fixed_date !== null &&
                  response.data.data.wedding_fixed_date
              ) > dateconvert(todayDat)
            ) {
              setLoading(false);
              history.push("/confirmWedding");
            } else if (response.data.data.account_status == "inactive") {
              setInactive(true);
              setLoading(false);
            } else {
              if (
                (response.data.data.profile_status === "profile_submitted" ||
                  response.data.data.profile_status === "document_verified" ||
                  response.data.data.profile_status === "bg_verified" ||
                  response.data.data.profile_status === "Reviewed by Prefect" ||
                  response.data.data.profile_status === "document_approved") &&
                (response.data.data.account_status === "active" ||
                  response.data.data.account_status === "inactive")
              ) {
                setLoading(false);
                history.push("/user-information");
              } else {
                history.push("/register");
              }
            }
          } else {
            history.push("/register");
          }
        })
        .catch((err) => {
          toast.error("something went wrong");
          setLoading(false);
        });
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    }
  };
  useEffect(() => {
    const authVal = lStorage.get("authInfo");
    const logVal = lStorage.get("logOut");
    const authInfo = authVal ? JSON.parse(authVal) : null;
    if (authInfo?.token) history.push("/register");
    else signOut();
    if (logVal === "logOut") {
      reloadPage();
      setReloading(true);
    }
  }, [history, reloading]);

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
                <div className="login-signlogo py-5 logo-wrap-left">
                  <img src={Logo} alt="Logo" />
                </div>

                <h1 className="log-in-text">Log In</h1>
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
      {inactive && <Inactive />}
      <div className="mobile-loginBg"></div>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};

export default CandidateLogin;
