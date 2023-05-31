import React from "react";
import BgRejectedCandidate from "../../components/adminComponents/bgExpert/bgRejectedCandidates";
import AdminLayout from "../../layout/adminLayout";

export default function BgRejected() {
  return (
    <AdminLayout>
      <div>
        <BgRejectedCandidate />
      </div>
    </AdminLayout>
  );
}
