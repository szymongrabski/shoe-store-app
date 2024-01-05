import React, {useEffect, useState, createContext} from "react";
import axios from 'axios'

export const ProductsContext = createContext()

const ProductsProvider = ({children}) => {
    const [products, setProducts] = useState([])
    
    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/products');
            setProducts(response.data.products);
        } catch (error) {
            console.error('Błąd podczas pobierania produktów', error);
        }
    };  

    return (
        <ProductsContext.Provider value={products}>
            {children}
        </ProductsContext.Provider>
    )
}

export default ProductsProvider;

