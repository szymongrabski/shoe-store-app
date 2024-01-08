import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const { id } = useParams();

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


    const getProduct = async () => {
        const productData = await fetchData(`/products/${id}`);
        setProduct(productData);
    };

    const getReviews = async () => {
        const reviewsData = await fetchData(`/products/${id}/reviews`);
        setReviews(reviewsData);
    };

    const getRating = async () => {
        const ratingData = await fetchData(`/products/${id}/rating`);
        setRating(ratingData);
    };

    const getSizes = async () => {
        const sizesData = await fetchData(`/products/${id}/sizes`);
        setSizes(sizesData)
    }

    return (
        <ProductContext.Provider value={{ product, getProduct, sizes, getSizes, reviews, getReviews, rating, getRating }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
