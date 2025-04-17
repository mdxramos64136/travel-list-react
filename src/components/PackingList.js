import { useState } from "react";
import Item from "./Item";

export default function PackingList({ listItemsProp, onDeleteItemProp, onToggleItemProp, onHandleClear }) {
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
