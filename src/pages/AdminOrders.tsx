import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

interface IOrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface IUserOrder {
  _id: string;
  totalAmount: number;
  status: string;
  createdAt: string;
  userId: {
    _id: string;
    username: string;
    email: string;
  };
  items: IOrderItem[];
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<IUserOrder[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const auth = useAuth();

  const fetchOrders = async () => {
    try {
      const res = await axios.get("/api/orders", {
        headers: { Authorization: `Bearer ${auth?.token}` },
      });
      setOrders(res.data);
    } catch {
      setError("Failed to load orders");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [auth?.token]);

  const markCompleted = async (orderId: string) => {
    setUpdatingId(orderId);
    setError(null);

    try {
      await axios.patch(
        `/api/orders/${orderId}`,
        { status: "completed" },
        {
          headers: { Authorization: `Bearer ${auth?.token}` },
        },
      );
      await fetchOrders();
    } catch {
      setError("Failed to update order status");
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
              Orders
            </p>
            <h1 className="mt-2 text-3xl font-semibold text-white">
              All customer orders
            </h1>
          </div>
          <p className="text-sm text-slate-300">
            View all orders placed by each user.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
            {error}
          </div>
        )}

        <div className="mt-8 space-y-6">
          {orders.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-8 text-center text-slate-400">
              No orders have been placed yet.
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
                      {order.userId?.username || "Unknown user"}
                    </p>
                    <p className="mt-1 text-sm text-slate-400">
                      {order.userId?.email || ""}
                    </p>
                    <p className="mt-1 text-sm text-slate-500">
                      Order #{order._id.slice(-6).toUpperCase()} •{" "}
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-3">
                    <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-sm text-amber-200">
                      {order.status}
                    </span>
                    {order.status !== "completed" && (
                      <button
                        type="button"
                        onClick={() => markCompleted(order._id)}
                        disabled={updatingId === order._id}
                        className="rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 px-3 py-2 text-sm font-medium text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                      >
                        {updatingId === order._id
                          ? "Updating..."
                          : "Mark completed"}
                      </button>
                    )}
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

export default AdminOrders;
