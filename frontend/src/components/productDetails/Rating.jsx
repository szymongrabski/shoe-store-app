import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext.js";
import { formatNeo4jNumber, formatRating } from "../../utils/formatFunctions.js";
import RatingMUI from '@mui/material/Rating';

const Rating = () => {
    const { rating } = useContext(ProductContext);

    const averageRating = rating ? rating.properties.averageRating : null;
    const totalRatings = rating ? rating.properties.totalRatings : null;

    return (
        <div>
            <h2>Ocena</h2>
                <div>
                    {averageRating ? (
                        <div className="rating">Średnia ocena: <RatingMUI name="read-only" value={formatRating(averageRating)} readOnly /></div>
                    ) : (
                        <span>Brak dostępnych ocen</span>
                    )}
                </div>
                <div>
                    {totalRatings && (
                        <div>Ilość ocen: {formatNeo4jNumber(totalRatings)}</div>
                    )}
                </div>
    
        </div>
    );
}

export default Rating;
