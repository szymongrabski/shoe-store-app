import React, { useEffect, useContext } from 'react';
import * as Yup from 'yup';
import { useKeycloak } from '@react-keycloak/web';
import { useFormik } from 'formik';

import FormField from '../FormField';
import { ProductsContext } from '../../contexts/ProductsContext';
import { postData } from '../../utils/api';

const ProductInfoForm = ({ sizes }) => {
    const { getProducts } = useContext(ProductsContext)
    const { keycloak } = useKeycloak();

    const formik = useFormik({
        initialValues: {
            title: '',
            image: '',
            brand: '',
            price: 0,
            description: '',
            color: '',
            sex: '',
            sizes: [],
        },
        validationSchema: Yup.object().shape({
            title: Yup.string().required('Pole wymagane'),
            image: Yup.string().url('Nieprawidłowy format URL').required('Pole wymagane'),
            brand: Yup.string().required('Pole wymagane'),
            price: Yup.number().required('Pole wymagane').min(0, 'Cena nie może być ujemna'),
            description: Yup.string().required('Pole wymagane'),
            color: Yup.string().required('Pole wymagane'),
            sex: Yup.string().required('Pole wymagane'),
            sizes: Yup.array().min(1, 'Minimum jeden rozmiar wymagany'),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const newProduct = {values};

                const response = await postData(`/products`, newProduct.values, keycloak.token);

                if (response.status === 201) {
                    console.log("udało się")
                    getProducts();
                }

                resetForm();
              } catch (error) {
                console.error('Błąd podczas dodawania recenzji', error);
              }
        },
    });

    useEffect(() => {
        formik.setFieldValue('sizes', sizes);
    }, [sizes]);

    return (
        <form className="form-card-content" onSubmit={formik.handleSubmit}>
            <FormField formik={formik} name={"title"} label={"Nazwa"} type="text"/>
            <FormField formik={formik} name={"image"} label={"URL do zdjęcia"} type="url"/>
            <FormField formik={formik} name={"brand"} label={"Marka"} type="text"/>
            <FormField formik={formik} name={"price"} label={"Cena"} type="number"/>
            <FormField formik={formik} name={"description"} label={"Opis"} type="text"/>
            <FormField formik={formik} name={"color"} label={"Kolor"} type={"text"}/>
            <div>
                <div className='form-card-field'>
                    <label htmlFor="sex">Sex:</label>
                    <select
                        id="sex"
                        name="sex"
                        onChange={formik.handleChange}
                        value={formik.values.sex}
                    >
                        <option value="">Choose sex</option>
                        <option value="unisex">Unisex</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                    </select>
                </div>
                {formik.touched.sex && formik.errors.sex ? (
                    <div className='error'>{formik.errors.sex}</div>
                ) : null}
            </div>
            <div>
                <div className='form-card-field'>
                    <p>Sizes:</p>
                    <ul>
                        {formik.values.sizes.map((size, index) => (
                            <li key={index}>{`Size: ${size.size}, Amount: ${size.amount}`}</li>
                        ))}
                    </ul>
                </div>
                {formik.touched.sizes && formik.errors.sizes ? (
                    <div className='error'>{formik.errors.sizes}</div>
                ) : null}
            </div>
            <div className='submit'>
                <button className="btn add-btn" type="submit">Submit</button>
            </div>
        </form>
    );
};

export default ProductInfoForm;