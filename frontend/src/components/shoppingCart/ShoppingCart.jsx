import { useContext } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { ProductsContext } from "../../contexts/ProductsContext";
import { RegisterForm } from "./RegisterForm";
import { formatCurrency } from "../../utils/formatFunctions";

export default function ShoppingCart() {
    const { clearCart, cartProducts } = useContext(ShoppingCartContext)
    const { products } = useContext(ProductsContext)

    return (
        <div>
            {cartProducts.length !== 0 ? (
                <div>
                    <ul>
                        {cartProducts.map((product) => (
                            <li key={`${product.id}-${product.order.size}`}>
                                <CartItem id={product.id} order={product.order}/>
                            </li>
                        ))}
                    </ul>

                    <p>Suma: {cartProducts.reduce((totalPrice, cartProduct) => {
                        const product = products.find(i => i.id === cartProduct.id)
                        return formatCurrency(totalPrice + (product?.properties.price || 0)*cartProduct.order.amount)
                    }, 0)} </p>
                    <button onClick={() => clearCart()}>Wyczyść</button>
                    <button>Złóż zamówienie</button>
                    <RegisterForm />
                </div>
            ) : <p>Brak produktów w koszyku</p>}
        </div>
    );
}
