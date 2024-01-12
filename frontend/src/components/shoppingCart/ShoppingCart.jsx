import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { ProductsContext } from "../../contexts/ProductsContext";
import { RegisterForm } from "./RegisterForm";
import { formatCurrency } from "../../utils/formatFunctions";


export default function ShoppingCart() {
    const { clearCart, cartProducts } = useContext(ShoppingCartContext)
    const { products } = useContext(ProductsContext)
    const [showRegisterForm, setShowRegisterForm] = useState(false);
    
    const totalPrice = cartProducts.reduce((totalPrice, cartProduct) => {
        const product = products.find(i => i.id === cartProduct.id);
        const productPrice = product?.properties.price || 0;
        return totalPrice + (productPrice * cartProduct.order.amount);
    }, 0);
    
    return (
        <>
            {cartProducts.length !== 0 ? (
                <div>
                    <ul className="card-list">
                        {cartProducts.map((product) => (
                            <li key={`${product.id}-${product.order.size}`}>
                                <CartItem id={product.id} order={product.order}/>
                            </li>
                        ))}
                    </ul>
                    <div className="order-item">
                        <div>Suma: {formatCurrency(totalPrice)} </div>
                        <button className="btn del-btn" onClick={() => clearCart()}>Wyczyść</button>
                        <button className="btn add-btn" onClick={() => setShowRegisterForm(prevValue => !prevValue)}>Złóż zamówienie</button>
                    </div>
                    <div className="order-item">
                        {showRegisterForm && <RegisterForm totalPrice={totalPrice} />}
                    </div>
                </div>
            ) : <div className="empty-cart">Brak produktów w koszyku</div>}
        </>
    );
}
