import React, { useEffect, useState } from "react";
import RatingMUI from '@mui/material/Rating';
import { useKeycloak } from "@react-keycloak/web";

import { deleteData, fetchData } from "../../utils/api";
import { formatRating } from "../../utils/formatFunctions";


const ModerateReviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const { keycloak } = useKeycloak();

    const getReviews = async () => {
        const reviewsData = await fetchData(`/products/${productId}/reviews`);
        setReviews(reviewsData);
    };

    const handleDeleteReview = async (reviewId) => {
        const response = await deleteData(`/products/${productId}/reviews/${reviewId}`, keycloak.token)

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
                        <div>
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