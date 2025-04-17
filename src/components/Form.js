import { useState } from "react";

export default function Form({ onAddItemProp }) {
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
