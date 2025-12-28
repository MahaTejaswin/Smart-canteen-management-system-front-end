import { FoodItem } from "../App";

type Props = {
  cart: FoodItem[];
  setCart: React.Dispatch<React.SetStateAction<FoodItem[]>>;
};

function Cart({ cart, setCart }: Props) {

  const placeOrder = async () => {
    if (cart.length === 0) {
      alert("Cart is empty");
      return;
    }

    const payload = cart.map(item => ({
      itemName: item.name,
      price: item.price
    }));

    try {
      const res = await fetch("http://localhost:8081/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error("Order failed");
      }

      alert("Order placed successfully!");
      setCart([]);
    } catch (err) {
      alert("Order failed. Check backend.");
      console.error(err);
    }
  };

  return (
    <section id="cart" className="section dark">
      <h2>Cart</h2>

      {cart.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>
                {item.name} - ₹{item.price}
              </li>
            ))}
          </ul>

          <button onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </section>
  );
}

export default Cart;
