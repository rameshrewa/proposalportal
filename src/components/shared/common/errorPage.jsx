import React, { useState, useEffect } from "react";

import SeoHead from "../../../layout/Seo/seoBlock";

// assets
import Logo from "../../../assets/images/proposal-logo.png";
import AbhyasiModal from "../../../utils/common/abhyasiModal";
import Decline from "../../../utils/common/decline";
import NonUser from "../../../utils/common/nonUser";
import CandidateService from "../../../services/admin/candidate.service";
import { Modal } from "react-bootstrap";
import Loading from "./loading";
import { lStorage } from "../../../utils/storage";
import { yearconvert,dateconvert  } from "../../../utils/common/dateConvertion";
import { toast } from "react-toastify";
const ErrorPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [wedding, setWedding] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [nonUser, setNonUser] = useState(false);
  const candidateApi = new CandidateService();
  const Logininfo = () => {
    try {
      const todayDat = new Date();
      setLoading(true);
      candidateApi
        .userLogininfoApi()
        .then((response) => {
          lStorage.set("logInfo", response.data.data);
          const registerData = lStorage.get("hfn-profile-me");
        
          const abhyasiValidation =
            registerData &&
            registerData.me.user_roles.find((value) => value === "seeker");
          if (abhyasiValidation !== "seeker") {
            if (
              response.data.isError === false ||
              response.data.statusCode === "200"
            ) {
              if (3 <= response.data.data.match_request_declined_count) {
                setLoading(false);
                setDeclined(true);
              } else if (
                response.data.data.wedding_fixed_date &&
                dateconvert(todayDat) >
                dateconvert(
                    response.data.data.wedding_fixed_date !== null &&
                      response.data.data.wedding_fixed_date
                  )
              ) {
                setLoading(false);
                setWedding(true);
              }
            }
          } else {
            setLoading(false);
            setNonUser(true);
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
    Logininfo();
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Error Page | Proposal Portal"}
        HeadDescription={"Error Information"}
      />
      <section className="LoginSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-12 col">
              <div className="LoginSignBg">
                <div className="login-signlogo py-5 logo-wrap-left">
                  <img src={Logo} alt="Logo" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {wedding && <AbhyasiModal />}
      {declined && <Decline />}
      {nonUser && <NonUser />}
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};

export default ErrorPage;
