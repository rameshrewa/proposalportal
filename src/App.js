import React from "react";
import { Switch, Route } from "react-router-dom";
//import "bootstrap/dist/css/bootstrap.min.css";

import SuperadminDashboard from "./pages/superAdminPages/superAdminDashboard";
import Candidate from "./pages/candidatePages/personalDetails";
import LifeStyle from "./pages/candidatePages/lifeStyle";
import CandidateLogin from "./pages/candidatePages/candidateLogin";
import CandidateRegister from "./pages/candidatePages/candidateRegister";
import CandidatePhotoUpload from "./pages/candidatePages/candidatePhotosUpload";
import CandidateDocument from "./pages/candidatePages/candidateDocuments";
import DocumentList from "./pages/adminPages/documentList";
import RegisterAdminCandidate from "./pages/adminPages/registerCandidate";
import AdminCandidateVerificication from "./pages/adminPages/candidateVerification";
import AdminReasonofreject from "./pages/adminPages/reasonofReject";
import ResubmittedcandidateAdmin from "./pages/adminPages/resubmittedCandidate";
import AdminDocumentattchments from "./pages/adminPages/documentAttachments";
import SuperAdminLogin from "./pages/superAdminPages/superAdminLogin";
import ProfileDashboard from "./components/candidateComponents/candidateUserProfile/profileDashboard";
import ProfileInformation from "./components/candidateComponents/candidateUserProfile/profileInformation";
import Bgcandidateverification from "./pages/adminPages/bgVerifiedCandidate";
import BgApprovalDetails from "./pages/adminPages/bgApprovalDetail";
import MatchingexpertCandiadte from "./pages/adminPages/matchingExpert/matchingExpertCandidate";
import MatchBride from "./pages/adminPages/matchingExpert/matchBrides";
import PaymentProcces from "./components/candidateComponents/paymentProcess";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MatchStatus from "./pages/adminPages/matchingExpert/matchStatus";
import RequestForWedding from "./pages/adminPages/matchingExpert/requestForWedding";
import MatchBrideFliter from "./pages/adminPages/matchingExpert/matchbridefliter";
import SuitableMatch from "./pages/adminPages/matchingExpert/suitableMatch";
import DashboardPage from "./pages/adminPages/dashboardPages/dashboardPage";
import FeedBackForm from "./pages/feedBack";
import RecommendedMatch from "./components/candidateComponents/candidateUserProfile/recommendedMatch";
import WeddingMatch from "./components/candidateComponents/candidateUserProfile/confirmWedding";
import ErrorPage from "./components/shared/common/errorPage";
import BgRejected from "./pages/adminPages/bgRejectedCandidates";
import MatchingRejectCandiadte from "./pages/adminPages/matchingExpertReject";
const App = () => {
  return (
    <>
      <Switch>
        <Route exact path={["/", "/login"]} component={CandidateLogin} />
        <Route exact path="/evaluation/:id" component={FeedBackForm} />
        <Route exact path="/register" component={CandidateRegister} />
        <Route exact path="/personal-detail" component={Candidate} />
        <Route exact path="/lifestyle" component={LifeStyle} />
        <Route exact path="/upload-documents" component={CandidateDocument} />
        <Route exact path="/photos-upload" component={CandidatePhotoUpload} />
        <Route exact path="/dashboard" component={ProfileDashboard} />
        <Route exact path="/payment" component={PaymentProcces} />
        <Route exact path="/user-information" component={ProfileInformation} />
        <Route exact path="/superadmin/login" component={SuperAdminLogin} />
        <Route exact path="/recommendedMatch" component={RecommendedMatch} />
        <Route exact path="/confirmWedding" component={WeddingMatch} />
        <Route exact path="/error" component={ErrorPage} />
        <Route
          exact
          path="/superadmin/dashboard"
          component={SuperadminDashboard}
        />
        <Route
          exact
          path="/admin/registeredcandidate"
          component={RegisterAdminCandidate}
        />
        <Route
          exact
          path="/admin/candidateverification"
          component={AdminCandidateVerificication}
        />
        <Route exact path="/admin/documentlist" component={DocumentList} />
        <Route
          exact
          path="/admin/documentattchments"
          component={AdminDocumentattchments}
        />
        <Route
          exact
          path="/admin/reasonofreject"
          component={AdminReasonofreject}
        />
        <Route
          exact
          path="/admin/resubmittedcandidate"
          component={ResubmittedcandidateAdmin}
        />
        <Route
          exact
          path="/admin/bgChecking"
          component={Bgcandidateverification}
        />
        <Route exact path="/admin/bgRejected" component={BgRejected} />
        <Route
          exact
          path="/admin/bgapprovaldetails"
          component={BgApprovalDetails}
        />
        <Route
          exact
          path="/admin/matchingexpert"
          component={MatchingexpertCandiadte}
        />
        <Route
          exact
          path="/admin/rejectedMatches"
          component={MatchingRejectCandiadte}
        />
        <Route exact path="/admin/matchingbride" component={MatchBride} />
        <Route exact path="/admin/matchstatus" component={MatchStatus} />
        <Route
          exact
          path="/admin/requestforwedding"
          component={RequestForWedding}
        />
        <Route
          exact
          path="/admin/matchingbridefliter"
          component={MatchBrideFliter}
        />

        <Route exact path="/admin/suitablematch" component={SuitableMatch} />
        <Route exact path="/admin/dashboard" component={DashboardPage} />
      </Switch>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        newestOnTop={false}
        hideProgressBar
        closeOnClick
        rtl={false}
      />
    </>
  );
};

export default App;
