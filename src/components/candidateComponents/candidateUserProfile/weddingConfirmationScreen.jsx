import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import HeartfulnessLogo from "../../../assets/images/heartfulness-logo.png";
import weedingIcon from "../../../assets/images/weeding-Icon.png";
import CongratulationsImage from "../../../assets/images/CongratulationsImg.png";
import CandidateService from "../../../services/admin/candidate.service";
import { imageUrl } from "../../../assets/config";
import { toast } from "react-toastify";
import WeddingDates from "./weddingDates";
import { Modal } from "react-bootstrap";
import Loading from "../../shared/common/loading";

const WeddingConfirmSection = (props) => {
  const [Congratulation, setCongratulation] = useState(false);
  const [ProposalDecline, setProposalDecline] = useState(false);
  const candidateApi = new CandidateService();
  const { candidateInfo } = props && props;

  const [regInfo, setRegInfo] = useState("");
  const [weddingInfo, setWeddingInfo] = useState("");
  const [loading, setLoading] = useState(false);

  function ActionDecline(name, hfnID) {
    setProposalDecline(true);
    // let payLoad;
    // if (candidateRegInfo.gender === "M") {
    //   payLoad = [
    //     {
    //       bg_bride_id: regInfo.candidate_id,
    //       match_status: type === "accept" ? 1 : 0,
    //     },
    //   ];
    // } else {
    //   payLoad = [
    //     {
    //       bg_groom_id: regInfo.bg_match_id,
    //       match_status: type === "accept" ? 1 : 0,
    //     },
    //   ];
    // }
    // candidateApi
    //   .weddingStatus(payLoad)
    //   .then((response) => {
    //     if (
    //       response.data.isError === false ||
    //       response.data.statusCode === "200"
    //     ) {
    //       console.log(response.data.data);
    //       setLoading(false);
    //       toast.success("accepted Successfully");
    //     } else {
    //       setLoading(false);
    //       toast.error("something went wrong");
    //     }
    //   })
    //   .catch((err) => {
    //     setLoading(false);
    //   });
  }

  function ActionConfirm(type) {
    // handleChange(type);
    let payLoad = [
      {
        bg_match_id: regInfo.bg_match_id,
        wedding_status: type === "accept" ? 1 : 0,
      },
    ];
    candidateApi
      .weddingStatus(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          toast.success("Wedding accepted successfully");
          setCongratulation(true);
        } else {
          setLoading(false);
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onProposalDecline = (data) => {
    let payLoad = [
      {
        bg_match_id: regInfo.bg_match_id,
        wedding_status: "0",
        decline_reason: data.comments,
      },
    ];
    candidateApi
      .weddingStatus(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          toast.success("Wedding Rejected Successfully");
          setCongratulation(true);
        } else {
          setLoading(false);
          toast.error("something went wrong");
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const WeddingDetails = () => {
    setLoading(true);
    candidateApi
      .weddingDetails()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setWeddingInfo(response.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const Logininfo = () => {
    setLoading(true);
    candidateApi
      .recommendedMatch()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setRegInfo(response.data.data);
          if( response.data.data.gender=='M' &&response.data.data.bride_wedding_accept_status==1){
            setCongratulation(true);
          }
          if(response.data.data.gender=='F' && response.data.data.groom_wedding_accept_status==1){
            setCongratulation(true);
          }
       
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  useEffect(() => {
    WeddingDetails();
    Logininfo();
  }, []);
  return (
    <>
      {regInfo &&
      regInfo !== "" &&
      regInfo.length !== 0 &&
      regInfo.groom_accept_status !== null &&
      regInfo.bride_accept_status !== null ? (
        <>
          {weddingInfo &&
          weddingInfo !== undefined &&
          weddingInfo.length !== 0 ? (
            <WeddingDates weddingData={weddingInfo} />
          ) : (
            <>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="p-0">
                  <img
                    src={`${imageUrl}${
                      candidateInfo &&
                      candidateInfo.photoData &&
                      candidateInfo.photoData[0].candidate_photo_url
                    }`}
                    alt="RAMYAImg"
                    className="weeding-authImg"
                  />
                  <img
                    src={`${imageUrl}${
                      regInfo &&
                      regInfo.photoData &&
                      regInfo.photoData[0].candidate_photo_url
                    }`}
                    alt="SHIKHAImg"
                    className="weeding-authImg"
                  />
                </div>
              </div>
              <div className="col-lg-8 col-md-8 col-sm-12 text-center">
                <div
                  className={
                    ProposalDecline
                      ? "weedingbox-withBorder py-5 d-none"
                      : "weedingbox-withBorder py-5"
                  }
                >
                  {Congratulation ? (
                    <>
                      <img
                        src={CongratulationsImage}
                        alt="HeartfulnessLogo"
                        className="pt-5 mt-5"
                      />
                      <h5 className="mt-3">Congratulations</h5>
                      <p>
                        {candidateInfo.name} your wedding is
                        <br />
                        confirmed Thanks for choosing
                        <br />
                        Proposal portal
                      </p>
                      <h5 className="mt-3">
                        <b>Best wishes!</b>
                      </h5>
                      <p className="mt-4">From Heartfulness Team</p>
                      <p>&nbsp;</p>
                      <p>&nbsp;</p>
                      <p>
                        Note : Any Queries please contact below email Id :
                        proposal@hartfulness.lrg
                      </p>
                    </>
                  ) : (
                    <>
                      <img
                        src={HeartfulnessLogo}
                        alt="HeartfulnessLogo"
                        className="pt-5 mt-5"
                      />
                      <h5 className="mt-3">CONFIRM WEDDING</h5>
                      <img
                        src={weedingIcon}
                        alt="weedingIcon"
                        className="mt-3"
                      />
                      <div className="row mt-3">
                        <div className="col-lg-12 col-md-8 col-sm-12">
                          <div className="weedingConfrimCol">
                            <div className="weedingCol-Left">
                              <h6>{candidateInfo && candidateInfo.hfn_id}</h6>
                              <h5>
                                Name : {candidateInfo && candidateInfo.name}{" "}
                                <br />
                                Age :{" "}
                                {candidateInfo && candidateInfo.candidate_age}
                              </h5>
                              <p>
                                <b>Contact Details</b>
                                <br />
                                {candidateInfo && candidateInfo.contact_number}
                              </p>
                            </div>
                            <div className="weedingCol-Right">
                              <h6>{regInfo && regInfo.hfn_id}</h6>
                              <h5>
                                Name : {regInfo && regInfo.name} <br />
                                Age : {regInfo && regInfo.candidate_age}
                              </h5>
                              <p>
                                <b>Contact Details</b>
                                <br />
                                {regInfo && regInfo.contact_number}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row mt-5 mb-5">
                        <div className="col-lg-12 col-md-8 col-sm-12">
                          <div className="weedingConfrimCol">
                            <div className="weedingCol-Decline">
                              <button
                                className="Weeding-Decline"
                                onClick={() =>
                                  ActionDecline(
                                    "RAMYA-Decline",
                                    "HFN ID 1234567"
                                  )
                                }
                              >
                                Decline
                              </button>
                            </div>
                            <div className="weedingCol-Right">
                              <button
                                className="Weeding-Confirm"
                                onClick={() => ActionConfirm("accept")}
                              >
                                Confirm
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                <div
                  className={
                    ProposalDecline
                      ? "weedingbox-withBorder py-5"
                      : "weedingbox-withBorder py-5 d-none"
                  }
                >
                  <img
                    src={HeartfulnessLogo}
                    alt="HeartfulnessLogo"
                    className="pt-5 mt-5"
                  />
                  <h5 className="mt-3">PROPOSAL PORTAL</h5>
                  <p>Please let us Know the reason on rejection</p>
                  <form
                    onSubmit={handleSubmit(onProposalDecline)}
                    className="DeliceForm m-4"
                  >
                    <div className="form-group">
                      <label htmlFor="comments">
                        Comments<span className="requiredColor">*</span>
                      </label>
                      <textarea
                        className="form-control Current_Address"
                        name="comments"
                        {...register("comments", { required: true })}
                      />
                      <span className="error_validation ml-3">
                        {errors.comments?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                    <div className="text-left ml-5">
                      <button
                        type="submit"
                        className="mt-3 ml-5 w-30 recommended-Confirm"
                      >
                        Submit
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </>
          )}
        </>
      ) : (
      <p>No Matchings found</p>
      )}

      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};

export default WeddingConfirmSection;
