import React from 'react'
import PhotosUpload from '../../components/candidateComponents/PhotosUpload'
import CandidateLayout from '../../layout/candidateRegisterLayout'

export default function CandidatePhotoUpload() {
  return (
    <CandidateLayout>
      <div>
        <PhotosUpload/>
      </div>
    </CandidateLayout>
  )
}
