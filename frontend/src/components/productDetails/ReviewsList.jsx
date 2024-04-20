import React, { useContext } from 'react';
import { ProductContext } from '../../contexts/ProductContext';
import { formatRating } from '../../utils/formatFunctions';
import RatingMUI from '@mui/material/Rating';
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';

const ReviewsList = () => {
  const { reviews } = useContext(ProductContext);
  return (
    <div>
      {reviews.length > 0 ? 
      <h2 className='text-white text-xl font-bold text-center'>Reviews</h2> : <h2 className='text-red-600 text-center'>No reviews yet</h2>}
      <ul className='flex gap-x-3'>
        {reviews.map((review) => (
          <li key={review.id} className="py-4">
            <div className='bg-gray-100 p-4 rounded-lg shadow-md'>
              <p className="mb-2"><span className='font-bold text-black'>Comment: </span><span className='text-gray-800'>{review.properties.comment}</span></p>
              <div className='flex items-center justify-between'>
                <span className='font-bold text-black'>Rate: </span>
                <RatingMUI name="read-only" value={formatRating(review.properties.rate)} readOnly/>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ReviewsList;
