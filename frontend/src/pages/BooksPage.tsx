import React, { useState } from "react";
import WelcomeBand from "../components/WelcomeBand";
import CategoryFilter from "../components/CategoryFilter";
import BookList from "../components/BookList";
import CartSummary from "../components/CartSummary";

function ProjectsPage() {
  const [selectedcategories, setselectedcategories] = useState<string[]>([]);
  return (
    <>
    <CartSummary />
      <div className="container mt-4">
        <div className="row">
          <WelcomeBand />
          <div className="col-md-3">
            <CategoryFilter
              selectedcategories={selectedcategories}
              setselectedcategories={setselectedcategories}
            />
          </div>
          <div className="col-md-9">
            <BookList selectedcategories={selectedcategories} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectsPage;
