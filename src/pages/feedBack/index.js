import React, { useState, useEffect } from "react";

// router
import { useParams } from "react-router-dom";

import { useForm } from "react-hook-form";

// assets
import Logo from "../../assets/images/proposal-logo.png";
import Loading from "../../components/shared/common/loading";
import { Modal } from "react-bootstrap";
import CandidateService from "../../services/admin/candidate.service";
import { toast } from "react-toastify";

const FeedBackForm = () => {
  //   let history = useHistory();
  const params = useParams();
  const candidateApi = new CandidateService();

  const [loading, setLoading] = useState(false);
  const [disableComment, setDisableComment] = useState(false);
  const [evalutionData, setEvalutionData] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    let payLoad = [
      {
        slugid: params.id,
        evaluator_comments: data.comment,
        social_behaviour: data.social_behaviour,
        legal_issues: data.legal_issues,
        family_reputation: data.family_reputation,
      },
    ];
    setLoading(true);
    candidateApi.usercomment(payLoad).then((response) => {
      if (
        response.data.isError === false ||
        response.data.statusCode === "200"
      ) {
        setLoading(false);
        if (response.data.message === "Comment already posted") {
          toast.error(response.data.message);
          setDisableComment(true);
        } else {
          toast.success(response.data.message);
          setDisableComment(true);
        }
      } else {
        setLoading(false);
      }
    });
  };
  const LoadIdInfo = (id) => {
    setLoading(true);
    candidateApi
      .userIdinfoApi(id)
      .then((response) => {
        if (
          response.data.isError === false ||
          response.data.statusCode === "200"
        ) {
          setEvalutionData(response.data.data);
          setLoading(false);
        } else {
          setLoading(false);
        }
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };
  useEffect(() => {
    LoadIdInfo(params.id);
  }, []);

  return (
    <>
      <section className="LoginSection">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-4 col-sm-12 col">
              <div className="LoginSignBg">
                <div className="login-signlogo py-5">
                  <img src={Logo} alt="Logo" />
                </div>
                <h1>User Details</h1>
                <p>
                  <tr>
                    <td>User Name </td> &nbsp;: &nbsp;
                    <td> {evalutionData && evalutionData.name} </td>
                  </tr>
                </p>
                <p>
                  <tr>
                    <td>Abhyasi Id </td> &nbsp;: &nbsp;
                    <td> {evalutionData && evalutionData.abhyasi_id} </td>
                  </tr>
                </p>
                <div>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="PaymentProccesForm"
                  >
                    <div>
                      <div className="form-group">
                        <label htmlFor="comment">
                          Comment<span className="requiredColor">*</span>
                        </label>
                        <textarea
                          type="text"
                          className="form-control Current_Address"
                          name="comment"
                          {...register("comment", {
                            required: true,
                            pattern: /^[A-Za-z0-9$&+,:;=? @#|'<>.^*%!-/\\/&/]+$/i,
                            maxLength: 120,
                          })}
                        />
                        <span className="error_validation ml-3">
                          {errors.comment?.type === "required" &&
                            "This field is required."}
                          {errors.comment &&
                            errors.comment.type === "maxLength" && (
                              <span>Max length 120 char exceeded</span>
                            )}
                          {errors.comment &&
                            errors.comment.type === "pattern" && (
                              <span>Please enter only alpha numeric</span>
                            )}
                        </span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="family_reputation">
                          Family Reputation
                          <span className="requiredColor">*</span>
                        </label>
                        <textarea
                          type="text"
                          className="form-control Current_Address"
                          name="family_reputation"
                          {...register("family_reputation", {
                            required: true,
                            pattern: /^[A-Za-z0-9$&+,:;=? @#|'<>.^*%!-/\\/&/]+$/i,
                            maxLength: 120,
                          })}
                        />
                        <span className="error_validation ml-3">
                          {errors.family_reputation?.type === "required" &&
                            "This field is required."}
                          {errors.family_reputation &&
                            errors.family_reputation.type === "maxLength" && (
                              <span>Max length 120 char exceeded</span>
                            )}
                          {errors.family_reputation &&
                            errors.family_reputation.type === "pattern" && (
                              <span>Please enter only alpha numeric</span>
                            )}
                        </span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="legal_issues">
                          Legal Issues
                          <span className="requiredColor">*</span>
                        </label>
                        <textarea
                          type="text"
                          className="form-control Current_Address"
                          name="legal_issues"
                          {...register("legal_issues", {
                            required: true,
                            pattern: /^[A-Za-z0-9$&+,:;=? @#|'<>.^*%!-/\\/&/]+$/i,
                            maxLength: 120,
                          })}
                        />
                        <span className="error_validation ml-3">
                          {errors.legal_issues?.type === "required" &&
                            "This field is required."}
                          {errors.legal_issues &&
                            errors.legal_issues.type === "maxLength" && (
                              <span>Max length 120 char exceeded</span>
                            )}
                          {errors.legal_issues &&
                            errors.legal_issues.type === "pattern" && (
                              <span>Please enter only alpha numeric</span>
                            )}
                        </span>
                      </div>
                      <div className="form-group">
                        <label htmlFor="social_behaviour">
                          Social Behaviour
                          <span className="requiredColor">*</span>
                        </label>
                        <textarea
                          type="text"
                          className="form-control Current_Address"
                          name="social_behaviour"
                          {...register("social_behaviour", {
                            required: true,
                            pattern: /^[A-Za-z0-9$&+,:;=? @#|'<>.^*%!-/\\/&/]+$/i,
                            maxLength: 120,
                          })}
                        />
                        <span className="error_validation ml-3">
                          {errors.social_behaviour?.type === "required" &&
                            "This field is required."}
                          {errors.social_behaviour &&
                            errors.social_behaviour.type === "maxLength" && (
                              <span>Max length 120 char exceeded</span>
                            )}
                          {errors.social_behaviour &&
                            errors.social_behaviour.type === "pattern" && (
                              <span>Please enter only alpha numeric</span>
                            )}
                        </span>
                      </div>
                    </div>

                    <div className="btn-aln-center">
                      <div className="popup-aprove-btn">
                        <input
                          type="submit"
                          value="Submit"
                          disabled={disableComment}
                          className="btn btn-primary btn-block login-button"
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="mobile-loginBg"></div>
      {loading === true && (
        <Modal id="loading" show={loading}>
          <Loading />
        </Modal>
      )}
    </>
  );
};

export default FeedBackForm;
