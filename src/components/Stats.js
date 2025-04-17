export default function Stats({ itemsProp }) {
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
