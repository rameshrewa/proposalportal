import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SeoHead from "../../layout/Seo/seoBlock";
//import UserHeader from "./usersHeader";
import CandidateService from "../../services/admin/candidate.service";
import { imageUrl } from "../../assets/config";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
//import Documents from "../shared/common/docume*lifestynts";
import CandidateLogout from "../shared/common/candidateLogout";
import Loading from "../shared/common/loading";
import { Modal } from "react-bootstrap";
import {
  FileSizeCheck,
  FileValidation,
  ImageFileValidation,
} from "../../utils/common/fileValidation";
import { lStorage } from "../../utils/storage";
import { yearconvert } from "../../utils/common/dateConvertion";
const PhotosUpload = () => {
  const candidateApi = new CandidateService();
  const profileData = lStorage.get("hfn-profile-me");
  let history = useHistory();
  const imageInputRef = useRef();
  const [regInfo, setRegInfo] = useState("");
  const [radioOption, setRadioOption] = useState("Half");
  const [loading, setLoading] = useState(false);
  const [filesData, setFilesData] = useState("");
  const [isChecked, setIsChecked] = useState(false);
  const [isCheckedError, setIsCheckedError] = useState(false);
  const [isDeclareChecked, setIsDeclareChecked] = useState(false);
  const [isDeclareCheckedError, setIsDeclareCheckedError] = useState(false);

  const Logout = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };

  const Logininfo = () => {
    candidateApi
      .userReginfoApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setRegInfo(response.data.data);
          setFilesData("");
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error("Your login session has expired please login again");
          Logout();
          setLoading(false);
        } else {
          toast.error("something went wrong");
          setLoading(false);
        }
      });
  };

  // const PersonalDocuments = [
  //   {
  //     name: "Photos",
  //     value: "candidate_photo_url",
  //     typeValue: "personalPhoto",
  //     fileTypes: ["JPG", "PNG", "GIF"],
  //     info: { regInfo },
  //   },
  // ];

  const ProfieSubmit = (e) => {
    e.preventDefault();
    if (
      regInfo.photoData &&
      regInfo.photoData.length > 0 &&
      isChecked &&
      isDeclareChecked
    ) {
      let payload = {
        action_type: "profile_submitted",
      };
      candidateApi.profilesubmit(payload).then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          toast.success("Candidate profile submitted successfully");
          history.push("/user-information");
          //      Logininfo();
        } else {
          setLoading(false);
          toast.error("something went wrong");
        }
      });
    } else {
      if (regInfo.photoData?.length === 0) {
        toast.error("Please upload at least one photo");
      } else if (!isChecked) {
        setIsCheckedError(true);
      } else if (!isDeclareChecked) {
        setIsDeclareCheckedError(true);
      }
    }
  };

  const onAddressChanged = (e) => {
    setRadioOption(e.target.value);
  };

  const handleChange = (file) => {
    let filecheck = ImageFileValidation(file.target.files[0]);
    if (filecheck) {
      setFilesData(file.target.files[0]);
    } else {
      toast.error("please upload valid file");
      setLoading(false);
    }
  };
  const photoSubmit = async (e) => {
    e.preventDefault();
    let removePhoto =
      regInfo &&
      regInfo.photoData.filter(
        (e) => e.doc_verified === 0 && e.candidate_photo_id
      );
    imageInputRef.current.value = "";
    let testFile = filesData;
    let filecheck = ImageFileValidation(filesData);

    //   const compressedFile = await imageCompression(testFile, compressOptions);
    let fileSize = FileSizeCheck(filesData);
    if (filecheck && fileSize === false) {
      setLoading(true);
      const formData = new FormData();
      formData.set("candidate_photo_url", testFile);
      formData.set("photo_type", radioOption);
      formData.set("type", "photo");
      formData.append("_method", "POST");
      if (regInfo.profile_sub_status === 5) {
        formData.set("candidate_photo_id", removePhoto[0].candidate_photo_id);
        formData.append("field_resubmitted", "doc_verified");
      }
      candidateApi
        .documentsApi(formData)
        .then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            setFilesData("");
            toast.success(response.data.message);
            Logininfo();
            setLoading(false);
          } else {
            toast.error("something went wrong");
            setLoading(false);
          }
        })
        .catch((error) => {
          setLoading(false);
          toast.error("something went wrong");
        });
    } else {
      if (fileSize) {
        toast.error(
          "File size is morethan 1 MB please upload files below 1 MB"
        );
      } else if (filesData == "") {
        toast.error("Please upload the file");
      } else {
        toast.error("Please upload valid file");
      }
    }
  };

  const deletePhoto = (id) => {
    let payload = {
      candidate_photo_id: id.candidate_photo_id,
    };
    setLoading(true);
    candidateApi.deletePhoto({ data: payload }).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setLoading(false);
        toast.success("Photo Deleted Successfully");
        Logininfo();
      } else {
        setLoading(false);
        toast.error("something went wrong");
      }
    });
  };
  const handleOnChange = () => {
    setIsChecked(!isChecked);
    if (isChecked === true) {
      setIsCheckedError(true);
    } else {
      setIsCheckedError(false);
    }
  };
  const handleOnDeclareChange = () => {
    setIsDeclareChecked(!isDeclareChecked);
    if (isDeclareChecked === true) {
      setIsDeclareCheckedError(true);
    } else {
      setIsDeclareCheckedError(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    const authVal = lStorage.get("logInfo");
    const todayDat = new Date();
    const abhyasiValidation = profileData.me.user_roles.find(
      (value) => value === "seeker"
    );
    if (3 <= authVal.match_request_declined_count) {
      setLoading(false);
      history.push("/error");
    } else if (
      authVal.wedding_fixed_date !== null &&
      yearconvert(authVal.wedding_fixed_date) < yearconvert(todayDat)
    ) {
      setLoading(false);
      history.push("/error");
    } else if (
      authVal.wedding_fixed_date !== null &&
      yearconvert(authVal.wedding_fixed_date) > yearconvert(todayDat)
    ) {
      setLoading(false);
      history.push("/confirmWedding");
    } else if (abhyasiValidation !== "seeker") {
      Logininfo();
    } else {
      history.push("/error");
    }
  }, []);
  return (
    <>
      {/* <UserHeader /> */}
      <SeoHead
        HeadTitle={"Photos Upload | Proposal Portal"}
        HeadDescription={"Photos Upload"}
      />
      <section className="UploadDocumentSection py-5">
        <div className="container p-5 ProfileContent">
          <form>
            <div className="row">
              <div className="col-lg-10">
                <h1>Photos Upload</h1>
              </div>
              <div className="col-lg-2 align-right">
                <CandidateLogout />
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12">
                <h1>
                  <span>
                    <b>Note:</b> You can upload 3-4 photos to your profile, each
                    must be less than 1 MB and in jpg or png format. Upload one
                    recent full sized photo and half-length photo. All photos
                    need to be in light clothing, simple background and looking
                    straight.
                  </span>
                </h1>
                <div className="form-group">
                  <div className="Form-declareInput">
                    <input
                      type="checkbox"
                      className="Form-declareInput input[type=checkbox]"
                      id="declare_accept"
                      name="declare_accept"
                      value={isChecked}
                      checked={isChecked}
                      onChange={handleOnChange}
                    />{" "}
                    <span className="Form-declare">
                      I declare the above form filled is true and correct to the
                      best of my knowledge {"&"} belief. I agree to the{" "}
                      <a
                        href="https://www.srcm.in/terms-of-use/"
                        target="_blank"
                      >
                        Terms of Use
                      </a>{" "}
                      and{" "}
                      <a
                        href="https://www.srcm.in/privacy-policy"
                        target="_blank"
                      >
                        Privacy Policy
                      </a>{" "}
                      of Heartfulness Institute’s India.
                      <span className="requiredColor">*</span>
                    </span>
                  </div>{" "}
                  &nbsp;
                  <span className="error_validation ml-3">
                    {isCheckedError === true && "This field is required."}
                  </span>
                  <div className="Form-declareInput">
                    <input
                      type="checkbox"
                      className="Form-declareInput input[type=checkbox]"
                      id="hfn_accept"
                      name="hfn_accept"
                      value={isDeclareChecked}
                      checked={isDeclareChecked}
                      onChange={handleOnDeclareChange}
                    />{" "}
                    <span className="Form-declare">
                      I declare that my profile information in{" "}
                      <a href="https://my.heartfulness.org" target="_blank">
                        https://my.heartfulness.org
                      </a>{" "}
                      is up to date.<span className="requiredColor">*</span>
                    </span>
                  </div>
                  <span className="error_validation ml-3">
                    {isDeclareCheckedError === true &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div className="col-lg-6 col-md-6 col-sm-12 PhotoUpload-dragDrop">
                {" "}
                <div className="form-group">
                  <div className="Inputgender">
                    <input
                      type="radio"
                      className="form-control"
                      name="Half"
                      value="Half"
                      checked={radioOption === "Half" ? true : false}
                      onChange={onAddressChanged}
                    />{" "}
                    Half
                  </div>
                  <div className="Inputgender">
                    <input
                      type="radio"
                      className="form-control"
                      name="Full"
                      value="Full"
                      checked={radioOption === "Full"}
                      onChange={onAddressChanged}
                    />{" "}
                    Full
                  </div>
                  <div className="Inputgender">
                    <input
                      type="radio"
                      className="form-control"
                      name="Passport"
                      value="Passport"
                      checked={radioOption === "Passport"}
                      onChange={onAddressChanged}
                    />{" "}
                    Passport Photo
                  </div>
                </div>
                <br />
                <div
                  id={regInfo && regInfo.photoData.length === 4 ? "upload" : ""}
                >
                  {/* <Documents
                    uploads={PersonalDocuments}
                    handleChange={handleChange}
                  /> */}
                  <div>
                    <input
                      type="file"
                      //     disabled={propvalue.info.regInfo[propvalue.disableKey] === 1}
                      onChange={(file) => {
                        handleChange(file);
                      }}
                      ref={imageInputRef}
                      accept="image/png, image/gif, image/jpeg"
                    />
                  </div>
                  <br />
                  <button
                    className="btn btn-primary"
                    type="submit"
                    onClick={photoSubmit}
                  >
                    Submit
                  </button>
                </div>
              </div>
              <div className="col-lg-6"></div>
              <div className="col-lg-6">
                <div className="row">
                  {regInfo && regInfo !== "" && regInfo.photoData.length !== 0
                    ? regInfo.photoData.map((item, index) => {
                        return (
                          <div key={index + 1}>
                            <img
                              src={imageUrl + item.candidate_photo_url}
                              className={`${
                                item.doc_verified === 0
                                  ? "rejected-image img-fluid upload-img-list"
                                  : "img-fluid upload-img-list"
                              }`}
                              alt="Add image List"
                              width="140px"
                              height="177px"
                            />
                            <span
                              className="cursor remove-img"
                              onClick={() => {
                                deletePhoto(item);
                              }}
                            >
                              X
                            </span>
                          </div>
                        );
                      })
                    : null}
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col-lg-8 col-md-6 col-sm-12"></div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <Link to={"/upload-documents"}>
                      <div className="btn btn-primary btn-block PreviousButton">
                        Previous
                      </div>
                    </Link>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <button
                      type="submit"
                      className="btn btn-primary btn-block submit-button"
                      value="Submit"
                      onClick={ProfieSubmit}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </section>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};
export default PhotosUpload;
