import { useEffect, useState } from "react";
import { Book } from "../types/Book";
import { useNavigate } from "react-router-dom";
import { deleteBook, fetchBooks } from "../api/projectsAPI";
import React from "react";
import Pagination from "../components/Pagination";
import NewBookForm from "../components/NewBookForm";
import EditBookForm from "../components/EditBookForm";

const Admin = () => {
  const [books, setbooks] = useState<Book[]>([]);
  const [pagesize, setpagesize] = useState<number>(5);
  const [pagenum, setpagenum] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [sortOrder, setSortOrder] = useState<string>("asc");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState<Book | null>(null);

  // Use empty array to represent all categories (no filter)
  const selectedcategories: string[] = [];

  const loadBooks = async () => {
    try {
      setLoading(true);
      const data = await fetchBooks(
        pagesize,
        pagenum,
        sortOrder,
        selectedcategories
      );
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

  useEffect(() => {
    loadBooks();
  }, [pagesize, pagenum, sortOrder]); // Removed selectedcategories from dependency array

  if (loading && books.length === 0) return <p>Loading projects...</p>;

  const handleDelete = async (bookID: number) => {
    const confirmDelete = window.confirm("Are you sure about that?");
    if (!confirmDelete) return;

    try {
      setLoading(true);
      await deleteBook(bookID);

      // Instead of filtering locally, reload the entire dataset
      // This ensures consistency with server state and proper pagination
      await loadBooks();

      // If we're on a page that no longer exists (e.g., deleted the last item on the last page)
      // go back to the previous page
      if (books.length === 1 && pagenum > 1) {
        setpagenum(pagenum - 1);
      }
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Admin - Edit Book List</h1>
      {!showForm && (
        <button
          className="btn btn-success mb-3"
          onClick={() => setShowForm(true)}
        >
          Add a Book
        </button>
      )}

      {showForm && (
        <NewBookForm
          onSuccess={() => {
            setShowForm(false);
            loadBooks(); // Use the same function to reload books
          }}
          onCancel={() => setShowForm(false)}
        />
      )}
      {editingBook && (
        <EditBookForm
          book={editingBook}
          onSuccess={() => {
            setEditingBook(null);
            loadBooks(); // Use the same function to reload books
          }}
          onCancel={() => setEditingBook(null)}
        />
      )}

      <table>
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Author</th>
            <th>ISBN</th>
            <th>Publisher</th>
            <th>Classification</th>
            <th>Page Count</th>
            <th>Category</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((b) => (
            <tr key={b.bookID}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.isbn}</td>
              <td>{b.publisher}</td>
              <td>{b.classification}</td>
              <td>{b.pageCount}</td>
              <td>{b.category}</td>
              <td>{b.price}</td>
              <td>
                <button onClick={() => setEditingBook(b)}>Edit</button>
                <button onClick={() => handleDelete(b.bookID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
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
    </div>
  );
};

export default Admin;
