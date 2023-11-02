import React from 'react'

const Spinner = () => {
  console.log('spinner')
  return (
    <div className="d-flex justify-content-center spinner">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
    </div>
  )
}

export default Spinner
