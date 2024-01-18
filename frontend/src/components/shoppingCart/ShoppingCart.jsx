import { useContext, useState, useMemo } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { ProductsContext } from "../../contexts/ProductsContext";
import { RegisterForm } from "./RegisterForm";
import { formatCurrency } from "../../utils/formatFunctions";

export default function ShoppingCart() {
  const { clearCart, cartProducts } = useContext(ShoppingCartContext);
  const { state } = useContext(ProductsContext);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  const totalPrice = useMemo(() => {
    return cartProducts.reduce((totalPrice, cartProduct) => {
      const product = state.products.find((i) => i.id === cartProduct.id);
      const productPrice = product?.properties.price || 0;
      return totalPrice + productPrice * cartProduct.order.amount;
    }, 0);
  }, [cartProducts, state.products]);

  return (
    <>
      {cartProducts.length !== 0 ? (
        <div className="shopping-cart">
          <div className="cart">
            <ul className="card-list">
              {cartProducts.map((product) => (
                <li key={`${product.id}-${product.order.size}`}>
                  <CartItem id={product.id} order={product.order} />
                </li>
              ))}
            </ul>
            <div className="order-item">
              <div>Suma: {formatCurrency(totalPrice)} </div>
              <button className="btn del-btn" onClick={() => clearCart()}>
                Wyczyść
              </button>
              <button
                className="btn add-btn"
                onClick={() =>
                  setShowRegisterForm((prevValue) => !prevValue)
                }
              >
                {showRegisterForm ? "Anuluj" : "Złóż zamówienie"}
              </button>
            </div>
          </div>
          <div>{showRegisterForm && <RegisterForm totalPrice={totalPrice} />}</div>
        </div>
      ) : (
        <div className="empty-cart">Brak produktów w koszyku</div>
      )}
    </>
  );
}
