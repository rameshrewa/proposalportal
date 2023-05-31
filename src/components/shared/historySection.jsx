import React from "react";
import { yearconvert } from "../../utils/common/dateConvertion";

const HistorySection = ({ logDetails, oneCandidate, oneMatching }) => {
  return (
    <>
      <div className="outer-name-list">
      {logDetails && logDetails.map((history, index) => {
                              return (
                                <div className="card-account-name">
                                <div className="info-document">
                                  <h3 className="document-submitted-text">
                                  {history.logger_message}
                                  <br></br> on{" "}
                                    {history &&
                                      yearconvert(history.created_at)}
                                  </h3>
                                
                                </div>
                              </div>
                              );
                            })}
      </div>
    </>
  );
};

export default HistorySection;
