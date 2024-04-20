import React, { createContext } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const ShoppingCartContext = createContext({});


export default function ShoppingCartProvider({ children }) {
    const [cartProducts, setCartProducts] = useLocalStorage('shopping-cart', []);

    const calculateCartQuantity = () => {
        return cartProducts.reduce((quantity, product) => {
            return quantity + product.order.amount;
        }, 0);
    };

    const increaseProductQuantity = (id, size ) => {
        setCartProducts(products => {
            const existingProduct = products.find(product => product.id === id && product.order.size === size);
            if (!existingProduct) {
                return [
                    ...products,
                    {
                        id,
                        order: {
                            size,
                            amount: 1,
                        }
                    }
                ];
            } else {
                return products.map(product =>
                    product.id === id && product.order.size === size ? { ...product, order: { ...product.order, amount: product.order.amount + 1 } } : product
                );
            }
        });
    };

    const decreaseProductQuantity = (id, size) => {
        setCartProducts(products => {
            const existingProduct = products.find(product => product.id === id && product.order.size === size);
            if (existingProduct && existingProduct.order.amount > 1) {
                return products.map(product =>
                    product.id === id && product.order.size === size ? { ...product, order: { ...product.order, amount: product.order.amount - 1 } } : product
                );
            } else {
                return products.filter(product => !(product.id === id && product.order.size === size));
            }
        });
    };

    const removeFromCart = (id, size) => {
        setCartProducts(products => products.filter(product => product.id !== id || product.order.size !== size));
    };

    const clearCart = () => {
        setCartProducts([]);
    }

    return (
        <ShoppingCartContext.Provider value={{ increaseProductQuantity, decreaseProductQuantity, removeFromCart, clearCart, calculateCartQuantity, cartProducts }}>
            {children}
        </ShoppingCartContext.Provider>
    );
}
