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

  return (
    <div className="app">
      <Logo />
      <Form onAddItemProp={handleAddItems} />
      <PackingList
        listItemsProp={itemsState}
        onDeleteItemProp={handleDeleteItem}
        onToggleItemProp={handleToggleItem}
      />
      <Stats />
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
      <h3>What do you need for your trip? ✈️ </h3>
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
function PackingList({ listItemsProp, onDeleteItemProp, onToggleItemProp }) {
  return (
    <div className="list">
      <ul>
        {listItemsProp.map((itemArr) => (
          <Item
            itemProp={itemArr}
            key={itemArr.id}
            onDeleteItemProp={onDeleteItemProp}
            onToggleItemProp={onToggleItemProp}
          />
        ))}
      </ul>
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
function Stats() {
  return (
    <footer className="stats">
      <em>🧳You have X items in your list and already packed x </em>
    </footer>
  );
}

/** Explicação para Array.from({ length: 20 }, (_, i) => i + 1).map((num) 
 * Trata-se de um método que cria um novo array com base nos parâmetros passados.
 * Recebe como parâmetros:
 *  - arrayLike, que é um objeto com a propriedade {length: qtde}
 * See fosse uma string ficaria: Array.from('hello') // ['h', 'e', 'l', 'l', 'o']
 * Array.from({ length: 20 }: Cria um array com 20 posiçòes vazias. Neste
   momento, embora as posições existam, elas são undefined!

 * (_, i) => i + 1 é uma função de mapeamento e é chamada 1x p/ cada posição
 do array. Recebe 2 parâmetros: 
  - 1) O valor atual (_) , que no momento é undefined
  e, por isso ignorado; 
  - 2) O índice (i de 0 à 19)

  * i + 1 Atribui um valor à cada indice. 

  * O resultado final equivale a:
    <option value="1">1</option>
    <option value="2">2</option>
    ...
    <option value="20">20</option>

    => CREATING OBJECTS:
    Array.from({ length: 3 }, (_, i) => ({ id: i, name: `Item ${i}` }))
// [{ id: 0, name: 'Item 0' }, ...]

    => To Uppercase: Array.from('ok', (char) => char.toUpperCase()) // ['O', 'K']

  * ARRAY-LIKE OBJECTS ARE Qualquer objeto que tem uma propriedade length e índices 
  numéricos acessíveis como chaves (0, 1, 2...).
  
  * Você pode atribuir o resultado de Array.from() a uma variável: 
  const letras = Array.from('ok', (char) => char.toUpperCase());
*/

// COntinuação do código acima...
/**
  *       <option
            value={num} = Este é o valor que será enviado quando o <option> for selecionado.
            key={num}> = key é necessário para listas em React.
            {num} = Este é o texto visível que o usuário vê na tela.
          </option>

          
  */

/** Explaining onChange={(e) => setDescription(e.target.value)}
 * e is the event (click)
 * target is the input (the entire element). Try console.log(e.target) inside the setDescription and 
 then go to browser and check in the console (Ctrl Shift I). 
 * value is the text the you write.

 * WE ALWAYS NEED VALUE AND ONCHANGE IN THE INPUT ELEMENT!!!!
 */

/** SELECT OPTION ONCHANGE 
 * <select
        onChange={(e) => setQuantity(e.target.value)}

    This (e.target.value) is comming directly from this value in the <option> 
    <option
            value={num} this is the value selected by the user and r comming from the array

* Note that when you first load the page, the state (of the <select>) is a number/ the default
value (0).
However, when you make a selection,  it turns itself to a string (with the selection).
It's because e.target.value of the select returns a string!! 
So we need to transform it in a number. The are some ways to do that. 
For instance:
  a) putting + in the e.target.value = +e.target.value
  b) using Number(e.target.value)
*/

/** Debuging the form
 * What will be submited? 
 *     const newItem = { description, quantity, packed: false, id: Date.now() };
    console.log(newItem);
 */

/** VALIDATION:
 * If user don't put a description, he/she won't be able to submit the form:
 * if(!description) return; Remember: empty string is a falsy value.
 *

 */
