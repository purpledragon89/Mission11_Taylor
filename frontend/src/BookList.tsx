import { useEffect, useState } from "react";
import { Book } from "./types/books";
import React from "react";

function BookList() {
  const [books, setbooks] = useState<Book[]>([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          "http://localhost:5003/api/Book/AllBooks"
        );
        const data = await response.json();

        // Check if data has the $values property which contains the array
        if (data && data.$values && Array.isArray(data.$values)) {
          setbooks(data.$values);
        } else {
          console.error("Unexpected data format:", data);
          setbooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setbooks([]);
      }
    };

    fetchBooks();
  }, []);

  return (
    <>
      <h1>Hilton's Books</h1>
      <br></br>
      {books.map((b, index) => (
        <div id="bookcard" key={b.bookID}>
          <h3>{b.title}</h3>

          <ul>
            <li>Author: {b.author}</li>
            <li>Publisher: {b.publisher}</li>
            <li>ISBN: {b.isbn}</li>
            <li>Classification: {b.classification}</li>
            <li>Category: {b.category}</li>
            <li>PageCount: {b.pageCount}</li>
            <li>Price: {b.price}</li>
          </ul>
        </div>
      ))}
    </>
  );
}

export default BookList;
