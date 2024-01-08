import { useContext, useState } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { CartItem } from "./CartItem";

export default function ShoppingCart() {
    const { clearCart, cartProducts, totalPrice } = useContext(ShoppingCartContext)

    return (
        <div>
            {cartProducts.length !== 0 ? (
                <div>
                    <ul>
                        {cartProducts.map((product) => (
                            <li key={`${product.id}-${product.order.size}`}>
                                <CartItem id={`${product.id}-${product.order.size}`} order={product.order} />
                            </li>
                        ))}
                    </ul>
                    <p>Suma: {Object.keys(totalPrice).reduce((sum, key) => sum + totalPrice[key], 0)}</p>
                    <button onClick={() => clearCart()}>Wyczyść</button>
                    <button>Złóż zamówienie</button>
                </div>
            ) : <p>Brak produktów w koszyku</p>}
        </div>
    );
}
