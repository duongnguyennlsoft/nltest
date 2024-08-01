 *
import React from "react";
import { CartProvider } from "./src/contexts/CartContext";
import { UserProvider } from "./src/contexts/UserContext";
import Navigation from "./src/navigation";
import { ProductsProvider } from "./src/contexts/ProductsContext";

function App(): React.JSX.Element {
  return (
    <UserProvider>
      <CartProvider>
        <ProductsProvider>
          <Navigation />
        </ProductsProvider>
      </CartProvider>
    </UserProvider>
  );
}
export default App;
