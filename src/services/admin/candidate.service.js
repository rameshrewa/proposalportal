import { ax, evalutionURL } from "../index";

export default class CandidateService {
  // Project Sec
  submitCandidateDetails(payLoad) {
    return ax.post("candidates", payLoad);
  }
  personalCandidateDetails(payLoad) {
    return ax.put("candidates", payLoad);
  }
  userLogininfoApi() {
    return ax.get("candidate/logininfo");
  }
  userReginfoApi() {
    return ax.get("candidate/reginfo");
  }
  paymentApi(payLoad) {
    return ax.post("candidate/payment", payLoad);
  }

  // Lifestyle Api's

  educationApi(payLoad) {
    return ax.post("candidate/education", payLoad);
  }
  educationDeleteApi(payLoad) {
    return ax.delete("candidate/education", payLoad);
  }

  professionApi(payLoad) {
    return ax.post("candidate/profession", payLoad);
  }
  otherdetailsApi(payLoad) {
    return ax.put("candidate/otherdetails", payLoad);
  }

  // Document Upload

  documentsApi(payLoad) {
    return ax.post("candidate/document", payLoad);
  }

  // Profile missing document section
  userMissingDoc() {
    return ax.get("candidate/missingDoc");
  }
  profileResumit(payLoad) {
    return ax.post("candidate/profileResumit", payLoad);
  }
  profilesubmit(payLoad) {
    return ax.post("candidate/profilesubmit", payLoad);
  }
  deletePhoto(payLoad) {
    return ax.delete("candidate/photo", payLoad);
  }

  // evalution form

  userIdinfoApi(id) {
    return evalutionURL.get(`candidate/${id}/feedback`);
  }
  usercomment(payLoad) {
    return evalutionURL.post(`bg/mailcomment`, payLoad);
  }
  recommendedMatch(id) {
    return ax.get(`candidate/recommendedMatch`);
  }
  matchStatus(payLoad) {
    return ax.put(`candidate/matchStatus`, payLoad);
  }
  weddingDetails() {
    return ax.get(`candidate/weddingDetails`);
  }
  weddingStatus(payLoad) {
    return ax.put(`candidate/weddingStatus`, payLoad);
  }
  profileStatus(payLoad) {
    return ax.put(`candidate/profileStatus`, payLoad);
  }
  listNotification(payLoad) {
    return ax.post(`candidate/listNotification`, payLoad);
  }
  updateNotification(payLoad) {
    return ax.post(`candidate/updateNotification`, payLoad);
  }
}
