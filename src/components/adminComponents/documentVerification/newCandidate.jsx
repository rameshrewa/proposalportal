import React, { useEffect, useState, useCallback } from "react";
import Registeredpopup from "./registeredPopup";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { yearconvert } from "../../../utils/common/dateConvertion";
import MatchingPagination from "../../shared/matchingPagination";
import { toast } from "react-toastify";
import Loading from "../../shared/common/loading";
import { Modal } from "react-bootstrap";
import calendersmall from "../../../assets/images/calender-small.svg";
import { lStorage } from "../../../utils/storage";
import { useHistory } from "react-router-dom";
export default function NewCandidateList() {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [offsetList, setOffsetList] = useState(10);
  const [modalShow, setModalShow] = React.useState(false);
  const [getNewData, setGetNewData] = useState([]);
  const [countList, setCountList] = useState([]);
  const [oneCandidate, setOneCandidate] = useState([]);
  const getDocumentData = new DocumentVerificationServices();
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
    getDocumentData.documentNewVerification(searchKey).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setGetNewData(response.data.data);
        const total = response.data.data.total;
        //const perPage = response.data.data.per_page;
        const countD = Math.ceil(total / 10);
        setCountList(countD);
        setLoading(false);
      }
    });
  }, []);
  const getOneCandidate = (candidate_id) => {
    setModalShow(true);
    getDocumentData.documentOneCandidate(candidate_id).then((res) => {
      if (res.data.isError === false || res.data.statusCode === "400") {
        res.data.data[0]["candidate_id"] = candidate_id;
        setOneCandidate(res?.data?.data);
      }
    });
  };
  const getApiData = useCallback(() => {
    setLoading(true);
    let payLoad = {
      page: 1,
      offset: offsetList,
    };
    getDocumentData
      .documentNewVerification(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setGetNewData(response.data.data);
          const total = response.data.data.total;
          //const perPage = response.data.data.per_page;
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
  useEffect(() => {
    getApiData();
  }, []);
  return (
    <>
      <div className="flex-container">
        <button style={{ display: "contents" }}>
          {getNewData &&
            getNewData.data &&
            getNewData.data.map((items, index) => {
              return (
                <div
                  className="white-verification-userbox"
                  key={index}
                  type="button"
                  onClick={() => {
                    getOneCandidate(`${items.candidate_id}`);
                  }}
                >
                  <p className="candidate-name-text-p"> {items.name}</p>
                  <h6 className="candidate-user-id-hfn"> {items.abhyasi_id}</h6>
                  <h6 className="candidate-user-calerder">
                    {" "}
                    <span>
                      {" "}
                      <img
                        src={calendersmall}
                        alt="Icon"
                        className="img-fluid"
                      />
                    </span>{" "}
                    {yearconvert(items.date_of_joining_hfn)}
                  </h6>
                </div>
              );
            })}
          {getNewData && getNewData.data && getNewData.data.length === 0 ? (
            <p>No Records found</p>
          ) : (
            ""
          )}
          <br />
        </button>
      </div>
      {getNewData && getNewData.total > 10 && (
        <MatchingPagination countlist={countList} paginateData={paginateData} />
      )}
      <Registeredpopup
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
        oneCandidate={oneCandidate}
        getApiData={getApiData}
      />
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
}
