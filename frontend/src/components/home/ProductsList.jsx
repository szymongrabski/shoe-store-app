import React, { useEffect, useState } from "react"
import Product from './Product'
import { fetchData } from "../../utils/api"

const ProductsList = () => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts()
    }, []);

    const getProducts = async () => {
        const productsData = await fetchData('/products')
        setProducts(productsData.products)
    }

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
