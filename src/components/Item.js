//Using conditional operator to apply some style. If the item is packed(true),
// then it will appear crossed out
export default function Item({ itemProp, onDeleteItemProp, onToggleItemProp }) {
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
