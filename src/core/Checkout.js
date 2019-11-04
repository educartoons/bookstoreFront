import React, { useState } from "react";

import { isAuthenticated } from "../auth";
import { createOrder } from "./apiCore";
import { emptyCart } from "./cartHelper";

const Checkout = ({ books }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const { user, token } = isAuthenticated();

  const getTotal = () => {
    return books.reduce((total, book) => {
      return total + book.price;
    }, 0);
  };

  const handleOrder = () => {
    setLoading(true);
    const createOrderData = {
      books: books,
      amount: getTotal()
    };
    createOrder(user._id, token, createOrderData).then(response => {
      emptyCart(() => {
        setLoading(false);
        setSuccess(true);
      });
    });

    // empty cart
  };

  const showLoading = () => <h4>Loading...</h4>;

  const showSuccess = () => (
    <div className="alert alert-info mt-3">Your order has been proccesed</div>
  );

  return (
    <div>
      <h2>Total : ${getTotal()}</h2>
      {loading && showLoading()}
      {books.length !== 0 && (
        <button className="btn btn-primary" onClick={handleOrder}>
          Order
        </button>
      )}
      {success && showSuccess()}
    </div>
  );
};

export default Checkout;
