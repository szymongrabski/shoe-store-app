import React, { createContext, useState, useEffect } from "react";
import axios from 'axios';
import { useParams } from "react-router-dom";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const { id } = useParams();
    const apiUrl = `http://localhost:8000/api/products/${id}`;

    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([])
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);

    useEffect(() => {
        getProduct();
        getSizes();
        getReviews();
        getRating();
    }, []);

    const fetchData = async (endpoint) => {
        try {
            const response = await axios.get(`${apiUrl}/${endpoint}`);
            return response.data;
        } catch (error) {
            console.error(`Błąd podczas pobierania danych (${endpoint}):`, error);
            return null;
        }
    };

    const getProduct = async () => {
        const productData = await fetchData('');
        setProduct(productData);
    };

    const getReviews = async () => {
        const reviewsData = await fetchData('reviews');
        setReviews(reviewsData);
    };

    const getRating = async () => {
        const ratingData = await fetchData('rating');
        setRating(ratingData);
    };

    const getSizes = async () => {
        const sizesData = await fetchData('sizes');
        setSizes(sizesData)
    }

    return (
        <ProductContext.Provider value={{ product, getProduct, sizes, getSizes, reviews, getReviews, rating, getRating }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
