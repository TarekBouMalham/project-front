import axios from "axios";
import type { ICartItem, IItem } from "../types/Item";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getImageUrl } from "../utils/normalizeImageUrl";

const UserShoppingList = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [cart, setCart] = useState<ICartItem[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const auth = useAuth();

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items", {
        headers: {
          Authorization: `Bearer ${auth?.token}`,
        },
      });
      setItems(res.data);
    } catch {
      setError("Failed to load items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addToCart = (item: IItem) => {
    if (item.quantity <= 0) {
      setError(`${item.name} is out of stock`);
      return;
    }

    const existingCartItem = cart.find((entry) => entry.item._id === item._id);
    const requestedQuantity = (existingCartItem?.quantity ?? 0) + 1;

    if (requestedQuantity > item.quantity) {
      setError(
        `Only ${item.quantity} unit${item.quantity === 1 ? "" : "s"} left for ${item.name}`,
      );
      return;
    }

    setCart((current) => {
      const existing = current.find((entry) => entry.item._id === item._id);
      if (existing) {
        return current.map((entry) =>
          entry.item._id === item._id
            ? { ...entry, quantity: entry.quantity + 1 }
            : entry,
        );
      }
      return [...current, { item, quantity: 1 }];
    });
    setSuccess(`${item.name} added to cart`);
  };

  const updateQuantity = (itemId: string, nextQuantity: number) => {
    setCart((current) => {
      const target = current.find((entry) => entry.item._id === itemId);
      if (!target) return current;

      const availableStock = target.item.quantity;
      if (nextQuantity > availableStock) {
        setError(
          `Only ${availableStock} unit${availableStock === 1 ? "" : "s"} left for ${target.item.name}`,
        );
        return current;
      }

      return current
        .map((entry) =>
          entry.item._id === itemId
            ? { ...entry, quantity: nextQuantity }
            : entry,
        )
        .filter((entry) => entry.quantity > 0);
    });
  };

  const submitOrder = async () => {
    if (cart.length === 0) {
      setError("Add at least one item to your cart before placing an order");
      return;
    }

    setSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      await axios.post(
        "/api/orders",
        {
          items: cart.map((entry) => ({
            itemId: entry.item._id,
            quantity: entry.quantity,
          })),
        },
        {
          headers: {
            Authorization: `Bearer ${auth?.token}`,
          },
        },
      );
      setCart([]);
      setSuccess("Order submitted successfully");
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Failed to submit order");
      }
    } finally {
      setSubmitting(false);
    }
  };

  const subtotal = cart.reduce(
    (total, entry) => total + entry.item.price * entry.quantity,
    0,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-sky-300">
                Shopping list
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Everything you need, neatly arranged
              </h1>
            </div>
            <p className="text-sm text-slate-300">
              Browse your items, add them to cart, and place your order.
            </p>
          </div>
          {(error || success) && (
            <div
              className={`mt-6 rounded-2xl border px-4 py-3 text-sm ${
                error
                  ? "border-rose-400/40 bg-rose-500/10 text-rose-200"
                  : "border-emerald-400/40 bg-emerald-500/10 text-emerald-200"
              }`}
            >
              {error || success}
            </div>
          )}

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.6fr_0.8fr]">
            <div>
              {items.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-8 text-center">
                  <p className="text-lg font-medium text-white">
                    No items available yet.
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    Your shopping list will appear here as soon as items are
                    added.
                  </p>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  {items.map((item) => (
                    <div
                      key={item._id}
                      className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg shadow-slate-950/20"
                    >
                      <div className="overflow-hidden rounded-t-2xl bg-slate-950">
                        <div className="relative aspect-[4/3] w-full">
                          <img
                            src={getImageUrl(item.image)}
                            alt={item.name}
                            className="absolute inset-0 h-full w-full object-cover object-center"
                          />
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="flex items-center justify-between gap-3">
                          <h2 className="text-lg font-semibold text-white">
                            {item.name}
                          </h2>
                          <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
                            {item.category}
                          </span>
                        </div>
                        {item.quantity <= 0 && (
                          <div className="mt-3 inline-flex rounded-full border border-rose-400/30 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-200">
                            Out of stock
                          </div>
                        )}
                        <div className="mt-4 space-y-1 text-sm text-slate-300">
                          <p>Price: ${item.price}</p>
                          <p>Quantity: {item.quantity}</p>
                        </div>
                        <p className="mt-4 text-sm text-slate-400">
                          {item.description}
                        </p>
                        <button
                          type="button"
                          onClick={() => addToCart(item)}
                          disabled={item.quantity <= 0}
                          className="mt-5 rounded-2xl bg-gradient-to-r from-sky-500 to-cyan-500 px-4 py-2 text-sm font-medium text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          {item.quantity <= 0 ? "Out of stock" : "Add to cart"}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <aside className="rounded-3xl border border-white/10 bg-slate-900/70 p-6 shadow-xl shadow-slate-950/20 xl:sticky xl:top-24 xl:self-start">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-white">Your cart</h2>
                <span className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-sm text-slate-300">
                  {cart.length} item{cart.length === 1 ? "" : "s"}
                </span>
              </div>

              {cart.length === 0 ? (
                <div className="mt-6 rounded-2xl border border-dashed border-white/15 p-6 text-center text-sm text-slate-400">
                  Your cart is empty. Add some items to get started.
                </div>
              ) : (
                <div className="mt-6 space-y-4">
                  {cart.map((entry) => (
                    <div
                      key={entry.item._id}
                      className="rounded-2xl border border-white/10 bg-slate-800/80 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="font-medium text-white">
                            {entry.item.name}
                          </p>
                          <p className="text-sm text-slate-400">
                            ${entry.item.price} each
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(entry.item._id, entry.quantity - 1)
                            }
                            className="h-8 w-8 rounded-full border border-white/10 text-lg text-white"
                          >
                            -
                          </button>
                          <span className="min-w-6 text-center text-sm text-slate-200">
                            {entry.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(entry.item._id, entry.quantity + 1)
                            }
                            className="h-8 w-8 rounded-full border border-white/10 text-lg text-white"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              <div className="mt-8 rounded-2xl border border-sky-400/20 bg-sky-500/10 p-4">
                <div className="flex items-center justify-between text-sm text-slate-200">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <button
                  type="button"
                  onClick={submitOrder}
                  disabled={submitting || cart.length === 0}
                  className="mt-4 w-full rounded-2xl bg-gradient-to-r from-emerald-500 to-lime-500 px-4 py-3 text-sm font-semibold text-white transition disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? "Submitting order..." : "Submit order"}
                </button>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShoppingList;
