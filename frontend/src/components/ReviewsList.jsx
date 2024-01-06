import React, { useContext } from 'react';
import { ReviewsContext } from '../contexts/ReviewsContext';

const ReviewsList = () => {
  const { reviews } = useContext(ReviewsContext)
  console.log(reviews)
  return (
    <div>
      {reviews.length > 0 ? 
      <h2>Opinie</h2> : <h2>Produkt nie ma opinii</h2>}
      <ul>
        {reviews.map((review) => (
          <li key={review.id}>
            <p>{review.properties.comment} - {review.properties.rate} </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
