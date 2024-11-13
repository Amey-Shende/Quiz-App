import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Routers from "./components/routes/Router";

function App() {

  const router = useRoutes(Routers);
  
  return (
    <div className="App">
      {router}
    </div>
  );
}

export default App;

// npx json-server --watch db.json --port 3001
