import React from 'react';
import AdminDocumentList from '../../components/adminComponents/documentVerification/adminDocumentList';
import AdminLayout from '../../layout/adminLayout';

export default function DocumentList() {
  return (
  <AdminLayout>
    <div>
      <AdminDocumentList/>
    </div>
  </AdminLayout>
  )
}
