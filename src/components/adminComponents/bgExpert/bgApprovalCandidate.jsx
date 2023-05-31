import React, { useState, useEffect } from "react";
import calendergrey from "../../../assets/images/calder-line-grey.svg";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaCheckDouble } from "react-icons/fa";
import BgCheckDetails from "./bgCheckDetails";
import { toast } from "react-toastify";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import BgPersonaltab from "./bgPersonalTabs";
import { useLocation } from "react-router-dom";
import { yearconvert } from "../../../utils/common/dateConvertion";
import { lStorage } from "../../../utils/storage";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Loading from "../../shared/common/loading";
import {
  ApiBgStatus1,
  ApinextStatus,
  StatusShow,
} from "../../../utils/common/fileValidation";
import { useCallback } from "react";
import { imageUrl } from "../../../assets/config";

export default function BgApprovalcanditate() {
  const getDocumentData = new DocumentVerificationServices();
  const [bgCandidateList, setBgCandidateList] = useState("");
  const [candidateHistory, setCandidateHistory] = useState("");
  const [allEvaluatorHistory, setAllEvaluatorHistory] = useState("");
  const [loading, setLoading] = useState(false);
  const [key, setKey] = useState("");
  let history = useHistory();
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };

  const location = useLocation();

  const backtoPrevious = useCallback((comment) => {
    backList(comment);
    setKey(comment);
  }, []);
  const backtoNext = useCallback(
    (comment) => {
      backList(comment);
      setKey(comment);
    },
    [key]
  );

  const extendedDatesubmit = (payLoad) => {
    getDocumentData.bgExtendDate(payLoad).then((res) => {
      if (res.data.statusCode === 200) {
        bgList("extend");
        toast.success("Extend date added successfully");
      } else {
        setLoading(false);
        toast.error("something went wrong");
      }
    });
  };
  const bgApprovalDetails = (comment, tab, types) => {
    //const roles = JSON.parse(lStorage.get("admin-roles"));
    const id = location.state && location.state.candidate.candidate_id;
    const payLoad = [
      {
        candidate_id: id,
        evaluator_user_type: key,
        evaluator_name: bgCandidateList.eval_form_data[0].evaluator_name,
        evaluator_comments: comment.comments,
        social_behaviour: comment.socialBehaviour,
        legal_issues: comment.legalBehaviour,
        family_reputation: comment.familyBehaviour,
        admin_update: "0",
      },
    ];
    const adminPayLoad = [
      {
        candidate_id: id,
        evaluator_user_type: "admin",
        evaluator_comments: comment,
        type: types,
      },
    ];
    const payLoadone = [
      {
        candidate_id: id.candidate_id,
      },
    ];
    setLoading(true);
    if (tab === "admin") {
      getDocumentData
        .bgAdminApproval(adminPayLoad)
        .then((res) => {
          if (res.data.statusCode === 200) {
            bgList("submitted");
            setLoading(false);
            toast.success(`${tab} comments added successfully`);
            history.push("/admin/bgChecking");
          } else {
            setLoading(false);
            toast.error("something went wrong");
          }
        })
        .catch((error) => {
          setLoading(false);
        });
    } 
     else {
       getDocumentData
         .bgApprovalDetails(payLoad)
         .then((res) => {
           if (res.data.statusCode === 200) {
             bgList("submitted");
             if (key === "zc") {
               getDocumentData.allEvaluatorComments(payLoadone).then((res) => {
                 // const evalValues = res.data.data.splice(-1);
                 setAllEvaluatorHistory(res.data.data);
               });
             }
             toast.success(`${tab} comments added successfully`);
             setLoading(false);
           } else {
             setLoading(false);
             toast.error("something went wrong");
           }
         })
         .catch((error) => {
           setLoading(false);
         });
     }
  };

  const backList = (type) => {
    const id = location.state && location.state.candidate;
    const payLoad = [
      {
        candidate_id: id.candidate_id,
        evaluator_user_type: type,
      },
    ];
    setLoading(true);
    getDocumentData.bgCandidateDetails(payLoad).then((res) => {
      if (res.data.statusCode === 200) {
        setBgCandidateList(res.data.data);
        getDocumentData.bgCandidatelogDetails(id.candidate_id).then((res) => {
          setCandidateHistory(res.data.data);
        });
        setLoading(false);
      } else {
        setLoading(false);
        toast.error("something went wrong");
      }
    });
  };

  const bgList = async (type) => {
    const id = location.state && location.state.candidate;
    const payLoad = [
      {
        candidate_id: id.candidate_id,
        evaluator_user_type:
          type === "submitted"
            ? ApinextStatus(bgCandidateList.admin_comment)
            : type === "extend"
            ? key
            : ApiBgStatus1(id.admin_comment),
      },
    ];
    const payLoadone = [
      {
        candidate_id: id.candidate_id,
      },
    ];
    if (type !== "submitted" && type !== "extend") {
      setKey(ApiBgStatus1(id.admin_comment));
    }
    if (type === "extend") {
      setKey(key);
    }
    setLoading(true);
    await getDocumentData
      .bgCandidateDetails(payLoad)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBgCandidateList(res.data.data);
          if (type === "submitted") {
            setKey(ApiBgStatus1(res.data.data.admin_comment));
          }
          getDocumentData.bgCandidatelogDetails(id.candidate_id).then((res) => {
            setCandidateHistory(res.data.data);
          });
          getDocumentData.allEvaluatorComments(payLoadone).then((res) => {
            let array = res.data.data;
            array.splice(-1);
            setAllEvaluatorHistory(array);
          });
          setLoading(false);
        } else {
          setLoading(false);
          toast.error("something went wrong");
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
  useEffect(() => {
    bgList();
    window.scrollTo(0, 0);
  }, [location]);
  return (
    <>
      <div className="col-md-8">
        <div className="bg-candidate-wrapper-list">
          <div className="flex-container">
            <div className="verified-user-wrapper">
              <div className="verify-img-bg">
                <img
                  src={`${imageUrl}${
                    bgCandidateList &&
                    bgCandidateList.photoData &&
                    bgCandidateList.photoData[0].candidate_photo_url
                  }`}
                  width="110px"
                  alt="Icon"
                  className="img-fluid"
                />
              </div>
              <div className="bg-name-verify">
                <h4 className="admin-heading-title-h4 pad-20-0">
                  {bgCandidateList && bgCandidateList.name} <span> </span>
                </h4>
                <p className="blue-hfn-id-text">
                  {bgCandidateList && bgCandidateList.hfn_id}
                </p>
                <div>
                  <span>
                    <img src={calendergrey} alt="Icon" className="img-fluid" />
                    <span className="posted-name-text"> Posted on </span>
                    <span className="posted-calender-text">
                      {bgCandidateList.eval_form_data &&
                        bgCandidateList.eval_form_data[0] &&
                        yearconvert(
                          bgCandidateList.eval_form_data[0].created_at
                        )}
                    </span>
                  </span>
                  <span>
                    <img src={calendergrey} alt="Icon" className="img-fluid" />
                    <span className="posted-name-text"> Verified on </span>
                    <span className="posted-calender-text">
                      {bgCandidateList.eval_form_data &&
                        bgCandidateList.eval_form_data[0] &&
                        yearconvert(
                          bgCandidateList.eval_form_data[0].evaluation_date
                        )}
                    </span>
                  </span>
                  <span className="posted-name-text">
                    <StatusShow
                      value={bgCandidateList && bgCandidateList.admin_comment}
                    />{" "}
                    Approval Pending
                  </span>
                </div>
              </div>
            </div>
          </div>
          {/* <h4 className="admin-heading-title-h4 pad-20-0"> Approval</h4> */}
          <Tabs
            defaultActiveKey="prefect"
            id="justify-tab-example"
            className="mb-3 bg-approval-tab"
            justify
            activeKey={key}
          >
            <Tab
              eventKey="prefect"
              title={
                <div className="approval-item-wrapper">
                  <span className="circle-approval-check">
                    <FaCheckDouble className="check-tik" />
                  </span>
                  <span className="approval-name-details"> Prefect </span>
                </div>
              }
            ></Tab>
            <Tab
              eventKey="cc"
              title={
                <div className="approval-item-wrapper">
                  <span className="circle-approval-check">
                    <FaCheckDouble className="check-tik" />
                  </span>
                  <span className="approval-name-details"> CC </span>
                </div>
              }
            ></Tab>
           {/*  <Tab
              eventKey="zc"
              title={
                <div className="approval-item-wrapper">
                  <span className="circle-approval-check">
                    <FaCheckDouble className="check-tik" />
                  </span>
                  <span className="approval-name-details"> ZC </span>
                </div>
              }
            ></Tab>
            <Tab
              eventKey="hr"
              title={
                <div className="approval-item-wrapper">
                  <span className="circle-approval-check">
                    <FaCheckDouble className="check-tik" />
                  </span>
                  <span className="approval-name-details"> HR </span>
                </div>
              }
            ></Tab> */}
            <Tab
              eventKey="admin"
              title={
                <div className="approval-item-wrapper">
                  <span className="circle-approval-check">
                    <FaCheckDouble className="check-tik" />
                  </span>
                  <span className="approval-name-details"> Admin </span>
                </div>
              }
            ></Tab>
          </Tabs>
          {bgCandidateList && bgCandidateList !== "" && (
            <BgCheckDetails
              personalData={bgCandidateList}
              tab={key}
              onSubmit={bgApprovalDetails}
              backTo={backtoPrevious}
              nextTo={backtoNext}
              extendedDatesubmit={extendedDatesubmit}
              allEvaluatorHistory={allEvaluatorHistory}
            />
          )}
        </div>
      </div>
      <div className="col-md-4">
        {loading === false && bgCandidateList !== "" && (
          <BgPersonaltab
            personalData={bgCandidateList}
            candidateHistory={candidateHistory}
          />
        )}
      </div>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
}
