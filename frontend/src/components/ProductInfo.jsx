import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/api/products/${id}`);
                if (response.data) {
                    setProduct(response.data);
                } else {
                    throw new Error("Nie znaleziono produktu");
                }
            } catch (error) {
                console.error('Błąd podczas pobierania produktu', error);
            }
        };

        fetchProduct();
    }, []);

    return (
        <div>
            {product ? (
                <div>
                    <h2>{product.properties.title}</h2>
                    <img className="shoe-img" src={product.properties.image} alt="" />
                    <p>{product.properties.price} zł</p>
                    <p>{product.properties.description}</p>
                    <p>{product.properties.color}</p>
                    <p>{product.properties.brand}</p>
                    <p>{product.properties.sex}</p>
                </div>
            ) : (
                <p>Ładowanie...</p>
            )}
        </div>
    );
};

export default ProductInfo;
