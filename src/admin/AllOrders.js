import React, { useState, useEffect } from "react";

import Layout from "../core/Layout";
import OrderRow from "./OrderRow";
import { isAuthenticated } from "../auth";
import { listOrders } from "./apiAdmin";

const AllOrders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [ordersNumber, setOrdersNumber] = useState(0);

  const limit = 6;

  useEffect(() => {
    loadOrders();
  }, [page]);

  const { user, token } = isAuthenticated();

  const loadOrders = () => {
    listOrders(user._id, token, { page, limit })
      .then(data => {
        setOrdersNumber(data.ordersNumber);
        setOrders(data.orders);
      })
      .catch(err => console.log(err));
  };

  const handleChangePage = numberPage => {
    setPage(numberPage);
  };

  const pagination = () => (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(ordersNumber / limit) },
          (v, k) => k + 1
        ).map(index => (
          <li
            key={index}
            className={page === index ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
            onClick={() => handleChangePage(index)}
          >
            <span className="page-link">{index}</span>
          </li>
        ))}
      </ul>
    </nav>
  );

  return (
    <Layout
      title="Orders"
      description="Table with all the orders submitted"
      className="container-fluid"
    >
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Order ID</th>
            <th scope="col">Order date</th>
            <th scope="col">User email</th>
            <th scope="col">Ordered books</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <OrderRow key={i} order={order} />
          ))}
        </tbody>
      </table>
      <div className="row">
        <div className="col-12">{pagination()}</div>
      </div>
    </Layout>
  );
};

export default AllOrders;
