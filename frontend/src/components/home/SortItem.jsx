import React, { useContext, useRef } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";
import { FiChevronsDown } from "react-icons/fi";

const SortItem = () => {
  const { state, dispatch } = useContext(ProductsContext);
  const selectRef = useRef(null);

  const handleOrderChange = (event) => {
    const selectedValue = event.target.value;
    if (state.filteredProducts && state.filteredProducts.length > 0) {
        dispatch({
            type: "SORT_FILTERED_PRODUCTS_BY_PRICE",
            payload: { filteredSortOrder: selectedValue },
          });
    } else if (state.products && state.products.length > 0) {
        dispatch({
            type: "SORT_PRODUCTS_BY_PRICE",
            payload: { sortOrder: selectedValue },
        });
    }

    selectRef.current.value = "";
  };

  return (
    <div className="custom-select">
      <select className="select" name="price" ref={selectRef} onChange={handleOrderChange}>
        <option value="">Sort by Price</option>
        <option value="asc">From Lowest</option>
        <option value="desc">From Highest</option>
      </select>
      <span className="custom-arrow">
        <FiChevronsDown size={24} color="white"/>
      </span>
    </div>
  );
};

export default SortItem;
