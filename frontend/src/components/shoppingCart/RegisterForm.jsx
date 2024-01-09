import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

export function RegisterForm() {
    const formik = useFormik({
        initialValues: {
            email: '',
            deliveryType: '',
            address: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Nieprawidłowy adres email').required('Pole wymagane'),
            deliveryType: Yup.string().required('Pole wymagane').oneOf(['kurier', 'paczkomat'], 'Niewłaściwy typ dostawy'),
            address: Yup.string().required('Pole wymagane'),
        }),
        onSubmit: values => {
            console.log(values);
        },
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <div>
                <label htmlFor="email">Email:</label>
                <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={formik.handleChange}
                    value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                    <div>{formik.errors.email}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="deliveryType">Typ dostawy:</label>
                <select
                    id="deliveryType"
                    name="deliveryType"
                    onChange={formik.handleChange}
                    value={formik.values.deliveryType}
                >
                    <option value="">Wybierz typ dostawy</option>
                    <option value="kurier">Kurier</option>
                    <option value="paczkomat">Paczkomat</option>
                    <option value="odbiór">Odbiór osobisty</option>
                </select>
                <p>Opłata: {formik.values.deliveryType === 'kurier' ? 25: formik.values.deliveryType === 'paczkomat'? 12: null}</p>
                {formik.touched.deliveryType && formik.errors.deliveryType ? (
                    <div>{formik.errors.deliveryType}</div>
                ) : null}
            </div>
            <div>
                <label htmlFor="address">Adres dostawy:</label>
                <input
                    id="address"
                    name="address"
                    onChange={formik.handleChange}
                    value={formik.values.address}
                />
                {formik.touched.address && formik.errors.address ? (
                    <div>{formik.errors.address}</div>
                ) : null}
            </div>
            <button type="submit">Wyślij</button>
        </form>
    );
}
