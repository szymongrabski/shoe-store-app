import React, {useEffect, useState, createContext} from "react";
import axios from 'axios'
import { useParams } from "react-router-dom";


export const ReviewsContext = createContext()

const ReviewsProvider = ({children}) => {
    const { id } = useParams()
    const [reviews, setReviews] = useState([]);
  
    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const response = await axios.get(`http://localhost:8000/api/products/${id}/reviews`);
          setReviews(response.data.reviews);
          console.log(reviews)
        } catch (error) {
          console.error('Błąd podczas pobierania recenzji', error);
        }
      };
  
      fetchReviews();
    }, []);
    

    return (
        <ReviewsContext.Provider value={{reviews, setReviews}}>
            {children}
        </ReviewsContext.Provider>
    )
}

export default ReviewsProvider;

