import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";
import Card from "./Card";
import Checkout from "./Checkout";
import { getCart } from "./cartHelper";

const Cart = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems([]);
    setItems(getCart());
  }, []);

  const showItems = items => {
    return (
      <div>
        <h2>Your cart has {`${items.length} items`}</h2>
        <hr />
        <div className="row">
          {items.map((book, i) => (
            <Card
              key={i}
              book={book}
              showAddToCartButton={false}
              showRemoveFromCartButton={true}
            />
          ))}
        </div>
      </div>
    );
  };

  const noItemsMessage = () => (
    <h3>
      Your cart is empty. <br />
      <Link to="/">Continue shopping</Link>
    </h3>
  );

  return (
    <Layout
      title="Shopping Cart"
      description="Manage your cart items. Add remove checkout or continue shopping"
      className="container-fluid"
    >
      <div className="row">
        <div className="col-6">
          {items.length > 0 ? showItems(items) : noItemsMessage()}
        </div>
        <div className="col-6">
          <h2>Your cart summary</h2>
          <hr />
          <Checkout books={items} />
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
