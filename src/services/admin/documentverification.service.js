import { ax } from "../index";

export class DocumentVerificationServices {
  // Registered candidate api's

  documentNewVerification(params) {
    return ax.get("/admin/candidate", { params: params });
  }
  documentReviewCandidate(params) {
    return ax.get("/admin/approvedCandidateList", { params: params });
  }
  documentOneCandidate(candidate_id) {
    return ax.get(`/admin/oneCandidate/${candidate_id}`);
  }
  documentPostData(payload) {
    return ax.post("/admin/loginCandidateStatus", payload);
  }

  // Candidate Verification api's

  candidateVerificationGetApi(params) {
    return ax.get("/admin/profileSubmittedCandidates", { params: params });
  }
  candidateVerificationOneProfile(candidate_id) {
    return ax.get(`/admin/oneProfile/${candidate_id}`);
  }
  candidateVerificationProfileDocStatus(payload) {
    return ax.post("/admin/profileDocStatus", payload);
  }
  candidateVerificationLogDetails(candidate_id) {
    return ax.get(`/bg/logDetails/${candidate_id}`);
  }

  getRoles() {
    return ax.get(`/admin/loginUserRole`);
  }
  // Matching export

  candidateMatchingExpertApi(payload) {
    return ax.post(`/me/bgVerifiedCandidates`, payload);
  }
  candidateMatchingExpertBrideApi(payload) {
    return ax.post(`/me/bgVerifiedCandidates`, payload);
  }
  candidateMatchingExpertOneProfileApi(candidate_id) {
    return ax.post(`/me/brideDetails`, [{ candidate_id: candidate_id }]);
  }
  candidateMatchingExpertsuitableMatchFilterApi(payload) {
    return ax.post(`/me/suitableMatch`, payload);
  }
  candidateMatchingExpertMatchSubmitApi(payload) {
    return ax.post("/me/matchSubmit", payload);
  }
  candidateMatchingExpertMatchStatusApi(params) {
    return ax.get("/me/matchStatus", { params: params });
  }
  candidateMatchingExpertConfirmWeddingApi() {
    return ax.post("/me/confirmWedding");
  }
  candidateMatchingExpertConfirmWeddingPopupApi(payload) {
    return ax.post("/me/confirmWedding", payload);
  }
  docApprovedCandidateList(payload) {
    return ax.post("/bg/docApprovedCandidateList", payload);
  }
  bgCandidateDetails(payload) {
    return ax.post("/bg/candidate", payload);
  }
  bgCandidatelogDetails(id) {
    return ax.get(`/bg/logDetails/${id}`);
  }
  bgApprovalDetails(payload) {
    return ax.post("/bg/approvalDetails", payload);
  }
  bgAdminApproval(payload) {
    return ax.post("/bg/bgApproval", payload);
  }
  bgExtendDate(payload) {
    return ax.put("/bg/extendDate", payload);
  }
  bgExtendDateGet(payload) {
    return ax.post("/bg/extendDate", payload);
  }
  allEvaluatorComments(payload) {
    return ax.post("/bg/allEvaluatorComments", payload);
  }
  candidateMatchingExpertSuitableFilterApi(payload) {
    return ax.post("/me/suitableMatch", payload);
  }
  candidateSearchByKey(payload) {
    return ax.post(`/admin/searchByKey`, payload);
  }
  adminlistNotification(payLoad) {
    return ax.post(`admin/listNotification`, payLoad);
  }

  adminupdateNotification(payLoad) {
    return ax.post(`admin/updateNotification`, payLoad);
  }
  downloadProfile(id) {
    return ax.get(`/me/downloadProfile/${id}`);
  }

  // Admin dashboard

  dashboardTopCount() {
    return ax.get(`/me/dashboardTopCount`);
  }

  recentActivity(payLoad) {
    return ax.post(`me/recentActivity`, payLoad);
  }
  successRate(payLoad) {
    return ax.post(`me/successRate`, payLoad);
  }

  // admin rejected apis

  rejectedCandidateList(params) {
    return ax.get(`admin/rejectedCandidateList/rejected_for_match`, {
      params: params,
    });
  }
  bgRejectedCandidates(status, params) {
    return ax.post(`me/bgRejectedCandidates/${status}`, params);
  }
  matchRejectedCandidates(status, params) {
    return ax.post(`me/maxMatchRequestRejectedCandidates/${status}`, params);
  }
}
