import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext.js";
import { formatNeo4jNumber, formatRating } from "../../utils/formatFunctions.js";
import RatingMUI from '@mui/material/Rating';

const Rating = () => {
    const { rating } = useContext(ProductContext);

    const averageRating = rating ? rating.properties.averageRating : null;
    const totalRatings = rating ? rating.properties.totalRatings : null;

    return (
        <div className="">
                <div>
                    {averageRating ? (
                        <RatingMUI name="read-only" value={formatRating(averageRating)} readOnly precision={0.5} />
                    ) : (
                        <span>No reviews yet.</span>
                    )}
                </div>
                <div>
                    {totalRatings && (
                        <div className=" text-black flex gap-x-1 items-center">
                            <span>Number of reviews:</span>
                            <span className="font-bold">{formatNeo4jNumber(totalRatings)}</span>
                        </div>
                    )}
                </div>
        </div>
    );
}

export default Rating;
