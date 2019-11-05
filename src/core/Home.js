import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { isAuthenticated } from "../auth";
import { getBooks, searchBooks } from "./apiCore";
import Layout from "./Layout";
import Card from "./Card";

const Home = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [booksNumber, setBooksNumber] = useState(0);
  const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const limit = 6;

  const [search, setSearch] = useState("");

  const loadBooks = () => {
    setBooks([]);
    setLoading(true);
    getBooks({ limit: limit, page: page }).then(data => {
      if (data.error) {
        // setError(data.error);
      } else {
        setLoading(false);
        setBooksNumber(data.booksNumber);
        setBooks(data.books);
      }
    });
  };

  const handleChangePage = numberPage => {
    setPage(numberPage);
  };

  useEffect(() => {
    loadBooks();
  }, [page]);

  const pagination = () => (
    <nav aria-label="Page navigation example">
      <ul className="pagination">
        {Array.from(
          { length: Math.ceil(booksNumber / limit) },
          (v, k) => k + 1
        ).map(index => (
          <li
            key={index}
            className={page === index ? "page-item active" : "page-item"}
            style={{ cursor: "pointer" }}
            onClick={() => handleChangePage(index)}
          >
            <span className="page-link">{index}</span>
          </li>
        ))}
      </ul>
    </nav>
  );

  const searchBooksAPI = () => {
    console.log("Searching");
    searchBooks(search)
      .then(({ data, size }) => {
        if (size === 0) {
        }
        setBooks(data);
        setBooksNumber(0);
      })
      .catch(err => console.error(err));
  };

  const handleSearch = e => {
    setSearch(e.target.value);
  };

  const searchSubmit = event => {
    event.preventDefault();
    if (search === "") {
      loadBooks();
    } else {
      searchBooksAPI();
    }
  };

  const showLoading = () => (
    <div className="alert alert-secondary" role="alert">
      Loading books
    </div>
  );

  const searchForm = () => (
    <form action="" className="mb-4" onSubmit={searchSubmit}>
      <span className="input-group-text">
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            placeholder="Search by name"
            value={search}
            onChange={handleSearch}
          />
        </div>
        <div className="btn-input-group-append" style={{ border: "none" }}>
          <button className="input-group-text">Search</button>
        </div>
      </span>
    </form>
  );

  return (
    <Layout
      title="Home Page"
      description="Bookstore"
      className="container-fluid"
    >
      <div className="row">
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <div className="col-8">{searchForm()}</div>
        )}

        <div className="col-4">
          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <Link className="btn btn-warning btn-lg mb-3" to="/create/book">
              Create book
            </Link>
          )}
        </div>
      </div>
      <h2 className="mb-4">Books</h2>

      {loading && showLoading()}

      <div className="row">
        {books.map((book, i) => (
          <Card key={i} book={book} />
        ))}
      </div>
      <div className="row">
        <div className="col-12">{pagination()}</div>
      </div>
    </Layout>
  );
};

export default Home;
