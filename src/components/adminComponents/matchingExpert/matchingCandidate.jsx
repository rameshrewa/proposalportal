import React, { useCallback, useEffect, useState } from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import { FaSistrix } from "react-icons/fa";
// import Pagination from "react-bootstrap/Pagination";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import config from "../../../assets/config";
import { useHistory } from "react-router-dom";
import MatchingCandidateListSection from "../../shared/matchingCandidateListSection";
import { useForm } from "react-hook-form";
import { lStorage } from "../../../utils/storage";
import { toast } from "react-toastify";
function MatchingCandidate() {
  const { register, handleSubmit, reset } = useForm();
  const matchingExportData = new DocumentVerificationServices();
  const imageBaseUrl = config.imageUrl;
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  // const [allUsersData, setAllUsersData] = useState([]);
  const [searchUsersData, setSearchUsersData] = useState([]);
  // const [searchTitle, setSearchTitle] = useState("");
  const [pageCount, setPageCount] = useState(1);
  const [countlist, setCountList] = useState();
  const [searchValue, setSearchValue] = useState("");
  const [countUsers, setCountUsers] = useState();
  const [offsetList, setOffsetList] = useState(10);

  const logOut = () => {
    lStorage.clear();
    history.push("/superadmin/login");
    lStorage.set("logOut", "slogOut");
  };

  // const p = searchUsersData?.current_page

  const onSubmit = (data) => {
    setSearchValue(data.name);
    const searchKey = {
      searchKey: data.name,
      page: 1,
      offset: offsetList,
    };

    matchingExportData
      .candidateMatchingExpertApi(searchKey)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setSearchUsersData(response?.data?.data);
          setCountUsers(response);
          const total = response?.data?.data?.total;
          //const perPage = response?.data?.data?.per_page;
          const countD = Math.ceil(total / 10);
          setCountList(countD);
        }
      });
  };

  const paginateData = useCallback((p, sValue) => {
    setLoading(true);
    const searchKey = {
      searchKey: sValue,
      page: `${p}`,
      offset: offsetList,
    };
    matchingExportData
      .candidateMatchingExpertApi(searchKey)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setSearchUsersData(response?.data?.data);
          setCountUsers(response);
          const total = response?.data?.data?.total;
          //const perPage = response?.data?.data?.per_page;
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
  }, []);

  useEffect(() => {
    paginateData();
  }, [paginateData]);

  const resetInputData = () => {
    reset();
    paginateData();
    // setPageCount();
  };

  const getOneCandidate = (candidate_id) => {
    history.push("/admin/suitablematch", { candidate_id: candidate_id });
  };
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Matching candidate | Proposal Portal"}
        HeadDescription={"Admin Matching expert"}
      />
      <div className="matching-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                <div className="col-sm-7">
                  <h4 className="admin-heading-title-h4 pad-20-0">
                    {" "}
                    Awaiting Bride for suitable proposal
                  </h4>
                </div>
                <div className="col-sm-5 dis-search-item">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-group has-search wid248 matching-expert-inputlist">
                      <span className="form-control-feedback">
                        {" "}
                        <FaSistrix />{" "}
                      </span>
                      <input
                        {...register("name")}
                        type="text"
                        className="form-control"
                        placeholder="Search"
                      />
                      <input type="submit" className="search-submit" />
                      <button
                        type="button"
                        className="search-cancel"
                        onClick={resetInputData}
                      >
                        Clear
                      </button>
                    </div>
                  </form>
                  {/* <img
                    src={Bluesquare}
                    alt="Icon"
                    className="img-fluid squre-icon-blue"
                  />
                  <img
                    src={Listcheckicon}
                    alt="Icon"
                    className="img-fluid light-squreblue"
                  /> */}
                </div>
              </div>
              <MatchingCandidateListSection
                loading={loading}
                getOneCandidate={getOneCandidate}
                imageBaseUrl={imageBaseUrl}
                searchUsersData={searchUsersData}
              />
              {/* <MatchingPagination
                countlist={countlist}
                setSearchUsersData={setSearchUsersData}
                paginateData={paginateData}
                searchValue={searchValue}
                searchUsersData={searchUsersData}
              /> */}
              <br />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MatchingCandidate;
