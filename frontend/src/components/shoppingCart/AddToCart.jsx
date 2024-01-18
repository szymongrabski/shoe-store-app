import React, {useState, useContext, useEffect, useLayoutEffect} from "react"
import { fetchData } from "../../utils/api";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

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
    <div className="add-to-cart-item">
        <div>
            <span>Rozmiar: </span>
            <select name="size" value={selectedSize} onChange={handleSizeChange}>
                {sizes.map((size) => (
                    <option key={size.id} value={size.properties.size}>
                        {size.properties.size}, Dostępne: {size.properties.amount}
                    </option>
                ))}
            </select>            
        </div>
        {canIncrease ? <button className="btn add-btn" onClick={() => increaseProductQuantity(productId, selectedSize)}>Dodaj do koszyka</button> : <div className="error">Wyczerpano</div>}
    </div>
    );

}
export default AddToCart;