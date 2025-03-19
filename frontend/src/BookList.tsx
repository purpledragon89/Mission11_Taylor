import { useEffect, useState } from "react";
import { Book } from "./types/books";
import React from "react";

function BookList() {
  const [books, setbooks] = useState<Book[]>([]);
  const [pagesize, setpagesize] = useState<number>(5);
  const [pagenum, setpagenum] = useState<number>(1);
  const [totalBookItems, settotalbookitems] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("asc");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch(
          `https://localhost:5055/api/Book/AllBooks?pageAmount=${pagesize}&pagenum=${pagenum}&sortOrder=${sortOrder}`
        );
        const data = await response.json();

        // Check if data has the $values property which contains the array
        if (data && data.books.$values && Array.isArray(data.books.$values)) {
          setbooks(data.books.$values);
          settotalbookitems(data.totalNumBooks);
          setTotalPages(Math.ceil(data.totalNumBooks / pagesize));
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
  }, [pagesize, pagenum, sortOrder]);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setpagenum(1); // Reset to first page when sorting changes
  };

  return (
    <>
      <h1>Hilton's Books</h1>
      <div className="filters">
        <label>
          Sort by Title:
          <select value={sortOrder} onChange={handleSortChange}>
            <option value="asc">A-Z</option>
            <option value="desc">Z-A</option>
          </select>
        </label>
        <label>
          Results per Page:
          <select
            value={pagesize}
            onChange={(p) => setpagesize(Number(p.target.value))}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
            <option value="20">20</option>
          </select>
        </label>
      </div>
      <br />
      {books.map((b) => (
        <div id="bookcard" key={b.bookID} className="card">
          <h3 className="card-title">{b.title} </h3>
          <div className="card-body">
            <ul className="list-unstyled">
              <li>
                <strong>Author:</strong> {b.author}
              </li>
              <li>
                <strong>Publisher:</strong> {b.publisher}
              </li>
              <li>
                <strong>ISBN:</strong> {b.isbn}
              </li>
              <li>
                <strong>Classification:</strong> {b.classification}
              </li>
              <li>
                <strong>Category:</strong> {b.category}
              </li>
              <li>
                <strong>PageCount:</strong> {b.pageCount}
              </li>
              <li>
                <strong>Price:</strong> {b.price}
              </li>
            </ul>
          </div>
        </div>
      ))}
      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button key={index + 1} onClick={() => setpagenum(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </>
  );
}

export default BookList;