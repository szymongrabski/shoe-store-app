import React, { useState } from "react";
import { Link } from "react-router-dom";
import AddToCart from "../shoppingCart/AddToCart";

const Product = ({ product }) => {
    const [hovered, setHovered] = useState(false);

    const handleHover = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <div className="card" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
            <div className="card-content">
                <h2 className="product-title">{product.properties.title}</h2>
                <img className="img product-img" src={product.properties.image} alt="" />
                <p>Cena: {product.properties.price} zł</p>
                <p>Opis: {product.properties.description}</p>
                {hovered && (
                    <>
                        <AddToCart productId={product.id} className="add-to-cart" />
                        <Link to={`/productdetails/${product.id}`}>Zobacz szczegóły</Link>
                    </>
                )}
            </div>
        </div>
    );
}

export default Product;
