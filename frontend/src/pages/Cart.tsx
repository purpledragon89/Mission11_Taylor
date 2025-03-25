import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { CartItem } from "../types/CartItem";

function Cart() {
  const navigate = useNavigate();
  const { title, unitprice, bookID, author } = useParams(); // Destructure multiple params
  const { addToCart } = useCart();

  // Ensure values are properly converted
  const parsedBookID = Number(bookID) || 0;
  const parsedUnitPrice = parseFloat(unitprice || "0");

  // State to track quantity
  const [quantity, setQuantity] = useState(1);

  // Calculate subtotal
  const subtotal = parsedUnitPrice * quantity;

  const handleAddToCart = () => {
    if (!parsedBookID || !title || !author) {
      console.error("Invalid book data, cannot add to cart.");
      return;
    }

    const newItem: CartItem = {
      bookID: parsedBookID,
      title: title || "Unknown Title",
      author: author || "Unknown Author",
      quantity,
      unitprice: parsedUnitPrice,
      subtotal,
    };

    addToCart(newItem);
    navigate("/FullCart");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Add To Your Cart</h2>
      <div className="row justify-content-center">
        <div className="col-12" style={{ width: "80%" }}>
          {" "}
          {/* Custom width set to 80% */}
          <div className="card p-4 shadow-sm">
            <h3 className="text-center">{title}</h3>
            <h4 className="text-center">
              Unit Price: ${parsedUnitPrice.toFixed(2)}
            </h4>

            <div className="form-group mb-3">
              <label htmlFor="quantity" className="form-label">
                Quantity
              </label>
              <input
                id="quantity"
                type="number"
                className="form-control"
                value={quantity}
                min="1"
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
              />
            </div>

            {/* Display subtotal */}
            <h4 className="text-center">Subtotal: ${subtotal.toFixed(2)}</h4>

            <div className="d-flex justify-content-between mt-3">
              <button className="btn btn-primary" onClick={handleAddToCart}>
                Add to Cart
              </button>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/")}
              >
                Return to Book List
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
