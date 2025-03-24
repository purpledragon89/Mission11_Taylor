import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { title, price } = useParams(); // Destructure multiple params

  // Ensure price is treated as a number
  const unitPrice = parseFloat(price || "0");

  // State to track quantity
  const [quantity, setQuantity] = useState(1);

  // Calculate subtotal
  const subtotal = unitPrice * quantity;

  return (
    <>
      <h2>Add To Your Cart</h2>
      <h3>{title}</h3>
      <h4>Unit Price: ${unitPrice.toFixed(2)}</h4>

      <div>
        <input
          type="number"
          placeholder="Quantity of Books"
          value={quantity}
          min="1"
          onChange={(e) =>
            setQuantity(Math.max(1, parseInt(e.target.value) || 1))
          }
        />
        <button onClick={()=> navigate('/FullCart')} type="submit">Add to Cart</button>
      </div>

      {/* Display subtotal */}
      <h4>Subtotal: ${subtotal.toFixed(2)}</h4>

      <button onClick={() => navigate("/")}>Return to Book List</button>
    </>
  );
}

export default Cart;
