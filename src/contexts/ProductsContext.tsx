import React, { createContext, useContext, useEffect } from "react";
import { useMMKVObject } from "react-native-mmkv";
import { PRODUCTS } from "../common";
import { storage } from "../lib/mmkv";
import data from "../data/generated.json";
import CartContext from "./CartContext";

interface ProductsContextProps {
  products?: Product[];
  removeItem: (product: Product) => void;
  updateItem: (product: Product) => void;
  addItem: (product: Product) => void;
  getDetails: (id: string) => Product | undefined;
}

const ProductsContext = createContext<ProductsContextProps>({
  products: [],
  removeItem: () => {},
  addItem: () => {},
  updateItem: () => {},
  getDetails: () => undefined,
});

export const ProductsProvider = ({ children }: React.PropsWithChildren) => {
  const [products, setProducts] = useMMKVObject<Product[]>(PRODUCTS, storage);
  const { cart, updateItem: updateItemInCart } = useContext(CartContext);
  
  const removeItem = (product: Product) => {
    if (!products) return;
    updateItemInCart(product, 0);
    if (products.length! > 0) {
      const newProducts = products.filter((item) => item.id !== product.id);
      setProducts(newProducts);
    }
  };

  const addItem = (product: Product) => {
    setProducts([...products!, product]);
  };

  const updateItem = (product: Product) => {
    if (!products) return;
    const newProducts = products.map((item) => {
      if (item.id === product.id) {
        return product;
      }
      return item;
    });
    setProducts(newProducts);

    if (!cart) return;
    const itemInCart = cart.find((e) => e.id === product.id);
    if (itemInCart) {
      updateItemInCart(product, itemInCart.quantity);
    }
  };

  const getDetails = (id: string) => {
    if (!products) return;
    return products.find((e) => e.id === id);
  };

  useEffect(() => {
    if (!products) {
      setProducts(data);
    }
  }, []);

  return (
    <ProductsContext.Provider
      value={{
        products: products,
        removeItem: removeItem,
        addItem: addItem,
        getDetails: getDetails,
        updateItem: updateItem,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsContext;
