import React from "react";
import HeartfulnessLogo from "../../../assets/images/heartfulness-logo.png";
import weedingIcon from "../../../assets/images/weeding-Icon.png";
import { imageUrl } from "../../../assets/config";
import moment from "moment/moment";

const WeddingDates = (props) => {
  const { weddingData } = props && props;
  return (
    <>
      <div className="col-lg-4 col-md-4 col-sm-12">
        <div className="p-0">
          <img
            src={`${imageUrl}${
              weddingData && weddingData.brideDetails.photo_data
            }`}
            alt="RAMYAImg"
            className="weeding-authImg"
          />
          <img
            src={`${imageUrl}${
              weddingData && weddingData.groomDetails.photo_data
            }`}
            alt="SHIKHAImg"
            className="weeding-authImg"
          />
          {/* <img src={RAMYAImg} alt="RAMYAImg" className="weeding-authImg" />
          <img src={SHIKHAImg} alt="SHIKHAImg" className="weeding-authImg" /> */}
        </div>
      </div>
      <div className="col-lg-8 col-md-8 col-sm-12 text-center">
        <div className="weedingbox-withBorder py-5">
          <>
            <img
              src={HeartfulnessLogo}
              alt="HeartfulnessLogo"
              className="pt-5 mt-5"
            />
            <h5 className="mt-3">PROPOSAL PORTAL</h5>
            <img src={weedingIcon} alt="weedingIcon" className="mt-3" />
            <div className="row mt-3">
              <div className="col-lg-12 col-md-8 col-sm-12">
                <div className="weedingConfrimCol">
                  <div className="weedingCol-Left">
                    <h6>{weddingData.bg_wedding_date && weddingData.hfn_id}</h6>
                    <h5>
                      {weddingData && weddingData.brideDetails.name} <br />
                      {weddingData && weddingData.brideDetails.age}
                    </h5>
                  </div>

                  <div className="weedingCol-Right">
                    <h6>{weddingData && weddingData.groomDetails.hfn_id}</h6>
                    <h5>
                      {weddingData && weddingData.groomDetails.name} <br />
                      {weddingData && weddingData.groomDetails.age}
                    </h5>
                  </div>
                </div>
                <div>
                  <b>
                    {moment(weddingData.bg_wedding_date).format("dddd")} -
                    &nbsp;
                    {moment(weddingData.bg_wedding_date).format("MMM Do")}{" "}
                    {moment(weddingData.bg_wedding_date).format("YYYY")}
                  </b>
                </div>
                <div>
                  <b>
                    <div>{weddingData && weddingData.bg_wedding_time}</div>
                    <div className="first-caps">
                      {weddingData && weddingData.bg_wedding_location}
                    </div>
                  </b>
                </div>
              </div>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

export default WeddingDates;
