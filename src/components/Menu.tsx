import { useEffect, useState } from "react";
import { FoodItem } from "../App";

type Props = {
  addToCart: (item: FoodItem) => void;
};

function Menu({ addToCart }: Props) {
  const [items, setItems] = useState<FoodItem[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/api/menu")
      .then(res => res.json())
      .then(data => setItems(data));
  }, []);

  return (
    <section id="menu" className="section">
      <h2>Menu</h2>

      <div className="grid">
        {items.map(item => (
          <div className="card fade-up" key={item.id}>
            <h3>{item.name}</h3>
            <p>₹{item.price}</p>

            <button onClick={() => addToCart(item)}>
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Menu;
