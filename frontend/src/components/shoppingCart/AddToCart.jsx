import React, {useState, useContext, useEffect} from "react"
import { fetchData } from "../../utils/api";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

const AddToCart = ({ productId }) => {
    const { increaseProductQuantity, cartProducts } = useContext(ShoppingCartContext)
    const [sizes, setSizes] = useState([]);
    const [selectedSize, setSelectedSize] = useState(0);
    const [selectedAmount, setSelectedAmount] = useState(0);
    const [canIncrease, setCanIncrease] = useState(true)

    const getSizes = async () => {
        const sizesData = await fetchData(`/products/${productId}/sizes`);
        setSizes(sizesData)
        setSelectedSize(sizesData[0]?.properties.size || ''); 
        setSelectedAmount(sizesData[0]?.properties.amount || 0); 
    }

    useEffect(() => {
        getSizes();
    }, [])

    useEffect(() => {
        const product = cartProducts.find(product => productId === product.id && product.order.size === selectedSize)

        if (product && product.order.amount > selectedAmount - 1) {
            setCanIncrease(false);
        } else {
            setCanIncrease(true);
        }
    }, [cartProducts, selectedSize, selectedAmount]);

    const handleSizeChange = (event) => {
        setSelectedSize(event.target.value);
        const amount = sizes.find(data => data.properties.size == event.target.value)?.properties.amount || 0;
        setSelectedAmount(amount)
    };

    return (
    <div>
        <select value={selectedSize} onChange={handleSizeChange}>
            {sizes.map((size) => (
                <option key={size.id} value={size.properties.size}>
                    {size.properties.size}
                </option>
            ))}
        </select>
        {canIncrease ? <button onClick={() => increaseProductQuantity(productId, selectedSize)}>Dodaj do koszyka</button> : <p>Wyczerpano</p>}
    </div>
    );

}
export default AddToCart;
