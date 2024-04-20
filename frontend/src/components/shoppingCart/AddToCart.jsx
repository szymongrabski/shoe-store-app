import React, {useState, useContext, useEffect } from "react"
import { fetchData } from "../../utils/api";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { FiChevronsDown } from "react-icons/fi";
import AddButton from "./AddButton";

const AddToCart = ({ productId }) => {
    const { increaseProductQuantity, cartProducts } = useContext(ShoppingCartContext)
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [canIncrease, setCanIncrease] = useState(false)

    const getSizes = async () => {
        const sizes = await fetchData(`/products/${productId}/sizes/available`);
        const sizesData = sizes.sort((a, b) => a.properties.size - b.properties.size)
        setSizes(sizesData)
        setSelectedSize(sizesData[0]?.properties.size || 0); 
        setSelectedAmount(sizesData[0]?.properties.amount || 0); 
    }

    useEffect(() => {
        getSizes();
    }, [])

    useEffect(() => {
        const product = cartProducts.find(product => productId === product.id && product.order.size === selectedSize)
        if (product && product.order.amount > selectedAmount - 1) {
            setCanIncrease(false);
        } else if (selectedSize === 0){
            setCanIncrease(false);
        } else {
            setCanIncrease(true)
        }
    }, [cartProducts, selectedSize, selectedAmount]);

    
    const handleSizeChange = (event) => {
        if (sizes) {
            setSelectedSize(parseInt(event.target.value));
            const amount = sizes.find(data => data.properties.size == event.target.value)?.properties.amount || 0;
            setSelectedAmount(amount)
        }
    };

    return (
    <div className="flex items-center justify-around">
        <div className="flex gap-2 items-center">
            <p className="font-lg text-gray-400">Size:</p>
            <div className="custom-select">
                <select className="select" name="size" value={selectedSize} onChange={handleSizeChange}>
                    {sizes.map((size) => (
                        <option key={size.id} value={size.properties.size}>
                            {size.properties.size}
                        </option>
                    ))}
                </select>
                <span className="custom-arrow">
                    <FiChevronsDown size={24} color="white"/>
                </span>
            </div>
            <div className="flex justify-center gap-x-3 text-gray-700">
            </div>          
        </div>
        {canIncrease ? 
            <AddButton productId={productId} size={selectedSize} />: <div className="text-sm text-red-600">Out of stock</div>
        }
    </div>
    );

}
export default AddToCart;