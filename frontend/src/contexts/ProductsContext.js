import React, { createContext, useState, useEffect } from "react";
import { fetchData } from "../utils/api";

export const ProductsContext = createContext();

const ProductsProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    const getProducts = async () => {
        const productsData = await fetchData(`/products/`);
        setProducts(productsData.products);
    };

    useEffect(() => {
        getProducts();
    }, [])

    return (
        <ProductsContext.Provider value={{ products, setProducts }}>
            {children}
        </ProductsContext.Provider>
    );
};

export default ProductsProvider;
