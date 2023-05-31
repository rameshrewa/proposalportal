import React from "react";
import Dashboard from "../../../components/adminComponents/dashboard/dashboard";
import AdminLayout from "../../../layout/adminLayout";

export default function DashboardPage() {
  return (
    <AdminLayout>
      <div>
        <Dashboard />
      </div>
    </AdminLayout>
  );
}
