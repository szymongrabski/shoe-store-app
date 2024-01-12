import React, { useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductContext } from "../../contexts/ProductContext.js"
import { useParams } from 'react-router-dom';
import RatingMUI from '@mui/material/Rating';

const ReviewForm = () => {
  const { getReviews, getRating } = useContext(ProductContext);
  const {id} = useParams()
  
  const formik = useFormik({
    initialValues: {
      comment: '',
      rate: 1,
    },
    validationSchema: Yup.object({
      comment: Yup.string().required('Komentarz jest wymagany'),
      rate: Yup.number()
        .min(1, 'Minimalna ocena to 1')
        .max(5, 'Maksymalna ocena to 5')
        .required('Ocena jest wymagana'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newReview = {
          comment: values.comment,
          rate: values.rate,
        };

        const response = await axios.post(`http://localhost:8000/api/products/${id}/reviews`, newReview);

        if (response.status === 201) {
            getReviews()
            getRating()
        }

        resetForm();
      } catch (error) {
        console.error('Błąd podczas dodawania recenzji', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div>
        <div>
          <label htmlFor="comment">Komentarz:</label>
        </div>
        <input
          id="comment"
          name="comment"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
        />
        {formik.touched.comment && formik.errors.comment ? (
          <div className='error'>{formik.errors.comment}</div>
        ) : null}
      </div>
      <div>
        <div>
          <label htmlFor="rate">Ocena:</label>
        </div>
        <RatingMUI
          id="rate"
          name="rate"
          type="number"
           onChange={(event, value) => formik.setFieldValue("rate", value)}
          onBlur={formik.handleBlur}
          value={formik.values.rate}
        />
        {formik.touched.rate && formik.errors.rate ? (
          <div className='error'>{formik.errors.rate}</div>
        ) : null}
      </div>
    <button className="btn add-btn" type="submit">Dodaj recenzję</button>
    </form>
  );
};

export default ReviewForm;

