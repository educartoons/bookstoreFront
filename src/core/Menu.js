import React, { useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import { signout, isAuthenticated } from "../auth";

const isActive = (history, path) => {
  if (history.location.pathname === path) {
    return { color: "#ff9900" };
  } else {
    return { color: "#ffffff" };
  }
};

const Menu = ({ history }) => {
  return (
    <div>
      <ul className="nav nav-tabs bg-primary">
        <li className="nav-item">
          <Link className="nav-link" style={isActive(history, "/")} to="/">
            Book Index
          </Link>
        </li>

        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/orders")}
                to="/orders"
              >
                My Orders
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/user/cart")}
                to="/cart"
              >
                My Cart
                <sup>
                  <small
                    className="cart-badge"
                    style={{
                      borderRadius: "50%",
                      padding: "2px 6px",
                      backgroundColor: "black"
                    }}
                  ></small>
                </sup>
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/users")}
                to="/users"
              >
                User Index
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/orders/all")}
                to="/orders/all"
              >
                Order Index
              </Link>
            </li>
          </>
        )}

        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signin")}
                to="/signin"
              >
                Sign in
              </Link>
            </li>
            <li className="nav-item">
              <Link
                className="nav-link"
                style={isActive(history, "/signup")}
                to="/signup"
              >
                Sign up
              </Link>
            </li>
          </>
        )}

        {isAuthenticated() && (
          <li className="nav-item">
            <span
              className="nav-link"
              style={{ cursor: "pointer", color: "#ffffff" }}
              onClick={() =>
                signout(() => {
                  history.push("/");
                })
              }
            >
              Sign out
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default withRouter(Menu);
