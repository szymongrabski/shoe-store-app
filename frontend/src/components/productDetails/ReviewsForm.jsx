import React, { useContext } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { ProductContext } from "../../contexts/ProductContext.js";
import { useParams } from 'react-router-dom';
import RatingMUI from '@mui/material/Rating';

const ReviewForm = () => {
  const { getReviews, getRating } = useContext(ProductContext);
  const { id } = useParams();

  const formik = useFormik({
    initialValues: {
      comment: '',
      rate: 1,
    },
    validationSchema: Yup.object({
      comment: Yup.string().required('Comment is required.'),
      rate: Yup.number()
        .min(1)
        .max(5)
        .required('Rate is required.'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        const newReview = {
          comment: values.comment,
          rate: values.rate,
        };

        const response = await axios.post(`http://localhost:8000/api/products/${id}/reviews`, newReview);

        if (response.status === 201) {
          getReviews();
          getRating();
        }

        resetForm();
      } catch (error) {
        console.error('Error while adding review', error);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="flex flex-col gap-3 p-3">
      <div>
        <label htmlFor="comment" className="block text-gray-200 font-bold mb-2">Comment:</label>
        <input
          id="comment"
          name="comment"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.comment}
          className="w-full px-3 py-2 placeholder-gray-400 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300"
        />
        {formik.touched.comment && formik.errors.comment ? (
          <div className="text-red-600 text-sm">{formik.errors.comment}</div>
        ) : null}
      </div>
      <div>
        <label htmlFor="rate" className="block text-gray-200 font-bold">Rate:</label>
        <RatingMUI
          id="rate"
          name="rate"
          type="number"
          onChange={(event, value) => formik.setFieldValue("rate", value)}
          onBlur={formik.handleBlur}
          value={formik.values.rate}
          className='bg-gray-100 w-full border-none flex justify-center'
        />
        {formik.touched.rate && formik.errors.rate ? (
          <div className="text-sm text-red-600">{formik.errors.rate}</div>
        ) : null}
      </div>
      <div className='flex justify-end'>
        <button type="submit" className="bg-btn-col text-white rounded-full shadow-md p-2 transition duration-300 ease-in-out hover:bg-btn-hover">
          Add review
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
