import type { IItem } from "../types/Item";

const items: IItem[] = [];

const UserShoppingList = () => {
  return (
    <div>
      <h1>Shopping List </h1>
      {items.length === 0 ? (
        <p>No items available yet.</p>
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

export default UserShoppingList;