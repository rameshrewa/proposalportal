import React from "react";

const ProfileInfo = (aboutInfo) => {
  return (
    <div className="box-withBorder p-4">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="InformationIconImg">
            <img src={aboutInfo && aboutInfo.imageshow} alt="LifeStyleIcon" />
          </div>
          <ul className="mydouc-List pl-4">
            {aboutInfo &&
              aboutInfo.aboutInfo.map((item, index) => {
                if (item.value !== "") {
                  return (
                    <div key={index + 1}>
                      <p className="lifestle-view">{item.label} </p>
                      <p className="lifestle-view m_title black-text-details">{item.value}</p>
                    </div>
                  );
                }
              })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ProfileInfo;
