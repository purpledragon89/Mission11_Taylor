import React, { useEffect, useState } from "react";
import "./CategoryFilter.css";
function CategoryFilter({
  selectedcategories,
  setselectedcategories,
}: {
  selectedcategories: string[];
  setselectedcategories: (categories: string[]) => void;
}) {
  const [bookcategories, setbookcategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://localhost:5055/api/Book/BookCategory"
        ); // Update with your API URL
        const data = await response.json();

        // Ensure we extract the correct array from the JSON response
        setbookcategories(data.$values || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  function handleCheckbox({ target }: { target: HTMLInputElement }) {
    const updatedCategories = selectedcategories.includes(target.value)
      ? selectedcategories.filter((x) => x !== target.value)
      : [...selectedcategories, target.value];

    setselectedcategories(updatedCategories);
  }

  return (
    <div className="category-filter">
      <h3>Book Categories</h3>
      <div>
        {bookcategories.map((category) => (
          <div key={category}>
            <input
              type="checkbox"
              id={category}
              value={category}
              onChange={handleCheckbox}
            />

            <label htmlFor={category}>{category}</label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoryFilter;
