import axios from "axios";
import type { IItem } from "../types/Item";
import { useEffect, useState } from "react";

const UserShoppingList = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get("/api/items");
      setItems(res.data);
    } catch {
      setError("Failed to load items");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);
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
              Browse your items in a calmer, more polished view.
            </p>
          </div>
          {error && (
            <div className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}

          <div className="mt-8">
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
              <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
                {items.map((item) => (
                  <div
                    key={item._id}
                    className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg shadow-slate-950/20"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-40 w-full object-cover"
                    />
                    <div className="p-5">
                      <div className="flex items-center justify-between gap-3">
                        <h2 className="text-lg font-semibold text-white">
                          {item.name}
                        </h2>
                        <span className="rounded-full border border-sky-400/30 bg-sky-500/10 px-3 py-1 text-xs font-medium text-sky-200">
                          {item.category}
                        </span>
                      </div>
                      <div className="mt-4 space-y-1 text-sm text-slate-300">
                        <p>Price: ${item.price}</p>
                        <p>Quantity: {item.quantity}</p>
                      </div>
                      <p className="mt-4 text-sm text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserShoppingList;
