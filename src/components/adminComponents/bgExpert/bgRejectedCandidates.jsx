import React, { useEffect, useCallback } from "react"; //{ useState, useEffect, useRef, useCallback }
//import AdminHeader from "./adminHeader";
import SeoHead from "../../../layout/Seo/seoBlock";
// import thumbnailverificationpic from "../../../assets/images/thumbnail-verification-pic.png";
// import folderopenline from "../../../assets/images/folder-open-line.svg";
// import imageline from "../../../assets/images/image-line.svg";
import calenderline from "../../../assets/images/calender-line2.svg";
//import Adminlayout from "../../adminlayout/inner";
import { FaSistrix } from "react-icons/fa";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { useHistory } from "react-router-dom";
//import Pagination from "react-bootstrap/Pagination";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import Form from "react-bootstrap/Form";
import wifipicicon from "../../../assets/images/wifi-pic-icon.svg";
import BgExpertList from "./bgExpertList";
import { useState } from "react";
import { toast } from "react-toastify";
import { imageUrl } from "../../../assets/config";
import { yearconvert } from "../../../utils/common/dateConvertion";
import { StatusShow } from "../../../utils/common/fileValidation";
import MatchingPagination from "../../shared/matchingPagination";
import { Modal } from "react-bootstrap";
import Loading from "../../shared/common/loading";
import { lStorage } from "../../../utils/storage";
const BgRejectedCandidate = () => {
  const options = [
    {
      label: "Prefector Approval Pending",
      value: "prefector_approval_pending",
    },
    {
      label: "CC Approval Pending",
      value: "cc_approval_pending",
    },
    {
      label: "ZC Approval Pending",
      value: "zc_approval_pending",
    },
    {
      label: "HR Approval Pending",
      value: "hr_approval_pending",
    },
    {
      label: "Admin Approval Pending",
      value: "admin_approval_pending",
    },
  ];
  const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
  const [selectedVal, setSelectedVal] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  let history = useHistory();
  const getDocumentData = new DocumentVerificationServices();
  const [bgCandidateList, setBgCandidateList] = useState("");
  const [loading, setLoading] = useState(false);
  const [offsetList, setOffsetList] = useState(10);
  const [countList, setCountList] = useState("");
  const [filter, setFilter] = useState("");

  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };

  const submitFilter = () => {
    bgList();
  };

  const handleCheckbox = (e, s) => {
    let selectedCheckbo = [...selectedCheckboxes];
    let selectedCh = [...selectedVal];
    if (e.target.checked) {
      selectedCheckbo.push(s);
      selectedCh.push(s.value);
    } else {
      const index = selectedCheckbo.findIndex((ch) => ch.label === s.label);
      const indexes = selectedCh.findIndex((ch) => ch === s);
      selectedCheckbo.splice(index, 1);
      selectedCh.splice(indexes, 1);
    }
    setSelectedCheckboxes(selectedCheckbo);
    setSelectedVal(selectedCh);
  };
  const dateSelect = (event) => {
    setSelectedDate(event.target.value);
  };

  const userDetails = (data) => {
    history.push("/admin/bgapprovaldetails", { candidate: data });
  };
  const paginateData = useCallback((p, sValue) => {
    setLoading(true);
    const searchKey = {
      page: `${p}`,
      offset: offsetList,
      dueDate: selectedDate,
      status: "bg_rejected",
    };
    getDocumentData.docApprovedCandidateList(searchKey).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setBgCandidateList(response.data);
        const total = response.data.total;
        const perPage = response.data.per_page;
        const countD = Math.ceil(total / 10);
        setCountList(countD);
        setLoading(false);
      }
    });
  }, []);
  const bgList = () => {
    setLoading(true);
    let payLoad = {
      page: 1,
      offset: offsetList,
      dueDate: selectedDate,
    };
    getDocumentData
      .bgRejectedCandidates("bg_rejected", payLoad)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBgCandidateList(res.data);
          const total = res.data.total;
          const perPage = res.data.per_page;
          const countD = Math.ceil(total / 10);
          setCountList(countD);
          setLoading(false);
        } else {
          toast.error("something went wrong");
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
  };
  useEffect(() => {
    bgList();
  }, [filter]);
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Candidate Verification | Proposal Portal"}
        HeadDescription={"Admin Candidate Verification"}
      />

      <div className="candidate-verication-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                <div className="col-sm-7">
                  <h4 className="admin-heading-title-h4 pad-20-0">
                    Document Rejected candidates
                  </h4>
                </div>
                <div className="col-sm-5 dis-search-item">
                  <div class="form-group has-search wid248 place-hold-bottom">
                    <span class="form-control-feedback">
                      <FaSistrix />
                    </span>

                    <input
                      type="date"
                      class="form-control"
                      placeholder="MM/DD/YYYY"
                      onChange={dateSelect}
                    />
                  </div>
                  <DropdownButton
                    className="white-bg-drop-button"
                    id="dropdown-item-button"
                    align="end"
                    title={
                      <span className="mg-left-wifi">
                        <img
                          src={wifipicicon}
                          alt="Icon"
                          className="img-fluid wifi-icon-pic"
                        />
                      </span>
                    }
                  >
                    <Form>
                      {options &&
                        options.map((data, index) => {
                          return (
                            <>
                              <span>
                                <input
                                  type="checkbox"
                                  id={`sensor${index}`}
                                  name={data.label}
                                  value={data.value}
                                  checked={selectedCheckboxes.find(
                                    (ch) => ch.label === data.label
                                  )}
                                  onChange={(e) => handleCheckbox(e, data)}
                                />
                                {data.label}
                              </span>
                              <br />
                            </>
                          );
                        })}
                    </Form>
                  </DropdownButton>
                  &nbsp;
                  <button
                    className="btn btn-primary btn-height"
                    type="submit"
                    onClick={submitFilter}
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div>
                {/* <BgExpertList filteredVal={payLoad} /> */}
                <div className="flex-container">
                  {bgCandidateList &&
                    bgCandidateList.data &&
                    bgCandidateList.data.data.map((item, index) => {
                      return (
                        <>
                          <div
                            className="verification-box-user verify-width"
                            type="button"
                            key={index}
                            // onClick={() => {
                            //   userDetails(item);
                            // }}
                          >
                            <div className="candidate-verification-img">
                              <img
                                style={{ height: "117px", width: "120px" }}
                                src={`${imageUrl}${item.photo_url}`}
                                alt="Icon"
                                className="img-fluid"
                              />
                            </div>
                            <div className="verification-name-list">
                              <p className="verfication-name-text">
                                {item.name}
                              </p>
                              <p className="verfication-id-text">
                                {item.abhyasi_id}
                              </p>

                            {/*  <p>
                                <span>
                                  <img
                                    src={calenderline}
                                    alt="Icon"
                                    className="img-fluid"
                                    style={{ cursor: "pointer" }}
                                  />
                                </span>
                               
                                {item.evaluation_duedate &&
                                  yearconvert(item.evaluation_duedate)}
                                </p> */}
                              <p className="cand-status">
                                {/* {verificationItems.profile_sub_status === 5 ? "" : ""} */}
                                Admin Rejected
                              </p>
                            </div>
                          </div>
                        </>
                      );
                    })}
                  {bgCandidateList &&
                    bgCandidateList.data.data.length === 0 &&
                    "No candidate info available"}
                </div>
                {bgCandidateList && bgCandidateList.count > 10 && (
                  <MatchingPagination
                    countlist={bgCandidateList.data.total}
                    paginateData={paginateData}
                  />
                )}
                {loading === true && (
                  <Modal id="loading" show={loading}>
                    <Loading />
                  </Modal>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BgRejectedCandidate;
