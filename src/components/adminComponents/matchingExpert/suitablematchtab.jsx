import React, { useState, useEffect, useCallback } from "react";
import fliterblackicon from "../../../assets/images/fliter-black-icon.png";
import handsymbolicon from "../../../assets/images/hand-symbol-icon.png";
import professionalicon from "../../../assets/images/professional-icon.svg";
import flitericon from "../../../assets/images/fliter-icon-search.png";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import StandardDataService from "../../../services/common/standardData.service";
import config from "../../../assets/config";
import MatchingPersonaltab from "./matchingPersonaltab";
import { useForm, Controller } from "react-hook-form";
import { Typeahead } from "react-bootstrap-typeahead";
import { ageSelect } from "../../../assets/data/userData";

const SuitableMatchtab = ({ locationCandidateId, dataVal }) => {
  const getDocumentData = new DocumentVerificationServices();
  const standardApi = new StandardDataService();
  const imageBaseUrl = config.imageUrl;
  const { register, reset, handleSubmit, control } = useForm();

  const [suitableMatch, setSuitableMatch] = useState([]);
  const [educationList, setEducationList] = useState([]);
  const [ctcList, setCtcList] = useState([]);
  const [name, setName] = useState("");

  const [oneMatching, setOneMatching] = useState([]);

  const [indexData, setIndexData] = useState();
  const [candidateGender, setCandidateGender] = useState();

  const [hideFilter, setHideFilter] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hide, setHide] = useState(false);
  const toggleHide = () => {
    setHide(!hide);
  };

  const candidatematchId = locationCandidateId;
  const suitableMatchingApi = useCallback(() => {
    setLoading(false);
    getDocumentData
      .candidateMatchingExpertOneProfileApi(candidatematchId)
      .then((res) => {
        if (res.data.isError === false || res.data.statusCode === "200") {
          const response = res.data.data.data;
          let payload = [
            {
              gender: response.gender,
              candidate_id: response.candidate_id,
            },
          ];
          setCandidateGender(response.gender);
          getDocumentData
            .candidateMatchingExpertsuitableMatchFilterApi(payload)
            .then((res) => {
              if (res.data.isError === false || res.data.statusCode === "200") {
                setSuitableMatch(res?.data?.data);
                setLoading(false);
              }
            });
        }
      });
  }, [getDocumentData]);

  const getOneProfile = useCallback(
    (candidate_id) => {
      getDocumentData
        .candidateMatchingExpertOneProfileApi(candidate_id)
        .then((res) => {
          if (res.data.isError === false || res.data.statusCode === "200") {
            setOneMatching(res?.data?.data);
          }
        });
    },
    [getDocumentData]
  );

  const compareToggle = () => {
    toggleHide();
  };

  useEffect((candidate_id) => {
    suitableMatchingApi();
    getOneProfile(candidate_id);
    const LoadStandardData = () => {
      standardApi.standardDataApi("edu").then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          let dropdownOptions = response.data.data.map((value) => {
            return { label: value.degree_name, value: value.education_id };
          });
          setEducationList(dropdownOptions);
        } else {
        }
      });
      standardApi.standardDataApi("ctc").then((res) => {
        if (res.data.isError === false || res.data.statusCode === "200") {
          let dropdownOptions = res.data.data.map((value) => {
            return { label: value.ctc_range, value: value.annual_ctc_id };
          });
          setCtcList(dropdownOptions);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    };

    LoadStandardData();
  }, []);

  const filterApply = () => {
    setHideFilter(!hide);
  };

  const onSubmit = (data) => {
    setHideFilter(false);
    reset();
    const filter = [
      {
        age: data.age === "" ? null : data.age,
        salary: data.salary === "" ? null : data.salary[0].label,
        religion: data.religion === "" ? null : data.religion,
        profession: data.profession === "" ? null : [data.profession],
        education: data.education === "" ? null : [data.education],
        gender: candidateGender,
      },
    ];
    const obj = { ...filter[0] };
    Object.keys(obj).forEach((key) => {
      if (obj[key] === null) {
        delete obj[key];
      }
    });

    const filtersData = obj;

    getDocumentData
      .candidateMatchingExpertSuitableFilterApi([filtersData])
      .then((res) => {
        if (res.data.isError === false || res.data.statusCode === "200") {
          setSuitableMatch(res?.data?.data);
          // reset();
        }
      });
  };

  // const indexHandler = (index) =>{
  //   setIndexData(index);
  // }

  return (
    <>
      <div style={{ display: hideFilter ? "none" : "block" }}>
        <div className="suitableFliter-wrapper">
          <div
            className="suitable-match-tabs firstdiv"
            style={{ display: hide ? "none" : "block" }}
          >
            <h4 className="admin-heading-title-h4 pad-20-0 color-white">
              Suitable Match{" "}
              <span role="button" tabIndex="0" onClick={filterApply}>
                {" "}
                <img
                  src={fliterblackicon}
                  alt="Icon"
                  className="img-fluid fliter-search-icon"
                />{" "}
              </span>
            </h4>
            <div className="colum-flex-container">
              {suitableMatch?.data?.map((items, index) => {
                return (
                  <div
                    key={index}
                    className="verification-box-user awaiting-expert-box suitable-box-user"
                  >
                    <div className="suitable-Img">
                      <img
                        src={`${imageBaseUrl}${items.photo_url}`}
                        alt="Icon"
                        className="img-fluid suitable-Img"
                      />
                    </div>
                    <div className="verification-name-list">
                      <p className="verfication-name-text"> {items.name}</p>
                      <p>
                        <span className="bride-age-num">
                          {" "}
                          Age{" "}
                          <span className="bride-age-num">
                            {" "}
                            {items.age}{" "}
                          </span>{" "}
                        </span>
                      </p>

                      <p
                        className="bride-resonse-text"
                        style={{ marginTop: "15px" }}
                      >
                        {" "}
                        <span>
                          {" "}
                          <img
                            src={handsymbolicon}
                            alt="Icon"
                            className="img-fluid bride-gallery-icon mr-2"
                          />{" "}
                        </span>{" "}
                        {items.religion}
                      </p>
                      <p className="bride-resonse-text">
                        {" "}
                        <span>
                          {" "}
                          <img
                            src={professionalicon}
                            alt="Icon"
                            className="img-fluid bride-gallery-icon mr-2"
                          />{" "}
                        </span>{" "}
                        {items.profession}
                      </p>
                      <button
                        type="button"
                        onClick={() => {
                          getOneProfile(`${items.candidate_id}`);
                          compareToggle();
                          setIndexData(index);
                        }}
                        className="btn btn-compare"
                      >
                        {" "}
                        Compare{" "}
                      </button>
                    </div>
                  </div>
                );
              })}
              {suitableMatch &&
                suitableMatch.data &&
                suitableMatch.data.length === 0 &&
                "No Matches Found"}
            </div>
          </div>
        </div>
        <div className="Seconddiv" style={{ display: hide ? "block" : "none" }}>
          <MatchingPersonaltab
            oneMatching={oneMatching}
            suitableMatch={suitableMatch}
            candidatematchId={candidatematchId}
            name={dataVal.data && dataVal.data.name}
            getOneProfile={getOneProfile}
            indexData={indexData}
          />
        </div>
      </div>

      <div
        className="Seconddiv"
        style={{ display: hideFilter ? "block" : "none" }}
      >
        <div className="matchingFliter-wrapper">
          <div className="bg-fliter-wrapper">
            <h4 className="admin-heading-title-h4 pad-20-0 color-white">
              <span>
                {" "}
                <img
                  src={flitericon}
                  alt="Icon"
                  className="img-fluid fliter-search-icon"
                />{" "}
              </span>
              Filters
              <span
                className="float-rg"
                onClick={() => {
                  setHideFilter(false);
                }}
              >
                Back
              </span>
            </h4>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group">
                <label className="fliter-label-group" htmlFor="age">
                  {" "}
                  Age
                </label>
                <select
                  name="age"
                  className="form-control"
                  {...register("age", { required: false })}
                >
                  <option value="">Select</option>
                  {ageSelect.map((item) => {
                    return <option value={item.value}>{item.label}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label className="fliter-label-group" htmlFor="salary">
                  {" "}
                  Salary
                </label>
                {/* <input
                  {...register("salary", { required: false })}
                  type="text"
                  className="form-control border-white-bg"
                /> */}
                <Controller
                  control={control}
                  name="salary"
                  defaultValue={""}
                  rules={{ required: false }}
                  render={({ field: { onChange, onBlur, value, ref } }) => (
                    <Typeahead
                      id="salary"
                      onChange={onChange}
                      options={ctcList}
                      placeholder="Choose a Annual Income..."
                      clearButton
                      selected={value}
                      className="autocomplete-custom-st"
                    />
                  )}
                />
              </div>
              <div className="form-group">
                <label className="fliter-label-group" htmlFor="religion">
                  {" "}
                  Religion
                </label>
                <input
                  {...register("religion", { required: false })}
                  type="text"
                  className="form-control border-white-bg"
                />
              </div>
              <div className="form-group">
                <label className="fliter-label-group" htmlFor="profession">
                  {" "}
                  Profession
                </label>
                <input
                  {...register("profession", { required: false })}
                  type="text"
                  className="form-control border-white-bg"
                />
              </div>
              <div className="form-group">
                <label className="fliter-label-group" htmlFor="education">
                  {" "}
                  Education
                </label>
                <input
                  {...register("education", { required: false })}
                  type="text"
                  className="form-control border-white-bg"
                />
              </div>

              <button type="submit" className="btn btn-white">
                {" "}
                Apply
              </button>
              <br />
              <button
                type="submit"
                className="btn btn-white"
                onClick={() => {
                  setHideFilter(false);
                }}
              >
                {" "}
                Cancel
              </button>
            </form>
          </div>
        </div>
      </div>

      {suitableMatch.length === 0 ? "No data found" : ""}
    </>
  );
};

export default SuitableMatchtab;
