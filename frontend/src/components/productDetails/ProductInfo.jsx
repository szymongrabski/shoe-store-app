import React, { useContext} from "react";
import { ProductContext } from "../../contexts/ProductContext.js"
import AddToCart from "../shoppingCart/AddToCart.jsx";

const ProductInfo = () => {
    const { product } = useContext(ProductContext)

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
                    <AddToCart productId ={ product.id } />
                </div>
            ) : null}
        </div>
    );
};

export default ProductInfo;
