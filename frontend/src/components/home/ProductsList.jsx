import React, { useContext, useEffect } from "react"
import Product from './Product'
import { ProductsContext } from "../../contexts/ProductsContext"

const ProductsList = () => {
    const { products } = useContext(ProductsContext)
    
    return (
        <div className="card-items">
            <ul className="card-list">
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
