import React from "react";
import SeoHead from "../../../layout/Seo/seoBlock";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ReviewedCandidateList from "./reviewedCandidateList";
import NewCandidateList from "./newCandidate";
import RejectedCandidateList from "./rejectedCandidates";

export default function Registeredcandidate() {
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Registered Candidate | Proposal Portal"}
        HeadDescription={"Admin Registered Candidate"}
      />

      <div className="adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <h4 className="admin-heading-title-h4 pad-20-0">
                {" "}
                Registered candidate
              </h4>
              <Tabs
                defaultActiveKey="new"
                id="justify-tab-example"
                className="mb-3 super-admin-dashboard-tab"
                justify
              >
                <Tab eventKey="new" title={<span> New </span>}>
                  <NewCandidateList />
                </Tab>
                <Tab
                  eventKey="candidate"
                  title={<span> Reviewed Candidates </span>}
                >
                  <ReviewedCandidateList />
                </Tab>
                <Tab
                  eventKey="rejected"
                  title={<span> Rejected Candidates </span>}
                >
                  <RejectedCandidateList />
                </Tab>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
