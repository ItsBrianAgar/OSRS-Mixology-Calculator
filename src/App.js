import useDocumentMeta from "./hooks/useDocumentMeta";
import favicon from "./images/favicons/huasca.png";
import "./App.css";

function App() {
  useDocumentMeta("OSRS | Mixology Calculator", favicon);

  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
