import React, { useContext, useRef } from "react";
import { ProductsContext } from "../../contexts/ProductsContext";

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
    <div>
      <select name="price" ref={selectRef} onChange={handleOrderChange}>
        <option value="">Posortuj według ceny</option>
        <option value="asc">Od najmniejszej</option>
        <option value="desc">Od największej</option>
      </select>
    </div>
  );
};

export default SortItem;
