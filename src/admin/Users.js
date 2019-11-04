import React, { useState, useEffect } from "react";

import Layout from "../core/Layout";
import UserRow from "./UserRow";
import { listUsers } from "../core/apiCore";

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = () => {
    listUsers().then(data => {
      setUsers(data.users);
    });
  };

  return (
    <Layout
      title="Users"
      description="Table with all the users created"
      className="container-fluid"
    >
      <table className="table">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Amount of orders</th>
            <th scope="col">Tools</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, i) => (
            <UserRow key={i} user={user} />
          ))}
        </tbody>
      </table>
    </Layout>
  );
};

export default Users;
