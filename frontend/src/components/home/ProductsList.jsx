import React, { useContext, useEffect, useState } from "react"
import Product from './Product'
import { ProductsContext } from "../../contexts/ProductsContext"

const ProductsList = () => {
    const { state } = useContext(ProductsContext)

    const productsToDisplay = state.filteredProducts && state.filteredProducts.length > 0
    ? state.filteredProducts
    : state.products;

    return (
        <div className="card-items">
            <div className="card-list-container">
                <ul className="card-list">
                    {productsToDisplay.map(product => (
                        <li key={product.id}>
                            <Product product={product}/>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default ProductsList;
