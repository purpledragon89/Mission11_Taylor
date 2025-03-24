import BookList from "./components/BookList";
import "./App.css";
import ProjectsPage from "./pages/BooksPage";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BooksPage from "./pages/BooksPage";
import Cart from "./pages/Cart";
import FullCart from "./pages/FullCart";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<BooksPage />} />
          <Route path="/Cart/:title/:price" element={<Cart />} />
          <Route path="FullCart" element={<FullCart />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
