import React from 'react';
import Header from '../components/Header';
import ReviewsList from '../components/ReviewsList';
import ReviewForm from '../components/ReviewsForm';
import ProductInfo from '../components/ProductInfo';
import Rating from '../components/Rating';
import ProductProvider from '../contexts/ProductContext.js';

const ProductDetails = () => {
    return (
        <div>
            <Header />
            <ProductProvider>
                <Rating />
                <ReviewsList/>
                <ReviewForm />
                <ProductInfo />
            </ProductProvider>
        </div>
    );
};

export default ProductDetails;

