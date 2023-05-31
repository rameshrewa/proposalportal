import React, { useState, useCallback, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { SuperadminServices } from "../../services/superadmin/superadminData.service";
import StandardDataService from "../../services/common/standardData.service";
import { toast, ToastContainer } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";

const AddUser = (props) => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const [userData, setuserData] = useState([]);
  const [roleId, setRoleId] = useState([]);
  const standardPostUserApi = new SuperadminServices();
  const standardApi = new StandardDataService();
  const [loading, setLoading] = useState(false);

  const getUserDetails = useCallback(() => {
    standardPostUserApi
      .standardRoleDataGetApi()
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          const optionsArr = response?.data?.data.map((item) => {
            return { value: item.role_id, label: item.role_name };
          });

          setuserData(optionsArr);
        } else {
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  });
  useEffect(() => {
    getUserDetails();
  }, []);
  const onSubmit = async (data) => {
    let precpAbhyasiVal;
    precpAbhyasiVal = await standardApi
      .abhyasiSearch(data.abhyasi_id)
      .then((response) => {
        if (response.data.results.length > 0) {
          return "AbhyasiValid";
        } else {
          return "AbhyasiNotValid";
        }
      });
    if (precpAbhyasiVal === "AbhyasiValid") {
      let roleId;
      roleId =
        data &&
        data.type.map((item) => {
          return item.value;
        });
      let formData = {
        last_name: data.last_name,
        first_name: data.first_name,
        first_name: data.first_name,
        abhyasi_id: data.abhyasi_id,
        email_id: data.email_id,
        type: roleId.toString(),
      };
      setLoading(true);
      standardPostUserApi
        .standardAddUserPostApi(formData)
        .then((res) => {
          if (res.data.isError === true || res.data.statusCode === "400") {
            toast.error(res.data.message[0]);
          } else {
            if (res.status === 200) {
              setLoading(false);
              if (
                res.data.message ===
                "user already exists with email id or abhyasi id"
              ) {
                toast.error(res.data.message);
              } else {
                toast.success("Form submitted successfully");
                props.onHide("formSubmitted");
                reset();
              }
            } else {
              toast.error("something went wrong");
            }
          }
        })
        .catch(() => {
          setLoading(false);
          toast.error("something went wrong");
        });
    } else {
      setLoading(false);
      if (precpAbhyasiVal === "AbhyasiNotValid") {
        toast.error("Please enter valid Abhyasi Id");
      }
    }
  };
  const handleChange = (e) => {
    setRoleId(Array.isArray(e) ? e.map((x) => x.value) : []);
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton onClick={props.onHide}>
        <Modal.Title id="contained-modal-title-vcenter"></Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div>
          <h3 className="admin-heading-user-text"> Add Admin Users</h3>
          <form
            className="super-admin-add-users"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label htmlFor="firstname">
                First Name <span className="requiredColor">*</span>
              </label>
              <input
                {...register("first_name", {
                  required: "This field is required",
                })}
                type="text"
                className="form-control"
                name="first_name"
                id="first_name"
              />
              {errors.first_name && (
                <p className="error-mes">This field is required</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="last_name">
                Last Name <span className="requiredColor">*</span>
              </label>
              <input
                {...register("last_name", {
                  required: "This field is required",
                })}
                type="text"
                className="form-control"
                name="last_name"
                id="last_name"
              />
              {errors.last_name && (
                <p className="error-mes">This field is required</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="abhyasi_id">
                Abhyasi id<span className="requiredColor">*</span>
              </label>
              <input
                {...register("abhyasi_id", {
                  required: "This field is required",
                })}
                type="text"
                className="form-control"
                name="abhyasi_id"
                id="abhyasi_id"
              />
              {errors.abhyasi_id && (
                <p className="error-mes">This field is required</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email_id">
                Email Id<span className="requiredColor">*</span>
              </label>
              <input
                {...register("email_id", {
                  required: true,
                  pattern: {
                    value:
                      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                  },
                })}
                type="text"
                className="form-control"
                name="email_id"
                id="email_id"
              />
              {errors.email_id?.type === "required" && (
                <p className="error-mes">This field is required</p>
              )}
              {errors.email_id && errors.email_id.type === "pattern" && (
                <p className="error-mes">Please enter valid email</p>
              )}
            </div>

            {/* <div className="form-group">
              <label htmlFor="type">
                Role <span className="requiredColor">*</span>
              </label>
              <Select
                isMulti
                options={userData}
                value={userData.filter((obj) => roleId.includes(obj.value))}
                onChange={handleChange}
                isSearchable={true}
                isClearable
              />
            </div> */}
            <div className="form-group" id="editClose">
              <label htmlFor="type">
                {" "}
                Role <span className="requiredColor">*</span>{" "}
              </label>

              <Controller
                control={control}
                name="type"
                defaultValue={""}
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value, ref } }) => (
                  <Typeahead
                    id="type"
                    multiple
                    onChange={onChange}
                    options={userData}
                    placeholder="Choose the Role"
                    selected={value}
                    clearButton
                  />
                )}
              />
              {errors.type?.type === "required" && (
                <p className="error-mes">This field is required</p>
              )}
            </div>
            <div className="text-center">
              <button
                style={{ padding: "10px 60px" }}
                type="submit"
                className="btn btn-primary submit-button"
              >
                SAVE
              </button>
            </div>
          </form>
        </div>
        <div>
          <ToastContainer
            position="top-right"
            autoClose={3000}
            newestOnTop={false}
            hideProgressBar
            closeOnClick
            rtl={false}
          />
        </div>
      </Modal.Body>
    </Modal>
  );
};

// function AddUser() {
//     const [modalShow, setModalShow] = React.useState(false);

//     return (
//       <>

//         <div
//           onKeyDown={() => setModalShow(true)}
//           onClick={() => setModalShow(true)}
//           role="button"
//           tabIndex="0"
//         >
//             <button className="btn buton-sky-blue"> Add Data</button>
//         </div>

//         <MyVerticallyCenteredModal
//           show={modalShow}
//           onHide={() => setModalShow(false)}
//           setModalShow={setModalShow}
//         />
//       </>
//     );
//   }

export default AddUser;
