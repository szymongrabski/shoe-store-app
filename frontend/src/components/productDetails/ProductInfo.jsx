import React, { useContext} from "react";
import { ProductContext } from "../../contexts/ProductContext.js"
import AddToCart from "../shoppingCart/AddToCart.jsx";

const ProductInfo = () => {
    const { product } = useContext(ProductContext)

    return (
        <>
            {product ? (
                <div className="card">
                    <div className="card-content">
                        <h2>{product.properties.title}</h2>
                        <img className="img product-details-img" src={product.properties.image} alt="" />
                        <p>Cena: {product.properties.price} zł</p>
                        <p>Opis: {product.properties.description}</p>
                        <p>Kolor: {product.properties.color}</p>
                        <p>Marka: {product.properties.brand}</p>
                        <p>Płeć: {product.properties.sex}</p>
                        <AddToCart className="btn-product" productId ={ product.id } />
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ProductInfo;
