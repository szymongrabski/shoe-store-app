import React from 'react';

const FormField = ({ formik, name, label, type }) => {
  return (
    <div>
        <div className='form-card-field'>
            <label htmlFor={name}>{label}: </label>
            <input
                id={name}
                name={name}
                type={type}
                onChange={formik.handleChange}
                value={formik.values[name]}
            />
        </div>
        {formik.touched[name] && formik.errors[name] ? (
            <div className='error'>{formik.errors[name]}</div>
        ) : null}
    </div>
  );
};

export default FormField;
