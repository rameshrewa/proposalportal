import React from "react";
import AdminLayout from "../../layout/adminLayout";
import MatchingRejectCandidate from "../../components/adminComponents/matchingExpert/matchingRejectList";

export default function MatchingRejectCandiadte() {
  return (
    <AdminLayout>
      <div>
        <MatchingRejectCandidate />
      </div>
    </AdminLayout>
  );
}
