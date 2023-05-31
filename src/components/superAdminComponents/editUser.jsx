import React, { useState, useCallback, useEffect } from "react";
import { Modal, Spinner } from "react-bootstrap";
import { useForm, Controller } from "react-hook-form";
import { SuperadminServices } from "../../services/superadmin/superadminData.service";
import StandardDataService from "../../services/common/standardData.service";
import { toast } from "react-toastify";
import { Typeahead } from "react-bootstrap-typeahead";

function EdituserData(props) {
  const [userData, setuserData] = useState([]);

  const standardPutApi = new SuperadminServices();
  const standardApi = new StandardDataService();
  const [loading, setLoading] = useState(false);

  const [valuePut] = useState({});

  const initialFormState = { ...valuePut };

  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm({ defaultValues: initialFormState });

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
      let submitData = [
        {
          last_name: data.last_name,
          first_name: data.first_name,
          abhyasi_id: data.abhyasi_id,
          email_id: data.email_id,
          user_id: data.user_id,
          type: roleId.toString(),
        },
      ];
      setLoading(true);
      standardPutApi
        .standardDataPutApi(submitData)
        .then((res) => {
          if (res?.status === 200) {
            toast.success("Form submitted successfully");
            setLoading(false);
            props.onHide("formSubmitted");
          } else {
            toast.error("something went wrong");
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
  const getUserDetails = useCallback(() => {
    standardPutApi
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
  }, [userData]);

  useEffect(() => {
    getUserDetails();
    const fields = [
      "last_name",
      "first_name",
      "user_id",
      "abhyasi_id",
      "email_id",
      "type",
    ];
    if (props && props.putUserData && props.putUserData.length !== 0) {
      fields.forEach((field) => setValue(field, props?.putUserData[0][field]));
    }
  }, [props?.putUserData]);

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
          <h3 className="admin-heading-user-text"> Edit Admin Users</h3>
          <form
            className="super-admin-add-users"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="form-group">
              <label htmlFor="first_name">
                {" "}
                First Name <span className="requiredColor">*</span>{" "}
              </label>
              <input
                {...register("first_name", { required: true })}
                type="text"
                name="first_name"
                className="form-control"
              />
              {errors.first_name && (
                <p className="error-mes">This field is required</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="last_name">
                {" "}
                Last Name <span className="requiredColor">*</span>{" "}
              </label>
              <input
                {...register("last_name", { required: true })}
                name="last_name"
                className="form-control"
              />
              {errors.last_name && (
                <p className="error-mes">This field is required</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="abhyasi_id">
                {" "}
                Abhyasi Id <span className="requiredColor">*</span>{" "}
              </label>
              <input
                readOnly="readOnly"
                {...register("abhyasi_id", { required: true })}
                name="abhyasi_id"
                className="form-control"
              />
              {errors.abhyasi_id && (
                <p className="error-mes">This field is required</p>
              )}
            </div>
            <div className="form-group">
              <label htmlFor="email_id">
                {" "}
                Email Id<span className="requiredColor">*</span>{" "}
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

                  // >
                  //   {({ onClear, selected }) => (
                  //     <div className="rbt-aux">
                  //       {!!selected.length && <ClearButton onClick={onClear} />}
                  //       {!selected.length && (
                  //         <Spinner animation="grow" size="sm" />
                  //       )}
                  //     </div>
                  //   )}
                  // </Typeahead>
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
                Update
              </button>
            </div>
          </form>
        </div>
        <div></div>
      </Modal.Body>
    </Modal>
  );
}

export default EdituserData;
