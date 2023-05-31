import React, { useEffect, useState } from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import handsymbolicon from "../../../assets/images/hand-symbol-icon.png";
import professionalicon from "../../../assets/images/professional-icon.svg";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import config from "../../../assets/config";
import { AdminProfileStatus } from "../../../utils/common/profileStatus";
import { useCallback } from "react";
import { toast } from "react-toastify";
import { lStorage } from "../../../utils/storage";
import { useHistory } from "react-router-dom";

export default function MatchStatusPage() {
  const getDocumentData = new DocumentVerificationServices();
  let history = useHistory();
  const imageBaseUrl = config.imageUrl;
  const [matchStatus, setMatchStatus] = useState([]);
  const [countlist, setCountList] = useState();
  const [loading, setLoading] = useState(false);
  const [offsetList, setOffsetList] = useState(10);
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };
  const getMatchStatusData = () => {
    let payLoad = {
      page: 1,
      offset: offsetList,
    };
    getDocumentData
      .candidateMatchingExpertMatchStatusApi(payLoad)
      .then((res) => {
        if (res.data.isError === false || res.data.statusCode === "200") {
          setMatchStatus(res?.data?.data);
          const total = res?.data?.data?.total;
          //const perPage = res?.data?.data?.per_page;
          const countD = Math.ceil(total / 10);
          setCountList(countD);
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
  };
  const paginateData = useCallback((p) => {
    setLoading(true);
    const searchKey = {
      page: `${p}`,
      offset: offsetList,
    };
    getDocumentData
      .candidateMatchingExpertMatchStatusApi(searchKey)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setMatchStatus(response?.data?.data);
          // setCountUsers(response);
          const total = response?.data?.data?.total;
          //const perPage = response?.data?.data?.per_page;
          const countD = Math.ceil(total / 10);
          setCountList(countD);
          setLoading(false);
        }
      });
  }, []);
  useEffect(() => {
    getMatchStatusData();
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Matching Status page | Proposal Portal"}
        HeadDescription={"Admin Matching Status page"}
      />
      <div className="matchstatuspage-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper mb-4">
              <h4 className="admin-heading-title-h4 pad-20-0">
                Acceptance pending
              </h4>
              <div className="row pb-4">
                {matchStatus?.data?.map((items, index) => {
                  const {
                    bride_name,
                    bride_age,
                    bride_religion,
                    bride_profession,
                    bride_photo,
                    bride_accept_status,
                    groom_name,
                    groom_accept_status,
                    groom_age,
                    groom_religion,
                    groom_profession,
                    groom_photo,
                  } = items;
                  return (
                    <div key={index} className="col-lg-4 col-sm-12 col-12">
                      <div className="flex-containers mt-4">
                        <div className="verification-box-users awaiting-expert-box accept-pending-boxs">
                          <div className="img-matchstatus">
                            <img
                              src={`${imageBaseUrl}${bride_photo}`}
                              alt="Icon"
                              className="img-fluid img-matchstatus"
                            />
                          </div>
                          <div className="verification-name-list accept-pending-wrapper-box">
                            <h5 className="verfication-name-text">
                              {bride_name}
                              <span className="accepted-text">
                                <AdminProfileStatus
                                  value={bride_accept_status}
                                />
                              </span>
                            </h5>
                            <p>
                              <span className="bride-age-num">
                                Age :
                                <span className="bride-age-num">
                                  &nbsp;{bride_age}
                                </span>
                              </span>
                              <span className="bride-age-num">
                                &nbsp; Gender :
                                <span className="bride-age-num"> Female</span>
                              </span>
                            </p>
                            <div className="bride-response-box-wrapper">
                              <p className="bride-resonse-text religion-gap">
                                <span className="mg-right10">
                                  <img
                                    src={handsymbolicon}
                                    alt="Icon"
                                    className="img-fluid bride-gallery-icon mr-1"
                                  />
                                </span>
                                {bride_religion}
                              </p>
                              <p className="bride-resonse-text">
                                <span className="mg-right10">
                                  <img
                                    src={professionalicon}
                                    alt="Icon"
                                    className="img-fluid bride-gallery-icon mr-1"
                                  />
                                </span>
                                {bride_profession}
                              </p>
                            </div>
                          </div>
                        </div>
                        <div className="verification-box-users awaiting-expert-box accept-pending-boxs">
                          <div className="img-matchstatus">
                            <img
                              src={`${imageBaseUrl}${groom_photo}`}
                              alt="Icon"
                              className="img-fluid img-matchstatus"
                            />
                          </div>
                          <div className="verification-name-list accept-pending-wrapper-box">
                            <h5 className="verfication-name-text">
                              {groom_name}
                              <span className="accepted-text">
                                <AdminProfileStatus
                                  value={groom_accept_status}
                                />
                              </span>
                            </h5>
                            <p>
                              <span className="bride-age-num">
                                Age :
                                <span className="bride-age-num">
                                  &nbsp;{groom_age}
                                </span>
                              </span>
                              <span className="bride-age-num">
                                &nbsp; Gender :
                                <span className="bride-age-num"> Male</span>
                              </span>
                            </p>
                            <div className="bride-response-box-wrapper">
                              <p className="bride-resonse-text religion-gap">
                                <span className="mg-right10">
                                  <img
                                    src={handsymbolicon}
                                    alt="Icon"
                                    className="img-fluid bride-gallery-icon mr-1"
                                  />
                                </span>
                                {groom_religion}
                              </p>
                              <p className="bride-resonse-text">
                                <span className="mg-right10">
                                  <img
                                    src={professionalicon}
                                    alt="Icon"
                                    className="img-fluid bride-gallery-icon mr-1"
                                  />
                                </span>
                                {groom_profession}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
                {matchStatus?.length === 0 ? "No records found" : ""}
              </div>
              {/* <MatchingPagination
                countlist={countlist}
                setSearchUsersData={setMatchStatus}
                paginateData={paginateData}
                searchUsersData={matchStatus}
              /> */}
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
