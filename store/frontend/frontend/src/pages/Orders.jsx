import { useEffect, useState } from "react";
import API from "../services/api";

export default function Orders() {

  const [orders, setOrders] = useState([]);

  useEffect(() => {

    const fetchOrders = async () => {

      const res = await API.get("/orders");

      setOrders(res.data);

    };

    fetchOrders();

  }, []);

  return (

    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">
        My Orders
      </h1>

      {orders.map((order) => (

        <div
          key={order._id}
          className="border p-4 mb-4"
        >

          <p>
            Order ID: {order._id}
          </p>

          <p>
            Total: ₹{order.totalPrice}
          </p>

          <p>
            Status: {order.status}
          </p>

        </div>

      ))}

    </div>

  );

}