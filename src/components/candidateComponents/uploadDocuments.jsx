import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import CandidateService from "../../services/admin/candidate.service";
import SeoHead from "../../layout/Seo/seoBlock";
import FileUploadDocs from "../shared/educationDocs";
import { toast } from "react-toastify";
import Documents from "../shared/common/documents";
import { Modal } from "react-bootstrap";
import Loading from "../shared/common/loading";
import {
  FileSizeCheck,
  FileValidation,
} from "../../utils/common/fileValidation";
import CandidateLogout from "../shared/common/candidateLogout";
import { lStorage } from "../../utils/storage";
import NonUser from "../../utils/common/nonUser";
import AbhyasiModal from "../../utils/common/abhyasiModal";
import Decline from "../../utils/common/decline";
import { yearconvert } from "../../utils/common/dateConvertion";
// import imageCompression from "browser-image-compression";
// import { compressOptions } from "../shared/common/imageCompress";
const UploadDocuments = () => {
  const candidateApi = new CandidateService();
  let history = useHistory();
  const profileData = lStorage.get("hfn-profile-me");
  const [regInfo, setRegInfo] = useState("");
  const [loading, setLoading] = useState(false);
  const [nonUser, setNonUser] = useState(false);
  const [wedding, setWedding] = useState(false);
  const [declined, setDeclined] = useState(false);
  const Logout = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };

  const Logininfo = () => {
    setLoading(true);
    candidateApi
      .userReginfoApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLoading(false);
          setRegInfo(response.data.data);
        } else {
          setLoading(false);
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
  const { handleSubmit } = useForm();

  const pan_document = [
    {
      name: "Pan Card",
      value: "pan_document",
      fileTypes: ["JPG", "PNG", "GIF"],
      typeValue: "personal",
      info: { regInfo },
      disableKey: "pan_proof_verified",
    },
  ];
  const aadhar_document_front = [
    {
      name: "Aadhaar Card Front",
      value: "aadhar_document_front",
      fileTypes: ["JPG", "PNG", "GIF"],
      typeValue: "personal",
      disableKey: "aadhaar_front_proof_verified",
      info: { regInfo },
    },
  ];
  const aadhar_document_back = [
    {
      name: "Aadhaar Card Back",
      value: "aadhar_document_back",
      fileTypes: ["JPG", "PNG", "GIF"],
      typeValue: "personal",
      disableKey: "aadhaar_back_proof_verified",
      info: { regInfo },
    },
  ];
  const birth_certificate_document = [
    {
      name: "Birth Certificate",
      value: "birth_certificate_document",
      fileTypes: ["JPG", "PNG", "GIF"],
      typeValue: "personal",
      disableKey: "dob_proof_verified",
      info: { regInfo },
    },
  ];
  const divorcee_document = [
    {
      name: "Divorce Document",
      value: "divorcee_document",
      fileTypes: ["JPG", "PNG", "GIF"],
      typeValue: "personal",
      disableKey: "divorce_proof_verified",
      info: { regInfo },
    },
  ];
  const passport_document = [
    {
      name: "passport document",
      value: "passport_document",
      fileTypes: ["JPG", "PNG", "GIF"],
      typeValue: "personal",
      disableKey: "passport_proof_verified",
      info: { regInfo },
    },
  ];

  const OccupationDocuments = [
    {
      name: "Employee ID card",
      value: "employee_idcard_url",
      typeValue: "occupation",
      info: { regInfo },
      disableKey: "emp_idcard_verified",
    },
  ];
  const OccupationDocuments1 = [
    {
      name: "Income Proof",
      value: "employee_salary_slip",
      fileTypes: ["JPG", "PNG", "GIF"],
      typeValue: "occupation",
      disableKey: "salary_slip_verified",
      info: { regInfo },
    },
  ];
  const OccupationDocuments2 = [
    {
      name: "Employee Appointment Letter",
      value: "employee_appointent_letter",
      typeValue: "occupation",
      disableKey: "letter_of_appointment_verified",
      info: { regInfo },
    },
  ];

  const onSubmit = (data) => {
    setLoading(true);
    const emptyValue = regInfo.educationData.map((item) => {
      return item.candidate_education_doc === null;
    });
    if (
      // regInfo.aadhar_document_back === null ||
      // regInfo.aadhar_document_front === null ||
      // regInfo.pan_document === null ||
      regInfo.birth_certificate_document === null
    ) {
      setLoading(false);
      toast.error("upload all personal Documents");
    } else if (emptyValue.find((x) => x === true)) {
      toast.error("please upload all education documents");
      setLoading(false);
    } else if (
      regInfo &&
      regInfo.marital_status === "Divorced" &&
      regInfo &&
      regInfo.divorcee_document === null
    ) {
      setLoading(false);
      toast.error("upload Divorced document");
    } else if (
      regInfo.professionData &&
      regInfo.professionData.org_name !== null &&
      regInfo.professionData.org_name !== "" &&
      // regInfo.professionData.employee_appointent_letter === null ||
      // regInfo.professionData.employee_idcard_url === null ||
      regInfo.professionData.employee_salary_slip === null
    ) {
      setLoading(false);
      toast.error("upload all Occupation Documents");
    } else {
      if (regInfo.profile_sub_status === 5) {
        history.push("/user-information");
      } else {
        history.push("/photos-upload");
        setLoading(false);
      }
    }
  };
  const handleChangeocc = async (data, docDetails) => {
    let imagekey = docDetails.value;
    let imagetype = docDetails.typeValue;
    let testFile = data.target.files[0];
    let filecheck = FileValidation(testFile);
    let fileSize = FileSizeCheck(testFile);
    //const compressedFile = await imageCompression(testFile, compressOptions);

    // const fileSize = (await compressedFile.size) > 2e6;
    if (filecheck && fileSize === false) {
      setLoading(true);
      const formData = new FormData();
      formData.set(imagekey, testFile);
      formData.set("type", imagetype);
      if (docDetails.typeValue === "occupation"){
        formData.set(
          "designation",
          docDetails.info.regInfo.professionData.designation
        );
        formData.set(
          "candidate_profession_id",
          docDetails.info.regInfo.professionData.candidate_profession_id
        );
      }
      formData.append("_method", "POST");
      if (regInfo.profile_sub_status === 5) {
        formData.append("field_resubmitted", docDetails.disableKey);
      }
      candidateApi
        .documentsApi(formData)
        .then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            setLoading(false);
            toast.success(response.data.message);
            Logininfo();
          } else {
            toast.error("something went wrong");
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("something went wrong");
        });
    } else {
      if (fileSize) {
        toast.error(
          "File size is more than 1 MB please upload file below 1 MB"
        );
      } else {
        toast.error("please upload valid file");
      }
    }
  };
  const eduhandleChange = async (file, data) => {
    let testFile = file.target.files[0];
    let filecheck = FileValidation(testFile);
    //  const compressedFile = await imageCompression(testFile, compressOptions);
    let fileSize = FileSizeCheck(testFile);

    if (filecheck && fileSize === false) {
      setLoading(true);
      const formData = new FormData();
      formData.set("candidate_education_doc", testFile);
      formData.set("candidate_education_id", data.candidate_education_id);
      formData.set("type", "qualification");
      formData.append("_method", "POST");
      if (regInfo.profile_sub_status === 5) {
        formData.append("field_resubmitted", "doc_verified");
      }
      candidateApi
        .documentsApi(formData)
        .then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            toast.success(response.data.message);
            setLoading(false);
            Logininfo();
          } else {
            toast.error("something went wrong");
            setLoading(false);
          }
        })
        .catch((err) => {
          setLoading(false);
          toast.error("something went wrong");
        });
    } else {
      if (fileSize) {
        toast.error(
          "File size is morethan 1 MB please upload files below 1 MB"
        );
      } else {
        toast.error("please upload valid file");
      }
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
      {" "}
      <SeoHead
        HeadTitle={"Documents | Proposal Portal"}
        HeadDescription={"Documents"}
      />
      <section className="UploadDocumentSection py-5">
        <div className="container p-5 ProfileContent">
          <div className="row">
            <div className="col-lg-10 col-xs-12">
              <h1 className="up-load-text-doc">
                Upload Your Documents
                <br />
                <span>
                  <b>Note:</b> All Documents should be In JPG, PNG &amp; PDF
                  format and size should not be more than 1 MB in size
                </span>
                <br />
                <span>
                  <b>Birth Certificate (Disclaimer):</b> Upload Birth
                  Certificate (or) PAN (or) Passport (or) 10<sup>th</sup>marks
                  sheet.
                </span>
                <br />
                <span>
                  <b>Proof Of Income (Disclaimer):</b> Upload Salary slip (or)
                  Form 16 (or) Form 15G.
                </span>
              </h1>
            </div>
            <div className="col-lg-2 align-right col-xs-12">
              <CandidateLogout />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="personalDetailForm"
          >
            <div className="row">
              <div className="col col-lg-12">
                <h5 className="PersonalDocuemnts">Personal Documents</h5>
              </div>
            </div>
            <div className="row mt-2">
              {/* <Documents
                uploads={pan_document}
                handleChange={handleChangeocc}
              /> */}
              {/* <Documents
                uploads={aadhar_document_front}
                handleChange={handleChangeocc}
              /> */}
              {/* <Documents
                uploads={aadhar_document_back}
                handleChange={handleChangeocc}
              /> */}
              {/* {regInfo &&
                regInfo.nationality &&
                regInfo.nationality.nationality !== "Indian" && (
                  <Documents
                    uploads={passport_document}
                    handleChange={handleChangeocc}
                  />
                )} */}
              {regInfo && regInfo.marital_status === "Divorced" && (
                <Documents
                  uploads={divorcee_document}
                  handleChange={handleChangeocc}
                />
              )}
              <Documents
                uploads={birth_certificate_document}
                handleChange={handleChangeocc}
              />
              <Documents
                uploads={OccupationDocuments1}
                handleChange={handleChangeocc}
              />
            </div>
            <div className="row mt-5">
              <div className="col col-lg-12">
                <h5 className="HeaderDocuments">Qualification Documents</h5>
              </div>
            </div>
            <div className="row mt-2">
              <FileUploadDocs
                uploads={regInfo.educationData}
                handleChange={eduhandleChange}
              />
              {/* <Pancard uploads={regInfo.educationData} />
                            <Pancard uploads={QualificationDocuments1} /> */}
            </div>
            {regInfo.professionData &&
              regInfo.professionData.org_name !== null &&
              regInfo.professionData.org_name !== "" && (
                <>
                  {" "}
                  {/* <div className="row mt-5">
                    <div className="col col-lg-12">
                      <h5 className="HeaderDocuments">Occupation Documents</h5>
                    </div>
                  </div> */}
                  {/* <div className="row mt-2">
                    <Documents
                      uploads={OccupationDocuments}
                      handleChange={handleChangeocc}
                    />
                    <Documents
                      uploads={OccupationDocuments1}
                      handleChange={handleChangeocc}
                    />
                    <Documents
                      uploads={OccupationDocuments2}
                      handleChange={handleChangeocc}
                    />
                  </div> */}
                </>
              )}
            <div className="row mt-5">
              <div className="col"></div>
              {regInfo.profile_sub_status === 5 ? (
                <>
                  <div className="col-lg-3 col-md-4 col-sm-12 mt-3">
                    <Link
                      to={"/user-information"}
                      className="btn btn-primary btn-block PreviousButton"
                    >
                      Back
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 mt-3">
                    <input
                      type="submit"
                      className="btn btn-primary btn-block submit-button"
                      value="Submit"
                    />
                  </div>{" "}
                </>
              ) : (
                <>
                  <div className="col-lg-3 col-md-4 col-sm-12 mt-3">
                    <Link
                      to={"/lifestyle"}
                      className="btn btn-primary btn-block PreviousButton"
                    >
                      Previous
                    </Link>
                  </div>
                  <div className="col-lg-3 col-md-4 col-sm-12 mt-3">
                    <input
                      type="submit"
                      className="btn btn-primary btn-block submit-button"
                      value="Save & Next"
                    />
                  </div>
                </>
              )}
            </div>
          </form>
        </div>
      </section>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
      {nonUser && <NonUser />}
      {wedding && <AbhyasiModal />}
      {declined && <Decline />}
    </>
  );
};
export default UploadDocuments;
