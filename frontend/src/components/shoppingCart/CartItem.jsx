import { useEffect, useState, useContext } from "react";
import { fetchData } from "../../utils/api";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";

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
        const sizesData = await fetchData(`/products/${id}/sizes/available`);
        const amount = sizesData.find(data => data.properties.size == size)?.properties.amount || 0;
        setProductAmount(amount)
    }

    if (product) {
        return (
            <div className="cart-item">
                <div className="card">
                    <div className="card-content">
                        <h3>{product.properties.title}</h3>
                        <img className="img cart-img" src={product.properties.image}/>
                        <p>Rozmiar: {size}, Ilość: {amount}</p>
                    </div>
                </div>
                <div className="cart-buttons">
                    <div>
                        {amount < productAmount ? <button className="btn add-btn" onClick={() =>increaseProductQuantity(product.id, size)}>Dodaj</button> : null }
                    </div>
                    <div>
                        <button className="btn del-btn" onClick={() => decreaseProductQuantity(product.id, size)}>Usuń jeden</button>
                    </div>
                    <div>
                        <button className="btn del-btn" onClick={() => removeFromCart(product.id, size)}>Usuń</button>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="error">Ładowanie...</div>
        )
    }

}