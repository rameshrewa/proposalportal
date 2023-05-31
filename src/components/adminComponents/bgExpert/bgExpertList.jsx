import React, { useEffect, useCallback } from "react";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { toast } from "react-toastify";
// import thumbnailverificationpic from "../../../assets/images/thumbnail-verification-pic.png";
// import folderopenline from "../../../assets/images/folder-open-line.svg";
// import imageline from "../../../assets/images/image-line.svg";
import calenderline from "../../../assets/images/calender-line2.svg";
import { useState } from "react";
import { imageUrl } from "../../../assets/config";
import { useHistory } from "react-router-dom";
import { yearconvert } from "../../../utils/common/dateConvertion";
import { StatusShow } from "../../../utils/common/fileValidation";
import Loading from "../../shared/common/loading";
import { Modal } from "react-bootstrap";
import MatchingPagination from "../../shared/matchingPagination";
export default function BgExpertList(props) {
  const filterValues = props && props.filteredVal;
  let history = useHistory();
  const getDocumentData = new DocumentVerificationServices();
  const [bgCandidateList, setBgCandidateList] = useState("");
  const [loading, setLoading] = useState(false);
  const [offsetList, setOffsetList] = useState(10);
  const [countList, setCountList] = useState("");
  const [filter, setFilter] = useState(filterValues);
  const userDetails = (data) => {
    history.push("/admin/bgapprovaldetails", { candidate: data });
  };
  const paginateData = useCallback((p, sValue) => {
    setLoading(true);
    const searchKey = {
      page: `${p}`,
      offset: offsetList,
      filterValues,
    };
    getDocumentData.docApprovedCandidateList(searchKey).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setBgCandidateList(response?.data?.data);
        const total = response.data.total;
        //const perPage = response.data.per_page;
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
      filterValues,
    };
    getDocumentData
      .docApprovedCandidateList(payLoad)
      .then((res) => {
        if (res.data.statusCode === 200) {
          setBgCandidateList(res.data);
          const total = res.data.total;
          //          const perPage = res.data.per_page;
          const countD = Math.ceil(total / 10);
          setCountList(countD);
          setLoading(false);
          setLoading(false);
        } else {
          toast.error("something went wrong");
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    bgList();
  }, [filter]);
  return (
    <>
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
                  onClick={() => {
                    userDetails(item);
                  }}
                >
                  <div className="candidate-verification-img">
                    <img
                      style={{ height: "117px", width: "120px" }}
                      src={`${imageUrl}${item.photo}`}
                      alt="Icon"
                      className="img-fluid"
                    />
                  </div>
                  <div className="verification-name-list">
                    <p className="verfication-name-text">{item.name}</p>
                    <p className="verfication-id-text">{item.abhyasi_id}</p>

                    <p>
                      <span>
                        <img
                          src={calenderline}
                          alt="Icon"
                          className="img-fluid"
                          style={{ cursor: "pointer" }}
                        />
                      </span>
                      {/* {created_at} */}
                      {item.evaluation_duedate &&
                        yearconvert(item.evaluation_duedate)}
                    </p>
                    <p className="cand-status">
                      {/* {verificationItems.profile_sub_status === 5 ? "" : ""} */}
                      <StatusShow value={item && item.admin_comment} /> Approval
                      Pending
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        {bgCandidateList &&
          bgCandidateList.data.length === 0 &&
          "No candidate info available"}
      </div>
      {bgCandidateList && bgCandidateList.data.length > 0 && (
        <MatchingPagination countlist={countList} paginateData={paginateData} />
      )}
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
}
