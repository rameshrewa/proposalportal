import React from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import MatchingBrideDetails from "./matchingBrideDetails";
import MatchingFlitertab from "./matchingFlitertab";

export default function MatchingBrideFliter() {
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Matching Bride Fliter  | Proposal Portal"}
        HeadDescription={"Admin Matching Bride Fliter"}
      />

      <div className="matching-bride adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
          <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                <div className="col-md-8">
                  <MatchingBrideDetails />
                </div>
                <div className="col-md-4">
                  <MatchingFlitertab />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
