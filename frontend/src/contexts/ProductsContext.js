import React, { createContext, useReducer, useEffect } from "react";
import { fetchData } from "../utils/api";

export const ProductsContext = createContext();

const ACTIONS = {
  SET_PRODUCTS: "SET_PRODUCTS",
  FILTER_PRODUCTS: "FILTER_PRODUCTS",
  FILTER_PRODUCTS_BY_PRICE: "FILTER_PRODUCTS_BY_PRICE",
  CLEAR_FILTER: 'CLEAR_FILTER',
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
            return product.properties['price'] >= price ;
        })
        return {...state, filteredProducts: priceFilteredProducts};
    case ACTIONS.CLEAR_FILTER:
        return { ...state, filteredProducts: [] }; 
    default:
      return state;
  }
};

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
