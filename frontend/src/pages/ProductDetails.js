import React from 'react';
import Header from '../components/Header';
import ReviewsList from '../components/ReviewsList';
import ReviewsProvider from '../contexts/ReviewsContext';
import ReviewForm from '../components/ReviewsForm';
import ProductInfo from '../components/ProductInfo';

const ProductDetails = () => {
    return (
        <div>
            <Header />
            <ReviewsProvider>
                <ReviewsList/>
                <ReviewForm />
            </ReviewsProvider>
            <ProductInfo />
        </div>
    );
};

export default ProductDetails;

