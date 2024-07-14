import React from 'react'
import img from '../../assets/images/verify-1.png'

function Complete() {
  return (
    <div className="container py-5 text-center">
      <img src={img} alt="" />
      <h1 className='title_one my-3'>Thank you for your order</h1>
      <p className='para1 my-3'>
        An email was sent to your email with all details about your order: services, receipt and time.
      </p>
      <div className="d-flex flex-wrap gap-4 justify-content-center">
        <button className='button2'>print receipt</button>
        <button className='button1'>receipt via email</button>
      </div>
    </div>
  )
}

export default Complete