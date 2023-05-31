import React from "react";
import BasicIcon from "../../assets/images/basicIcon.png";
import { yearconvert } from "../../utils/common/dateConvertion";

const BasicDetailsSection = ({ aboutInfo }) => {
  return (
    <div className="box-withBorder p-4">
      <div className="row">
        <div className="col-lg-12 col-md-12 col-sm-12">
          <div className="InformationIconImg">
            <img src={BasicIcon} alt="BasicIcon" />
          </div>
          <div className="row info-scrolls pl-4 ml-0">
            <div className="col-lg-6 col-md-6 col-sm-12 p-0">
              <ul className="BasicInfo-List">
                <p className="lifestle-view">Gender</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.gender === "F" 
                  ? "Female"
                   : "Male"}
                </p>
                <p className="lifestle-view">DOB</p>
                <p className="lifestle-view black-text-details">
                  {yearconvert(aboutInfo.dob)}
                </p>
                <p className="lifestle-view">Height</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.height} (cm)
                </p>
                <p className="lifestle-view">Weight</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.weight} (kg)
                </p>
                <p className="lifestle-view">Marital status</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.marital_status}
                </p>
                <p className="lifestle-view">Blood Group</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.blood_group && aboutInfo.blood_group.name}
                </p>
                <p className="lifestle-view">Language Spoken</p>
                <p className="lifestle-view black-text-details">
                  {" "}
                  {aboutInfo.languages_spoken &&
                    aboutInfo.languages_spoken.map((item, index) => {
                      return (
                        <span key={index}>
                          {item.language_name}{" "}
                          {index === aboutInfo.languages_spoken.length - 1
                            ? ""
                            : ", "}
                        </span>
                      );
                    })}
                </p>
                <p className="lifestle-view">Under Medication</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo && aboutInfo.under_medication === 1 ? "Yes" : "No"}
                </p>
                {/* <p className="lifestle-view"> Zone</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.zone_name}
                </p> */}

                {/* {aboutInfo.nationality?.nationality_id == 106 && (
                  <p className="lifestle-view">Pan Number</p>
                )}
                {aboutInfo.nationality?.nationality_id == 106 && (
                  <p className="lifestle-view black-text-details">
                    {aboutInfo.pan_number}
                  </p>
                )}
                {aboutInfo.nationality?.nationality_id !== 106 && (
                  <p className="lifestle-view">Pan Number</p>
                )}
                {aboutInfo.nationality?.nationality_id !== 106 && (
                  <p className="lifestle-view black-text-details">
                    {aboutInfo.pan_number}
                  </p>
                )} */}
              </ul>
            </div>
            <div className="col-lg-6 col-md-6 col-sm-12 p-0">
              <table className="BasicInfo-List">
                <p className="lifestle-view">Country</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo && aboutInfo.country.country_name}
                </p>
                <p className="lifestle-view">State</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.state}
                </p>
                <p className="lifestle-view">City</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.city}
                </p>
                <p className="lifestle-view">Religion</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.religion}
                </p>
                <p className="lifestle-view">Nationality</p>
                <p className="lifestle-view black-text-details">
                  {" "}
                  {aboutInfo && aboutInfo.nationality.nationality}
                </p>
                <p className="lifestle-view">Mother Tongue</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo && aboutInfo.mother_tongue[0].language_name}
                </p>
                <p className="lifestle-view"> Center</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.center_name}
                </p>
                {/* <p className="lifestle-view">Under Medication</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo && aboutInfo.under_medication === 1 ? "Yes" : "No"}
                </p> */}
                {aboutInfo && 
                aboutInfo.under_medication === 1 && (
                  <>
                    <p className="lifestle-view">Medication Comments</p>
                    <p className="lifestle-view black-text-details">
                      {aboutInfo.medication_details}
                    </p>
                  </>
                )}
                {/* <p className="lifestle-view">Medication Comments</p>
                <p className="lifestle-view black-text-details">
                  {aboutInfo.medication_details}
                </p> */}
                {/* {aboutInfo.nationality?.nationality_id == 106 && (
                  <p className="lifestle-view">Aadhaar Number</p>
                )}
                {aboutInfo.nationality?.nationality_id == 106 && (
                  <p className="lifestle-view black-text-details">
                    {aboutInfo.aadhar_number}
                  </p>
                )} */}
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BasicDetailsSection;
