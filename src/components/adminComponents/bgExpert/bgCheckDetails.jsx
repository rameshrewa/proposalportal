import React, { useState, useRef } from "react";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { yearconvert } from "../../../utils/common/dateConvertion";
import { BgStatusBack } from "../../../utils/common/fileValidation";
import ExtendDate from "./extendDate";

const Accordion = ({ title, children }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <div className="accordion-wrapper">
      <div
        className={`accordion-title ${isOpen ? "open" : ""}`}
        onClick={() => setOpen(!isOpen)}
      >
        {title} Feedback
      </div>
      <div className={`accordion-item ${!isOpen ? "collapsed" : ""}`}>
        <div className="accordion-content">{children}</div>
      </div>
    </div>
  );
};

export default function BgCheckDetails(props) {
  const profileDetails = props && props.personalData;
  const imageInputRef = useRef();
  const familyInput = useRef();
  const socialInputRef = useRef();
  const legalInputRef = useRef();
  const [extendDate, setExtendDate] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const [commentError, setCommentError] = useState(false);
  const [familyError, setFamilyError] = useState(false);
  const [commentEnable, setCommentEnable] = useState(false);
  const [familyBehaviour, setFamilyBehaviour] = useState("");
  const [legalBehaviour, setLegalBehaviour] = useState("");
  const [legalError, setLegalError] = useState(false);
  const [socialBehaviour, setSocialBehaviour] = useState("");
  const [socialError, setSocialError] = useState(false);
  const status =
    profileDetails && profileDetails.admin_comment === "Reviewed by Prefect"
      ? ["cc_name", "cc_email", "cc_contact", "cc"]
      : profileDetails && profileDetails.admin_comment === "Reviewed by cc"
      ? ["hr_name", "hr_email_id", "hr_contact", "hr"]
      : ["preceptor_name", "preceptor_email", "preceptor_contact", "prefect"];
  const dateExtend = () => {
    setExtendDate(true);
  };
  const handleClose = () => {
    setExtendDate(false);
  };
  const extendedDate = (data) => {
    props.extendedDatesubmit(data);
    setExtendDate(false);
  };
  const handleChange = (event) => {
    if (event !== "") {
      setCommentValue(event);
      setCommentError(false);
    } else {
      setCommentError(true);
    }
  };
  const handlefamily = (event) => {
    if (event !== "") {
      setFamilyBehaviour(event);
      setFamilyError(false);
    } else {
      setFamilyError(true);
    }
  };
  const handleLegal = (event) => {
    if (event !== "") {
      setLegalBehaviour(event);
      setLegalError(false);
    } else {
      setLegalError(true);
    }
  };
  const handleSocial = (event) => {
    if (event !== "") {
      setSocialBehaviour(event);
      setSocialError(false);
    } else {
      setSocialError(true);
    }
  };

  const submitDetails = () => {
    const comments = commentValue;
    if (props.tab !== "admin") {
      if (
        commentValue !== "" &&
        socialBehaviour !== "" &&
        legalBehaviour !== "" &&
        familyBehaviour !== ""
      ) {
        setCommentValue("");
        setFamilyBehaviour("");
        setLegalBehaviour("");
        setSocialBehaviour("");
        let payloadData = {
          comments,
          legalBehaviour,
          familyBehaviour,
          socialBehaviour,
        };
        props.onSubmit(payloadData, props.tab, "Approve");
        imageInputRef.current.value = "";
        familyInput.current.value = "";
        socialInputRef.current.value = "";
        legalInputRef.current.value = "";
      } else {
        return commentValue === ""
          ? setCommentError(true)
          : socialBehaviour === ""
          ? setSocialError(true)
          : legalBehaviour === ""
          ? setLegalError(true)
          : familyBehaviour === ""
          ? setFamilyError(true)
          : false;
      }
    } else {
      if (commentValue !== "") {
        setCommentValue("");
        props.onSubmit(comments, props.tab, "Approve");
        imageInputRef.current.value = "";
      } else {
        setCommentError(true);
      }
    }
  };
  const denyDetails = () => {
    const comments = commentValue;
    if (commentValue !== "") {
      setCommentValue("");
      props.onSubmit(comments, props.tab, "decline");
    } else {
      setCommentError(true);
    }
  };
  const backButton = () => {
    const tabs =
      props &&  props.tab === "cc"
        ? "prefect"
        : props.tab === "admin"
        ? "cc"
        : "admin";
    props.backTo(tabs);
    setCommentEnable(true);
  };
  const frontButton = () => {
    const tabs =
      props && props.tab === "prefect"
        ? "cc"
        : props.tab === "cc"
        ? "admin"
        : "admin";
    props.nextTo(tabs);
    if (status[3] == props.tab) {
      setCommentEnable(false);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div>
        {props && props.tab !== "admin" && (
          <h4 className="admin-heading-title-h4 pad-20-0">
            <BgStatusBack value={props && props.tab} /> &nbsp;Detail{" "}
          </h4>
        )}
        {props &&
        props.tab !== "admin" &&
        profileDetails.admin_comment !== "admin_approval_pending" ? (
          <div className="flex-container">
            {/* <div className="details-name-wrapper">
              <h6 className="details-required-text">Name</h6>
              <p className="details-answer-text">
                {profileDetails &&
                  profileDetails.eval_form_data[0] &&
                  profileDetails.eval_form_data[0].evaluator_name}
              </p>
            </div> */}
            <div className="details-name-wrapper">
              <h6 className="details-required-text">Requested date</h6>
              <p className="details-answer-text">
                {profileDetails.eval_form_data[0] &&
                  yearconvert(profileDetails.eval_form_data[0].created_at)}
              </p>
            </div>
            {profileDetails.eval_form_data[0] &&
            profileDetails.eval_form_data[0].evaluation_date === null ? (
              <div className="details-name-wrapper">
                <h6 className="details-required-text">Due date</h6>
                <p className="details-answer-text">
                  {profileDetails.eval_form_data[0] &&
                    yearconvert(
                      profileDetails.eval_form_data[0].evaluation_duedate
                    )}
                  <span
                    className="extend-date-text-cursor"
                    onClick={dateExtend}
                  >
                    Extend date
                  </span>
                </p>
              </div>
            ) : (
              <div className="details-name-wrapper">
                <h6 className="details-required-text">Submitted date</h6>
                <p className="details-answer-text">
                  {profileDetails.eval_form_data[0] &&
                    yearconvert(
                      profileDetails.eval_form_data[0].evaluation_date
                    )}
                </p>
              </div>
            )}
          </div>
        ) : props.tab !== "admin" &&
          profileDetails.admin_comment === "admin_approval_pending" ? (
          <div className="flex-container">
            {/*<div className="details-name-wrapper">
              <h6 className="details-required-text">Name</h6>
              <p className="details-answer-text">
                {profileDetails &&
                  profileDetails.eval_form_data[0] &&
                  profileDetails.eval_form_data[0].evaluator_name}
              </p>
                </div>*/}
            <div className="details-name-wrapper">
              <h6 className="details-required-text">Requested date</h6>
              <p className="details-answer-text">
                {profileDetails.eval_form_data[0] &&
                  yearconvert(profileDetails.eval_form_data[0].created_at)}
              </p>
            </div>
            <div className="details-name-wrapper">
              <h6 className="details-required-text">Submitted date</h6>
              <p className="details-answer-text">
                {profileDetails.eval_form_data[0] &&
                  yearconvert(profileDetails.eval_form_data[0].evaluation_date)}
              </p>
            </div>
          </div>
        ) : (
          <>
            {props && props.tab === "admin" ? (
              <>
                <div className="wrapper">
                  {props.allEvaluatorHistory &&
                    props.allEvaluatorHistory.map((item, index) => {
                      return (
                        <Accordion
                          title={
                            <BgStatusBack value={item.evaluator_user_type} />
                          }
                        >
                          <div className="flex-container">
                           {/* <div className="details-name-wrapper-accord">
                              <h6 className="details-required-text">Name</h6>
                              <p className="details-answer-text">
                                {item && item && item.evaluator_name}
                              </p>
                            </div>
                        */}
                            <div className="details-name-wrapper">
                              <h6 className="details-required-text">
                                Requested date
                              </h6>
                              <p className="details-answer-text">
                                {profileDetails.eval_form_data[0] &&
                                  yearconvert(
                                    profileDetails.eval_form_data[0].created_at
                                  )}
                              </p>
                            </div>
                            <div className="details-name-wrapper">
                              <h6 className="details-required-text">
                                Submitted date
                              </h6>
                              <p className="details-answer-text">
                                {item && yearconvert(item.evaluation_date)}
                              </p>
                            </div>
                          </div>
                          <div>
                            <h4 className="admin-heading-title-h4">Comments</h4>
                            <p>{item.evaluator_comments}</p>
                            <h4 className="admin-heading-title-h4">
                              Family Reputation
                            </h4>
                            <p>{item.family_reputation}</p>
                            <h4 className="admin-heading-title-h4">
                              Legal Issues
                            </h4>
                            <p>{item.legal_issues}</p>
                            <h4 className="admin-heading-title-h4">
                              Social Behaviour
                            </h4>
                            <p>{item.social_behaviour}</p>
                          </div>
                        </Accordion>
                      );
                    })}
                </div>
              </>
            ) : null}
          </>
        )}
        {profileDetails.comments !== null && profileDetails.comments !== "" ? (
          <>
            <h4 className="admin-heading-title-h4">Comments</h4>
            <p>{profileDetails.comments}</p>
            <h3 className="admin-heading-title-h4">Family Reputation</h3>
            <p>
              {profileDetails.eval_form_data[0] &&
                profileDetails.eval_form_data[0].family_reputation}
            </p>
            <h3 className="admin-heading-title-h4">Legal Issues</h3>
            <p>
              {profileDetails.eval_form_data[0] &&
                profileDetails.eval_form_data[0].legal_issues}
            </p>
            <h3 className="admin-heading-title-h4">Social Behaviour</h3>
            <p>
              {profileDetails.eval_form_data[0] &&
                profileDetails.eval_form_data[0].social_behaviour}
            </p>
          </>
        ) : (
          <form className="bg-approval-comments" id="admin-comment">
            {props.tab !== "admin" && (
              <>
                <div className="form-group">
                  <label htmlFor="comments">
                    Social Behaviour<span className="requiredColor">*</span>
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => handleSocial(e.target.value)}
                    ref={socialInputRef}
                  ></textarea>
                </div>
                {socialError && socialError === true && (
                  <p style={{ color: "red" }}>Social Behaviour are required</p>
                )}
                <div className="form-group">
                  <label htmlFor="comments">
                    Legal Issues<span className="requiredColor">*</span>{" "}
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => handleLegal(e.target.value)}
                    ref={legalInputRef}
                  ></textarea>
                </div>
                {legalError && legalError === true && (
                  <p style={{ color: "red" }}>Legal Issues are required</p>
                )}
                <div className="form-group">
                  <label htmlFor="comments">
                   Family Reputation<span className="requiredColor">*</span>
                  </label>

                  <textarea
                    className="form-control"
                    id="exampleFormControlTextarea1"
                    rows="3"
                    onChange={(e) => handlefamily(e.target.value)}
                    ref={familyInput}
                  ></textarea>
                </div>
                {familyError && familyError === true && (
                  <p style={{ color: "red" }}>Family Reputation are required</p>
                )}
              </>
            )}
            <div className="form-group">
              <label htmlFor="comments">
                Additional Comments<span className="requiredColor">*</span>
              </label>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                rows="3"
                onChange={(e) => handleChange(e.target.value)}
                ref={imageInputRef}
              ></textarea>
            </div>
            {commentError && commentError === true && (
              <p style={{ color: "red" }}>Comments are required</p>
            )}
          </form>
        )}
        <div className="mg-top-mobile">
          {props && props.tab !== "prefect" && (
            <button
              type="button"
              className="btn admin-prev-btn pull-left"
              onClick={backButton}
            >
              Previous
            </button>
          )}
          &nbsp;&nbsp;
          {profileDetails.comments !== null && profileDetails.comments !== "" && (
            <button
              type="button"
              className="btn admin-prev-btn pull-left"
              onClick={frontButton}
            >
              Next
            </button>
          )}
          {profileDetails.comments === null ||
          profileDetails.comments === "" ? (
            <>
              <button
                type="button"
                className="btn admin-btn-dark-blue float-rg"
                onClick={submitDetails}
              >
                {props.tab === "admin" ? "Approve" : "Proceed"}
              </button>
              {props.tab === "admin" && (
                <button
                  type="button"
                  className="btn admin-btn-dark-blue float-rg"
                  onClick={denyDetails}
                >
                  Decline
                </button>
              )}
            </>
          ) : null}
          <br />
          <br />
        </div>

        {extendDate === true && (
          <ExtendDate
            propsData={props.personalData}
            tab={props.tab}
            extendedDate={extendedDate}
            handleClose={handleClose}
          />
        )}
      </div>
    </>
  );
}
