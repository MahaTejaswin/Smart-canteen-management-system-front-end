import { useEffect, useState } from "react";

type Order = {
  id: number;
  itemName: string;
  price: number;
};

function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = () => {
    fetch("http://localhost:8081/api/orders", {
      cache: "no-store" // 🔥 disables browser cache
    })
      .then(res => res.json())
      .then(data => {
        setOrders(data);
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchOrders(); // initial load

    const interval = setInterval(() => {
      fetchOrders();
    }, 5000); // every 5 sec

    return () => clearInterval(interval);
  }, []);

  return (
    <section id="admin" className="admin-section">
      <h2>Admin Panel</h2>

      {loading ? (
        <p>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p>No orders yet</p>
      ) : (
        <div className="table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Item</th>
                <th>Price (₹)</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.itemName}</td>
                  <td>{order.price}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
}

export default Admin;
