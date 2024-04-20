import React, { useContext } from "react";
import { ProductContext } from "../../contexts/ProductContext.js";
import AddToCart from "../shoppingCart/AddToCart.jsx";
import { AiOutlineSafetyCertificate } from 'react-icons/ai';
import { FaShippingFast, FaUndoAlt } from 'react-icons/fa';
import Rating from "./Rating.jsx";


const ProductInfo = () => {
    const { product } = useContext(ProductContext);

    return (
        <>
            {product ? (
                <div className="w-[100%] mt-5">
                    <div className="flex justify-center flex-wrap shadow-lg bg-white">
                    <div className="w-[60%] mb-4 overflow-hidden">
                        <img className="w-full h-full object-cover" src={product.properties.image} alt={product.properties.title} />
                    </div>
                        <div className="lg:w-[40%] flex-grow flex flex-col bg-gray-100 text-[#212D40] p-2 justify-between">
                            <h2 className="text-[#11151C] text-xl font-bold text-center p-2">{product.properties.title}</h2>
                            <div>
                                <p>{product.properties.description}</p>
                                <p className="font-bold text-lg text-[##11151C]">{product.properties.price} zł</p>
                            </div>
                            <div>
                                <Rating/>
                            </div>
                            <div>
                                <p>Color: {product.properties.color.charAt(0).toUpperCase() + product.properties.color.slice(1)}</p>
                                <p>Brand: {product.properties.brand}</p>
                                <p>Sex: {product.properties.sex.charAt(0).toUpperCase() + product.properties.sex.slice(1)}</p>
                            </div>
                            <div>
                                <AddToCart className="btn-product" productId={product.id} />
                            </div>
                            <div className="bottom-0">
                                <div className="flex gap-2 items-center">
                                    <FaShippingFast size={22}/>
                                    <span>Fast and cheap delivery!</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <AiOutlineSafetyCertificate size={22}/>
                                    <span>Safe shopping!</span>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <FaUndoAlt />
                                    <span>Free returns policy up to 30 days!</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : null}
        </>
    );
};

export default ProductInfo;
