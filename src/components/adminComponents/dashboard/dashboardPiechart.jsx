import React from "react";
import DonoutChart from "simple-react-donut-chart";
import "simple-react-donut-chart/src/style.css";
function percentage(partialValue, totalValue) {
  return (100 * partialValue) / totalValue;
}

const DashboardPiechart = ({ data }) => {
  const labeloffData = `Wedding Confirmed ${data.wedding_confirmed}`;
  const labelonData = `No of Candidate pairs status ${data.no_of_candidate_pairs_status}`;
  return (
    <>
      <div className="dashboard-piechart-wrapper">
        <div className="rate-matches">
          <h4 className="admin-heading-title-h4">
            {" "}
            Success Rate <span className="font-light"> (matches) </span>{" "}
          </h4>
          <div className="wid55">
            <div className="form-group">
              <select className="form-control" id="timeing">
                <option>Quarterly </option>
              </select>
            </div>
          </div>
        </div>

        <DonoutChart
          percentage={percentage(
            data.wedding_confirmed,
            data.no_of_candidate_pairs_status
          )}
          colorOn="#3F8FC6"
          colorOff="#20A5A1"
          labelOff={labeloffData}
          labelOn={labelonData}
          circleColor="#ffffff"
          baseClass="customize"
          textStyle={{
            color: "#2E384D",
          }}
          labelStyle={{
            off: {
              fontSize: "14px",
            },
            on: {
              fontSize: "14px",
            },
          }}
        />
      </div>
    </>
  );
};

export default DashboardPiechart;
