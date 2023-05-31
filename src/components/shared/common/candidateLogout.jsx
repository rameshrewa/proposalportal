import React from "react";
import { useHistory } from "react-router-dom";
import { lStorage } from "../../../utils/storage";
import logouticon from "../../../assets/images/logout-svgrepo-com.png";

const CandidateLogout = () => {
  let history = useHistory();
  const logOut = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };
  return (
    <span className="logout-icon-amin-top cursor" onClick={logOut}>
      <img src={logouticon} alt="bell" className="img-fluid" /> Logout
    </span>
  );
};
export default CandidateLogout;
