import React, { useContext } from "react"
import { ProductContext } from "../../contexts/ProductContext.js"
import { formatNeo4jNumber, formatRating } from "../../utils/formatFunctions.js"

const Rating = () => {
    const { rating } = useContext(ProductContext)

    const averageRating = rating ? rating.properties.averageRating : null;
    const totalRatings = rating ? rating.properties.totalRatings: null;

    return (
        <div>
            <p>
                Średnia ocena: {averageRating && formatRating(averageRating)}
            </p>
            <p>
                Ilość ocen: {totalRatings && formatNeo4jNumber(totalRatings)}
            </p>
        </div>
    )
}

export default Rating;
