import { useEffect } from "react";
import favicon from "./images/favicons/huasca.png";
import "./App.css";

function App() {
  useEffect(() => {
    // Update page favicon
    const link = document.querySelector("link[rel~='icon']");
    if (link) {
      link.href = favicon;
    } else {
      const newLink = document.createElement("link");
      newLink.rel = "icon";
      newLink.href = favicon;
      document.head.appendChild(newLink);
    }
    // Update page title
    document.title = "OSRS | Mixology Calculator";
  }, []);
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
