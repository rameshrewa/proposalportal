import React, { useState, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
//import UserHeader from "./usersHeader";
import SeoHead from "../../layout/Seo/seoBlock";
import DeleteIcon from "../../assets/images/deleteIcon.png";

import StandardDataService from "../../services/common/standardData.service";
import { Typeahead } from "react-bootstrap-typeahead";
import PhoneInput from "react-phone-number-input";
import CandidateService from "../../services/admin/candidate.service";
import { toast } from "react-toastify";
import { useHistory } from "react-router-dom";
import Loading from "../shared/common/loading";
import { Modal } from "react-bootstrap";
import CandidateLogout from "../shared/common/candidateLogout";
import { dietDropdown } from "../../assets/data/userData";
import { lStorage } from "../../utils/storage";
import { yearconvert } from "../../utils/common/dateConvertion";

const axios = require("axios");

const Lifestyle = () => {
  const standardApi = new StandardDataService();
  const candidateApi = new CandidateService();
  let history = useHistory();
  const profileData = lStorage.get("hfn-profile-me");
  const [dietList, setDietList] = useState([]);
  const [user, setUser] = useState({});
  const [educationList, setEducationList] = useState([]);
  const [ctcList, setCtcList] = useState([]);
  const [bloodGrpList, setBloodGrpList] = useState([]);
  const [lastFields, setLastFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const [enableOther, setEnableOther] = useState(false);
  const [prof, setProf] = useState("");
  const [inputFields, setInputFields] = useState([
    {
      education: "",
      specialization: "",
      passed_out: "",
      otherCourse: "",
      isOthers: "yes",
      alcohol:"No"
    },
  ]);

  const initialFormState = { ...user };
  const {
    register,
    handleSubmit,
    setValue,
    control,
    getValues,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });
  const Logout = () => {
    lStorage.clear();
    history.push("/login");
    lStorage.set("logOut", "logOut");
  };
  const professionChange = (data) => {
    setProf(data.target.value);
  };
  const onSubmit = (data) => {
    setLoading(true);
    if (
      lastFields.length !== 0 &&
      lastFields[0].education &&
      lastFields[0].passed_out !== "" &&
      lastFields[0].specialization !== ""
    ) {
      let payload = {
        course_id: lastFields[0].education[0].value,
        passed_out: lastFields[0].passed_out,
        specialization: lastFields[0].specialization,
        other_course:
          lastFields[0].education[0].label === "Others"
            ? lastFields[0].otherCourse
            : "",
      };
      candidateApi.educationApi([payload]).then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setLastFields([]);
          setLoading(false);
        } else {
          setLoading(false);
        }
      });
    }else{
      if( (lastFields.length ==0 && inputFields.length == 1) || (lastFields.length >= 1 && lastFields[0].specialization=='')) {
      toast.error("Please add at least one qualification");
      setLoading(false);
      return false;
      }
    }
    if (
      inputFields.length > 1 ||
      (lastFields.length !== 0 &&
        lastFields[0].passed_out !== "" &&
        lastFields[0].specialization !== "" &&
        lastFields[0].education)
    ) {
      setLoading(true);
      let lifestyleData = [
        {
          about_me: data.about_me,
          diet: data.diet,
          disability: data.disability,
          blood_group: data.blood_group[0].value,
          habits: data.habits,
          religion: data.religion,
          health_condition: data.health_condition,
          height_type: "inch",
          height: data.height,
          weight_type: "kg",
          weight: data.weight,
          alcohol:data.alcohol,
          smoking:data.smoking,
        },
      ];
      let professionDetails = [
        {
          profession: data.profession,
          designation: data.designation,
          org_name: data.org_name,
          annual_ctc: data.annual_ctc[0].value,
          hr_name: data.hr_name,
          hr_email_id: data.hr_email_id,
          hr_contact: data.hr_contact,
        },
      ];
      let reqTwo = candidateApi.professionApi(professionDetails);
      let reqThree = candidateApi.otherdetailsApi(lifestyleData);
      axios.all([reqTwo, reqThree]).then(
        axios.spread((res) => {
          if (user.profile_sub_status === 5) {
            history.push("/user-information");
          } else {
            history.push("/upload-documents");
          }
          setLoading(false);
        })
      );
      setLoading(false);
    } else {
      setLoading(false);
    }
  };
  const handleFormChange = (index, event, name) => {
    let data = [...inputFields];
    if (event !== "") {
      if (name === "passed_out") {
        data[index][name] = event.target.value;
      } else if (name === "education") {
        // if (event[0].label === "Others") {
        //   setEnableOther(true);
        // } else {
        if (event[0] === undefined) {
          data[index][name] = event[0];
        } else {
          if (data[index][name] === undefined) {
            data[index][name] = event[0] === undefined ? "" : event;
            if (event[0].label === "Others") {
              setEnableOther(true);
              data[index]["isOthers"] = "yes";
            }
          } else {
            data[index][name][0] = event[0] === undefined ? "" : event[0];
          }
        }
      } else if (name === "otherCourse") {
        data[index]["isOthers"] = "yes";
        data[index][name] = event.target.value;
      } else {
        data[index][name] = event.target.value;
      }
      setInputFields(data);
      setLastFields(data.slice(-1));
    }
  };

  const addFormFields = () => {
    let newfield = {
      education: "",
      specialization: "",
      passed_out: "",
      otherCourse: "",
    };

    const getLadIndex = inputFields.slice(-1)[0];
    const otherVal =
      getLadIndex.education[0].label === "Others"
        ? getLadIndex.otherCourse !== ""
          ? false
          : true
        : "";
    if (
      getLadIndex.length !== 0 &&
      getLadIndex.passed_out !== "" &&
      getLadIndex.specialization !== "" &&
      getLadIndex.education
    ) {
      let payload = {
        course_id: getLadIndex.education[0].value,
        passed_out: getLadIndex.passed_out,
        specialization: getLadIndex.specialization,
        other_course:
          getLadIndex.education[0].label === "Others"
            ? getLadIndex.otherCourse
            : "",
      };

      candidateApi.educationApi([payload]).then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          Logininfo();
          setLastFields([]);
        } else {
        }
      });

      setInputFields([...inputFields, newfield]);
    } else {
      toast.error("Please enter all education the fields");
    }
  };

  const removeFormFields = (i, data) => {
    let newFormValues = [...inputFields];

    let deletePayload = [{ education_id: data.candidate_education_id }];
    setLoading(true);
    candidateApi
      .educationDeleteApi({ data: deletePayload })
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          newFormValues.splice(i, 1);
          setInputFields(newFormValues);
          toast.success("Deleted Successfully");
          setLoading(false);
          Logininfo();
        } else {
          toast.error("something went wrong");
        }
      })
      .catch((error) => {
        setLoading(false);
      });
  };
  const Logininfo = (ctcData) => {
    setLoading(true);
    candidateApi
      .userReginfoApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          const fields = [
            "about_me",
            "religion",
            "health_condition",
            "height_type",
            "height",
            "weight_type",
            "weight",
          ];
          let newArray;
          standardApi.standardDataApi("ctc").then((res) => {
            if (res.data.isError === false || res.data.statusCode === "200") {
              let dropdownOptions = res.data.data.map((value) => {
                return { label: value.ctc_range, value: value.annual_ctc_id };
              });
              setCtcList(dropdownOptions);
              newArray = dropdownOptions.filter(function (el) {
                return el.value == response.data.data.professionData.annual_ctc;
              });
              setLoading(false);
            } else {
              setLoading(false);
            }
          });

          let dropdownOptions =
            response.data.data &&
            response.data.data.educationData.map((value) => {
              let education = [
                {
                  label: value.course_name,
                  value: value.course_id,
                },
              ];
              return {
                specialization: value.specialization,
                passed_out: value.passed_out,
                candidate_education_id: value.candidate_education_id,
                otherCourse: value.other_course,
                education,
                isOthers: value.course_name === "Others" ? "yes" : "no",
              };
            });
          let educationempty = [];
          let eptyObj = {
            specialization: "",
            passed_out: "",
            candidate_education_id: "",
            otherCourse: "",
            isOthers: "no",
            educationempty,
          };
          setInputFields(
            dropdownOptions.length !== 0
              ? dropdownOptions.concat(eptyObj)
              : [eptyObj]
          );

          fields.forEach(
            (field) => setValue(field, response.data.data[field]),
            setValue(
              "profession",
              response.data.data.professionData.profession
            ),
            setProf(response.data.data.professionData.profession),
            setValue(
              "designation",
              response.data.data.professionData.designation
            ),
            setValue("org_name", response.data.data.professionData.org_name),
            setValue(
              "hr_email_id",
              response.data.data.professionData.hr_email_id
            ),
            setValue("hr_name", response.data.data.professionData.hr_name),
            setValue(
              "annual_ctc",
              response.data.data.professionData.annual_ctc
                ? [
                    {
                      label: response.data.data.professionData.annual_ctc,
                      value: response.data.data.professionData.annual_ctc_id,
                    },
                  ]
                : []
            ),
            setValue(
              "blood_group",
              response.data.data !== undefined &&
                response.data.data.blood_group !== undefined
                ? [
                    {
                      label: response.data.data.blood_group.name,
                      value: response.data.data.blood_group.blood_group_id,
                    },
                  ]
                : []
            ),
            setValue(
              "disability",
              response.data.data.disability !== undefined
                ? response.data.data.disability
                : ""
            ),
            setValue(
              "diet",
              response.data.data && response.data.data.diet !== undefined
                ? response.data.data.diet
                : ""
            ),
            setValue(
              "habits",
              response.data.data.habits !== undefined
                ? response.data.data.habits
                : ""
            ),
            setValue(
              "alcohol",
              response.data.data.alcohol && response.data.data.alcohol
                ? response.data.data.alcohol
                : "N"
            ),
            setValue(
              "smoking",
              response.data.data.smoking && response.data.data.smoking
                ? response.data.data.smoking
                : "N"
            ),
            setValue(
              "hr_contact",
              response.data.data.professionData
                ? response.data.data.professionData.hr_contact
                : ""
            )
          );
          setUser(response.data.data);
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
      const LoadStandardData = () => {
        standardApi.standardDataApi("edu").then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            let dropdownOptions = response.data.data.map((value) => {
              return { label: value.degree_name, value: value.education_id };
            });
            setEducationList(dropdownOptions);
          } else {
          }
        });
      };
      const LoadStandardDataDiet = () => {
        standardApi.standardDataApi("diet").then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            let dropdownOptions = response.data.data.map((value) => {
              return { label: value.type_of_diet, value: value.diet_id };
            });
            setDietList(dropdownOptions);
          } else {
          }
        });
      };

      const LoadStandardDataBloodGrp = () => {
        standardApi.standardDataApi("bg").then((response) => {
          if (
            response.data.isError === false ||
            response.data.statusCode === "200"
          ) {
            let dropdownOptions = response.data.data.map((value) => {
              return { label: value.name, value: value.blood_group_id };
            });
            setBloodGrpList(dropdownOptions);
          } else {
          }
        });
      };
      LoadStandardData();
      LoadStandardDataDiet();
      LoadStandardDataBloodGrp();
      Logininfo();
    } else {
      history.push("/error");
    }
  }, []);
  return (
    <>
      <SeoHead
        HeadTitle={"Lifestyle | Proposal Portal"}
        HeadDescription={"Lifestyle"}
      />
      {/* <UserHeader /> */}
      <section className="LifestyleSection py-5">
        <div className="container p-5 ProfileContent">
          <div className="row">
            <div className="col col-lg-10">
              <h1>Lifestyle</h1>
            </div>
            <div className="col col-lg-2 align-right">
              <CandidateLogout />
            </div>
          </div>
          <div className="row">
            <div className="col col-lg-12">
              <h5>
                Qualification{" "}
                <span className="text-right" onClick={() => addFormFields()}>
                  +Add
                </span>
              </h5>
            </div>
          </div>
          {inputFields &&
            inputFields.map((element, index) => (
              <>
                <div className="row">
                  <div
                    className={
                      element.isOthers === "yes"
                        ? "col-lg-3 col-md-6 col-sm-12"
                        : "col-lg-4 col-md-6 col-sm-12"
                    }
                  >
                    <label htmlFor="education">
                      Education<span className="requiredColor">*</span>
                    </label>
                    <div className="form-group">
                      <Typeahead
                        id="education"
                        options={
                          educationList.length !== 0 ? educationList : []
                        }
                        placeholder="Choose a Education..."
                        selected={element.education}
                        // value={element[0]}
                        onChange={(event) =>
                          handleFormChange(index, event, "education")
                        }
                        className="autocomplete-custom-st cursor"
                      />
                      <span className="error_validation ml-3">
                        {errors.education?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  {element.isOthers === "yes" && (
                    <div
                      className={
                        element.isOthers === "yes"
                          ? "col-lg-3 col-md-6 col-sm-12"
                          : "col-lg-4 col-md-6 col-sm-12"
                      }
                    >
                      <div className="form-group">
                        <label htmlFor="otherCourse">
                          Other Course<span className="requiredColor">*</span>
                        </label>
                        <input
                          type="text"
                          className="form-control cursor"
                          name="otherCourse"
                          value={element.otherCourse}
                          onChange={(event) =>
                            handleFormChange(index, event, "otherCourse")
                          }
                        />
                        <span className="error_validation ml-3">
                          {errors.otherCourse?.type === "required" &&
                            "This field is required."}
                        </span>
                      </div>
                    </div>
                  )}
                  <div
                    className={
                      element.isOthers === "yes"
                        ? "col-lg-3 col-md-6 col-sm-12"
                        : "col-lg-4 col-md-6 col-sm-12"
                    }
                  >
                    <div className="form-group">
                      <label htmlFor="specialization">
                        Specialization<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="text"
                        className="form-control cursor"
                        name="specialization"
                        value={element.specialization}
                        onChange={(event) =>
                          handleFormChange(index, event, "specialization")
                        }
                      />
                      <span className="error_validation ml-3">
                        {errors.specialization?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  <div
                    className={
                      element.isOthers === "yes"
                        ? "col-lg-3 col-md-6 col-sm-12"
                        : "col-lg-4 col-md-6 col-sm-12"
                    }
                  >
                    <label htmlFor="passed_out">
                      Year<span className="requiredColor">*</span>
                    </label>
                    <div className="form-group AddRemoveQualification">
                      <input
                        type="text"
                        maxLength={4}
                        minLength={4}
                        className="form-control cursor"
                        name="passed_out"
                        value={element.passed_out}
                        onChange={(event) =>
                          handleFormChange(index, event, "passed_out")
                        }
                      />

                      <span className="error_validation ml-3">
                        {errors.passed_out?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                    {index !== inputFields.length - 1 && (
                      <span
                        className="removed-qualification cursor"
                        onClick={() => removeFormFields(index, element)}
                      >
                        <img src={DeleteIcon} alt="DeleteIcon" />
                      </span>
                    )}
                  </div>
                </div>
              </>
            ))}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="personalDetailForm"
          >
            <div className="row mt-4 pt-3">
              <div className="col col-lg-12">
                <h5>Occupation</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="profession">
                    Profession<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="profession"
                    {...register("profession", {
                      required: true,
                      pattern: /^[a-z\d\-_\s]+$/i,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.profession?.type === "required" &&
                      "This field is required."}
                    {errors.profession &&
                      errors.profession.type === "maxLength" && (
                        <span>Max length exceeded</span>
                      )}
                    {errors.profession &&
                      errors.profession.type === "pattern" && (
                        <span>Please enter only alpha numeric</span>
                      )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="designation">
                    Designation<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="designation"
                    {...register("designation", {
                      required: true,
                      pattern: /^[a-z\d\-_\s]+$/i,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.designation?.type === "required" &&
                      "This field is required."}
                    {errors.designation &&
                      errors.designation.type === "maxLength" && (
                        <span>Max length exceeded</span>
                      )}
                    {errors.designation &&
                      errors.designation.type === "pattern" && (
                        <span>Please enter only alpha numeric</span>
                      )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="org_name">
                    Name Of The Organization
                    {/* <span className="requiredColor">*</span> */}
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="org_name"
                    {...register("org_name", {
                      required: false,
                      pattern: /^[a-z\d\-_\s]+$/i,
                      maxLength: 120,
                    })}
                    onChange={professionChange}
                  />
                  <span className="error_validation ml-3">
                    {errors.org_name?.type === "required" &&
                      "This field is required."}
                    {errors.org_name &&
                      errors.org_name.type === "maxLength" && (
                        <span>Max length exceeded</span>
                      )}
                    {errors.org_name && errors.org_name.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <label htmlFor="annual_ctc">
                  Annual Income<span className="requiredColor">*</span>
                </label>
                <div className="form-group">
                  <Controller
                    control={control}
                    name="annual_ctc"
                    defaultValue={""}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Typeahead
                        id="annual_ctc"
                        onChange={onChange}
                        options={ctcList}
                        placeholder="Choose a Annual Income..."
                        selected={value}
                        className="autocomplete-custom-st"
                      />
                    )}
                  />
                  <span className="error_validation ml-3">
                    {errors.annual_ctc?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="hr_name">
                    HR Name{" "}
                   
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="hr_name"
                    {...register("hr_name", {})}
                  />
                  <span className="error_validation ml-3">
                    {errors.hr_name?.type === "required" &&
                      "This field is required."}
                    {errors.hr_name && errors.hr_name.type === "maxLength" && (
                      <span>Max length exceeded</span>
                    )}
                    {errors.hr_name && errors.hr_name.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="hr_email_id">
                    HR Email Address{" "}
                  
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="hr_email_id"
                    {...register("hr_email_id", {})}
                  />
                  <span className="error_validation ml-3">
                    {errors.hr_email_id?.type === "required" &&
                      "This field is required."}
                  </span>
                  <span className="error_validation ml-3">
                    {errors.hr_email_id &&
                      errors.hr_email_id.type === "pattern" && (
                        <span>Please enter valid email</span>
                      )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <label htmlFor="hr_contact">
                  HR Contact Number{" "}
                 
                </label>
                <div className="form-group">
                  <Controller
                    control={control}
                    name="hr_contact"
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                      <PhoneInput
                        international
                        value={value}
                        onChange={onChange}
                        id="hr_contact"
                        defaultCountry="IN"
                        className="form-control"
                      />
                    )}
                  />
                  <span className="error_validation ml-3">
                    {errors.hr_contact?.type === "validate" &&
                      "Please enter valid phone number."}
                    {errors.hr_contact?.type === "required" &&
                      "This field is required."}
                  </span>
                  <span className="error_validation ml-3">
                    {errors.hr_contact?.type === "maxLength" &&
                      "Phone number max length is 14"}
                  </span>
                  <span className="error_validation ml-3">
                    {errors.hr_contact?.type === "minLength" &&
                      "Phone number min length is 8"}
                  </span>
                </div>
              </div>
            </div>
            <div className="row mt-4 pt-3">
              <div className="col col-lg-12">
                <h5>Others</h5>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-12 col-sm-12">
                <div className="form-group">
                  <label htmlFor="about_me">
                    About Me<span className="requiredColor">*</span>
                  </label>
                  <textarea
                    className="form-control Current_Address"
                    name="about_me"
                    {...register("about_me", { required: true })}
                  />
                  <span className="error_validation ml-3">
                    {errors.about_me?.type === "required" &&
                      "This field is required."}
                  </span>
                </div>
              </div>
              <div className="col-lg-8 col-md-12 col-sm-12">
                <div className="row">
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    {/* <label htmlFor="diet">
                      Diet<span className="requiredColor">*</span>
                    </label>
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="diet"
                        defaultValue={""}
                        rules={{ required: true }}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Typeahead
                            id="diet"
                            onChange={onChange}
                            options={dietList}
                            placeholder="Choose a Diet Plan..."
                            selected={value}
                          />
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.diet?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div> */}
                    <div className="form-group">
                      <label htmlFor="diet">
                        Diet<span className="requiredColor">*</span>
                      </label>
                      <select
                        name="diet"
                        className="form-control"
                        {...register("diet", { required: true })}
                      >
                        <option value="">Select</option>
                        {dietDropdown.map((item) => {
                          return (
                            <option value={item.value}>{item.label}</option>
                          );
                        })}
                      </select>
                      <span className="error_validation ml-3">
                        {errors.diet?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12 blood-div-top">
                    <label
                      className="blood-group-dropdown"
                      htmlFor="blood_group"
                    >
                      {" "}
                      Blood Group<span className="requiredColor">*</span>
                    </label>
                    <Controller
                      control={control}
                      name="blood_group"
                      defaultValue={""}
                      rules={{ required: true }}
                      render={({ field: { onChange, onBlur, value, ref } }) => (
                        <Typeahead
                          id="blood_group"
                          onChange={onChange}
                          options={bloodGrpList}
                          placeholder="Choose a Blood Group.."
                          selected={value}
                          className="autocomplete-custom-st"
                        />
                      )}
                    />
                    <span className="error_validation ml-3">
                      {errors.blood_group?.type === "required" &&
                        "This field is required."}
                    </span>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    {/* <label htmlFor="disability">Disability</label>
                    <div className="form-group">
                      <Controller
                        control={control}
                        name="disability"
                        defaultValue={""}
                        rules={{ required: true }}
                        render={({
                          field: { onChange, onBlur, value, ref },
                        }) => (
                          <Typeahead
                            id="disability"
                            onChange={onChange}
                            options={disabilityList}
                            placeholder="Choose a Disability.."
                            selected={value}
                          />
                        )}
                      />
                      <span className="error_validation ml-3">
                        {errors.disability?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div> */}
                    <div className="form-group">
                      <label htmlFor="disability">Disability</label>
                      <input
                        type="text"
                        className="form-control"
                        name="disability"
                        {...register("disability", {
                          required: false,
                          pattern: /^[a-z\d\-_\s]+$/i,
                          maxLength: 120,
                        })}
                      />
                      <span className="error_validation ml-3">
                        {errors.disability?.type === "required" &&
                          "This field is required."}
                        {errors.disability &&
                          errors.disability.type === "maxLength" && (
                            <span>Max length exceeded</span>
                          )}
                        {errors.disability &&
                          errors.disability.type === "pattern" && (
                            <span>Please enter only alpha numeric</span>
                          )}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-6 col-md-6 col-sm-12">
                    <div className="row">
                      <div className="col-lg-8 col-md-6 col-sm-12">
                        <div className="form-group">
                          <label htmlFor="height">
                            Height (Cm)<span className="requiredColor">*</span>
                          </label>
                          <input
                            type="number"
                            className="form-control HeightInput"
                            name="height"
                            {...register("height", { required: true })}
                          />
                          <span className="error_validation ml-3">
                            {errors.height?.type === "required" &&
                              "This field is required."}
                          </span>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-6 col-sm-12">
                        <div className="form-group"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="religion">
                    Religion<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="religion"
                    {...register("religion", {
                      required: true,
                      pattern: /^[a-z\d\-_\s]+$/i,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.religion?.type === "required" &&
                      "This field is required."}
                    {errors.religion &&
                      errors.religion.type === "maxLength" && (
                        <span>Max length exceeded</span>
                      )}
                    {errors.religion && errors.religion.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <label htmlFor="health_condition">
                    Health Condition<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="health_condition"
                    {...register("health_condition", {
                      required: true,
                      pattern: /^[a-z\d\-_\s]+$/i,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.health_condition?.type === "required" &&
                      "This field is required."}

                    {errors.health_condition &&
                      errors.health_condition.type === "maxLength" && (
                        <span>Max length exceeded</span>
                      )}
                    {errors.health_condition &&
                      errors.health_condition.type === "pattern" && (
                        <span>Please enter only alpha numeric</span>
                      )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="row">
                  <div className="col-lg-8 col-md-6 col-sm-12">
                    <div className="form-group">
                      <label htmlFor="weight">
                        Weight (Kg)<span className="requiredColor">*</span>
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="weight"
                        {...register("weight", { required: true })}
                      />
                      <span className="error_validation ml-3">
                        {errors.weight?.type === "required" &&
                          "This field is required."}
                      </span>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-6 col-sm-12">
                    <div className="form-group"></div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                {/* <label htmlFor="habits">
                  Habits<span className="requiredColor">*</span>
                </label>
                <div className="form-group">
                  <Controller
                    control={control}
                    name="habits"
                    defaultValue={""}
                    rules={{ required: true }}
                    render={({ field: { onChange, onBlur, value, ref } }) => (
                      <Typeahead
                        id="habits"
                        onChange={onChange}
                        options={habitsList}
                        placeholder="Choose a Habits.."
                        selected={value}
                      />
                    )}
                  />
                  <span className="error_validation ml-3">
                    {errors.habits?.type === "required" &&
                      "This field is required."}
                  </span>
                </div> */}
                <div className="form-group">
                  <label htmlFor="habits">
                    Habits<span className="requiredColor">*</span>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    name="habits"
                    {...register("habits", {
                      required: true,
                      pattern: /^[A-Za-z0-9$&+,:;=? @#|'<>.^*%!-/\\/&/]+$/i,
                      maxLength: 120,
                    })}
                  />
                  <span className="error_validation ml-3">
                    {errors.habits?.type === "required" &&
                      "This field is required."}
                    {errors.habits && errors.habits.type === "maxLength" && (
                      <span>Max length 120 char exceeded</span>
                    )}
                    {errors.habits && errors.habits.type === "pattern" && (
                      <span>Please enter only alpha numeric</span>
                    )}
                  </span>
                </div>
              </div>
              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <div>
                    <label htmlFor="alcohol">
                      Alcohol<span className="requiredColor">*</span>
                      <span className="error_validation ml-3">
                     {errors.alcohol?.type === "required" &&
                      "This field is required."}
                      </span>
                    </label>
                    <div className="Inputgender">
                      <input
                        type="radio"
                        className="form-control"
                        name="alcohol"
                        value="Y"
                        {...register("alcohol", { required: true })}
                      />{" "}
                      Yes
                    </div>
                    <div className="Inputgender">
                      <input
                        type="radio"
                        className="form-control"
                        name="alcohol"
                        value="N"
                        {...register("alcohol", { required: true })}
                      />{" "}
                      No
                    </div>
                    <div className="Inputgender">
                      <input
                        type="radio"
                        className="form-control"
                        name="alcohol"
                        value="O"
                        {...register("alcohol", { required: true })}
                      />{" "}
                      Occasional
                    </div>
                    <div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-4 col-md-6 col-sm-12">
                <div className="form-group">
                  <div>
                    <label htmlFor="smoking">
                      Smoking<span className="requiredColor">*</span>
                      <span className="error_validation ml-3">
                        {errors.smoking?.type === "required" &&
                          "This field is required."}
                      </span>
                    </label>
                    <div className="Inputgender">
                      <input
                        type="radio"
                        className="form-control"
                        name="smoking"
                        value="Y"
                        {...register("smoking", { required: true })}
                      />{" "}
                      Yes
                    </div>
                    <div className="Inputgender">
                      <input
                        type="radio"
                        className="form-control"
                        name="smoking"
                        value="N"
                        {...register("smoking", { required: true })}
                      />{" "}
                      No
                    </div>
                  </div>
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
                <>
                  <div className="col-lg-3 col-md-4 col-sm-12 mt-3">
                    <Link
                      to={"/personal-detail"}
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
    </>
  );
};
export default Lifestyle;
