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

    if (product) {
        return (
            <div className="bg-white p-5 rounded-lg shadow-lg h-[400px] w-[350px]" onMouseEnter={handleHover} onMouseLeave={handleMouseLeave}>
                <div className="flex flex-col h-[100%] justify-between">
                    <div className="h-[200px] mb-4 overflow-hidden">
                        <img className="w-full h-full object-cover" src={product.properties.image} alt={product.properties.title} />
                    </div>
                    <h2 className="text-xl mb-3 font-bold truncate text-center">{product.properties.title}</h2>
                    <AddToCart productId={product.id} className="bg-blue-500 text-white py-2 px-4 rounded-lg mr-2" />
                    <p className="text-xl text-right text-gray-700 p-3 font-bold">{product.properties.price} zł</p>
                    <Link to={`/productdetails/${product.id}`} className="text-center text-blue-500">See more</Link>
                </div>
            </div>
        );   
    }
}

export default Product;
