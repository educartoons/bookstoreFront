import React, { useState, useEffect } from "react";
import NewWindow from "react-new-window";
import moment from "moment";

import { getOrdersByUser, changeStatusUser } from "../core/apiCore";

const UserRow = ({ user }) => {
  const [loadingActive, setLoadingActive] = useState(false);
  const [loadingOrders, setLoadingOrders] = useState(false);
  const [orders, setOrders] = useState([]);
  const [showWindow, setShowWindow] = useState(false);
  const [isActive, setIsActive] = useState(user.active);

  const handleInactive = (userId, active) => {
    setLoadingActive(true);
    changeStatusUser(userId, active)
      .then(user => {
        setLoadingActive(false);
        setIsActive(user.active);
      })
      .catch(err => {
        //console.err(err);
      });
  };

  useEffect(() => {
    setIsActive(user.active);
  }, [user]);

  const loadOrdersByUser = userId => {
    getOrdersByUser(userId)
      .then(response => {
        setOrders(response.orders);
        setLoadingOrders(false);
      })
      .catch(err => console.error(err));
  };

  const openWindow = userId => {
    setLoadingOrders(true);
    setShowWindow(true);
    loadOrdersByUser(userId);
  };

  const closeWindow = () => {
    setShowWindow(false);
  };

  return (
    <>
      {showWindow && (
        <NewWindow onUnload={closeWindow}>
          <h3>Orders:</h3>
          {loadingOrders && <div>Loading...</div>}
          {orders.length === 0 && <p>This user does not have orders</p>}
          <table className="table">
            <thead className="thead-dark">
              <tr>
                <th scope="col">Date of Order</th>
                <th scope="col">Order ID</th>
                <th scope="col">Books</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, i) => (
                <tr key={i}>
                  <th scope="row">
                    {moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}
                  </th>
                  <td>{order._id}</td>
                  <td>
                    <ul>
                      {order.books.map((book, i) => (
                        <li key={i}>{book.name}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </NewWindow>
      )}
      <tr>
        <th scope="row">{user.name}</th>
        <td>{user.email}</td>
        <td>{user.orders}</td>
        <td>
          <button
            className="btn btn-primary mr-2"
            onClick={() => openWindow(user._id)}
          >
            View orders
          </button>

          {isActive ? (
            <button
              className="btn btn-danger mr-2"
              onClick={() => handleInactive(user._id, !isActive)}
              disabled={loadingActive}
            >
              {loadingActive ? "Inactivating" : "Inactivate"}
            </button>
          ) : (
            <button
              className="btn btn-primary mr-2"
              onClick={() => handleInactive(user._id, !isActive)}
              disabled={loadingActive}
            >
              {loadingActive ? "Activating" : "Activate"}
            </button>
          )}
        </td>
      </tr>
    </>
  );
};

export default UserRow;
