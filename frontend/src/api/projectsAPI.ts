import { Book } from "../types/Book";

interface FetchBooksResponse {
  books: any;
  projects: Book[];
  totalNumBooks: number;
}

const API_URL = `https://bookstore-taylor2-backend.azurewebsites.net/api`;

export const fetchBooks = async (
  pagesize: number,
  pagenum: number,
  sortOrder: string,
  selectedcategories: string[]
): Promise<FetchBooksResponse> => {
  const categoryparams = selectedcategories
    .map((c) => `booktypes=${encodeURIComponent(c)}`)
    .join("&");
  try {
    const response = await fetch(
      `${API_URL}/Book/AllBooks?pageAmount=${pagesize}&pagenum=${pagenum}&sortOrder=${sortOrder}${selectedcategories.length ? `&${categoryparams}` : ``}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch books");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching Books:", error);
    throw error;
  }
};

export const addBook = async (newBook: Book): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/Book/AddBook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error("Failed to add book");
    }

    return await response.json();
  } catch (error) {
    console.error("Error adding book:", error);
    throw error; // Ensure the error is propagated for handling
  }
};

export const updateBook = async (
  bookID: number,
  updatedBook: Book
): Promise<Book> => {
  try {
    const response = await fetch(`${API_URL}/Book/UpdateBook/${bookID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedBook),
    });
    return await response.json();
  } catch (error) {
    console.error("Error updating project");
    throw error;
  }
};

export const deleteBook = async (bookID: number): Promise<void> => {
  try {
    console.log(`Attempting to delete book with ID: ${bookID}`);
    console.log(`DELETE request to: ${API_URL}/Book/DeleteBook/${bookID}`);

    const response = await fetch(`${API_URL}/Book/DeleteBook/${bookID}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(`Delete response status: ${response.status}`);

    if (!response.ok) {
      const errorText = await response.text();
      console.log(`Error response body: ${errorText}`);
      throw new Error(`Failed to Delete: ${response.status} ${errorText}`);
    }
  } catch (error) {
    console.error("Error details:", error);
    throw error;
  }
};
