import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatCurrency } from '../../utils/formatFunctions';
import FormField from '../FormField';

export function RegisterForm({ totalPrice }) {
    const { cartProducts, clearCart } = useContext(ShoppingCartContext)
    const [transactionFee, setTransactionFee] = useState(0)
    const formik = useFormik({
        initialValues: {
            email: '',
            deliveryType: '',
            address: '',
        },
        validationSchema: Yup.object().shape({
            email: Yup.string().email('Nieprawidłowy adres email').required('Pole wymagane'),
            deliveryType: Yup.string().required('Pole wymagane').oneOf(['courier', 'paczkomat', 'pickup'], 'Niewłaściwy typ dostawy'),
            address: Yup.string().required('Pole wymagane'),
        }),
        onSubmit: async (values, { resetForm }) => {
            console.log(values.email, cartProducts, values.deliveryType, transactionFee, totalPrice, values.address)
            const newOrder = {
                email: values.email,
                order: cartProducts,
                deliveryType: values.deliveryType,
                deliveryFee: transactionFee,
                totalPrice: totalPrice,
                address: values.address
            }
            try {
                const response = await axios.post(`http://localhost:8000/api/products/order`, newOrder);

                if (response.status === 201) {
                    alert("Zamówienie zostało przyjęte do realizacji");
                    resetForm()
                    clearCart()
                }
            } catch (error) {
                console.error('Błąd podczas dodawania zamówienia', error.response.data)
                alert("Zamówienie nie powiodło się. Spróbuj ponownie lub skontaktuj się z obsługą klienta.");
            }
        },
    });

    useEffect(() => {
        switch (formik.values.deliveryType) {
            case 'courier':
                setTransactionFee(25);
                formik.setFieldValue('address', '');
                break;
            case 'paczkomat':
                setTransactionFee(10);
                formik.setFieldValue('address', '');
                break;
            case 'pickup':
                setTransactionFee(0);
                formik.setFieldValue('address', 'SneakerStore');
                break;
            default:
                setTransactionFee(0);
        }
    }, [formik.values.deliveryType]);



    return (
        <div className='form-card'>
            <form className='form-card-content' onSubmit={formik.handleSubmit}>
                <FormField formik={formik} name="email" label="Email" type="email" />
                <div>
                    <div className='form-card-field'>
                        <label htmlFor="deliveryType">Typ dostawy:</label>
                        <select
                            id="deliveryType"
                            name="deliveryType"
                            onChange={formik.handleChange}
                            value={formik.values.deliveryType}
                        >
                            <option value="">Wybierz typ dostawy</option>
                            <option value="courier">Kurier</option>
                            <option value="paczkomat">Paczkomat</option>
                            <option value="pickup">Odbiór osobisty</option>
                        </select>
                    </div>
                    {formik.touched.deliveryType && formik.errors.deliveryType ? (
                        <div className='error'>{formik.errors.deliveryType}</div>
                    ) : null}
                    <div>
                        <p>Opłata: {transactionFee}</p>
                    </div>
                </div>
                <div>
                    <div className='form-card-field'>
                        <label htmlFor="address">Adres dostawy:</label>
                        <input
                            id="address"
                            name="address"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            readOnly={formik.values.deliveryType === 'pickup'}
                            autoComplete="address-line1" 
                        />
                    </div>
                    {formik.touched.address && formik.errors.address ? (
                            <div>{formik.errors.address}</div>
                        ) : null}
                </div>
                <div className='form-card-field'>
                    <p>Łączna wartość:</p> <p>{formatCurrency(totalPrice + transactionFee)}</p>
                </div>
                <div className='submit'>
                    <button className="btn add-btn" type="submit">Wyślij</button>
                </div>
            </form>
        </div>
    );
}
