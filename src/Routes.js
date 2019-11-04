import React, { useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import Home from "./core/Home";
import Signup from "./user/Signup";
import Signin from "./user/Signin";
import Orders from "./core/Orders";
import UserDashboard from "./user/UserDashboard";

import PrivateRoute from "./auth/PrivateRoute";
import AdminRoute from "./auth/AdminRoute";

import CartContext from "./providers/CartContext";
import { itemTotal } from "./core/cartHelper";

import Cart from "./core/Cart";

const Routes = () => {
  const cartHook = useState(itemTotal());
  return (
    <CartContext.Provider value={cartHook}>
      <div>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact component={Home} />
            <Route path="/signin" exact component={Signin} />
            <Route path="/signup" exact component={Signup} />

            <PrivateRoute path="/orders" exact component={Orders} />
            <PrivateRoute path="/cart" exact component={Cart} />
          </Switch>
        </BrowserRouter>
      </div>
    </CartContext.Provider>
  );
};

export default Routes;
