import React, { useEffect, useState, useCallback } from "react";
import Registeredpopup from "./registeredPopup";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { yearconvert } from "../../../utils/common/dateConvertion";
import mailsend from "../../../assets/images/mail-send-line.svg";
import MatchingPagination from "../../shared/matchingPagination";
import { toast } from "react-toastify";
import Loading from "../../shared/common/loading";
import { Modal } from "react-bootstrap";
export default function ReviewedCandidateList() {
  const [loading, setLoading] = useState(false);
  const [reviewData, setReviewData] = useState([]);
  const [offsetList, setOffsetList] = useState(10);
  const [modalShow, setModalShow] = React.useState(false);
  const [reviewList, setReviewList] = useState();
  const [oneCandidate, setOneCandidate] = useState([]);
  const getDocumentData = new DocumentVerificationServices();

  const reviewedpaginateData = useCallback((p, sValue) => {
    setLoading(true);
    const searchKey = {
      page: `${p}`,
      offset: offsetList,
    };
    setLoading(true);
    getDocumentData
      .documentReviewCandidate(searchKey)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setReviewData(response.data.data);
          const total = response.data.data.total;
          //const perPage = response.data.data.per_page;
          const countD = Math.ceil(total / 10);
          setReviewList(countD);
          setLoading(false);
        }
      })
      .catch((error) => {
        setLoading(false);
        toast.error("something went wrong");
      });
  }, []);
  const ReviewGetApiData = useCallback(() => {
    let payLoad = {
      page: 1,
      offset: offsetList,
    };
    getDocumentData.documentReviewCandidate(payLoad).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setReviewData(response?.data?.data);
        const total = response?.data?.data?.total;
        //const perPage = response?.data?.data?.per_page;
        const countD = Math.ceil(total / 10);
        setReviewList(countD);
      }
    });
  }, [getDocumentData]);
  useEffect(() => {
    ReviewGetApiData();
  }, []);
  return (
    <>
      <div className="flex-container">
        {reviewData &&
          reviewData.data &&
          reviewData.data.map((reviewItems, index) => {
            return (
              <div className="white-verification-userbox" key={index}>
                <p className="candidate-name-text-p">{reviewItems.name}</p>
                <h6 className="candidate-user-id-hfn">
                  {" "}
                  {reviewItems.abhyasi_id}
                </h6>
                <h6 className="candidate-user-calerder">
                  {" "}
                  <span>
                    {" "}
                    <img src={mailsend} alt="Icon" className="img-fluid" />
                  </span>{" "}
                  {yearconvert(reviewItems.date_of_joining_hfn)}
                </h6>
              </div>
            );
          })}
        {reviewData && reviewData.data && reviewData.data.length === 0 ? (
          <p>No Records found</p>
        ) : (
          ""
        )}
      </div>
      {reviewData && reviewData.total > 10 && (
        <MatchingPagination
          countlist={reviewList}
          paginateData={reviewedpaginateData}
        />
      )}
      <Registeredpopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        oneCandidate={oneCandidate}
        //getApiData={getApiData}
        reviewGetApiData={ReviewGetApiData}
      />
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
}
