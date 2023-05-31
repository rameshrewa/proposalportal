import React, { useState, useCallback, useEffect, useRef } from "react";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { SuperadminServices } from "../../services/superadmin/superadminData.service";
import { toast, ToastContainer } from "react-toastify";
import Select from "react-select";

const MyVerticallyCenteredModal = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [userData, setuserData] = useState([]);
  const [roleId, setRoleId] = useState([]);
  const standardPostUserApi = new SuperadminServices();
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
  const onSubmit = (data) => {
    let formData = {
      last_name: data.last_name,
      first_name: data.first_name,
      email_id: data.email_id,
      type: roleId.toString(),
    };
    setLoading(true);
    standardPostUserApi
      .standardAddUserPostApi(formData)
      .then((res) => {
        if (res.status === 200) {
          setLoading(false);
          toast.success("Form submitted successfully");
          reset();
        } else {
          toast.error("something went wrong");
        }
      })
      .catch(() => {
        setLoading(false);
        toast.error("something went wrong");
      });
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
      <Modal.Header closeButton>
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
              <label htmlFor="firstname"> First Name </label>
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
              <label htmlFor="last_name"> Last Name </label>
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
              <label htmlFor="email_id"> Email Id</label>
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

            <div className="form-group">
              <label htmlFor="type"> Role </label>
              <Select
                isMulti
                options={userData}
                value={userData.filter((obj) => roleId.includes(obj.value))}
                onChange={handleChange}
                isSearchable={true}
                isClearable
              />
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

function AddUser() {
  const [modalShow, setModalShow] = React.useState(false);

  return (
    <>
      <div
        onKeyDown={() => setModalShow(true)}
        onClick={() => setModalShow(true)}
        role="button"
        tabIndex="0"
      >
        <button className="btn buton-sky-blue"> Add Data</button>
      </div>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        setModalShow={setModalShow}
      />
    </>
  );
}

export default AddUser;
