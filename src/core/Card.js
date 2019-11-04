import React, { useState, useEffect, useContext } from "react";

import { API } from "../config";
import { isAuthenticated } from "../auth";
import { changeStatusBook } from "./apiCore";

const Card = ({
  book,
  showAddToCartButton = true,
  showRemoveFromCartButton = false
}) => {
  const [loading, setLoading] = useState(false);
  const [isActive, setIsActive] = useState(book.active);

  const { user, token } = isAuthenticated();

  const handleInactive = (productId, active) => {
    setLoading(true);
    // changeStatusBook(user._id, token, productId, { active })
    //   .then(book => {
    //     setLoading(false);
    //     setIsActive(book.active);
    //   })
    //   .catch(err => {
    //     //console.err(err);
    //   });
  };

  useEffect(() => {
    setIsActive(book.active);
  }, [book]);

  const addToCart = () => {
    //addItem(product, () => {});
  };

  return (
    <div className="col-4 mb-3">
      <div className="card">
        <div className="card-header">{book.name}</div>
        <div className="card-body">
          <p>{book.author}</p>
          <p>{book.price}</p>
          <p>{book.keywords}</p>

          {isAuthenticated() && isAuthenticated().user.role === 1 && (
            <>
              <p>
                <a
                  className="btn btn-success"
                  href={`${API}/file/${book.fileName}?token=${token}`}
                >
                  Download book
                </a>{" "}
              </p>

              {isActive ? (
                <button
                  className="btn btn-danger mr-2"
                  onClick={() => handleInactive(book._id, !isActive)}
                  disabled={loading}
                >
                  {loading ? "Inactivating" : "Inactivate"}
                </button>
              ) : (
                <button
                  className="btn btn-primary mr-2"
                  onClick={() => handleInactive(book._id, !isActive)}
                  disabled={loading}
                >
                  {loading ? "Activating" : "Activate"}
                </button>
              )}
            </>
          )}
          {isAuthenticated() &&
            isAuthenticated().user.role === 0 &&
            showAddToCartButton && (
              <>
                <button className="btn btn-warning" onClick={addToCart}>
                  Add to Cart
                </button>
              </>
            )}
        </div>
      </div>
    </div>
  );
};

export default Card;
