import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { createBook } from "./apiAdmin";

const AddBook = () => {
  const [values, setValues] = useState({
    name: "",
    author: "",
    price: "",
    categories: [],
    file: "",
    loading: false,
    error: "",
    createdBook: "",
    redirectToProfile: false,
    formData: ""
  });

  const { user, token } = isAuthenticated();
  const { name, author, price, loading, error, createdBook, formData } = values;

  useEffect(() => {
    setValues({ ...values, formData: new FormData() });
  }, []);

  const handleChange = name => event => {
    const value = name === "file" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setValues({ ...values, [name]: value });
  };

  const clickSubmit = event => {
    event.preventDefault();
    setValues({ ...values, error: "", loading: true, createdBook: "" });
    createBook(user._id, token, formData)
      .then(data => {
        if (data.error) {
          setValues({ ...values, error: data.error });
        } else {
          setValues({
            ...values,
            name: "",
            author: "",
            file: "",
            price: "",
            loading: false,
            createdBook: data.name
          });
        }
      })
      .catch();
  };

  const newPostForm = () => (
    <form action="" className="mb-3" onSubmit={clickSubmit}>
      <h4>Post File</h4>
      <div className="form-group">
        <label className="btn btn-secondary" htmlFor="">
          <input
            type="file"
            name="file"
            accept="text/plain"
            onChange={handleChange("file")}
            required
          />
        </label>
      </div>
      <div className="from-group">
        <label className="text-muted" htmlFor="">
          Name
        </label>
        <input
          className="form-control"
          type="text"
          value={name}
          onChange={handleChange("name")}
          required
        />
      </div>
      <div className="from-group">
        <label className="text-muted" htmlFor="">
          Author
        </label>
        <input
          className="form-control"
          type="text"
          value={author}
          onChange={handleChange("author")}
          required
        />
      </div>
      <div className="from-group">
        <label className="text-muted" htmlFor="">
          Price
        </label>
        <input
          className="form-control"
          type="number"
          value={price}
          onChange={handleChange("price")}
          required
        />
      </div>
      <button className="btn btn-primary mt-3">Submit</button>
    </form>
  );

  const showError = () => {
    if (error) {
      return (
        <h3 className="text-danger">{`The book ${name} written by ${author} already exists.`}</h3>
      );
    }
  };

  const showSuccess = () => (
    <div
      className="alert alert-info"
      style={{ display: createdBook ? "" : "none" }}
    >
      <h2>{`${createdBook} is created`}</h2>
    </div>
  );

  const showLoading = () =>
    loading && (
      <div className="alert alert-sucess">
        <h2>Loading...</h2>
      </div>
    );

  return (
    <Layout
      title="Add a new Book"
      description={`Hello ${user.name}. ready to add a new book`}
      className="container-fluid"
    >
      <div className="row">
        <div className="col-8 offset-md-2">
          {showLoading()}
          {showSuccess()}
          {showError()}
          {newPostForm()}
        </div>
      </div>
    </Layout>
  );
};

export default AddBook;
