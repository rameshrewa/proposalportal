import React from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import MatchingBrideDetails from "./matchingBrideDetails";
// import SuitableMatchtab from "./suitablematchtab";

export default function SuitableMatch() {
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Suitable Match  | Proposal Portal"}
        HeadDescription={"Admin Admin Suitable Match"}
      />

      <div className="matching-bride adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
          <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                {/* <div className="col-md-8">
                  <MatchingBrideDetails />
                </div> */}
                {/* <div className="col-md-4">
                  <SuitableMatchtab  />
                </div> */}
                 <MatchingBrideDetails />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
