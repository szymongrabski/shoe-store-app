import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import RatingMUI from '@mui/material/Rating';
import { useKeycloak } from '@react-keycloak/web';

import { ProductContext } from "../../contexts/ProductContext.js";
import { postData } from '../../utils/api.js';


const ReviewForm = () => {
  const { getReviews, getRating } = useContext(ProductContext);
  const { id } = useParams();
  const { keycloak } = useKeycloak();


  const isClient = keycloak.authenticated && keycloak.hasRealmRole('client');

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

        const response = await postData(`/products/${id}/reviews`, newReview, keycloak.token)

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

  return ( isClient && 
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
        <span className="block text-gray-200 font-bold">Rate:</span>
        <div className='flex justify-center'>
          <RatingMUI
            id="rate"
            name="rate"
            type="number"
            onChange={(event, value) => formik.setFieldValue("rate", value)}
            onBlur={formik.handleBlur}
            value={formik.values.rate}
            size="large"
            className= 'bg-secondary border-none'
          />
          {formik.touched.rate && formik.errors.rate ? (
            <div className="text-sm text-red-600">{formik.errors.rate}</div>
          ) : null}
        </div>
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
