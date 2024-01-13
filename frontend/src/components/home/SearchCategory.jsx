import React, { useContext, useRef } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

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
    <div>
      <select ref={selectRef} onChange={handleCategoryChange}>
        <option value="">{category}</option>
        {categoryArray.map((item) => (
          <option key={item} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SearchCategory;
