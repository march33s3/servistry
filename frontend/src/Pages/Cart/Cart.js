import React from "react";
import Checkout from "../../Components/Cart/Checkout";
import Complete from "../../Components/Cart/Complete";
import Overview from "../../Components/Cart/Overview";
import Payment from "../../Components/Cart/Payment";
import LoginHeader from "../../Components/Header/LoginHeader";

function Cart() {
  return (
    <div className="img_overlay">
      <LoginHeader />
      <Checkout />
      <div className="p-5"></div>
      <div className="d-none">
        <Overview />
      </div>

      <div className="d-none">
        <Payment />
      </div>

      <div className="d-block">
        <Complete />
      </div>
    </div>
  );
}

export default Cart;
