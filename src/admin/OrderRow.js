import React from "react";
import moment from "moment";

const OrderRow = ({ order }) => {
  return (
    <tr>
      <th scope="row">{order._id}</th>
      <td>{moment(order.createdAt).format("MMMM Do YYYY, h:mm:ss a")}</td>
      <td>{order.user.email}</td>
      <td>
        <ul>
          {order.books.map((book, i) => (
            <li key={i}>{book.name}</li>
          ))}
        </ul>
      </td>
    </tr>
  );
};

export default OrderRow;
