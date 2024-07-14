import React from "react";
import img1 from '../../assets/images/payment_icon/payoneer.png'
import img2 from '../../assets/images/payment_icon/vias.png'
import img3 from '../../assets/images/payment_icon/paypal.png'
import img4 from '../../assets/images/payment_icon/Single_Euro_Payments_Area_logo.png'
import img5 from '../../assets/images/payment_icon/Klarna_Logo_black.png'
import img6 from '../../assets/images/payment_icon/giro.png'

function Payment() {
  return (
    <>
      <div className="container mb-5">

        <div className="payment_img">
          <div>
            <img src={img1} alt="" />
          </div>
          <div>
            <img src={img2} alt="" />
          </div>
          <div>
            <img src={img3} alt="" />
          </div>
          <div>
            <img src={img4} alt="" />
          </div>
          <div>
            <img src={img5} alt="" />
          </div>
          <div>
            <img src={img6} alt="" />
          </div>
        </div>

        <div className="payment_width">
          <div className="row g-4 mt-3 mt-md-5">
            <div className="col-md-6">
              <input type="text" className="input_field w-100" placeholder="Card Name" />
            </div>
            <div className="col-md-6">
              <input type="text" className="input_field w-100" placeholder="Billing Address" />
            </div>
            <div className="col-md-6">
              <input type="text" className="input_field w-100" placeholder="Card Number" />
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-6">
                  <select name="" id="" className="input_field w-100">
                    <option value="">City:</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <select name="" id="" className="input_field w-100">
                    <option value="">State:</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <input type="text" className="input_field w-100" placeholder="Security Code" />
            </div>
            <div className="col-md-6">
              <input type="text" className="input_field w-100" placeholder="Zip Code" />
            </div>
            <div className="col-md-6">
              <div className="row">
                <div className="col-sm-6">
                  <select name="" id="" className="input_field w-100">
                    <option value="">City:</option>
                  </select>
                </div>
                <div className="col-sm-6">
                  <select name="" id="" className="input_field w-100">
                    <option value="">State:</option>
                  </select>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <button className="button2 w-100">buy now</button>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default Payment;
