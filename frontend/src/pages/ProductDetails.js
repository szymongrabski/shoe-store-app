import React from 'react';
import Header from '../components/header/Header.jsx';
import ReviewsList from '../components/productDetails/ReviewsList.jsx';
import ReviewForm from '../components/productDetails/ReviewsForm.jsx';
import ProductInfo from '../components/productDetails/ProductInfo.jsx';
import Rating from '../components/productDetails/Rating.jsx';
import ProductProvider from '../contexts/ProductContext.js';
import Footer from '../components/footer.jsx';

const ProductDetails = () => {
    return (
        <div className='wrapper'>
        <Header />
            <ProductProvider>
                <div className='product-details'>
                    <div className='card reviews-card'>
                        <div className='card-content'>
                            <Rating />
                            <ReviewsList/>
                            <ReviewForm />
                        </div>
                    </div>
                    <ProductInfo />
                </div>
            </ProductProvider>
        <Footer/>
        </div>
    );
};

export default ProductDetails;

