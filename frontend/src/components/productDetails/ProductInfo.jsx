import React, { useContext} from "react";
import { ProductContext } from "../../contexts/ProductContext.js"

const ProductInfo = () => {
    const { product, sizes } = useContext(ProductContext)

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
                    <div>
                        <p>Rozmiary: </p>
                        <ul>
                            {sizes.map(size => (
                                <li>
                                    <span>Rozmiar: {size.properties.size} </span>
                                    <span>Pozostało: {size.properties.amount}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ) : null}
        </div>
    );
};

export default ProductInfo;
