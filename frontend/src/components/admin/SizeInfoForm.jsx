import React from 'react';
import * as Yup from 'yup';
import { useFormik } from 'formik';

import FormField from '../FormField';

const SizeInfoForm = ({ setSizes }) => {
  const formik = useFormik({
    initialValues: {
        size: 0,
        amount: 0
    },
    validationSchema: Yup.object().shape({
        size: Yup.number().min(1, 'Rozmiar musi być dodatni').required('Wymagane'),
        amount: Yup.number().min(1, 'Ilość musi być dodatnia').required('Wymagane'),
    }),
    onSubmit: (values, { resetForm }) => {
      const newSize = {
        size: values.size,
        amount: values.amount
      }
      setSizes(prevValue => [...prevValue, newSize])
      resetForm();
    },
  });

  return (
    <form className="form-card-content" onSubmit={formik.handleSubmit}>
      <FormField formik={formik} name={"size"} label={"Rozmiar"} type="number"/>
      <FormField formik={formik} name={"amount"} label={"Ilość"} type="number"/>
      <div className='submit'>
        <button className="btn add-btn" type="submit">Dodaj Rozmiar</button>
      </div>
    </form>
  );
};

export default SizeInfoForm;