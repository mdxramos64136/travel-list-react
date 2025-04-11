const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
  { id: 3, description: "Charger", quantity: 1, packed: false },
];
/****************************************************************** */
export default function App() {
  return (
    <div className="app">
      <Logo />
      <Form />
      <PackingList />
      <Stats />
    </div>
  );
}
/******************************************************************** */
// Shortcut to the emoji list Wid + .
function Logo() {
  return <h1>🛣️ Travel App 🏖️</h1>;
}
/******************************************************************** */
function Form() {
  //When you click on add button, tha page auto-reload. To avoid that , use e.preventDefault();
  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <form
      className="add-form"
      onSubmit={handleSubmit}>
      <h3>What do you need for your trip? ✈️ </h3>
      <select>
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
      />
      <button>Add</button>
    </form>
  );
}
/******************************************************************** */
function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((itemArr) => (
          <Item
            itemProp={itemArr}
            key={itemArr.id}
          />
        ))}
      </ul>
    </div>
  );
}
/******************************************************************** */
//Using conditional operator to apply some style. If the item is packed(true),
// then it will appear crossed out
function Item({ itemProp }) {
  return (
    <li>
      <span style={itemProp.packed ? { textDecoration: "line-through" } : {}}>
        {itemProp.quantity + " "}
        {itemProp.description}
      </span>
      <button>❌</button>
    </li>
  );
}
/******************************************************************** */
//<em> = enfasize
function Stats() {
  return (
    <footer className="stats">
      <em>🧳You have X items in your list and already packed x </em>
    </footer>
  );
}
