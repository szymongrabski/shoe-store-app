import { useEffect, useState, useContext } from "react";
import { fetchData } from "../../utils/api";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { formatCurrency } from "../../utils/formatFunctions";

export function CartItem({ id, order }) {
    const { increaseProductQuantity, decreaseProductQuantity, removeFromCart } = useContext(ShoppingCartContext)
    const [product, setProduct] = useState(null);
    const [productAmount, setProductAmount] = useState(0);
    const { size, amount } = order;

    useEffect(() => {
        getProduct()
        getProductAmount()
    }, [])

    const getProduct = async () => {
        const product = await fetchData(`/products/${id}`);
        setProduct(product);
    }

    const getProductAmount = async () => {
        const sizesData = await fetchData(`/products/${id}/sizes`);
        const amount = sizesData.find(data => data.properties.size == size)?.properties.amount || 0;
        setProductAmount(amount)
    }

    if (product) {
        return (
            <div>
                <p>
                    {product.properties.title} - {size} - {amount} - {formatCurrency(product.properties.price * amount)}
                </p>
                {amount < productAmount ? <button onClick={() => increaseProductQuantity(product.id, size)}>Dodaj</button> : null }
                <button onClick={() => decreaseProductQuantity(product.id, size)}>Usuń jeden</button>
                <button onClick={() => removeFromCart(product.id, size)}>Usuń</button>
            </div>
        )
    } else {
        return (
            <p>Ładowanie...</p>
        )
    }

}