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

// Shortcut to the emoji list Wid + .
function Logo() {
  return <h1>🛣️ Travel App 🏖️</h1>;
}

function Form() {
  return (
    <div className="add-form">
      <h3>What do you need for your trip? ✈️ </h3>
    </div>
  );
}

function PackingList() {
  return <div className="list">LIST</div>;
}

//<em> = enfasize
function Stats() {
  return (
    <footer className="stats">
      <em>🧳You have X items in your list and already packed x </em>
    </footer>
  );
}
