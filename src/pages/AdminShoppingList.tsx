import type { IItem } from "../types/Item";

const items: IItem[] = [];

const AdminShoppingList = () => {
  return (
    <div>
      <h1>Admin Shopping List</h1>
      {items.length === 0 ? (
        <p>No items yet. Add some in Step 4!</p>
      ) : (
        <div>
          {items.map((item) => (
            <div key={item._id}>
              <h2>{item.name}</h2>
              <p>Price: ${item.price}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Category: {item.category}</p>
              <p>Description: {item.description}</p>
              <img src={item.image} alt={item.name} width={100} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminShoppingList;