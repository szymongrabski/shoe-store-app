import { useContext, useMemo } from "react";
import { ShoppingCartContext } from "../../contexts/ShoppingCartContext";
import { CartItem } from "./CartItem";
import { ProductsContext } from "../../contexts/ProductsContext";
import { RegisterForm } from "./RegisterForm";
import { formatCurrency } from "../../utils/formatFunctions";

export default function ShoppingCart() {
  const { clearCart, cartProducts } = useContext(ShoppingCartContext);
  const { state } = useContext(ProductsContext);

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
        <div className="flex w-[100%] justify-around">
          <div className="bg-secondary p-4 flex flex-col justify-between">
            <ul className="flex flex-col gap-y-3">
              {cartProducts.map((product) => (
                <li key={`${product.id}-${product.order.size}`}>
                  <CartItem id={product.id} order={product.order} />
                </li>
              ))}
            </ul>
            <div className="flex justify-between mt-4 items-center">
              <div className="text-gray-300 text-lg">In total: {formatCurrency(totalPrice)} </div>
                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded" onClick={() => clearCart()}>
                  Clear cart
                </button>
            </div>
          </div>
          <div> 
            <RegisterForm totalPrice={totalPrice} />
          </div>
        </div>
      ) : (
        <div className="text-lg font-bold text-center m-auto">Cart is empty!</div>
      )}
    </>
  );
}
