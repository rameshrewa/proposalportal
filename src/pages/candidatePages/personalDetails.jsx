import React from 'react'
import PersonalDetail from '../../components/candidateComponents/personalDetail'
import CandidateLayout from '../../layout/candidateRegisterLayout'

export default function Candidate() {
  return (
    <CandidateLayout>
      <div>
        <PersonalDetail/>
      </div>
    </CandidateLayout>
  )
}
