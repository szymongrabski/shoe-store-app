import React from 'react';

const FormField = ({ formik, name, label, type }) => {
  return (
    <div>
        <div>
            <label className="font-medium text-gray-700" htmlFor={name}>{label}: </label>
            <input
                id={name}
                name={name}
                type={type}
                onChange={formik.handleChange}
                value={formik.values[name]}
                className='w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400'
            />
        </div>
        {formik.touched[name] && formik.errors[name] ? (
            <div className='error'>{formik.errors[name]}</div>
        ) : null}
    </div>
  );
};

export default FormField;
