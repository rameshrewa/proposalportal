import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import ReactDatePicker from "react-datepicker";
//import UserHeader from "./usersHeader";
import SeoHead from "../../layout/Seo/seoBlock";
import MissingDocut from "../shared/uploadMissingDocumentsModel";

import { Link, useHistory } from "react-router-dom";

import StandardDataService from "../../services/common/standardData.service";

import CandidateService from "../../services/admin/candidate.service";

import { Typeahead } from "react-bootstrap-typeahead";

import "react-bootstrap-typeahead/css/Typeahead.css";
import { isValidPhoneNumber } from "react-phone-number-input";
import PhoneInput from "react-phone-number-input";
import Loading from "../shared/common/loading";
import { Modal } from "react-bootstrap";
import CandidateLogout from "../shared/common/candidateLogout";
import { maritalStatus } from "../../assets/data/userData";
import { toast } from "react-toastify";
import { lStorage } from "../../utils/storage";
import { useCallback } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { yearconvert } from "../../utils/common/dateConvertion";

import "../../assets/styles/scss/personalDetails.scss";

function calculateAge(birthday) {
  // birthday is a date
  var ageDifMs = Date.now() - birthday;
  var ageDate = new Date(ageDifMs); // miliseconds from epoch
  return Math.abs(ageDate.getUTCFullYear() - 1970);
}

const PersonalDetail = () => {
  let history = useHistory();
  const [languageList, setLanguageList] = useState("");
  const [languageMotherList, setLanguageMotherList] = useState([]);
  const [options, setOptions] = useState("");
  const [centerOptions, setCenterOptions] = useState("");
  const [natationVale, setNatationVale] = useState("");
  const [nationalityList, setNationalityList] = useState("");
  const [user, setUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [fatherAbhyasi, setFatherAbhyasi] = useState("Y");
  const [motherAbhyasi, setMotherAbhyasi] = useState("Y");
  const profileData = lStorage.get("hfn-profile-me");
  const [isMeditated, setIsMeditated] = useState("N");

  const standardApi = new StandardDataService();
  const candidateApi = new CandidateService();
  const initialFormState = { ...user };
  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
    clearErrors,
  } = useForm({
    defaultValues: initialFormState,
  });
  const Logout = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };
  const cityChange = (e) => {
    if (e.length !== 0) {
      setValue("country", e[0].country);
      setValue("country_id", e[0].country_id);
      setValue("state", e[0].state);
      setValue("city", e, { shouldValidate: true });
      clearErrors("city");
    } else {
      setValue("country", "");
      setValue("country_id", "");
      setValue("state", "");
      setValue("city", "");
    }
  };
  const centerChange = (e) => {
    if (e.length !== 0) {
      setValue("center", e, { shouldValidate: true });
    } else {
      setValue("center", "");
    }
  };
  const natChange = (e) => {
    if (e.length !== 0) {
      setValue("nationality", [e[0]], {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  const LoadNationality = () => {
    standardApi.standardDataApi("nat").then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        let dropdownOptions = response.data.data.map((value) => {
          return {
            label: value.nationality,
            value: value.nationality_id,
          };
        });
        setNationalityList(dropdownOptions);
      } else {
      }
    });
  };
  const LoadLanguage = () => {
    standardApi.standardDataApi("lang").then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        let dropdownOptions = response.data.data.map((value) => {
          return { label: value.language_name, value: value.language_id };
        });
        setLanguageList(dropdownOptions);
        setLanguageMotherList(dropdownOptions);
      } else {
      }
    });
  };
  const loadCenter = async (id) => {
    if (id !== undefined) {
      const itemsToDisplays = [];
      await standardApi.srcmGetCenters(id).then((response) => {
        response.data.results.map((permission) => {
          itemsToDisplays.push({
            label: permission.complete_name,
            value: permission.id,
          });
          setValue("center", itemsToDisplays);
          setCenterOptions(itemsToDisplays);
        });
      });
    }
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
          const fields = [
            "candidate_id",
            "contact_number",
            "email_address",
            "siblings",
            // "passport_number",
            "health_condition",
            "alt_contact_number",
            "address",
            "pan_document",
            "aadhar_document",
            "passport_document",
            "birth_certificate_document",
            "divorcee_document",
            "photoData",
            "professionData",
            "educationData",
            "match_request_declined_count",
            "preceptor_id",
            "preceptor_name",
            "marital_status",
            "state",
            "religion",
            "father_contact",
            // "aadhar_number",
            "name",
            "father_name",
            "center_name",
            "fathers_occupation",
            "mother_name",
            "mother_name",
            "mother_contact",
            "father_abhyasi_id",
            "mother_abhyasi_id",
            "mothers_occupation",
            // "pan_number",
            "medication_details",
            //"city",
          ];
          // let status = response.data.data.profile_sub_status;
          // status === 1
          //   ? history.push("/lifestyle")
          //   : status === 2
          //   ? history.push("/upload-documents")
          //   : status == 3
          //   ? history.push("/photo-upload")
          //   : status == 4
          //   ? history.push("/user-information")
          //   : history.push("/personal-detail");
          let dropdownOptions =
            response.data.data.languages_spoken &&
            response.data.data.languages_spoken.map((value) => {
              return { label: value.language_name, value: value.language_id };
            });
          if (response.data.data.is_abhiyasi) {
            setFatherAbhyasi(
              response.data.data.is_abhiyasi === "Y" ? "Y" : "N"
            );
          }
          if (response.data.data.is_she_abhiyasi) {
            setMotherAbhyasi(
              response.data.data.is_she_abhiyasi === "Y" ? "Y" : "N"
            );
          }
          if (response.data.data.center !== "") {
            loadCenter(response.data.data.center);
          }
          setLoading(false);
          fields.forEach(
            (field) => setValue(field, response.data.data[field]),

            setValue(
              "pan_number",
              response.data.data.pan_number && response.data.data.pan_number
                ? response.data.data.pan_number
                : ""
            ),
            setValue(
              "country",
              response.data.data.country && response.data.data.country
                ? response.data.data.country.country_name
                : ""
            ),
            setValue(
              "dob",
              response.data.data.dob && response.data.data.dob
                ? moment(response.data.data.dob).toDate()
                : ""
            ),
            setValue(
              "mother_tongue",
              response.data.data.mother_tongue
                ? [
                    {
                      label: response.data.data.mother_tongue[0].language_name,
                      value: response.data.data.mother_tongue[0].language_id,
                    },
                  ]
                : []
            ),
            setValue(
              "nationality",
              response.data.data.nationality
                ? [
                    {
                      label: response.data.data.nationality.nationality,
                      value: response.data.data.nationality.nationality_id,
                    },
                  ]
                : []
            ),
            setValue(
              "city",
              response.data.data.city
                ? [
                    {
                      label: response.data.data.city,
                      value: response.data.data.city,
                    },
                  ]
                : []
            ),
            // setValue(
            //   "center",
            //   response.data.data.zone_name && response.data.data.zone_id
            //     ? [
            //         {
            //           label: response.data.data.zone_name,
            //           value: response.data.data.zone_id,
            //         },
            //       ]
            //     : []
            // ),
            setValue(
              "is_she_abhiyasi",
              response.data.data.is_she_abhiyasi &&
                response.data.data.is_she_abhiyasi
                ? response.data.data.is_she_abhiyasi
                : "Y"
            ),
            setValue(
              "is_abhiyasi",
              response.data.data.is_abhiyasi && response.data.data.is_abhiyasi
                ? response.data.data.is_abhiyasi
                : "Y"
            ),
            setValue(
              "under_medication",
              response.data.data.under_medication &&
                response.data.data.under_medication === 1
                ? "Y"
                : "N"
            ),
            setValue(
              "medication_details",
              //  response.data.data.under_medication && response.data.data.under_medication === 1  &&
              response.data.data.medication_details
                ? response.data.data.medication_details
                : ""
            ),
            setValue(
              "gender",
              response.data.data.gender && response.data.data.gender
                ? response.data.data.gender
                : "M"
            ),
            setValue("languages_spoken", dropdownOptions)
          );
          setUser(response.data.data);
          if (response.data.data.under_medication) {
            setIsMeditated(
              response.data.data.under_medication === 1 ? "Y" : "N"
            );
          }
          if (response.data.data.nationality) {
            setNatationVale({
              label: response.data.data.nationality.nationality,
              value: response.data.data.nationality.nationality_id,
            });
          }
          setLoading(false);
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
  const cityChangeValue = async (ev) => {
    let searchValue = ev.target.value.toLowerCase();
    if (searchValue.length > 0) {
      let value = searchValue.slice(0, 3);
      let itemsToDisplays = [];
      await standardApi.srcmCitites(value).then((response) => {
        response.data.results.map((permission) => {
          itemsToDisplays.push({
            label: permission.name,
            state: permission.state,
            country: permission.country,
            country_id: permission.country_id,
          });
        });
        setOptions(itemsToDisplays);
        clearErrors("city");
      });
      if (searchValue.length > 3) {
        const suggestionsList = itemsToDisplays.filter((list) => {
          return list.label.toLowerCase().startsWith(searchValue);
        });
        setOptions(suggestionsList);
      }
    }
  };
  const centerChangeValue = async (ev) => {
    let searchValue = ev.target.value.toLowerCase();
    if (searchValue.length > 0) {
      let value = searchValue.slice(0, 3);
      let itemsToDisplays = [];
      await standardApi.srcmCenters(value).then((response) => {
        response.data.results.map((permission) => {
          itemsToDisplays.push({
            label: permission.complete_name,
            value: permission.id,
          });
          setLoading(false);
        });
        setCenterOptions(itemsToDisplays);
        setLoading(false);
      });
      if (searchValue.length > 3) {
        const suggestionsList = itemsToDisplays.filter((list) => {
          return list.label.toLowerCase().includes(searchValue);
        });
        setCenterOptions(suggestionsList);
        setLoading(false);
      }
    }
  };
  const fatherAbhyasiChange = useCallback(
    (data) => {
      if (data === "Y") {
        setFatherAbhyasi(data);
      } else {
        setFatherAbhyasi(data);
        setValue("father_abhyasi_id", "");
      }
    },
    [fatherAbhyasi]
  );
  const motherAbhyasiChange = useCallback(
    (data) => {
      if (data === "Y") {
        setMotherAbhyasi(data);
      } else {
        setMotherAbhyasi(data);
        setValue("mother_abhyasi_id", "");
      }
    },
    [motherAbhyasi]
  );
  const meditationChange = useCallback(
    (data) => {
      if (data === "Y") {
        setIsMeditated(data);
      } else {
        setIsMeditated(data);
        setValue("medication_details", "");
      }
    },
    [isMeditated]
  );

  const onSubmit = async (data) => {
    const ages = calculateAge(data.dob);
    if (ages >= 18) {
      const profileAbhyasi = String(profileData.me.abhyasi_id);
      const fatherAbhyasi_id = data.father_abhyasi_id;
      const motherAbhyasi_id = data.mother_abhyasi_id;
      const precepId = data.preceptor_id;
      setLoading(true);
      let valid =
        precepId !== "" &&
        precepId === (profileAbhyasi !== null && profileAbhyasi !== "") &&
        profileAbhyasi
          ? toast.error("Preceptor and Abhyasi should not same")
          : motherAbhyasi === "Y" && precepId === motherAbhyasi_id
          ? toast.error("Preceptor and Mother abhyasi should not same")
          : motherAbhyasi === "Y" &&
            fatherAbhyasi === "Y" &&
            motherAbhyasi_id === fatherAbhyasi_id
          ? toast.error("Father and Mother abhyasi should not same")
          : fatherAbhyasi === "Y" && precepId === fatherAbhyasi_id
          ? toast.error("Preceptor and Father abhyasi should not same")
          : "valid";
      let precpAbhyasiVal;
      precpAbhyasiVal = await standardApi
        .abhyasiSearch(data.preceptor_id)
        .then((response) => {
          if (response.data.results.length > 0) {
            return "PreceptorValid";
          } else {
            return "PreceptorNotValid";
          }
        });
      let fatherAbhyasiVal;
      if (fatherAbhyasi_id !== "" && fatherAbhyasi_id !== undefined) {
        fatherAbhyasiVal = await standardApi
          .abhyasiSearch(fatherAbhyasi_id)
          .then((response) => {
            if (response.data.results.length > 0) {
              return "FatherValid";
            } else {
              return "FatherNotValid";
            }
          });
      }
      let motherValidation;
      if (motherAbhyasi_id !== "" && motherAbhyasi_id !== undefined) {
        motherValidation = await standardApi
          .abhyasiSearch(motherAbhyasi_id)
          .then((response) => {
            if (response.data.results.length > 0) {
              return "MotherValid";
            } else {
              return "MotherNotValid";
            }
          });
      }
      let langValues;
      langValues =
        data &&
        data.languages_spoken.map((item) => {
          return item.value;
        });
      let motherLang;
      motherLang =
        data &&
        data.mother_tongue.map((item) => {
          return item.value;
        });
      const motherAbha =
        motherAbhyasi === "Y" ? motherValidation == "MotherValid" : true;
      const fatherAbha =
        fatherAbhyasi === "Y" ? fatherAbhyasiVal == "FatherValid" : true;
      if (
        valid === "valid" &&
        motherAbha &&
        fatherAbha &&
        precpAbhyasiVal === "PreceptorValid"
      ) {
        let submitData = [
          {
            gender: data.gender,
            address: data.address,
            dob: data.dob,
            marital_status: data.marital_status,
            // aadhar_number: data.aadhar_number,
            // pan_number: data.pan_number,
            country_id:
              data.country_id === null || data.country_id === undefined
                ? user.country.country_id
                : data.country_id,
            city: data.city[0].label,
            state: data.state,
            nationality: data.nationality[0].value,
            preceptor_id: data.preceptor_id,
            preceptor_name: data.preceptor_name,
            // passport_number: data.passport_number,
            // zone_id: data.center[0].value,
            // zone_name: data.center[0].label,
            languages_spoken: langValues.toString(),
            //financial_status: data.financial_status,
            mother_tongue: motherLang.toString(),
            siblings: data.siblings,
            is_she_abhiyasi: data.is_she_abhiyasi,
            father_name: data.father_name,
            father_abhyasi_id: data.father_abhyasi_id,
            mother_abhyasi_id: data.mother_abhyasi_id,
            mother_name: data.mother_name,
            is_abhiyasi: data.is_abhiyasi,
            father_contact: data.father_contact,
            mother_contact: data.mother_contact,
            fathers_occupation: data.fathers_occupation,
            mothers_occupation: data.mothers_occupation,
            under_medication: data.under_medication === "Y" ? 1 : 0,
            medication_details: data.medication_details,
            center_name: data.center_name,
            // centernew: data.centernew,
            // center1:data.center1
          },
        ];
        candidateApi
          .personalCandidateDetails(JSON.stringify(submitData))
          .then((response) => {
            if (
              response.data.isError === false ||
              response.data.statusCode === "200"
            ) {
              setLoading(false);
              if (user.profile_sub_status === 5) {
                history.push("/user-information");
              } else {
                history.push("/lifestyle");
              }
            } else {
            }
          });
      } else {
        setLoading(false);
        if (precpAbhyasiVal === "PreceptorNotValid") {
          toast.error("Please enter valid preceptor Id");
        }
        if (fatherAbhyasiVal === "FatherNotValid") {
          toast.error("Please enter valid father abhyasi");
        }
        if (motherValidation === "MotherNotValid") {
          toast.error("Please enter valid mother abhyasi");
        }
      }
    } else {
      toast.error("age must be greater than are equal to 18");
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
    const authVal = lStorage.get("logInfo");
    const todayDat = new Date();
    const abhyasiValidation = profileData.me.user_roles.find(
      (value) => value === "seeker"
    );

    if (
      3 <= authVal.match_request_declined_count &&
      authVal.match_request_declined_count
    ) {
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
      LoadLanguage();
      LoadNationality();
      Logininfo();
      const uDetails =
        typeof window !== "undefined" && window.localStorage
          ? localStorage.getItem("authInfo")
          : null;
      if (!uDetails) {
        history.push("/register");
      }
    } else {
      history.push("/error");
    }
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Personal Detail | Proposal Portal"}
        HeadDescription={"Personal Detail"}
      />
      {/* <UserHeader /> */}
      <MissingDocut />
      <section className="UserHeaderSection py-5">
        <div className="container p-5 ProfileContent pad-left-right10">
          <div className="row">
            <div className="col col-lg-10">
              <h1>Personal detail</h1>
            </div>
            <div className="col col-lg-2 align-right">
              <CandidateLogout />
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="personalDetailForm"
          >
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="hfnId">
                    Name<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    readOnly="readOnly"
                    {...register("name", {
                      required: true,
                      pattern: /^[a-z\d\-_\s]+$/i,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.name?.type === "required" &&
                      "This field is required."}
                    {errors.name && errors.name.type === "maxLength" && (
                      <span>Max length exceeded</span>
                    )}
                    {errors.name && errors.name.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <div>
                    <label htmlFor="gender">
                      Gender<span className="requiredColor">*</span>
                    </label>
                    <div className="Inputgender">
                      <input
                        type="radio"
                        className="form-control"
                        name="gender"
                        value="M"
                        {...register("gender", { required: true })}
                      />{" "}
                      Male
                    </div>
                    <div className="Inputgender">
                      <input
                        type="radio"
                        className="form-control"
                        name="gender"
                        value="F"
                        {...register("gender", { required: true })}
                      />{" "}
                      Female
                      <span className="error_validation ml-3">
                        {errors.gender?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="dob">
                    Date of Birth<span className="requiredColor">*</span>
                  </label>
                  {/* <DatePicker
                    className="form-control"
                    name="dob"
                    selected={startDate}
                    dateFormat="MM-dd-yyyy"
                    maxDate={new Date()}
                    onChange={hanldeDob}
                  /> */}
                  <div>
                    {/* <Controller
                      control={control}
                      name="dob"
                      rules={{ required: true }}
                      render={({ field: { onChange, value } }) => (
                        <DatePicker
                          // className="form-control"
                          name="dob"
                          selected={value}
                          yearDropdownItemNumber={100}
                          scrollableYearDropdown={true}
                          showYearDropdown
                          showMonthDropdown
                          maxDate={new Date()}
                          onChange={onChange}
                        />
                      )}
                    /> */}
                    <Controller
                      control={control}
                      name="dob"
                      defaultValue={null}
                      render={(props) => {
                        return (
                          <ReactDatePicker
                            {...props.field}
                            onChange={props.field.onChange}
                            selected={props.field.value}
                            className="date-input"
                            yearDropdownItemNumber={100}
                            scrollableYearDropdown={true}
                            autoComplete="off"
                            showYearDropdown
                            showMonthDropdown
                            maxDate={new Date()}
                            placeholderText="MM-DD-YYYY"
                          />
                        );
                      }}
                      rules={{ required: true }}
                    />
                  </div>
                  <span className="error_validation ml-3">
                    {errors.dob?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="contact_number*">
                    Mobile Number<span className="requiredColor">*</span>
                  </label>
                  <Controller
                    control={control}
                    name="contact_number"
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
                        id="contact_number"
                        defaultCountry="IN"
                        className="form-control"
                      />
                    )}
                  />
                  <span className="error_validation ml-3">
                    {errors.contact_number?.type === "required" &&
                      "This field is required."}
                  </span>
                  <span className="error_validation ml-3">
                    {errors.contact_number?.type === "validate" &&
                      "Please enter valid phone number."}
                  </span>
                  <span className="error_validation ml-3">
                    {errors.contact_number?.type === "maxLength" &&
                      "Phone number max length is 13"}
                  </span>
                  <span className="error_validation ml-3">
                    {errors.contact_number?.type === "minLength" &&
                      "Phone number min length is 8"}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <label htmlFor="nationality">
                  Nationality<span className="requiredColor">*</span>
                </label>
                <div className="form-group fa-angle-down">
                  <Controller
                    control={control}
                    name="nationality"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Typeahead
                        id="nationality"
                        defaultSelected={value}
                        // onChange={onChange}
                        onChange={(event, option) => {
                          onChange();
                          natChange(event);
                          setNatationVale(...event);
                        }}
                        options={nationalityList}
                        // onInputChange={ (text, e) => {
                        //   nationChange(text);
                        //   console.log(value)
                        // setNatationVale(value)                    }
                        //   }
                        placeholder="Choose a Nationality..."
                        className="fa-angle-down autocomplete-custom-st"
                        selected={value}
                      />
                    )}
                  />
                  <span className="error_validation ml-3">
                    {errors.nationality?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              {/* {natationVale && natationVale.label === "Indian" ? (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="aadhar_number*">
                      Aadhaar Number<span className="requiredColor">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="aadhar_number"
                      {...register("aadhar_number", {
                        required: true,
                        pattern: {
                          value: /^[0-9]{12}$/,
                          message: "Please enter valid aadhar number",
                        },
                      })}
                    />
                    <span className="error_validation ml-3">
                      {errors.aadhar_number?.type === "required" &&
                        "This field is required."}
                      {errors.aadhar_number?.type === "pattern" &&
                        errors.aadhar_number.message}
                    </span>
                  </div>
                </div>
              ) : null} */}
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="email_address">
                    Email Address<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="email_address"
                    className="form-control"
                    name="email_address"
                    readOnly
                    {...register("email_address", { required: true })}
                  />
                  <span className="error_validation ml-3">
                    {errors.email_address?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="marital_status">
                    Marital Status<span className="requiredColor">*</span>
                  </label>
                  <select
                    name="marital_status"
                    className="form-control"
                    {...register("marital_status", { required: true })}
                  >
                    <option value="">Select</option>
                    {maritalStatus.map((item, index) => {
                      return (
                        <option key={index + 1} value={item.value}>
                          {item.label}
                        </option>
                      );
                    })}
                  </select>
                  <span className="error_validation ml-3">
                    {errors.marital_status?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              {/* {natationVale && natationVale.label === "Indian" ? (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="pan_number">
                      PAN Number<span className="requiredColor">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="pan_number"
                      {...register("pan_number", {
                        required: true,
                        pattern: {
                          value: /^[A-Za-z]{5}[0-9]{4}[A-Za-z]$/,
                          message: "invalid PAN Number",
                        },
                      })}
                    />
                    <span className="error_validation ml-3">
                      {errors.pan_number?.type === "required" &&
                        "This field is required."}
                      {errors.pan_number?.type === "pattern" &&
                        errors.pan_number.message}
                    </span>
                  </div>
                </div>
              ) : null} */}
              {/* {natationVale && natationVale.label !== "Indian" ? (
                <div className="col-lg-4 col-md-6 col-sm-12">
                  <div className="form-group">
                    <label htmlFor="passport_number">
                      Passport Number<span className="requiredColor">*</span>
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="passport_number"
                      {...register("passport_number", {
                        required: true,
                        pattern: {
                          value: /[a-zA-Z]{2}[0-9]{7}/,
                        },
                      })}
                    />
                    <span className="error_validation ml-3">
                      {errors.passport_number?.type === "required" &&
                        "This field is required."}
                      {errors.passport_number?.type === "pattern" &&
                        "Please enter valid passport number"}
                    </span>
                  </div>
                </div>
              ) : null} */}
              <div className="col-lg-4 col-md-6 col-sm-12">
                <label htmlFor="City">
                  City<span className="requiredColor">*</span>
                </label>
                <div className="form-group">
                  <Controller
                    control={control}
                    name="city"
                    className="fa-angle-down"
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Typeahead
                        id="city"
                        onChange={(event, option) => {
                          onChange();
                          cityChange(event);
                        }}
                        onInputChange={(text, e) => {
                          cityChangeValue(e);
                        }}
                        ref={ref}
                        options={options.length !== 0 ? options : []}
                        placeholder="Choose a city..."
                        className="autocomplete-custom-st"
                        selected={value}
                        renderMenuItemChildren={(option) => (
                          <div value={option.label}>
                            {option.label},{option.state},{option.country}
                          </div>
                        )}
                      />
                    )}
                  />
                  <span className="error_validation ml-3">
                    {errors.city?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="state">
                    State<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="state"
                    readOnly
                    {...register("state")}
                  />
                  <span className="error_validation ml-3">
                    {errors.state?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="country">
                    Country<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="country"
                    readOnly
                    {...register("country")}
                  />
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="siblings">
                    Siblings<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="siblings"
                    {...register("siblings", {
                      required: true,
                      pattern: /^[A-Za-z0-9? ,_-]+$/,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.siblings?.type === "required" &&
                      "This field is required."}
                    {errors.siblings &&
                      errors.siblings.type === "maxLength" && (
                        <span>Max length exceeded</span>
                      )}
                    {errors.siblings && errors.siblings.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="center_name">
                        Center<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="center_name"
                        {...register("center_name", {
                          required: true,
                          pattern: /^[A-Za-z0-9? ,_-]+$/,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.center_name?.type === "required" &&
                          "This field is required."}
                        {errors.center_name &&
                          errors.center_name.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.center_name &&
                          errors.center_name.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
            </div>
            <div className="row">
              <div className="col-lg-8 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-4 col-sm-12">
                    <label htmlFor="mother_tongue">
                      Mother Tongue<span className="requiredColor">*</span>
                    </label>
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="mother_tongue"
                        rules={{ required: true }}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Typeahead
                            id="mother_tongue"
                            onChange={onChange}
                            options={languageMotherList}
                            placeholder="Choose a Mother Tongue..."
                            selected={value}
                            className="autocomplete-custom-st"
                          />
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.mother_tongue?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <label htmlFor="languages_spoken">
                      Language Spoken<span className="requiredColor">*</span>
                    </label>
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="languages_spoken"
                        rules={{ required: true }}
                        render={({ field: { onChange, value } }) => (
                          <Typeahead
                            id="languages_spoken"
                            onChange={onChange}
                            multiple
                            options={languageList}
                            placeholder="Choose a Language..."
                            selected={value}
                            className="autocomplete-custom-st"
                          />
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.languages_spoken?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  {/* <div className="col-lg-6 col-md-4 col-sm-12">
                    <label htmlFor="zone">
                      Zone<span className="requiredColor">*</span>
                    </label>
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="center"
                        className="fa-angle-down"
                        rules={{ required: true }}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Typeahead
                            id="center"
                            onChange={(event, option) => {
                              onChange();
                              centerChange(event);
                            }}
                            onInputChange={(text, e) => {
                              centerChangeValue(e);
                            }}
                            options={
                              centerOptions.length !== 0 ? centerOptions : []
                            }
                            placeholder="Choose a center..."
                            selected={value}
                            className="autocomplete-custom-st"
                            renderMenuItemChildren={(option) => (
                              <div value={option.label}>{option.label}</div>
                            )}
                          />
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.center?.type === "required" &&
                          "This field is required."}
                        {errors.center &&
                          errors.center.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.center && errors.center.type === "pattern" && (
                          <span>Please enter only alpha numeric</span>
                        )}
                      </span>
                    </div>
                  </div> */}
                  <div className="col-lg-6 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="father_name">
                        Father Name<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="father_name"
                        {...register("father_name", {
                          required: true,
                          pattern: /^[a-z\d\-_\s]+$/i,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.father_name?.type === "required" &&
                          "This field is required."}
                        {errors.father_name &&
                          errors.father_name.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.father_name &&
                          errors.father_name.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-4 col-sm-12">
                    <label htmlFor="father_contact">
                      Father Contact Number
                      <span className="requiredColor">*</span>
                    </label>
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="father_contact"
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
                            id="father_contact"
                            defaultCountry="IN"
                            className="form-control"
                          />
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.father_contact?.type === "required" &&
                          "This field is required."}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.father_contact?.type === "validate" &&
                          "Please enter valid phone number."}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.father_contact?.type === "maxLength" &&
                          "Phone number max length is 14"}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.father_contact?.type === "minLength" &&
                          "Phone number min length is 8"}
                      </span>
                    </div>
                  </div>
                  {/* <div className="col-lg-6 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="center_name">
                        Center<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="center_name"
                        {...register("center_name", {
                          required: true,
                          pattern: /^[A-Za-z0-9? ,_-]+$/,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.center_name?.type === "required" &&
                          "This field is required."}
                        {errors.center_name &&
                          errors.center_name.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.center_name &&
                          errors.center_name.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div> */}
                </div>
              </div>
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="address">
                    Current Address<span className="requiredColor">*</span>
                  </label>
                  <textarea
                    className="form-control address Current_Address"
                    name="address"
                    {...register("address", {
                      required: true,
                      pattern: /^[A-Za-z0-9$&+,:;=? @#|'<>.^*%!-/\\/&/]+$/,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.address?.type === "required" &&
                      "This field is required."}
                    {errors.address && errors.address.type === "maxLength" && (
                      <span>Max length 120 char exceeded</span>
                    )}
                    {errors.address && errors.address.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-12 col-md-12 col-sm-12">
                <div className="row">
                  {/* <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="father_name">
                        Father Name<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="father_name"
                        {...register("father_name", {
                          required: true,
                          pattern: /^[a-z\d\-_\s]+$/i,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.father_name?.type === "required" &&
                          "This field is required."}
                        {errors.father_name &&
                          errors.father_name.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.father_name &&
                          errors.father_name.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div> */}
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="is_abhiyasi">
                        Whether Father is an Abhyasi?
                        <span className="requiredColor">*</span>
                      </label>
                      <div className="Inputgender">
                        <input
                          type="radio"
                          className="form-control"
                          name="is_abhiyasi"
                          value="Y"
                          {...register("is_abhiyasi", {
                            required: true,
                            onChange: (e) => {
                              fatherAbhyasiChange(e.target.value);
                            },
                          })}
                        />{" "}
                        Yes
                      </div>
                      <div className="Inputgender">
                        <input
                          type="radio"
                          className="form-control"
                          name="is_abhiyasi"
                          value="N"
                          {...register("is_abhiyasi", {
                            required: true,
                            onChange: (e) => {
                              fatherAbhyasiChange(e.target.value);
                            },
                          })}
                        />{" "}
                        No
                      </div>

                      <span className="error_validation ml-3">
                        {errors.is_abhiyasi?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  {fatherAbhyasi === "Y" && (
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="father_abhyasi_id">
                          Father Abhyasi Id
                          <span className="requiredColor">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="father_abhyasi_id"
                          {...register("father_abhyasi_id", {
                            required: true,
                            pattern: /^[a-z\d\-_\s]+$/i,
                            maxLength: 120,
                          })}
                        />
                        <span className="error_validation ml-3">
                          {errors.father_abhyasi_id?.type === "required" &&
                            "This field is required."}
                          {errors.father_abhyasi_id &&
                            errors.father_abhyasi_id.type === "maxLength" && (
                              <span>Max length exceeded</span>
                            )}
                          {errors.father_abhyasi_id &&
                            errors.father_abhyasi_id.type === "pattern" && (
                              <span>Please enter only alpha numeric</span>
                            )}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="fathers_occupation">
                        Father Occupation
                        <span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="fathers_occupation"
                        {...register("fathers_occupation", {
                          required: true,
                          pattern: /^[a-z\d\-_\s]+$/i,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.fathers_occupation?.type === "required" &&
                          "This field is required."}

                        {errors.fathers_occupation &&
                          errors.fathers_occupation.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.fathers_occupation &&
                          errors.fathers_occupation.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="mother_name">
                        Mother Name<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mother_name"
                        {...register("mother_name", {
                          required: true,
                          pattern: /^[a-z\d\-_\s]+$/i,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.mother_name?.type === "required" &&
                          "This field is required."}
                        {errors.mother_name &&
                          errors.mother_name.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.mother_name &&
                          errors.mother_name.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <label htmlFor="mother_contact">
                      Mother Contact Number
                      <span className="requiredColor">*</span>
                    </label>
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="mother_contact"
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
                            id="mother_contact"
                            defaultCountry="IN"
                            className="form-control"
                          />
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.mother_contact?.type === "required" &&
                          "This field is required."}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.mother_contact?.type === "validate" &&
                          "Please enter valid phone number."}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.mother_contact?.type === "maxLength" &&
                          "Phone number max length is 13"}
                      </span>
                      <span className="error_validation ml-3">
                        {errors.mother_contact?.type === "minLength" &&
                          "Phone number min length is 8"}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="is_she_abhiyasi">
                        Whether Mother is an Abhyasi?
                        <span className="requiredColor">*</span>
                      </label>
                      <div className="Inputgender">
                        <input
                          type="radio"
                          className="form-control"
                          name="is_she_abhiyasi"
                          value="Y"
                          {...register("is_she_abhiyasi", {
                            required: true,
                            onChange: (e) => {
                              motherAbhyasiChange(e.target.value);
                            },
                          })}
                        />{" "}
                        Yes
                      </div>
                      <div className="Inputgender">
                        <input
                          type="radio"
                          className="form-control"
                          name="is_she_abhiyasi"
                          value="N"
                          {...register("is_she_abhiyasi", {
                            required: true,
                            onChange: (e) => {
                              motherAbhyasiChange(e.target.value);
                            },
                          })}
                        />{" "}
                        No
                      </div>
                      <span className="error_validation ml-3">
                        {errors.is_she_abhiyasi?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  {motherAbhyasi === "Y" && (
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="mother_abhyasi_id">
                          Mother Abhyasi Id
                          <span className="requiredColor">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="mother_abhyasi_id"
                          {...register("mother_abhyasi_id", {
                            required: true,
                            pattern: /^[a-z\d\-_\s]+$/i,
                            maxLength: 120,
                          })}
                        />
                        <span className="error_validation ml-3">
                          {errors.mother_abhyasi_id?.type === "required" &&
                            "This field is required."}
                          {errors.mother_abhyasi_id &&
                            errors.mother_abhyasi_id.type === "maxLength" && (
                              <span>Max length exceeded</span>
                            )}
                          {errors.mother_abhyasi_id &&
                            errors.mother_abhyasi_id.type === "pattern" && (
                              <span>Please enter only alpha numeric</span>
                            )}
                        </span>
                      </div>
                    </div>
                  )}
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="mothers_occupation">
                        Mother Occupation
                        <span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="mothers_occupation"
                        {...register("mothers_occupation", {
                          required: true,
                          pattern: /^[a-z\d\-_\s]+$/i,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.mothers_occupation?.type === "required" &&
                          "This field is required."}

                        {errors.mothers_occupation &&
                          errors.mothers_occupation.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.mothers_occupation &&
                          errors.mothers_occupation.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="preceptor_id">
                        Preceptor ID<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="preceptor_id"
                        {...register("preceptor_id", {
                          required: true,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.preceptor_id?.type === "required" &&
                          "This field is required."}
                        {errors.preceptor_id &&
                          errors.preceptor_id.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.preceptor_id &&
                          errors.preceptor_id.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="preceptor_name">
                        Preceptor Name<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="preceptor_name"
                        {...register("preceptor_name", {
                          required: true,
                          pattern: /^[a-z\d\-_\s]+$/i,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.preceptor_name?.type === "required" &&
                          "This field is required."}
                        {errors.preceptor_name &&
                          errors.preceptor_name.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.preceptor_name &&
                          errors.preceptor_name.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-4 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="under_medication">
                        Medication Confirmation
                        <span className="requiredColor">*</span>
                      </label>
                      <div className="Inputgender">
                        <input
                          type="radio"
                          className="form-control"
                          name="under_medication"
                          value="Y"
                          {...register("under_medication", {
                            required: true,
                            onChange: (e) => {
                              alert("setting true");
                              meditationChange(e.target.value);
                            },
                          })}
                        />{" "}
                        Yes
                      </div>
                      <div className="Inputgender">
                        <input
                          type="radio"
                          className="form-control"
                          name="under_medication"
                          value="N"
                          {...register("under_medication", {
                            required: true,
                            onChange: (e) => {
                              meditationChange(e.target.value);
                            },
                          })}
                        />{" "}
                        No
                      </div>

                      <span className="error_validation ml-3">
                        {errors.under_medication?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  {isMeditated === "Y" && (
                    <div className="col-lg-4 col-md-4 col-sm-12">
                      <div className="form-group">
                        <label htmlFor="medication_details">
                          Under Medication?
                          <span className="requiredColor">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          name="medication_details"
                          {...register("medication_details", {
                            required: true,
                            pattern: /^[a-z\d\-_\s]+$/i,
                            maxLength: 120,
                          })}
                        />
                        <span className="error_validation ml-3">
                          {errors.medication_details?.type === "required" &&
                            "This field is required."}
                          {errors.medication_details &&
                            errors.medication_details.type === "maxLength" && (
                              <span>Max length exceeded</span>
                            )}
                          {errors.medication_details &&
                            errors.medication_details.type === "pattern" && (
                              <span>Please enter only alpha numeric</span>
                            )}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="row mt-5">
              <div className="col"></div>
              {user.profile_sub_status === 5 ? (
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
                <div className="col-lg-3 col-md-4 col-sm-12 mt-3">
                  <input
                    type="submit"
                    className="btn btn-primary btn-block submit-button"
                    value="Save & Next"
                  />
                </div>
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
    </>
  );
};
export default PersonalDetail;
