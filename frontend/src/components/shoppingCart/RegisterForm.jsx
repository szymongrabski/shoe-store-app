import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { formatCurrency } from '../../utils/formatFunctions';

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
                console.log("DATA: ", response.data)

                if (response.status === 201) {
                    console.log("udało się")
                    resetForm()
                    clearCart()
                }
            } catch (error) {
                console.error('Błąd podczas dodawania zamówienia', error.response.data)
            }
        },
    });

    useEffect(() => {
        switch (formik.values.deliveryType) {
            case 'courier':
                setTransactionFee(25);
                break;
            case 'paczkomat':
                setTransactionFee(10);
                break;
            case 'pickup':
                setTransactionFee(0);
                break;
            default:
                setTransactionFee(0);
        }
    }, [formik.values.deliveryType]);

    return (
        <div className='order-card'>
            <form className='card-content' onSubmit={formik.handleSubmit}>
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
                        <option value="courier">Kurier</option>
                        <option value="paczkomat">Paczkomat</option>
                        <option value="pickup">Odbiór osobisty</option>
                    </select>
                    <div>
                        <label>Opłata: {transactionFee}</label>
                    </div>
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
                        value={formik.values.deliveryType === 'pickup' ? formik.values.address ='SneakerStore': formik.values.address}
                        readOnly={formik.values.deliveryType === 'pickup'}
                    />
                    {formik.touched.address && formik.errors.address ? (
                        <div>{formik.errors.address}</div>
                    ) : null}
                </div>
                <label>Łączna wartość: {formatCurrency(totalPrice + transactionFee)} </label>
                <div>
                    <button className="btn add-btn" type="submit">Wyślij</button>
                </div>
            </form>
        </div>
    );
}
