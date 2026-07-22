import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface IOrder {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  items: IOrderItem[];
}

const UserOrders = () => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const auth = useAuth();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("/api/orders", {
          headers: { Authorization: `Bearer ${auth?.token}` },
        });
        setOrders(res.data);
      } catch {
        setError("Failed to load your orders");
      }
    };

    fetchOrders();
  }, [auth?.token]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
              Orders
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              Your order history
            </h1>
          </div>
          <p className="text-sm text-slate-300">
            Review every order you have placed.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-4">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-8 text-center text-slate-400">
              You have not placed any orders yet.
            </div>
          ) : (
            orders.map((order) => (
              <div
                key={order._id}
                className="rounded-2xl border border-white/10 bg-slate-900/70 p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-sm font-medium text-sky-300">
                      Order #{order._id.slice(-6).toUpperCase()}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      Placed on {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-sm text-emerald-200">
                      {order.status}
                    </span>
                    <span className="text-lg font-semibold text-white">
                      ${order.totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mt-4 space-y-2">
                  {order.items.map((item, index) => (
                    <div
                      key={`${order._id}-${index}`}
                      className="flex items-center justify-between rounded-xl bg-slate-800/70 px-4 py-3 text-sm text-slate-300"
                    >
                      <span>{item.name}</span>
                      <span>
                        {item.quantity} × ${item.price}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default UserOrders;
