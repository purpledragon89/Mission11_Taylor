import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import React from "react";
import { useNavigate } from "react-router-dom";
import { fetchBooks } from "../api/projectsAPI";
import Pagination from "./Pagination";

function BookList({ selectedcategories }: { selectedcategories: string[] }) {
  const [books, setbooks] = useState<Book[]>([]);
  const [pagesize, setpagesize] = useState<number>(5);
  const [pagenum, setpagenum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        setLoading(true);
        const data = await fetchBooks(
          pagesize,
          pagenum,
          sortOrder,
          selectedcategories
        );

        // Check if data has the $values property which contains the array
        if (data && data.books.$values && Array.isArray(data.books.$values)) {
          setbooks(data.books.$values);
          setTotalPages(Math.ceil(data.totalNumBooks / pagesize));
        } else {
          console.error("Unexpected data format:", data);
          setbooks([]);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
        setbooks([]);
      } finally {
        setLoading(false);
      }
    };

    loadBooks();
  }, [pagesize, pagenum, sortOrder, selectedcategories]);

  if (loading) return <p>loading projects...</p>;

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
    setpagenum(1); // Reset to first page when sorting changes
  };

  return (
    <>
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
            <button
              className="btn btn-success"
              onClick={() =>
                navigate(
                  `/Cart/${encodeURIComponent(b.title)}/${encodeURIComponent(
                    b.price.toString()
                  )}/${b.bookID}/${encodeURIComponent(b.author)}`
                )
              }
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
      <Pagination
        index={pagenum}
        totalPages={totalPages}
        pageSize={pagesize}
        onPageChange={setpagenum}
        onPageSizeChange={(newSize) => {
          setpagesize(newSize);
          setpagenum(1);
        }}
      />
    </>
  );
}

export default BookList;
