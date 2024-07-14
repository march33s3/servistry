import React from "react";
import img from "../../assets/images/p_cradimg.png";
import { GrFormClose } from "react-icons/gr";

const Cart = () => {
  return (
    <>
      <div className="ov_card bg_layout1 mb-3">
        <div className="d-flex align-items-center gap-3 ov_card_c_1">
          <img src={img} className="ov_card_img" alt="" />
          <div>
            <h2 className="ov_card_title m-0">Service Name title</h2>
            <p className="ov_card_desc m-0">Registry Creator</p>
          </div>
        </div>

        <div className="ov_card_c_2">
          <p className="m-0 rm_text">Registry Name</p>
        </div>

        <div className="ov_card_c_3">
          <p className="ov_counter_number m-0 para1">
            <span>-</span> 1 <span>+</span>
          </p>
          <p className="text-center para2 m-0">8 available</p>
        </div>

        <div className="ov_card_c_4">
          <h3 className="m-0 rm_text">$100</h3>
        </div>

        <div className="ov_close_icon ov_card_c_5">
          <GrFormClose className="GrFormClose" />
        </div>
      </div>

      <div className="mobile_ov_card bg_layout1 mb-3">
        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-3 ov_card_c_1">
            <img src={img} className="ov_card_img" alt="" />
            <div>
              <h2 className="ov_card_title m-0">Service Name title</h2>
              <p className="ov_card_desc m-0">Registry Creator</p>
            </div>
          </div>
          <div className="d-flex flex-column gap-2 align-items-center">
            <div className="ov_close_icon">
              <GrFormClose className="GrFormClose" />
            </div>
            <h3 className="m-0 rm_text">$100</h3>
          </div>
        </div>

        <div className="d-flex justify-content-between">
          <div className="d-flex align-items-center gap-3">
            <p className="ov_counter_number m-0 para1">
              <span>-</span> 1 <span>+</span>
            </p>
            <p className="text-center para2 m-0">8 available</p>
          </div>
          <p className="m-0 rm_text">Registry Name</p>
        </div>
      </div>
    </>
  );
};

function Overview() {
  return (
    <div className="container">
      <div className="ov_main mb-4">
        <div>
          <h1 className="title_two mb-4">
            My cart
            <span className="fw-normal text-lowercase">(3 products)</span>
          </h1>
          <Cart />
          <Cart />
          <Cart />
        </div>

        <div>
          <h1 className="title_two mb-4">Order Summary</h1>
          <div className="order_summary_box">
            <div className="d-flex justify-content-between">
              <p>2 Services</p>
              <p>$200</p>
            </div>
            <hr />
            <div className="d-flex justify-content-between mb-2 mb-md-3">
              <p>Registry Service title</p>
              <p>$100</p>
            </div>

            <div className="d-flex justify-content-between mb-2 mb-md-3">
              <p>Registry Service title</p>
              <p>$100</p>
            </div>

            <div className="d-flex justify-content-between mb-2 mb-md-3">
              <p>Tax</p>
              <p>$1</p>
            </div>

            <hr />

            <div className="d-flex gap-3 mb-2 mb-md-3">
              <input
                type="text"
                className="input_field w-100"
                placeholder="Coupon:"
              />
              <button className="button1">apply</button>
            </div>

            <div className="d-flex justify-content-between mb-2 mb-md-3">
              <p className="fw-bold">TOTAL COST</p>
              <p className="fw-bold">$201</p>
            </div>

            <button className="button2 w-100">proceed to payment</button>
            <p className="ov_terms_text text-center mt-3">
              By clicking in "Proceed to Checkout" you <br className="d-none d-sm-block" /> agree with the
              <a href="#!" className="fw-bold text_gold">Terms & Conditions</a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
