import React from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const CartSummary = () => {
  const navigate = useNavigate();
  const { cart } = useCart();

  // Calculate total sum of the cart's subtotals
  const totalSum = cart.reduce((sum, item) => sum + item.subtotal, 0);

  return (
    <div
      style={{
        position: "fixed",
        top: "20px",
        right: "20px",
        backgroundColor: "lightgray",
        borderRadius: "50%",
        padding: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
      }}
      onClick={() => navigate("/FullCart")}
    >
      🛒 $<strong>{totalSum.toFixed(2)}</strong> {/* Display the total sum */}
    </div>
  );
};

export default CartSummary;
