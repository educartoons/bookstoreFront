import React, { useState, useEffect } from "react";
import moment from "moment";
import Layout from "./Layout";
import { listOrders } from "./apiCore";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  const getOrders = () => {
    listOrders().then(response => {
      setOrders(response.orders);
    });
  };

  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Layout
      title="Orders"
      description="Orders proccessed"
      className="container-fluid"
    >
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">#OrderId</th>
            <th scope="col">Order Date</th>
            <th scope="col">List of Books</th>
            <th scope="col">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order, i) => (
            <tr key={i}>
              <th scope="row">{order._id}</th>
              <td>
                {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
              </td>
              <td>
                <ul>
                  {order.books.map((book, i) => (
                    <li key={i}>{book.name}</li>
                  ))}
                </ul>
              </td>
              <td>{order.amount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Orders;
