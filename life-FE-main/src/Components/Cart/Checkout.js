import React from "react";

function Checkout() {
  return (
    <div className="text-center">
      <h1 className="mb-4 title_one">Checkout</h1>
      <div className="main_Line">
        <div className="inner_line"></div>
        <div className="circle circle1 active_circle">
          <span className="circle_inner">Overview</span>
        </div>
        <div className="circle circle2">
          <span className="circle_inner">Payment</span>
        </div>
        <div className="circle circle3">
          <span className="circle_inner">Completed</span>
        </div>
      </div>
    </div>
  );
}

export default Checkout;
