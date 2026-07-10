import { useEffect, useState } from "react";
import axios from "axios";
import type { IItem } from "../types/Item";

const AdminShoppingList = () => {
  const [items, setItems] = useState<IItem[]>([]);
  const [error, setError] = useState("");
  const [editingItem, setEditingItem] = useState<IItem | null>(null);
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
    category: "",
    description: "",
    image: "",
  });

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

  const handleAdd = async () => {
    try {
      await axios.post("/api/items", {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      setForm({
        name: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
        image: "",
      });
      fetchItems();
    } catch {
      setError("Failed to add item");
    }
  };

  const handleEditClick = (item: IItem) => {
    setEditingItem(item);
    setForm({
      name: item.name,
      price: String(item.price),
      quantity: String(item.quantity),
      category: item.category,
      description: item.description,
      image: item.image,
    });
  };

  const handleUpdate = async () => {
    if (!editingItem) return;
    try {
      await axios.patch(`/api/items/${editingItem._id}`, {
        ...form,
        price: Number(form.price),
        quantity: Number(form.quantity),
      });
      setEditingItem(null);
      setForm({
        name: "",
        price: "",
        quantity: "",
        category: "",
        description: "",
        image: "",
      });
      fetchItems();
    } catch {
      setError("Failed to update item");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch {
      setError("Failed to delete item");
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm({
      name: "",
      price: "",
      quantity: "",
      category: "",
      description: "",
      image: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-800 to-slate-700 px-4 py-8 text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl space-y-6">
        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-medium uppercase tracking-[0.3em] text-violet-300">
                Admin controls
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-white">
                Manage your catalog
              </h1>
            </div>
            <p className="text-sm text-slate-300">
              Add fresh items and keep your inventory up to date in one place.
            </p>
          </div>

          {error && (
            <div className="mt-6 rounded-2xl border border-rose-400/40 bg-rose-500/10 px-4 py-3 text-sm text-rose-200">
              {error}
            </div>
          )}

          <div className="mt-8 rounded-2xl border border-white/10 bg-slate-900/40 p-6">
            <h2 className="text-xl font-semibold text-white">
              {editingItem ? "Edit Item" : "Add New Item"}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                placeholder="Price"
                value={form.price}
                onChange={(e) => setForm({ ...form, price: e.target.value })}
              />
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                placeholder="Quantity"
                value={form.quantity}
                onChange={(e) => setForm({ ...form, quantity: e.target.value })}
              />
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400"
                placeholder="Category"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              />
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400 sm:col-span-2"
                placeholder="Description"
                value={form.description}
                onChange={(e) =>
                  setForm({ ...form, description: e.target.value })
                }
              />
              <input
                className="rounded-2xl border border-white/10 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none transition focus:border-violet-400 sm:col-span-2"
                placeholder="Image URL"
                value={form.image}
                onChange={(e) => setForm({ ...form, image: e.target.value })}
              />
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              {editingItem ? (
                <>
                  <button
                    type="button"
                    className="rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-3 font-medium text-white shadow-lg shadow-emerald-500/20 transition hover:-translate-y-0.5"
                    onClick={handleUpdate}
                  >
                    Update item
                  </button>
                  <button
                    type="button"
                    className="rounded-2xl border border-white/15 bg-slate-900/40 px-4 py-3 font-medium text-slate-200 transition hover:bg-slate-900/60"
                    onClick={handleCancelEdit}
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  className="rounded-2xl bg-gradient-to-r from-violet-500 to-sky-500 px-4 py-3 font-medium text-white shadow-lg shadow-violet-500/20 transition hover:-translate-y-0.5"
                  onClick={handleAdd}
                >
                  Add item
                </button>
              )}
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/10 p-8 shadow-2xl shadow-slate-950/30 backdrop-blur-xl sm:p-10">
          <div className="flex items-center justify-between gap-3">
            <h2 className="text-xl font-semibold text-white">All items</h2>
            <span className="rounded-full border border-white/15 bg-slate-900/40 px-3 py-1 text-sm text-slate-300">
              {items.length} total
            </span>
          </div>

          {items.length === 0 ? (
            <div className="mt-6 rounded-2xl border border-dashed border-white/20 bg-slate-900/40 p-8 text-center">
              <p className="text-lg font-medium text-white">No items yet.</p>
              <p className="mt-2 text-sm text-slate-400">
                Start by adding the first product to your catalog.
              </p>
            </div>
          ) : (
            <div className="mt-6 grid gap-4 lg:grid-cols-2">
              {items.map((item) => (
                <div
                  key={item._id}
                  className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-slate-900/50 shadow-lg shadow-slate-950/20 sm:flex-row"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-40 w-full object-cover sm:h-auto sm:w-32"
                  />
                  <div className="flex-1 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {item.name}
                        </h3>
                        <p className="mt-1 text-sm text-slate-400">
                          {item.category}
                        </p>
                      </div>
                      <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-medium text-violet-200">
                        {item.quantity} left
                      </span>
                    </div>
                    <div className="mt-4 space-y-1 text-sm text-slate-300">
                      <p>Price: ${item.price}</p>
                      <p>Quantity: {item.quantity}</p>
                    </div>
                    <p className="mt-4 text-sm text-slate-400">
                      {item.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button
                        type="button"
                        className="rounded-xl bg-amber-500/90 px-3 py-2 text-sm font-medium text-white transition hover:bg-amber-500"
                        onClick={() => handleEditClick(item)}
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        className="rounded-xl bg-rose-500/90 px-3 py-2 text-sm font-medium text-white transition hover:bg-rose-500"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminShoppingList;
