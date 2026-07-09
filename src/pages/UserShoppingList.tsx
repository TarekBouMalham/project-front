import type { IItem } from "../types/Item";

const items: IItem[] = [];

const UserShoppingList = () => {
  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-semibold mb-6">Shopping List</h1>

        {items.length === 0 ? (
          <p className="text-gray-500">No items available yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((item) => (
              <div key={item._id} className="bg-white rounded shadow p-4">
                <img src={item.image} alt={item.name} className="w-full h-40 object-cover rounded mb-3" />
                <h2 className="text-lg font-medium">{item.name}</h2>
                <p className="text-sm text-gray-600">Category: {item.category}</p>
                <p className="text-sm text-gray-600">Price: ${item.price}</p>
                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                <p className="mt-2 text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserShoppingList;