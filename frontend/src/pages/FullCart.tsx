import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function FullCart() {
  const navigate = useNavigate();
  const { cart, removeFromCart } = useCart();

  // State to manage modal visibility and selected item to remove
  const [showModal, setShowModal] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<CartItem | null>(null);

  // Calculate total sum of subtotals
  const totalSum = cart.reduce((sum, item) => sum + item.subtotal, 0);

  // Open modal to confirm removal
  const handleRemoveClick = (item: CartItem) => {
    setItemToRemove(item);
    setShowModal(true);
  };

  // Confirm item removal
  const confirmRemove = () => {
    if (itemToRemove) {
      removeFromCart(itemToRemove.bookID);
      setShowModal(false);
      setItemToRemove(null);
    }
  };

  // Close modal without removing item
  const cancelRemove = () => {
    setShowModal(false);
    setItemToRemove(null);
  };

  return (
    <div>
      <h1>Your Cart</h1>
      <div>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <ul>
            {cart.map((item: CartItem) => (
              <li key={item.bookID}>
                <strong>Title:</strong> {item.title} <br />
                <strong>Author:</strong> {item.author} <br />
                <strong>Quantity:</strong> {item.quantity} <br />
                <strong>Unit Price:</strong> ${item.unitprice.toFixed(2)} <br />
                <strong>Subtotal:</strong> ${item.subtotal.toFixed(2)}
                <hr />
                <button onClick={() => handleRemoveClick(item)}>
                  Remove Book
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {cart.length > 0 && (
        <div>
          <h3>
            Total: ${totalSum.toFixed(2)} {/* Display total sum */}
          </h3>
        </div>
      )}

      <button onClick={() => navigate("/")}>Back to Book List</button>

      {/* Modal for confirming the removal of an item */}
      {showModal && (
        <div
          className="modal fade show"
          style={{ display: "block" }}
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Removal</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={cancelRemove}
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <p>
                  Are you sure you want to remove{" "}
                  <strong>{itemToRemove?.title}</strong> from your cart?
                </p>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={cancelRemove}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={confirmRemove}
                >
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FullCart;
