import BookList from "./components/BookList";
import "./App.css";
import ProjectsPage from "./pages/BooksPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import Cart from "./pages/Cart";
import FullCart from "./pages/FullCart";
import { CartProvider } from "./context/CartContext";
import Admin from "./pages/Admin";

function App() {
  return (
    <>
      <CartProvider>
        <Router>
          <Routes>
            <Route path="/" element={<BooksPage />} />
            <Route
              path="/Cart/:title/:unitprice/:bookID/:author"
              element={<Cart />}
            />
            <Route path="FullCart" element={<FullCart />} />
            <Route path="/Admin" element={<Admin />} />
          </Routes>
        </Router>
      </CartProvider>
    </>
  );
}

export default App;
