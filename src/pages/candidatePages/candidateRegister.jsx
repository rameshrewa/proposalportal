import React, { useState, useEffect, useCallback } from "react";
import { useForm, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-datepicker/dist/react-datepicker.css";
import ReactDatePicker from "react-datepicker";
import Logo from "../../assets/images/proposal-logo.png";
import WorkshopImage from "../../assets/images/workshopRegister.png";
import RegiSucss from "../../assets/images/RegisterSucss.png";
import vowImage from "../../assets/images/vow-image.png";
import SeoHead from "../../layout/Seo/seoBlock";
import Modal from "react-bootstrap/Modal";
import CandidateService from "../../services/admin/candidate.service";
import { lStorage } from "../../utils/storage";
import PaymentProcces from "../../components/candidateComponents/paymentProcess";
import { toast } from "react-toastify";
import Loading from "../../components/shared/common/loading";
import moment from "moment";
import {
  dateconvert,
  datediff,
} from "../../utils/common/dateConvertion";
import { hfnYears } from "../../assets/data/userData";
import StandardDataService from "../../services/common/standardData.service";
import AbhyasiModal from "../../utils/common/abhyasiModal";
import Decline from "../../utils/common/decline";
import Inactive from "../../utils/common/inactive";
import NonUser from "../../utils/common/nonUser";
const CandidateRegister = () => {
  const candidateApi = new CandidateService();
  const standardApi = new StandardDataService();

  let history = useHistory();

  const [workModelShow, setWorkModelShow] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [userLoginInfo, setUserLoginInfo] = useState(null);
  const [noMandatory, setNoMandatory] = useState(false);
  const [exceedCount, setExceedCount] = useState(false);
  const [loading, setLoading] = useState(false);
  const [nonUser, setNonUser] = useState(false);
  const handleWorkshopPopupClose = () => setWorkModelShow(false);
  const popupClose = () => setNoMandatory(false);
  const registerData = lStorage.get("hfn-profile-me")
    ? lStorage.get("hfn-profile-me")
    : history.push("/");
  const [succsmsg, setSuccsmsg] = useState(false);
  const [deletedData, setDeletedData] = useState(false);
  const [submitRequest, setSubmitRequest] = useState(false);
  const [yearValidation, setYearValidation] = useState(false);
  const [wedding, setWedding] = useState(false);
  const [declined, setDeclined] = useState(false);
  const [inactive, setInactive] = useState(false);
  const [user, setUser] = useState({});
  const initialFormState = { ...user };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });
  const onSubmit = async (data) => {
    setLoading(true);
    let currentDate = dateconvert(new Date());
    let hfnJoinDate = dateconvert(data.date_of_joining);
    let vowWorkShopDate = dateconvert(data.workshopDate);
    let allowed = datediff(hfnJoinDate, currentDate);
    const ddd = userLoginInfo && userLoginInfo.data[0];
    const genderVal =
      data.gender === "M" ? "groom_available" : "bride_available";
    const countValidation = ddd[genderVal] > 0 ? true : false;
    if (countValidation) {
      let precpAbhyasiVal;
      precpAbhyasiVal = await standardApi
        .abhyasiSearch(data.ref)
        .then((response) => {
          if (response.data.results.length > 0) {
            return "PreceptorValid";
          } else {
            return "PreceptorNotValid";
          }
        });
      if (allowed > hfnYears && precpAbhyasiVal === "PreceptorValid") {
        const registerData = lStorage.get("hfn-profile-me");
        let infoData = [
          {
            abhyasi_id: data.ref,
            name: data.name,
            email_address: data.email,
            contact_number: data.mobile,
            date_of_joining_hfn: hfnJoinDate,
            gender: data.gender,            
            partner_id : registerData.me.id, 
            workshop_attended_status: data.attendedWorkshopStatus,
            vow_workshop_date: vowWorkShopDate,
          },
        ];
        //Get LoginInfo Details
        candidateApi
          .submitCandidateDetails(JSON.stringify(infoData))
          .then(
            (response) => {
              if (
                response.data.isError === true ||
                response.data.statusCode === "400"
              ) {
                if (
                  response.data.message[0] === "Candidate already registered"
                ) {
                  toast.error("Candidate already registered");
                  setLoading(false);
                } else if (
                  response.data.message[0].email_address[0] ===
                  "The email address has already been taken."
                ) {
                  Logininfo();
                }
              } else if (
                response.data.isError === false ||
                response.data.statusCode === 200
              ) {
                if (response.data.message === "Signup successful") {
                  setUserLoginInfo(response.data);
                  setSuccsmsg(true);
                  setLoading(false);
                  setWorkModelShow(true);
                }
              }
            },
            (error) => {
              const Errormsg = error.response.status;
              if (Errormsg === 500) {
                localStorage.clear();
                history.push("/login");
              }
            }
          )
          .catch((error) => {
            setLoading(false);
            toast.error("Something went wrong");
          });
        // Get LoginInfo Details
      } else {
        setLoading(false);
        if (precpAbhyasiVal === "PreceptorNotValid") {
          toast.error("Please enter valid abhyasi id (hfn id)");
        } else {
          setSubmitRequest(true);
          toast.error("HFN Joining date should be morethan three years");
        }
      }
    } else {
      setExceedCount(true);
    }
  };
  const Logout = useCallback(() => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  });
  const Logininfo = async () => {
    try {
      const todayDat = new Date();
      setLoading(true);
      await candidateApi
        .userLogininfoApi()
        .then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            if (3 <= response.data.data.match_request_declined_count) {
              setLoading(false);
              setDeclined(true);
            } else if (
              response.data.data.wedding_fixed_date &&
              dateconvert(todayDat) >
              dateconvert(
                  response.data.data.wedding_fixed_date !== null &&
                    response.data.data.wedding_fixed_date
                )
            ) {
              setLoading(false);
              setWedding(true);
            } else if (
              response.data.data.wedding_fixed_date &&
              dateconvert(
                response.data.data.wedding_fixed_date !== null &&
                  response.data.data.wedding_fixed_date
              ) > dateconvert(todayDat)
            ) {
              setLoading(false);
              history.push("/confirmWedding");
            } else if (response.data.data.account_status == "inactive") {
              setInactive(true);
              setLoading(false);
            } else if (response.data.data.account_status === "delete") {
              setDeletedData(true);
              setLoading(false);
              setWorkModelShow(true);
            } else {
              if (
                response.data.data.profile_status === "pending_approval" ||
                response.data.data.profile_status === "rejected_for_payment"
              ) {
                setUserLoginInfo(response.data);
                setWorkModelShow(true);
                setSubmitRequest(false);
                setSuccsmsg(false);
                setLoading(false);
              }

              if (response.data.data.account_status === "delete") {
                setUserLoginInfo(response.data);
                setSuccsmsg(true);
                setLoading(false);
                setWorkModelShow(true);
              }
              if (response.data.data.profile_status === "payment_successful") {
                setLoading(false);
                setSuccsmsg(false);
                let status = response.data.data.profile_sub_status;
                status === 1
                  ? history.push("/lifestyle")
                  : status === 2
                  ? history.push("/upload-documents")
                  : status === 3
                  ? history.push("/photos-upload")
                  : status === 4
                  ? history.push("/user-information")
                  : history.push("/personal-detail");
              }
              if (
                response.data.data.profile_status === "approved_for_payment"
              ) {
                setLoading(false);
                setSuccsmsg(false);
                setUserLoginInfo(response.data);
                setPaymentModal(true);
                setSubmitRequest(false);
              }
              if (response.data.data.account_status == "inactive") {
                setLoading(false);
                setInactive(true);
              }
              if (response.data.data.profile_status === "Signup successful") {
                setUserLoginInfo(response.data);
                setSuccsmsg(true);
                setLoading(false);
                setWorkModelShow(true);
              }
              if (
                (response.data.data.profile_status === "profile_submitted" ||
                  response.data.data.profile_status === "document_verified" ||
                  response.data.data.profile_status === "bg_verified" ||
                  response.data.data.profile_status === "Reviewed by Prefect" ||
                  response.data.data.profile_status === "document_approved") &&
                (response.data.data.account_status === "active" ||
                  response.data.data.account_status === "inactive")
              ) {
                setLoading(false);
                setUserLoginInfo(response.data);
              } else if (response.data.statusCode === "500") {
                setUserLoginInfo(response.data);
                setLoading(false);
              } else {
                setLoading(false);
                setUserLoginInfo(response.data);
              }
            }
          }
        })

        .catch(function (error) {
          if (error.response.status === 401) {
            toast.error("Your login session has expired please login again");
            Logout();
            setLoading(false);
          } else {
            toast.error("something went wrong");
            setLoading(false);
          }
        });
    } catch (error) {
      setLoading(false);
      console.log(error, "error");
    }
  };
  useEffect(() => {
    const fields = ["ref", "name", "email", "mobile", "workshopDate", "gender"];
    if (registerData) {
      const abhyasiValidation = registerData.me.user_roles.find(
        (value) => value === "seeker"
      );
      let currentDate = dateconvert(new Date());
      let allowed = datediff(registerData.me.date_of_joining, currentDate);
      if (abhyasiValidation !== "seeker") {
        fields.forEach(
          (field) => setValue(field, registerData.me[field]),
          setValue(
            "date_of_joining",
            registerData.me.date_of_joining && registerData.me.date_of_joining
              ? moment(registerData.me.date_of_joining).toDate()
              : ""
          )
        );
        setUser(registerData.me);
        Logininfo();
      } else if (
        registerData.me.date_of_joining !== null &&
        allowed < hfnYears
      ) {
        setYearValidation(true);
      } else {
        setNonUser(true);
      }
    }
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Register | Proposal Portal"}
        HeadDescription={"Register"}
      />

      <section className="LoginSection py-5">
        {(userLoginInfo === null && loading === false) ||
        (userLoginInfo &&
          userLoginInfo.data.profile_status !== "approved_for_payment" &&
          userLoginInfo.data.profile_status !== "pending_approval") ? (
          <div className="container">
            <div className="row">
              <div className="col-lg-3 col-md-4 col-sm-12 col">
                <div className="LoginSignBg">
                  <div className="login-signlogo mb-5">
                    <img src={Logo} alt="Logo" />
                  </div>
                  <h1>Candidate Registration</h1>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="login-form"
                  >
                    <div className="form-group">
                      <label htmlFor="ref">HFN ID</label>
                      <input
                        type="text"
                        readOnly="readOnly"
                        className="form-control"
                        name="ref"
                        id="ref"
                        autoComplete="off"
                        //value={registerData ? registerData.me.ref === null ? registerData.me.id :registerData.me.ref : null}
                        // readOnly="readOnly"
                        {...register("ref", {
                          required: true,
                          pattern: /^[a-z\d\-_\s]+$/i,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.ref?.type === "required" &&
                          "This field is required."}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.ref?.type === "pattern" &&
                          "Please enter only alpha numeric"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="hfnId">Heartfulness Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="name"
                        id="name"
                        readOnly="readOnly"
                        //value={registerData ? registerData.me.name : null}
                        {...register("name", { required: true })}
                      />
                      <span className="error_validation ml-3">
                        {errors.name?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="date_of_joining">
                        Date of Joining Heartfulness
                      </label>
                      <div>
                        <Controller
                          control={control}
                          name="date_of_joining"
                          defaultValue={null}
                          render={(props) => {
                            return (
                              <ReactDatePicker
                                {...props.field}
                                readOnly="readOnly"
                                onChange={props.field.onChange}
                                selected={props.field.value}
                                className="date-input"
                                yearDropdownItemNumber={100}
                                scrollableYearDropdown={true}
                                showYearDropdown
                                disabled={true}
                                showMonthDropdown
                                autoComplete="off"
                                maxDate={new Date()}
                                placeholderText="MM-DD-YYYY"
                              />
                            );
                          }}
                          rules={{ required: true }}
                        />

                        <span className="error_validation ml-3">
                          {errors.date_of_joining?.type === "required" &&
                            "This field is required."}
                        </span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email ID</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        id="email"
                        //value={registerData ? registerData.me.email : null}
                        readOnly="readOnly"
                        {...register("email", {
                          required: true,
                          pattern: {
                            value:
                              /^([\w.-]+)@(\[(\d{1,3}\.){3}|(?!hotmail|test|testing)(([a-zA-Z\d-]+\.)+))([a-zA-Z]{2,4}|\d{1,3})(\]?)$/,
                            message: "Please enter a valid business email!",
                          },
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.email?.type === "required" &&
                          "This field is required."}
                        {errors.email?.message}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="gender">Gender</label>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 line-height">
                          <input
                            type="radio"
                            className="form-control"
                            name="gender"
                            id="gender"
                            autoComplete="off"
                            value="M"
                            {...register("gender", {
                              required: true,
                            })}
                          />{" "}
                          Male
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 line-height">
                          <input
                            type="radio"
                            className="form-control"
                            name="gender"
                            id="gender"
                            value="F"
                            {...register("gender", {
                              required: true,
                            })}
                          />{" "}
                          Female
                        </div>
                      </div>
                      <span className="error_validation ml-3">
                        {errors.gender?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="mobile">Mobile Number</label>
                      <div className="PhoneInput">
                        <Controller
                          control={control}
                          name="mobile"
                          rules={{
                            validate: (value) => isValidPhoneNumber(value),
                            required: true,
                            minLength: 8,
                          }}
                          render={({ field: { onChange, value } }) => (
                            <PhoneInput
                              international
                              value={value}
                              onChange={onChange}
                              autoComplete="off"
                              id="mobile"
                              defaultCountry="IN"
                              className="form-control"
                            />
                          )}
                        />
                      </div>
                      <span className="error_validation ml-3">
                        {errors.mobile?.type === "required" &&
                          "This field is required."}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.mobile?.type === "validate" &&
                          "Please enter valid phone number."}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.mobile?.type === "maxLength" &&
                          "Phone number max length is 13"}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.mobile?.type === "minLength" &&
                          "Phone number min length is 8"}
                      </span>
                    </div>
                    <div className="form-group">
                      <label htmlFor="attendedWorkshopStatus">
                        Have you attended VOW Workshop?
                      </label>
                      <div className="row">
                        <div className="col-lg-6 col-md-6 col-sm-6 line-height">
                          <input
                            type="radio"
                            className="form-control"
                            name="attendedWorkshopStatus"
                            id="attendedWorkshopStatus"
                            autoComplete="off"
                            value="Y"
                            {...register("attendedWorkshopStatus", {
                              required: true,
                            })}
                            onClick={() => {
                              setSubmitRequest(true);
                            }}
                          />{" "}
                          Yes
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-6 line-height">
                          <input
                            type="radio"
                            className="form-control"
                            name="attendedWorkshopStatus"
                            id="attendedWorkshopStatus"
                            value="N"
                            {...register("attendedWorkshopStatus", {
                              required: true,
                            })}
                            onClick={() => {
                              setSubmitRequest(false);
                              setNoMandatory(true);
                            }}
                          />{" "}
                          No
                        </div>
                      </div>
                      <span className="error_validation ml-3">
                        {errors.attendedWorkshop?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                    <div className="form-group pb-4">
                      <label htmlFor="workshopDate">
                        Date of attending VOW Workshop
                      </label>

                      <Controller
                        control={control}
                        name="workshopDate"
                        defaultValue={null}
                        render={(props) => {
                          return (
                            <ReactDatePicker
                              {...props.field}
                              onChange={props.field.onChange}
                              selected={props.field.value}
                              ref={props.ref}
                              className="date-input"
                              yearDropdownItemNumber={100}
                              scrollableYearDropdown={true}
                              showYearDropdown
                              showMonthDropdown
                              autoComplete="off"
                              maxDate={new Date()}
                              placeholderText="MM-DD-YYYY"
                            />
                          );
                        }}
                        rules={{ required: true }}
                      />
                      <span className="error_validation ml-3">
                        {errors.workshopDate?.type === "required" &&
                          "This field is required."}
                        {errors.workshopDate?.message}
                      </span>
                    </div>
                    <button
                      type="submit"
                      className="btn btn-primary btn-block submit-button"
                      disabled={submitRequest ? false : true}
                    >SUBMIT REQUEST</button>
                    <button
                      type="submit"
                      onClick={Logout}
                      className="btn btn-primary btn-block submit-button"
                    >Logout</button>
                  </form>
                  {userLoginInfo ? (
                    <>
                      {userLoginInfo.data.profile_status ===
                      "approved_for_payment" ? (
                        <PaymentProcces />
                      ) : null}
                    </>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </section>
      {paymentModal === true && <PaymentProcces />}
      {loading && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}

      <Modal
        show={noMandatory}
        onHide={popupClose}
        size="lg"
        keyboard={true}
        backdrop="static"
        className="Suspended-model mt-5"
      >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center">
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <img src={vowImage} alt={WorkshopImage} />
            <h6 className="mt-4 mb-5" style={{ fontWeight: "600" }}>
              It is mandatory to register for
              <br /> VOW workshop to get started
              <br /> with Proposal portal
            </h6>
          </div>
        </div>
      </Modal>
      <Modal
        show={exceedCount}
        size="lg"
        keyboard={true}
        backdrop="static"
        className="Suspended-model mt-5"
      >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center">
            <Modal.Header>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <h6 className="mt-4 mb-5" style={{ fontWeight: "600" }}>
              We are Sorry!.
              <br /> Currently we reached maximum registration .
              <br />
              Please try again after some time
            </h6>
            <button
              type="submit"
              value="Log out"
              className="btn btn-dark-blue"
              onClick={Logout}
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>
      {nonUser && <NonUser />}
      {wedding && <AbhyasiModal />}
      {declined && <Decline />}
      {inactive && <Inactive />}
      <Modal
        show={yearValidation}
        size="lg"
        keyboard={true}
        backdrop="static"
        className="Suspended-model mt-5"
      >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center">
            <Modal.Header>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <h6 className="mt-4 mb-5" style={{ fontWeight: "600" }}>
              We are Sorry!.
              <br /> Your Heartfulness Date of Joining should be greater than
              three years.
              <br />
              Please try again after completion of three years
            </h6>
            <button
              type="submit"
              value="Log out"
              className="btn btn-dark-blue"
              onClick={Logout}
            >
              Log Out
            </button>
          </div>
        </div>
      </Modal>
      <Modal
        show={workModelShow}
        onHide={
          userLoginInfo &&
          userLoginInfo.data.profile_status !== "pending_approval" &&
          handleWorkshopPopupClose
        }
        size="lg"
        keyboard={true}
        backdrop="static"
        className="Suspended-model mt-5"
      >
        <div className="row">
          <div className="col-lg-12 col-md-12 col-sm-12 text-center">
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>

            <div className="py-2">
              <div className="text-right p-3 mobile-open">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={handleWorkshopPopupClose}
                ></button>
              </div>

              {userLoginInfo &&
              userLoginInfo.data.profile_status !== "approved_for_payment" ? (
                <>
                  {" "}
                  {succsmsg ? (
                    <img src={RegiSucss} alt="Register Success" />
                  ) : (
                    <img src={WorkshopImage} alt={WorkshopImage} />
                  )}
                </>
              ) : null}

              {userLoginInfo ? (
                <>
                  {userLoginInfo.data.profile_status === "pending_approval" ? (
                    <>
                      <h6
                        className="mt-4 mb-5"
                        style={{ fontWeight: "600", color: "#fc0000" }}
                      >
                        Your profile status is pending. with the admin Approval
                      </h6>
                      <button
                        type="submit"
                        className="btn btn-dark-blue"
                        value="Log out"
                        onClick={Logout}
                      >
                        Log Out
                      </button>
                    </>
                  ) : null}
                </>
              ) : null}
              {userLoginInfo ? (
                <>
                  {userLoginInfo.data.account_status === "delete" ? (
                    <>
                      <h6
                        className="mt-4 mb-5"
                        style={{ fontWeight: "600", color: "#fc0000" }}
                      >
                        Your profile is deleted
                      </h6>
                      <button
                        type="submit"
                        className="btn btn-dark-blue"
                        value="Log out"
                        onClick={Logout}
                      >
                        Log Out
                      </button>
                    </>
                  ) : null}
                </>
              ) : null}
              {userLoginInfo ? (
                <>
                  {userLoginInfo.data.profile_status ===
                  "rejected_for_payment" ? (
                    <>
                      <h6
                        className="mt-4 mb-5"
                        style={{ fontWeight: "600", color: "#fc0000" }}
                      >
                        Your profile is rejected by the admin
                      </h6>
                      <button
                        type="submit"
                        className="btn btn-dark-blue"
                        value="Log out"
                        onClick={Logout}
                      >
                        Log Out
                      </button>
                    </>
                  ) : null}
                </>
              ) : null}

              {succsmsg &&
              userLoginInfo &&
              userLoginInfo.data.profile_status !== "pending_approval" ? (
                <>
                  <h6 className="mt-4 mb-5 register-page">
                    Registered Successfully
                  </h6>
                  <p>
                    Dear candidate your registration
                    <br /> Process started successfully you will <br />
                    be notified with a payment link
                    <br /> after admins Approval
                  </p>
                  <button
                    type="submit"
                    value="Log out"
                    className="btn btn-dark-blue"
                    onClick={Logout}
                  >
                    Log Out
                  </button>
                </>
              ) : (
                <></>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CandidateRegister;
