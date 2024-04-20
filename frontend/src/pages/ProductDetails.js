import React from 'react';
import Header from '../components/header/Header.jsx';
import ReviewsList from '../components/productDetails/ReviewsList.jsx';
import ReviewForm from '../components/productDetails/ReviewsForm.jsx';
import ProductInfo from '../components/productDetails/ProductInfo.jsx';
import ProductProvider from '../contexts/ProductContext.js';
import Footer from '../components/footer.jsx';
import ReviewsCarousel from '../components/productDetails/ReviewsCarousel.jsx';

const ProductDetails = () => {
    return (
        <div>
            <Header />
            <ProductProvider>
                <div className='flex flex-col gap-6'>
                    <ProductInfo />
                    <div className='flex shadow-lg justify-between items-center bg-secondary'>
                                <ReviewForm />
                                <div className="w-full h-[250px] shadow-lg overflow-hidden">
                                    <img className="w-full h-full object-cover" src="https://ca-times.brightspotcdn.com/dims4/default/5800ec0/2147483647/strip/true/crop/4000x2666+0+1/resize/2000x1333!/format/webp/quality/75/?url=https%3A%2F%2Fcalifornia-times-brightspot.s3.amazonaws.com%2F41%2F6d%2F7cbc372843d7907a9dd145b09bbd%2Fla-photos-1staff-477326-la-fi-cool-kicks-sneaker-collection-emergency-sales-418.jpg" alt="Image" />
                                </div>
                        </div>
                    <div className='w-[80%] m-auto p-3'>
                        <ReviewsCarousel />
                    </div>
                </div>
                <Footer/>
            </ProductProvider>
        </div>
    );
};

export default ProductDetails;

