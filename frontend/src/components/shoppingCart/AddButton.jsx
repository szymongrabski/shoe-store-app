import React, { useContext } from 'react'
import { ShoppingCartContext } from '../../contexts/ShoppingCartContext'

const AddButton = ({ productId, size }) => {
    const { increaseProductQuantity } = useContext(ShoppingCartContext)
    return (
        <button 
            onClick={() => increaseProductQuantity(productId, size)}
            className="bg-btn-col text-white rounded-full shadow-md p-3 transition duration-300 ease-in-out hover:bg-btn-hover"
        >
            Add to cart
        </button>
    )
}

export default AddButton 