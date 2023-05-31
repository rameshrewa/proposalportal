import React from "react";
import SeoHead from "../../../layout/Seo/seoBlock";

export default function Reasonofreject () {
  return (
    <>
      <SeoHead
        HeadTitle={"Admin Reject | Proposal Portal"}
        HeadDescription={"Admin Reason of rejection"}
      />

      <div className="reason-of-wrapper adminregistered-candidate-wrapper">
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper">
              <h4 className="admin-heading-title-h4 pad-20-0">
                {" "}
                Reject <span> (HFN000012345ABC) </span>
              </h4>

              <h4 className="admin-heading-title-h4 pad-20-0">
                {" "}
                Documents List
              </h4>

              <div className="flex-container">
                <div className="form-check-gap-input">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="birth"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Birth certificate
                    </label>
                  </div>
                </div>

                <div className="form-check-gap-input">
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      value=""
                      id="birth"
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Employee salary slip
                    </label>
                  </div>
                </div>
              </div>

              <h4 className="admin-heading-title-h4 pad-20-0">
                {" "}
                Reason On Rejection{" "}
              </h4>

              <div className="mb-3">
                <textarea
                  className="form-control textarea-height"
                  id="exampleFormControlTextarea1"
                  rows="3"
                ></textarea>
              </div>
              <button className="btn btn-approve-blue" style={{ marginRight: '20px'}}> Submit </button>
              <button className="btn btn-white-reject"> Cancel </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


