import React, { createContext } from "react";
import { useMMKVObject } from "react-native-mmkv";
import { USER_CART } from "../common";
import { storage } from "../lib/mmkv";

interface CartContextProps {
  cart?: CartItem[];
  removeItem: (product: Product) => void;
  updateItem: (product: Product, quantity: number) => void;
  total: number;
  clearCart: () => void;
}

const CartContext = createContext<CartContextProps>({
  cart: [],
  removeItem: () => {},
  updateItem: () => {},
  total: 0,
  clearCart: () => {},
});

export const CartProvider = ({ children }: React.PropsWithChildren) => {
  const [cart, setCart] = useMMKVObject<CartItem[]>(USER_CART, storage);

  const removeItem = (product: Product) => {
    if (cart?.length! > 0) {
      const newCart = cart?.filter((item) => item.id !== product.id);
      setCart(newCart);
    }
  };

  const updateItem = (product: Product, quantity: number) => {
    if (cart) {
      const index = cart.findIndex((item) => item.id === product.id);
      if (index === -1) {
        setCart([...cart, { ...product, quantity }]);
      } else {
        const newCart = cart.map((item) => {
          if (item.id === product.id) {
            return { ...product, quantity };
          }
          return item;
        });
        setCart(newCart);
      }
    } else {
      setCart([{ ...product, quantity }]);
    }
  };

  const clearCart = () => {
    setCart(undefined);
  };

  const total = React.useMemo(() => {
    return cart?.reduce((sum, item) => {
      return item.price * item.quantity + sum;
    }, 0);
  }, [JSON.stringify(cart)]);

  return (
    <CartContext.Provider
      value={{
        cart: cart,
        removeItem: removeItem,
        updateItem: updateItem,
        total: total ?? 0,
        clearCart: clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContext;
