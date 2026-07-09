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
    } catch (err) {
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
      setForm({ name: "", price: "", quantity: "", category: "", description: "", image: "" });
      fetchItems();
    } catch (err) {
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
      setForm({ name: "", price: "", quantity: "", category: "", description: "", image: "" });
      fetchItems();
    } catch (err) {
      setError("Failed to update item");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/items/${id}`);
      fetchItems();
    } catch (err) {
      setError("Failed to delete item");
    }
  };

  const handleCancelEdit = () => {
    setEditingItem(null);
    setForm({ name: "", price: "", quantity: "", category: "", description: "", image: "" });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h1 className="text-2xl font-semibold mb-2">Admin Shopping List</h1>
          {error && <p className="text-red-600 mb-2">{error}</p>}

          <h2 className="text-lg font-medium mt-4 mb-3">{editingItem ? 'Edit Item' : 'Add New Item'}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <input className="border border-gray-300 rounded px-3 py-2" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="border border-gray-300 rounded px-3 py-2" placeholder="Price" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <input className="border border-gray-300 rounded px-3 py-2" placeholder="Quantity" value={form.quantity} onChange={(e) => setForm({ ...form, quantity: e.target.value })} />
            <input className="border border-gray-300 rounded px-3 py-2" placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} />
            <input className="border border-gray-300 rounded px-3 py-2 sm:col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
            <input className="border border-gray-300 rounded px-3 py-2 sm:col-span-2" placeholder="Image URL" value={form.image} onChange={(e) => setForm({ ...form, image: e.target.value })} />
          </div>

          <div className="mt-4">
            {editingItem ? (
              <>
                <button className="bg-green-600 text-white px-4 py-2 rounded mr-2" onClick={handleUpdate}>Update Item</button>
                <button className="border border-gray-300 px-4 py-2 rounded" onClick={handleCancelEdit}>Cancel</button>
              </>
            ) : (
              <button className="bg-indigo-600 text-white px-4 py-2 rounded" onClick={handleAdd}>Add Item</button>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-medium mb-3">All Items</h2>
          {items.length === 0 ? (
            <p className="text-gray-500">No items yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {items.map((item) => (
                <div key={item._id} className="bg-white rounded shadow p-4 flex gap-4">
                  <img src={item.image} alt={item.name} className="w-32 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <h3 className="text-lg font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600">Category: {item.category}</p>
                    <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                    <p className="mt-2 text-gray-700">{item.description}</p>
                    <div className="mt-3">
                      <button className="bg-yellow-500 text-white px-3 py-1 rounded mr-2" onClick={() => handleEditClick(item)}>Edit</button>
                      <button className="bg-red-500 text-white px-3 py-1 rounded" onClick={() => handleDelete(item._id)}>Delete</button>
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