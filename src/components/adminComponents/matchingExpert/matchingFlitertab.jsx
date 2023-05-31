import React from "react";
import flitericon from "../../../assets/images/fliter-icon-search.png";

export default function MatchingFlitertab() {
  return (
    <>
      <div className="matchingFliter-wrapper">
        <div className="bg-fliter-wrapper">
          <h4 className="admin-heading-title-h4 pad-20-0 color-white">
            <span>
              {" "}
              <img src={flitericon} alt="Icon" className="img-fluid fliter-search-icon" />{" "}
            </span>
            Filters
          </h4>
          <form>
            <div className="form-group">
              <label className="fliter-label-group" htmlFor="Age">
                {" "}
                Age
              </label>
              <select className="form-control border-white-bg" id="age">
                <option>21</option>
                <option>22</option>
                <option>23</option>
                <option>24</option>
                <option>25</option>
              </select>
            </div>
            <div className="form-group">
              <label className="fliter-label-group" htmlFor="profession">
                {" "}
                Profession
              </label>
              <select className="form-control border-white-bg" id="profession">
                <option>IT Employee, Gov. Employee, Col Professor</option>
                <option>BPO</option>
                <option>Govt</option>
                <option>Medical</option>
              </select>
            </div>
            <div className="form-group">
              <label className="fliter-label-group" htmlFor="Education">
                {" "}
                Education
              </label>
              <select className="form-control border-white-bg" id="education">
                <option>BE, MBBS</option>
                <option>Civil</option>
                <option>Arts</option>
                <option>Medical</option>
              </select>
            </div>
            <div className="form-group">
              <label className="fliter-label-group" htmlFor="Salary">
                {" "}
                Salary
              </label>
              <select className="form-control border-white-bg" id="salary">
                <option> 4,00,000/annum</option>
                <option>Civil</option>
                <option>Arts</option>
                <option>Medical</option>
              </select>
            </div>
            <div className="form-group">
              <label className="fliter-label-group" htmlFor="Salary">
                {" "}
                Religion
              </label>
              <select className="form-control border-white-bg" id="religion">
                <option> Hindu</option>
                <option>Muslim</option>
                <option>Christan</option>
                <option>Butha</option>
              </select>
            </div>
            <button className="btn btn-white"> Apply</button>
          </form>
        </div>
      </div>
    </>
  );
}
