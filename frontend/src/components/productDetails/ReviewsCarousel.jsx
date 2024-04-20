import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { formatRating } from '../../utils/formatFunctions';
import RatingMUI from '@mui/material/Rating';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ReviewsCarousel() {
    const { reviews } = useContext(ProductContext);
    const numberOfReviews = reviews.length;
    console.log(numberOfReviews)
    let settings = {
        speed: 500,
        slidesToShow: numberOfReviews >= 3 ? 3 : numberOfReviews,
        slidesToScroll: numberOfReviews >= 3 ? 3 : numberOfReviews,
        initialSlide: 0,
        responsive: [
            {
              breakpoint: 500,
              settings: {
                slidesToShow: numberOfReviews >= 1 ? 1 : 0,
                slidesToScroll: numberOfReviews >= 1 ? 1 : 0,
              },
            },
            {
                breakpoint: 900,
                settings: {
                    slidesToShow: numberOfReviews >= 2 ? 2 : numberOfReviews,
                    slidesToScroll: numberOfReviews >= 2 ? 2 : numberOfReviews,
                }, 
            },
            {
              breakpoint: 1150,
              settings: {
                slidesToShow: numberOfReviews >= 3 ? 3 : numberOfReviews,
                slidesToScroll: numberOfReviews >= 3 ? 3 : numberOfReviews,
              },
            },
        ]
    };

    return (
        <div>
            {numberOfReviews > 1 ? (
                <div className="slider-container mb-3">
                    <Slider {...settings}>
                        {reviews.map((review) => (
                            <div key={review.id}>
                                <div className='bg-white p-3 rounded-lg shadow-md'>
                                    <p className="mb-2"><span className='font-bold text-black'>Comment: </span><span className='text-gray-800'>{review.properties.comment}</span></p>
                                    <div className='flex items-center justify-between'>
                                        <span className='font-bold text-black'>Rate: </span>
                                        <RatingMUI name="read-only" value={formatRating(review.properties.rate)} readOnly/>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            ) : null }
        </div>
    );
}
  
export default ReviewsCarousel;
