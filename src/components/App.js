import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

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
