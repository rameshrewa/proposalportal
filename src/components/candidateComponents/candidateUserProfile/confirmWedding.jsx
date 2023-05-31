import React, { useState, useEffect } from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import Header from "../candidateHeader/mainHeader";
import Sidebar from "../candidateHeader/leftSideMenus";
import WeddingConfirmSection from "./weddingConfirmationScreen";
import CandidateService from "../../../services/admin/candidate.service";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { lStorage } from "../../../utils/storage";
import { dateconvert } from "../../../utils/common/dateConvertion";

const WeddingMatch = () => {
  const candidateApi = new CandidateService();
  const profileData = lStorage.get("hfn-profile-me");
  let history = useHistory();
  const [regInfo, setRegInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const Logout = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };
  const Logininfo = () => {
    setLoading(true);
    candidateApi
      .userReginfoApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setRegInfo(response.data.data);
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Your login session has expired please login again");
          Logout();
          setLoading(false);
        } else {
          toast.error("something went wrong");
          setLoading(false);
        }
      });
  };

  useEffect(() => {
    const authVal = lStorage.get("logInfo");
    const todayDat = new Date();
    const abhyasiValidation = profileData.me.user_roles.find(
      (value) => value === "seeker"
    );
    if (3 <= authVal.match_request_declined_count) {
      setLoading(false);
      history.push("/error");
    } else if (
      authVal.wedding_fixed_date &&
      dateconvert(todayDat) > dateconvert(authVal.wedding_fixed_date)
    ) {
      setLoading(false);
      history.push("/error");
    } else if (
      authVal.wedding_fixed_date &&
      dateconvert(authVal.wedding_fixed_date) > dateconvert(todayDat)
    ) {
      setLoading(false);
      history.push("/confirmWedding");
    } else if (abhyasiValidation !== "seeker") {
      Logininfo();
    } else {
      history.push("/error");
    }
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Confirm Wedding | Proposal Portal"}
        HeadDescription={"Confirm Wedding"}
      />
      <section className="bg-white mb-5">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 col-sm-12">
              <Sidebar aboutInfo={regInfo} />
            </div>
            <div className="col-lg-9 col-md-9 col-sm-12 weeding-information">
              <Header />
              <div className="MainContent pt-4 candidate-recom-top">
                <div className="row pt-3 mt-5">
                  <WeddingConfirmSection candidateInfo={regInfo} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default WeddingMatch;
