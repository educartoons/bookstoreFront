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
