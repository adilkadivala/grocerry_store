import React from "react";
import { Link } from "react-router-dom";

const PaySuccess = () => {
  return (
    <div>
      <img src={require("../../assets/client/image/payment-success.webp")} />
      <Link to={"/"}>Home</Link>
    </div>
  );
};

export default PaySuccess;
