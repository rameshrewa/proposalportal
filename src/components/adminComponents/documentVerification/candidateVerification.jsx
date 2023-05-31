import React, { useState, useEffect, useCallback } from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import folderopenline from "../../../assets/images/folder-open-line.svg";
import imageline from "../../../assets/images/image-line.svg";
import calenderline from "../../../assets/images/calender-line2.svg";
import { FaSistrix } from "react-icons/fa";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { useHistory } from "react-router-dom";
import moment from "moment";
import config from "../../../assets/config";
import { ProfileStatus } from "../../../utils/common/profileStatus";
import Loading from "../../shared/common/loading";
import { Modal } from "react-bootstrap";
import MatchingPagination from "../../shared/matchingPagination";
import { lStorage } from "../../../utils/storage";
import { toast } from "react-toastify";
const Candidateverification = () => {
  const getDocumentData = new DocumentVerificationServices();
  const [offsetList, setOffsetList] = useState(10);
  const [countList, setCountList] = useState("");
  const [loading, setLoading] = useState(false);
  const imageBaseUrl = config.imageUrl;
  let history = useHistory();
  const [getCandidateVerification, setGetCandidateVerification] = useState([]);
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };
  const paginateData = useCallback((p, sValue) => {
    setLoading(true);
    const searchKey = {
      page: `${p}`,
      offset: offsetList,
    };
    getDocumentData.candidateVerificationGetApi(searchKey).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setGetCandidateVerification(response?.data);
        const total = response.data.count;
        const countD = Math.ceil(total / 10);
        setCountList(countD);
        setLoading(false);
      }
    });
  }, []);
  const getCandidateVerificationApi = useCallback(() => {
    let payLoad = {
      page: 1,
      offset: offsetList,
    };
    getDocumentData
      .candidateVerificationGetApi(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setGetCandidateVerification(response?.data);
          const total = response.data.count;
          const countD = Math.ceil(total / 10);
          setCountList(countD);
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
  }, [getDocumentData]);
  const searchCandidate = useCallback(
    (event) => {
      let payLoad = [
        {
          searchkey: event.target.value,
          offset: offsetList,
          page: 1,
        },
      ];
      getDocumentData.candidateSearchByKey(payLoad).then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setGetCandidateVerification(response?.data);
          const total = response.data.count;
          const countD = Math.ceil(total / 10);
          setCountList(countD);
          setLoading(false);
        }
      });
    },
    [getDocumentData]
  );
  useEffect(() => {
    getCandidateVerificationApi();
  }, []);
  const getOneCandidate = (candidate_id) => {
    history.push("/admin/documentattchments", { candidate_id: candidate_id });
  };
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Candidate Verification | Proposal Portal"}
        HeadDescription={"Admin Candidate Verification"}
      />

      {/* <AdminHeader /> */}

      {/* <Adminlayout /> */}

      <div className="candidate-verication-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                <div className="col-sm-8">
                  <h4 className="admin-heading-title-h4 pad-20-0">
                    Candidate Verification
                  </h4>
                </div>
                <div className="col-sm-4 dis-search-item">
                  <div class="form-group has-search wid248 place-hold-bottom">
                    <span class="form-control-feedback">
                      <FaSistrix />
                    </span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Search"
                      onChange={searchCandidate}
                    />
                  </div>
                  {/* <img src={Pathmenuicon} alt="Icon" className="img-fluid" />
                  <img src={Listcheckicon} alt="Icon" className="img-fluid" /> */}
                </div>
              </div>
              <div className="flex-container">
                {getCandidateVerification &&
                  getCandidateVerification.data &&
                  getCandidateVerification.data.map(
                    (verificationItems, index) => {
                      const {
                        candidate_id,
                        name,
                        abhyasi_id,
                        created_at,
                        photo_count,
                        doc_count,
                        photo_url,
                      } = verificationItems;
                      return (
                        <div
                          className="verification-box-user"
                          type="button"
                          key={index}
                          onClick={() => {
                            getOneCandidate(`${candidate_id}`);
                          }}
                        >
                          <div className="candidate-verification-img">
                            <img
                              style={{ height: "117px" }}
                              src={`${imageBaseUrl}${photo_url}`}
                              alt="Icon"
                              className="img-fluid"
                            />
                          </div>
                          <div className="verification-name-list">
                            <p className="verfication-name-text">{name}</p>
                            <div className="verfication-id-text">
                              {abhyasi_id}
                            </div>
                            <span>
                              <img
                                src={folderopenline}
                                alt="Icon"
                                className="img-fluid"
                              />
                              {doc_count}
                            </span>
                            <span>
                              <img
                                src={imageline}
                                alt="Icon"
                                className="img-fluid"
                              />
                              {photo_count}
                            </span>
                            <div>
                              <span>
                                <img
                                  src={calenderline}
                                  alt="Icon"
                                  className="img-fluid"
                                  style={{ cursor: "pointer" }}
                                />
                              </span>
                              {/* {created_at} */}
                              {moment(created_at).format("L")}
                            </div>
                            <p className="cand-status">
                              {/* {verificationItems.profile_sub_status === 5 ? "" : ""} */}
                              <ProfileStatus
                                status={verificationItems.profile_sub_status}
                              />
                            </p>
                          </div>
                        </div>
                      );
                    }
                  )}
                {getCandidateVerification &&
                getCandidateVerification.data &&
                getCandidateVerification.data.length === 0 ? (
                  <p>No Records found</p>
                ) : (
                  ""
                )}
              </div>
              {getCandidateVerification &&
                getCandidateVerification.count !== 0 &&
                getCandidateVerification.count > 10 && (
                  <MatchingPagination
                    countlist={countList}
                    paginateData={paginateData}
                  />
                )}
            </div>
          </div>
        </div>

        {loading === true && (
          <Modal id="loading" show={loading}>
            <Loading />
          </Modal>
        )}
      </div>
    </>
  );
};

export default Candidateverification;
