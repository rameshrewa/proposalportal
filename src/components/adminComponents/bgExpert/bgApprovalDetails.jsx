import React from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import BgApprovalcanditate from "./bgApprovalCandidate";
//import BgPersonaltab from "./bgPersonalTabs";

export default function BgapprovalDetails() {
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Background Approval Details | Proposal Portal"}
        HeadDescription={"Admin Background Approval Details"}
      />
      <div className="bg-approval-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <div className="row">
                <BgApprovalcanditate />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
