import React, { createContext, useMemo } from "react";
import { useMMKVObject } from "react-native-mmkv";
import { USER_CART } from "../common";
import { storage } from "../lib/mmkv";

interface CartContextProps {
  cart?: CartItem[];
  updateItem: (product: Product, quantity: number) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  updateItem: () => {},
  total: 0,
  clearCart: () => {},
});

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [cart, setCart] = useMMKVObject<CartItem[]>(USER_CART, storage);
  const removeItem = (product: Product) => {
    if (!cart) return;
    if (cart.length > 0) {
      const newCart = cart.filter((item) => item.id !== product.id);
      setCart(newCart);
    }
  };

  const updateItem = (product: Product, quantity: number) => {
    if (quantity === 0) {
      removeItem(product);
      return;
    }
    if (cart) {
      const index = cart.findIndex((item) => item.id === product.id);
      if (index === -1) {
        setCart([...cart, { ...product, quantity }]);
      } else {
        const updatedElements = [...cart];
        updatedElements[index] = { ...product, quantity };
        setCart(updatedElements);
      }
    } else {
      setCart([{ ...product, quantity }]);
    }
  };

  const clearCart = () => {
    setCart(undefined);
  };

  const total = useMemo(() => {
    if (!cart) return 0;
    return cart.reduce((sum, item) => {
      return item.price * item.quantity + sum;
    }, 0);
  }, [JSON.stringify(cart)]);

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        updateItem: updateItem,
        total: total,
        clearCart: clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
