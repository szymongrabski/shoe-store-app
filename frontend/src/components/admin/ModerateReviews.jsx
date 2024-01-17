import React, { useEffect, useState } from "react";
import { fetchData } from "../../utils/api";
import RatingMUI from '@mui/material/Rating';
import { formatRating } from "../../utils/formatFunctions";
import axios from "axios";


const ModerateReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);

    const getReviews = async () => {
        const reviewsData = await fetchData(`/products/${productId}/reviews`);
        setReviews(reviewsData);
    };

    const handleDeleteReview = async (reviewId) => {
        const response = await axios.delete(`http://localhost:8000/api/products/${productId}/reviews/${reviewId}`);

        if (response.status === 200) {
            getReviews();
        }
    }

    useEffect(() => {
        getReviews()
    }, [])

    return (
        <ul>
            {reviews && reviews.map(review => {
                return (
                    <li key={review.id}>
                        <div className="rating">
                            <RatingMUI name="read-only" value={formatRating(review.properties.rate)} readOnly/> - {review.properties.comment}
                        </div>
                        <div className="submit">
                            <button className="btn del-btn" onClick={() => handleDeleteReview(review.id)}>Usuń opinie</button>
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}

export default ModerateReviews;
