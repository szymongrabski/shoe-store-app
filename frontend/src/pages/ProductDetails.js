import React from 'react';
import Header from '../components/Header';
import ReviewsList from '../components/ReviewsList';
import ReviewsProvider from '../contexts/ReviewsContext';
import ReviewForm from '../components/ReviewsForm';

const ProductDetails = () => {
    return (
        <div>
            <Header />
            <ReviewsProvider>
                <ReviewsList/>
                <ReviewForm />
            </ReviewsProvider>
        </div>
    );
};

export default ProductDetails;

