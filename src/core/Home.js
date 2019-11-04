import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import Layout from "./Layout";

const Home = () => {
  return (
    <Layout
      title="Home Page"
      description="Bookstore"
      className="container-fluid"
    >
      Homepage
    </Layout>
  );
};

export default Home;
