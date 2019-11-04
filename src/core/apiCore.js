import { API } from "../config";
import { isAuthenticated } from "../auth";

export const getBooks = ({ limit, page }) => {
  if (isAuthenticated() && isAuthenticated().user.role === 1) {
    const { token, user } = isAuthenticated();
    return fetch(
      `${API}/booksAll/${user._id}/?order=desc&limit=${limit}&page=${page}`,
      {
        method: "GET",
        headers: {
          Accept: "Application/json",
          "Content-Type": "application/json",
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
  } else {
    return fetch(`${API}/books?order=desc&limit=${limit}&page=${page}`, {
      method: "GET"
    })
      .then(response => {
        return response.json();
      })
      .catch(err => console.error(err));
  }
};

export const searchBooks = search => {
  return fetch(`${API}/books/by/search?searchCriteria=${search}`, {
    method: "GET"
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.error(err));
};

export const changeStatusBook = (userId, token, bookId, active) => {
  return fetch(`${API}/books/${bookId}/${userId}`, {
    method: "PUT",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      // credentials: "same-origin",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(active)
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const createOrder = (userId, token, createOrderData) => {
  return fetch(`${API}/order/create/${userId}`, {
    method: "POST",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ order: createOrderData })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const listOrders = userId => {
  const { token, user } = isAuthenticated();
  return fetch(`${API}/orders/${user._id}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const listUsers = () => {
  const { token, user } = isAuthenticated();
  return fetch(`${API}/users/${user._id}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const getOrdersByUser = userId => {
  const { token, user } = isAuthenticated();
  return fetch(`${API}/user/orders/${user._id}/?byUser=${userId}`, {
    method: "GET",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
    // body: JSON.stringify()
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};

export const changeStatusUser = (userId, active) => {
  const { token } = isAuthenticated();
  return fetch(`${API}/user/change/status`, {
    method: "PUT",
    headers: {
      Accept: "Application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      userId: userId,
      active: active
    })
  })
    .then(response => {
      return response.json();
    })
    .catch(err => {
      console.error(err);
    });
};
