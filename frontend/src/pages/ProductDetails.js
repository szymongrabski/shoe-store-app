import React from 'react';
import Header from '../components/header/Header.jsx';
import ReviewsList from '../components/productDetails/ReviewsList.jsx';
import ReviewForm from '../components/productDetails/ReviewsForm.jsx';
import ProductInfo from '../components/productDetails/ProductInfo.jsx';
import Rating from '../components/productDetails/Rating.jsx';
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

