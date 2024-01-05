import React from "react"

const Product = ({product}) => {
     
    return (

        <div>
            <h2>{product.properties.title}</h2>
            <img className="shoe-img" src={product.properties.image} alt="" />
            <p>{product.properties.price} zł</p>
            <p>{product.properties.description}</p>
        </div>
    );
}

export default Product;
