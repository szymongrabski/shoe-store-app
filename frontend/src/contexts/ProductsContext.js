import React, { createContext, useReducer, useEffect } from "react";
import { fetchData } from "../utils/api";

export const ProductsContext = createContext();

const ACTIONS = {
  SET_PRODUCTS: "SET_PRODUCTS",
  FILTER_PRODUCTS: "FILTER_PRODUCTS",
  FILTER_PRODUCTS_BY_PRICE: "FILTER_PRODUCTS_BY_PRICE",
  CLEAR_FILTER: 'CLEAR_FILTER',
  SORT_PRODUCTS_BY_PRICE: 'SORT_PRODUCTS_BY_PRICE',
  SORT_FILTERED_PRODUCTS_BY_PRICE: 'SORT_FILTERED_PRODUCTS_BY_PRICE'
};

const productsReducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.SET_PRODUCTS:
        return { ...state, products: action.payload };
    case ACTIONS.FILTER_PRODUCTS:
        const {category, value} = action.payload;
        const filteredProducts = state.products.filter((product) => {
            return product.properties[category] === value;
        })
        return {...state, filteredProducts};
    case ACTIONS.FILTER_PRODUCTS_BY_PRICE:
        const { price } = action.payload;
        const priceFilteredProducts = state.products.filter((product) => {
            return product.properties['price'] >= price[0] && product.properties['price'] <= price[1] ;
        })
        return {...state, filteredProducts: priceFilteredProducts};
    case ACTIONS.CLEAR_FILTER:
        return { ...state, filteredProducts: [] };
    case ACTIONS.SORT_PRODUCTS_BY_PRICE:
      const { sortOrder } = action.payload;
      const priceSortedProducts = sortProductsByPrice([...state.products], sortOrder);
      return {...state, products: priceSortedProducts};
    case ACTIONS.SORT_FILTERED_PRODUCTS_BY_PRICE:
      const { filteredSortOrder } = action.payload;
      const priceSortedFilteredProducts = sortProductsByPrice([...state.filteredProducts], filteredSortOrder);
      return {...state, filteredProducts: priceSortedFilteredProducts};
    default:
      return state;
  }
};

const sortProductsByPrice = (products, sortOrder) => {
  return products.slice().sort((a, b) => {
    return sortOrder === 'asc' ? a.properties['price'] - b.properties['price'] : b.properties['price'] - a.properties['price'];
  })
}

const ProductsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(productsReducer, {
    products: [],
  });

  const getProducts = async () => {
    try {
      const productsData = await fetchData(`/products/`);
      dispatch({ type: ACTIONS.SET_PRODUCTS, payload: productsData.products });
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ state, dispatch, getProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
