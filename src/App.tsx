import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Admin from "./components/Admin";

export type FoodItem = {
  id: number;
  name: string;
  price: number;
};

function App() {
  const [cart, setCart] = useState<FoodItem[]>([]);

  const addToCart = (item: FoodItem) => {
    setCart(prev => [...prev, item]);
  };

  return (
    <>
      <Navbar />
      <Hero />
      <Menu addToCart={addToCart} />
      <Cart cart={cart} setCart={setCart} />
      <Admin />
    </>
  );
}

export default App;
