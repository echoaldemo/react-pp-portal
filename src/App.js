import React from "react";
import { Routes } from "./router";
import { StateProvider } from "contexts/ManageComponent";
function App() {
  return (
    <div>
      <StateProvider>
        <Routes />
      </StateProvider>
    </div>
  );
}

export default App;
