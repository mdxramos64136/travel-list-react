import { useState } from "react";

/****************************************************************** */
export default function App() {
  //Lifting up state to the nearesr parent component:
  const [itemsState, setItemsState] = useState([]); //empty array as default value

  function handleAddItems(itemParam) {
    // here, (items) represents the actual value of the state (the array stored in the itemState)
    // (items) => ... → is a callback passed to setItemsState, and React automatically provides the current state value as an argument
    setItemsState((items) => [...items, itemParam]);
  }

  function handleDeleteItem(id) {
    setItemsState((items) => items.filter((itemArr) => itemArr.id !== id));
  }

  function handleToggleItem(id) {
    setItemsState((items) =>
      items.map((itemArr) => (itemArr.id === id ? { ...itemArr, packed: !itemArr.packed } : itemArr))
    );
  }

  //////////////////////////////////////////////////////////////////////////////////
  function handleClear() {
    //Asking user to confirme the claer action. It returns a booleaan value. ok = true
    const confirmation = window.confirm("Are you sure you want to DELETE all items?");

    if (confirmation) setItemsState([]);
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItemProp={handleAddItems} />
      <PackingList
        listItemsProp={itemsState}
        onDeleteItemProp={handleDeleteItem}
        onToggleItemProp={handleToggleItem}
        onHandleClear={handleClear}
      />
      <Stats itemsProp={itemsState} />
    </div>
  );
}
/******************************************************************** */
// Shortcut to the emoji list Windows key + .
function Logo() {
  return <h1>🛣️ Travel App 🏖️</h1>;
}
/******************************************************************** */
function Form({ onAddItemProp }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  //When you click on add button, the page auto-reload. To avoid that , use e.preventDefault();
  function handleSubmit(e) {
    e.preventDefault();

    if (!description) {
      alert("Please, put a description!");
      return;
    }

    // Getting date from the submission:
    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItemProp(newItem);
    console.log(newItem);

    //resetting the filds to their original state
    setDescription("");
    setQuantity(1);
  } //handleSubmit

  return (
    <form
      className="add-form"
      onSubmit={handleSubmit}>
      <h3>What do you need for your trip? 🌴 </h3>
      <select
        onChange={(e) => setQuantity(+e.target.value)}
        value={quantity}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option
            value={num}
            key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => {
          // console.log(e.target.value);
          setDescription(e.target.value);
        }}
      />
      <button>Add</button>
    </form>
  );
}
/******************************************************************** */
function PackingList({ listItemsProp, onDeleteItemProp, onToggleItemProp, onHandleClear }) {
  //create a state to deal with sort function
  const [sortBy, setSortBy] = useState("input");

  //receives the new sorted array depending on the sort criteria:
  let sortedItemsArr;

  // a is an (actual) object of the array. b is the next one
  if (sortBy === "description")
    sortedItemsArr = listItemsProp.slice().sort((a, b) => a.description.localeCompare(b.description));

  //id has the date/ time. Cronological order of input
  if (sortBy === "input") sortedItemsArr = listItemsProp.slice().sort((a, b) => a.id - b.id);

  //
  if (sortBy === "packed") sortedItemsArr = listItemsProp.slice().sort((a, b) => Number(a.packed) - Number(b.packed));

  /////////////////////////////////////////////////////////////////////////////////
  return (
    <div className="list">
      <ul>
        {sortedItemsArr.map((itemArr) => (
          <Item
            itemProp={itemArr}
            key={itemArr.id}
            onDeleteItemProp={onDeleteItemProp}
            onToggleItemProp={onToggleItemProp}
          />
        ))}
      </ul>
      <div className="actions">
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by pack status</option>
        </select>
        <button onClick={onHandleClear}>Clear</button>
      </div>
    </div>
  );
}
/******************************************************************** */
//Using conditional operator to apply some style. If the item is packed(true),
// then it will appear crossed out
function Item({ itemProp, onDeleteItemProp, onToggleItemProp }) {
  return (
    <li>
      {/* “Quando o usuário clicar no checkbox, crie uma função anônima 
      que chama onToggleItemProp (handleToggleItem) passando o id correto.” */}
      <input
        type="checkbox"
        value={itemProp.packed}
        onChange={() => onToggleItemProp(itemProp.id)}
      />
      <span style={itemProp.packed ? { textDecoration: "line-through" } : {}}>
        {itemProp.quantity + " "}
        {itemProp.description}
      </span>
      <button onClick={() => onDeleteItemProp(itemProp.id)}>❌</button>
    </li>
  );
}
/******************************************************************** */
//<em> = enfasize
function Stats({ itemsProp }) {
  //If no items has been added to the list yet...(remember: 0 is a falsy value)
  if (!itemsProp.length)
    return (
      <p className="stats">
        <em>Start adding items!😀</em>
      </p>
    );
  //remember: filter returns a new array. So we can ude length
  const numOfItems = itemsProp.length;
  const numPacked = itemsProp.filter((item) => item.packed).length;
  const percentage = Math.round((numPacked / numOfItems) * 100);

  return (
    <footer className="stats">
      {percentage === 100 ? (
        "You are all set 😀. Enjoy your Trip! ✈️"
      ) : (
        <em>
          🧳You have {numOfItems} items in your list and already packed {numPacked} ({percentage}%)
        </em>
      )}
    </footer>
  );
}
