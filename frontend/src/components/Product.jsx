import React from "react"
import { Link } from "react-router-dom";

const Product = ({product}) => {
    
    return (
        <div>
            <h2>{product.properties.title}</h2>
            <img className="shoe-img" src={product.properties.image} alt="" />
            <p>{product.properties.price} zł</p>
            <p>{product.properties.description}</p>
            <Link to={`/productdetails/${product.id}`}>Zobacz szczegóły</Link>
        </div>
    );
}

export default Product;
