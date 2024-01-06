import React, {useContext} from "react"
import { ProductsContext } from "../../contexts/ProductsContext"
import Product from './Product'

const ProductsList = () => {
    const products = useContext(ProductsContext);
    return (
        <div>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        <Product product={product}/>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductsList;
