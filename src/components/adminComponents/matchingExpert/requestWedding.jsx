import React, { useState, useEffect } from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import professionalicon from "../../../assets/images/professional-icon.svg";
import handsymbolicon from "../../../assets/images/hand-symbol-icon.png";
import ConfirmWeddingPopup from "./confirmWeddingPopup";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import config from "../../../assets/config";
import { AdminProfileStatus } from "../../../utils/common/profileStatus";
import { toast } from "react-toastify";
import { lStorage } from "../../../utils/storage";
import { useHistory } from "react-router-dom";
import { Modal } from "react-bootstrap";
import Loading from "../../shared/common/loading";
// import { useHistory } from "react-router-dom";

export default function RequestWedding() {
  const getDocumentData = new DocumentVerificationServices();
  let history = useHistory();
  const imageBaseUrl = config.imageUrl;
  const [confirmWedding, setConfirmWedding] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [matchId, setMatchId] = useState("");
  const [actionType, setActionType] = useState("");
  const [loading, setLoading] = useState(false);
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };
  const getConfirmWeddingData = () => {
    getDocumentData
      .candidateMatchingExpertConfirmWeddingApi()
      .then((res) => {
        if (res.data.isError === false || res.data.statusCode === "200") {
          setConfirmWedding(res?.data?.data);
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

  const closeRequest = () => {
    setModalShow(false);
    getConfirmWeddingData();
  };
  useEffect(() => {
    getConfirmWeddingData();
  }, []);

  // candidateMatchingExpertConfirmWeddingPopupApi

  const confirmWeddingPopupData = (data, type) => {
    setModalShow(true);
    setMatchId(data);
    setActionType(type);
  };
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Request For Wedding | Proposal Portal"}
        HeadDescription={"Admin Request For Wedding"}
      />

      <div className="Requestwedding-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <h4 className="admin-heading-title-h4 pad-20-0">
                Request for wedding
              </h4>
              <div className="flex-container mt-4">
                {confirmWedding?.data?.map((items, index) => {
                  const {
                    bg_match_id,
                    groom_name,
                    groom_age,
                    groom_religion,
                    groom_profession,
                    groom_photo,
                    bride_wedding_accept_status,
                    groom_wedding_accept_status,
                    bride_name,
                    bride_age,
                    bride_religion,
                    bride_profession,
                    bride_photo,
                  } = items;
                  return (
                    <div
                      key={index}
                      className="reuest-box-wrapper-groom request-card-wrapper mb-4"
                    >
                      <div>
                        <div className="bride_photo">
                          <img
                            src={`${imageBaseUrl}${groom_photo}`}
                            alt="Icon"
                            className="img-fluid bride_photo"
                          />
                        </div>
                        <div className="bride_photo">
                          <img
                            src={`${imageBaseUrl}${bride_photo}`}
                            alt="Icon"
                            className="img-fluid bride_photo"
                          />
                        </div>
                      </div>
                      <div className="bride-rquest-details">
                        <p className="verfication-name-text">
                          {groom_name} &nbsp;
                          <span className="accepted-text">
                            <AdminProfileStatus
                              value={groom_wedding_accept_status}
                            />
                          </span>
                        </p>
                        <div>
                          <span>
                            <span className="bride-age-num religion-gap">
                              Age :
                            </span>
                            <span className="bride-age-num religion-gap">
                              {groom_age}
                            </span>
                          </span>
                          <span>
                            <span className="bride-age-num religion-gap">
                              Gender :
                            </span>
                            <span className="bride-age-num religion-gap">
                              Male
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className="bride-resonse-text religion-gap">
                            <span className="mg-right10">
                              <img
                                src={handsymbolicon}
                                alt="Icon"
                                className="img-fluid bride-gallery-icon"
                              />
                            </span>
                            {groom_religion}
                          </span>
                          <span className="bride-resonse-text">
                            <span className="mg-right10">
                              <img
                                src={professionalicon}
                                alt="Icon"
                                className="img-fluid bride-gallery-icon"
                              />
                            </span>
                            {groom_profession}
                          </span>
                        </div>
                      </div>
                      <span className="vertical-grey-line"> </span>
                      <div className="bride-rquest-details">
                        <p className="verfication-name-text">
                          {bride_name}&nbsp;
                          <span className="accepted-text">
                            <AdminProfileStatus
                              value={bride_wedding_accept_status}
                            />
                          </span>
                        </p>
                        <div>
                          <span>
                            <span className="bride-age-num religion-gap">
                              Age :
                            </span>
                            <span className="bride-age-num religion-gap">
                              {bride_age}
                            </span>
                          </span>
                          <span>
                            <span className="bride-age-num religion-gap">
                              Gender :
                            </span>
                            <span className="bride-age-num religion-gap">
                              Female
                            </span>
                          </span>
                        </div>
                        <div>
                          <span className="bride-resonse-text religion-gap">
                            <span className="mg-right10">
                              <img
                                src={handsymbolicon}
                                alt="Icon"
                                className="img-fluid bride-gallery-icon"
                              />
                            </span>
                            {bride_religion}
                          </span>
                          <span className="bride-resonse-text">
                            <span className="mg-right10">
                              <img
                                src={professionalicon}
                                alt="Icon"
                                className="img-fluid bride-gallery-icon"
                              />
                            </span>
                            {bride_profession}
                          </span>
                        </div>
                        {/* <div className="mt-4">
                            <h6>Wedding Location : - {items.bg_wedding_location}</h6>
                            <h6>Wedding Time : - {items.bg_wedding_time}</h6>
                            <h6>Wedding Date : - {items.bg_wedding_date}</h6>
                            </div> */}
                      </div>
                      <span className="vertical-grey-line"> </span>
                      {items?.bride_wedding_accept_status === "1" &&
                        items?.groom_wedding_accept_status === "1" && (
                          <div className="bride-rquest-details">
                            {items?.bg_wedding_time !== null &&
                            items?.bg_wedding_date !== null &&
                            items?.bg_wedding_location !== null ? (
                              <div className="mt-4">
                                <p className="verfication-name-text">
                                  Wedding location :
                                  <span className="first-caps">
                                    {" "}
                                    {items.bg_wedding_location}
                                  </span>
                                </p>
                                <p className="verfication-name-text">
                                  Wedding time : {items.bg_wedding_time}
                                </p>
                                <p className="verfication-name-text">
                                  Wedding date : {items.bg_wedding_date}
                                </p>

                                <div
                                  className="text-center"
                                  style={{ marginBottom: "20px" }}
                                >
                                  <button
                                    className="btn btn-theme-darkblue mg-top-wedding-btn"
                                    type="button"
                                    onClick={() => {
                                      confirmWeddingPopupData(items, "edit");
                                    }}
                                  >
                                    Edit Wedding
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div
                                className="text-center"
                                style={{ marginBottom: "20px" }}
                              >
                                <button
                                  className="btn btn-theme-darkblue mg-top-wedding-btn"
                                  type="button"
                                  onClick={() => {
                                    confirmWeddingPopupData(bg_match_id, "add");
                                  }}
                                >
                                  Confirm Wedding
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                    </div>
                  );
                })}
                {confirmWedding.data && confirmWedding.data.length === 0
                  ? "No data found"
                  : ""}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ConfirmWeddingPopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        confirmWedding={confirmWedding}
        setModalShow={closeRequest}
        matchId={matchId}
        type={actionType}
      />
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
}
