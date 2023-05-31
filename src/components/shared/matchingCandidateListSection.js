import React from "react";
import { AgeCalculator } from "@dipaktelangre/age-calculator";
import handsymbolicon from "../../assets/images/hand-symbol-icon.png";
import professionalicon from "../../assets/images/professional-icon.svg";
import imageline from "../../assets/images/image-line.svg";

const MatchingCandidateListSection = ({
  loading,
  getOneCandidate,
  imageBaseUrl,
  searchUsersData,
}) => {
  const n = searchUsersData?.total;
  return (
    <div className="flex-container">
      {loading ? (
        <p>Loading....</p>
      ) : (
        searchUsersData?.data?.map((items, index) => {
          return (
            <div
              key={index}
              className="verification-box-user awaiting-expert-box"
              type="button"
              onClick={() => {
                getOneCandidate(`${items.candidate_id}`);
              }}
            >
              <div className="matching-image">
                <img
                  src={`${imageBaseUrl}${items.photo_url}`}
                  alt="Icon"
                  className="img-fluid matching-image"
                />
              </div>

              <div className="verification-name-list">
                <p className="verfication-name-text">{items.name}</p>
                <p>
                  <span className="bride-age-num">
                    Age
                    <span className="bride-age-num ml-1">
                      {AgeCalculator.getAgeIn(new Date(items.dob), "years")}
                    </span>
                  </span>

                  <span className="bride-resonse-text ml-3">
                    <img
                      src={imageline}
                      alt="Icon"
                      className="img-fluid bride-gallery-icon mr-1"
                    />
                    {items.photos}
                  </span>
                </p>
                <p className="bride-resonse-text" style={{ marginTop: "15px" }}>
                  <span>
                    <img
                      src={handsymbolicon}
                      alt="Icon"
                      className="img-fluid bride-gallery-icon mr-2"
                    />
                  </span>
                  {items.religion}
                </p>
                <p className="bride-resonse-text">
                  <span>
                    <img
                      src={professionalicon}
                      alt="Icon"
                      className="img-fluid bride-gallery-icon mr-2"
                    />
                  </span>
                  {items.profession}
                </p>
              </div>
            </div>
          );
        })
      )}

      {n === 0 ? "No data found" : ""}
    </div>
  );
};

export default MatchingCandidateListSection;
