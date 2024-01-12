import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { formatRating } from '../../utils/formatFunctions';
import RatingMUI from '@mui/material/Rating';

const ReviewsList = () => {
  const { reviews } = useContext(ProductContext)
  
  return (
    <div>
      {reviews.length > 0 ? 
      <h2 className='title'>Opinie</h2> : <h2 className='title'>Produkt nie ma opinii</h2>}
      <ul className='reviews-list'>
        {reviews.map((review) => (
          <li key={review.id}>
            <div className='rating'>{review.properties.comment} <RatingMUI name="read-only" value={formatRating(review.properties.rate)} readOnly/></div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
