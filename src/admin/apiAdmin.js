import { API } from "../config";

export const createCategory = (userId, token, category) => {
  return fetch(`${API}/category/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(category)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const createBook = (userId, token, book) => {
  return fetch(`${API}/book/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      Authorization: `Bearer ${token}`
    },
    body: book
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const listOrders = (userId, token, query) => {
  return fetch(
    `${API}/orders/all/${userId}/?limit=${query.limit}&page=${query.page}`,
    {
      method: "GET",
      headers: {
        Accept: "Application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};
