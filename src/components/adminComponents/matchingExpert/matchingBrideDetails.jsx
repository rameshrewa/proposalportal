import React, { useEffect, useState, useCallback } from "react";
//import Adminlayout from "../../adminlayout/inner";
import SeoHead from "../../../layout/Seo/seoBlock";
import { useLocation } from "react-router-dom";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import config from "../../../assets/config";
import SuitableMatchtab from "./suitablematchtab";
import MatchingMeBrideDetails from "./matchingMeBrideDetails";
import { lStorage } from "../../../utils/storage";
import { useHistory } from "react-router-dom";
import Modal from "react-bootstrap/Modal";
import Loading from "../../shared/common/loading";
import { toast } from "react-toastify";

export default function MatchingBrideDetails() {
  const getDocumentData = new DocumentVerificationServices();
  const imageBaseUrl = config.imageUrl;
  let location = useLocation();
  const locationCandidateId = location.state.candidate_id;
  const [oneMatching, setOneMatching] = useState([]);
  const [logDetails, setLogDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  let history = useHistory();
  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };

  const getOneProfile = useCallback(
    (locationCandidateId) => {
      getDocumentData
        .candidateMatchingExpertOneProfileApi(locationCandidateId)
        .then((res) => {
          if (res.data.isError === false || res.data.statusCode === "200") {
            setOneMatching(res?.data?.data);
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
    },
    [getDocumentData]
  );

  const logDetailsApiGet = useCallback(
    (candidate_id) => {
      getDocumentData
        .candidateVerificationLogDetails(candidate_id)
        .then((res) => {
          if (res.data.isError === false || res.data.statusCode === "200") {
            setLogDetails(res?.data?.data);
          }
        });
    },
    [getDocumentData]
  );
  useEffect(() => {
    getOneProfile(locationCandidateId);
    logDetailsApiGet(locationCandidateId);
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Matching Bride details | Proposal Portal"}
        HeadDescription={"Admin Matching Bride details"}
      />

      {/* <Adminlayout /> */}
      <div className="col-md-8">
        <MatchingMeBrideDetails
          oneMatching={oneMatching}
          logDetails={logDetails}
          imageBaseUrl={imageBaseUrl}
        />
      </div>
      <div className="col-md-4">
        <SuitableMatchtab
          locationCandidateId={locationCandidateId}
          dataVal={oneMatching}
        />
      </div>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
}
