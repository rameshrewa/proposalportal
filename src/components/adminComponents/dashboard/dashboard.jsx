import React from "react";
import DashboardPiechart from "./dashboardPiechart";
import DashboardTableStatus from "./dashboardTableStatus";
import { DocumentVerificationServices } from "../../../services/admin/documentverification.service";
import { useEffect } from "react";
import { useState } from "react";
import ReactDatePicker from "react-datepicker";
import {
  adminDateconvert,
  dateconvert,
} from "../../../utils/common/dateConvertion";
import { Modal } from "react-bootstrap";
import Loading from "../../shared/common/loading";
const Dashboard = () => {
  const adminApi = new DocumentVerificationServices();
  const [count, setCount] = useState("");
  const [activity, setActivity] = useState("");
  const [success, setSuccess] = useState("");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
    if (start !== "" && start !== null && end !== "" && end !== null) {
      recentTopActivity(start, end);
    }
  };
  const dashboardCount = () => {
    setLoading(true);
    adminApi
      .dashboardTopCount()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          setCount(response.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const recentTopActivity = (start, end) => {
    setLoading(true);
    let payLoad = {
      start_date: adminDateconvert(start),
      end_date: adminDateconvert(end),
    };
    adminApi
      .recentActivity(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          let dropdownOptions = response.data.data.map((value) => {
            return {
              candidates: value.name,
              hfnid: value.abhyasi_id,
              duedate: dateconvert(value.evaluation_duedate),
              status: value.profile_status.replace(/_/g, " "),
              image: value.candidate_photo_url,
            };
          });
          setActivity(dropdownOptions);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  const successRate = () => {
    setLoading(true);
    let payLoad = [
      {
        success_rate: "Quarterly",
      },
    ];
    adminApi
      .successRate(payLoad)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          setSuccess(response.data.data);
        }
      })
      .catch((err) => {
        setLoading(false);
      });
  };
  useEffect(() => {
    dashboardCount();
    recentTopActivity();
    successRate();
  }, []);
  return (
    <>
      <div className="dashboard-wrapper" style={{ height: "100vh" }}>
        <div className="container">
          <div className="row">
            <div className="col-md-12 admin-white-bg-wrapper bg-green-color">
              <div className="flex-container">
                <div className="dashboard-status-text">
                  <div className="status-count-box">
                    <p className="status-count-text">
                      {" "}
                      {count && count.candidate_awaiting_match}
                    </p>
                  </div>

                  <span className="status-match-text">
                    Candidate Awaiting Match
                  </span>
                </div>
                <div className="dashboard-status-text">
                  <div className="status-count-box pink-color">
                    <p className="status-count-text">
                      {" "}
                      {count && count.match_proposed_bride}
                    </p>
                  </div>

                  <span className="status-match-text">
                    {" "}
                    Match Proposed Bride{" "}
                  </span>
                </div>

                <div className="dashboard-status-text">
                  <div className="status-count-box sky-blue">
                    <p className="status-count-text">
                      {" "}
                      {count && count.match_proposed_groom}
                    </p>
                  </div>

                  <span className="status-match-text">
                    {" "}
                    Match Proposed Grooms{" "}
                  </span>
                </div>

                <div className="dashboard-status-text">
                  <div className="status-count-box orange-color">
                    <p className="status-count-text">
                      {" "}
                      {count && count.verification_pending}
                    </p>
                  </div>

                  <span className="status-match-text">
                    {" "}
                    Verification Pending{" "}
                  </span>
                </div>
              </div>
              <div className="row">
                <div className="col-md-4">
                  <DashboardPiechart data={success} />
                </div>

                <div className="col-md-8">
                  <div className="dashboard-bg-wrapper">
                    <div class="container">
                      <div class="row">
                        <div className="col-md-3">
                          <h4 className="admin-heading-title-h4 pad-20-0">
                            {" "}
                            Recent Activity{" "}
                          </h4>
                        </div>
                        <div className="col-md-3"></div>
                        <div className="col-md-6">
                          <form className="login-form">
                            <ReactDatePicker
                              selected={startDate}
                              onChange={onChange}
                              className="date-input"
                              startDate={startDate}
                              endDate={endDate}
                              selectsRange
                            />
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  <DashboardTableStatus data={activity} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};
export default Dashboard;
