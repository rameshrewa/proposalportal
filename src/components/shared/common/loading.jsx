import React from 'react'
import Spinner from 'react-bootstrap/Spinner';
export default function Loading() {
  return (
    <Spinner id="loading" animation="border" role="status">
    </Spinner>
  )
}
