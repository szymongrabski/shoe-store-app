import React, { useContext, useRef } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

import { FiChevronsDown } from 'react-icons/fi';

const SearchCategory = ({ category, categoryArray }) => {
  const { dispatch } = useContext(ProductsContext);
  const selectRef = useRef(null);
  const handleCategoryChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue !== "") {
        dispatch({
            type: "FILTER_PRODUCTS",
            payload: { category: category, value: selectedValue },
          });
    }
    selectRef.current.value = "";
  };

  return (
    <div className="custom-select">
      <select className="select" name={category} ref={selectRef} onChange={handleCategoryChange}>
        <option value="">{category.charAt(0).toUpperCase() + category.slice(1)}</option>
        {categoryArray.map((item) => (
          <option key={item} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ))}
      </select>
      <span className="custom-arrow">
        <FiChevronsDown size={24} color="white"/>
      </span>
    </div>
  );
};

export default SearchCategory;