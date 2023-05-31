import React from "react";
import BootstrapTable from "react-bootstrap-table-next";
// import paginationFactory from "react-bootstrap-table2-paginator";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { imageUrl } from "../../../assets/config";

const DashboardTableStatus = ({ data }) => {
  const emptyDataMessage = () => {
    return "No Data";
  };

  const columns = [
    {
      dataField: "image",
      text: "Photo",
      formatter: imageFormatter,
    },
    {
      dataField: "candidates",
      text: "Candidates",
    },
    {
      dataField: "hfnid",
      text: "HFN Id",
    },
    {
      dataField: "duedate",
      text: "Due date",
    },
    {
      dataField: "status",
      text: "Status",
    },
  ];

  function imageFormatter(cell) {
    return (
      <span>
        <img
          className="mg-right20"
          alt="formateer"
          style={{ width: 35, height: 35 }}
          src={imageUrl + cell}
        />
      </span>
    );
  }

  return (
    <>
      <div className="Dashboardtablestatus-wrapper">
        <div className="dashboard-custom-table">
          <BootstrapTable
            keyField="id"
            data={data}
            columns={columns}
            bordered={false}
            noDataIndication={emptyDataMessage}
            hover
            classes="custom-dashboard-table table-responsive"
          />
        </div>
      </div>
    </>
  );
};

export default DashboardTableStatus;
