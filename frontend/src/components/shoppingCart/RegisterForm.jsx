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
        <div className='bg-white shadow-lg p-3 rounded-lg m-3'>
            <form onSubmit={formik.handleSubmit} className='flex flex-col gap-3'>
                <FormField formik={formik} name="email" label="Email address" type="email" />
                <div>
                    <div>
                        <label className="font-medium text-gray-700" htmlFor="deliveryType">Delivery Type:</label>
                        <select
                            id="deliveryType"
                            name="deliveryType"
                            onChange={formik.handleChange}
                            value={formik.values.deliveryType}
                            className='bg-white text-black w-full rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400 border-gray-300'
                        >
                            <option value="">Choose delivery type</option>
                            <option value="courier">Courier</option>
                            <option value="paczkomat">Paczkomat</option>
                            <option value="pickup">Personal pickup</option>
                        </select>
                    </div>
                    {formik.touched.deliveryType && formik.errors.deliveryType ? (
                        <div className='error'>{formik.errors.deliveryType}</div>
                    ) : null}
                    <div>
                        <p className='text-sm py-3 pl-3 text-gray-700'>Transaction Fee: {transactionFee} zł</p>
                    </div>
                </div>
                <div>
                    <div>
                        <label className="font-medium text-gray-700" htmlFor="address">Adres dostawy:</label>
                        <input
                            id="address"
                            name="address"
                            onChange={formik.handleChange}
                            value={formik.values.address}
                            readOnly={formik.values.deliveryType === 'pickup'}
                            autoComplete="address-line1" 
                            className='w-full border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-400'
                        />
                    </div>
                    {formik.touched.address && formik.errors.address ? (
                            <div className='error'>{formik.errors.address}</div>
                        ) : null}
                </div>
                <div className='text-right font-bold text-gray-700'>
                    <p>In total:</p> <p>{formatCurrency(totalPrice + transactionFee)}</p>
                </div>
                <div className='submit'>
                    <button className="w-full bg-btn-col text-white rounded-full shadow-md p-3 transition duration-300 ease-in-out hover:bg-btn-hover " type="submit">Submit</button>
                </div>
            </form>
        </div>
    );
}
