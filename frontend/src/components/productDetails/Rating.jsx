import React, { useContext } from "react"
import { ProductContext } from "../../contexts/ProductContext.js"

const Rating = () => {
    const { rating } = useContext(ProductContext)
    return (
        <div>
            {rating ? <div><p>Średnia ocena: {rating.properties.averageRating}</p><p>Liczba opinii: {rating.properties.totalRatings.low}</p></div> : null}
        </div>
    )
}

export default Rating;
