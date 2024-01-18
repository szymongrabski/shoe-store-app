import React, { createContext, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchData } from "../utils/api";

export const ProductContext = createContext();

const ProductProvider = ({ children }) => {
    const { id } = useParams();

    const [product, setProduct] = useState(null);
    const [sizes, setSizes] = useState([])
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(null);

    useLayoutEffect(() => {
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
        const data = await fetchData(`/products/${id}/sizes`);
        const sizes = data.sort((a, b) => a.properties.size - b.properties.size )
        setSizes(sizes)
    }

    return (
        <ProductContext.Provider value={{ product, getProduct, sizes, getSizes, reviews, getReviews, rating, getRating }}>
            {children}
        </ProductContext.Provider>
    );
};

export default ProductProvider;
