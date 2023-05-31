import React from "react";
import MatchStatusPage from "../../../components/adminComponents/matchingExpert/matchStatusPage";
import AdminLayout from "../../../layout/adminLayout";

export default function MatchStatus() {
  return (
    <AdminLayout>
      <div>
        <MatchStatusPage />
      </div>
    </AdminLayout>
  );
}
