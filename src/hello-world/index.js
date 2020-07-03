import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

const items = [
  {
    id: 1,
    name: "One",
  },
  {
    id: 2,
    name: "Two",
  },
];

ReactDOM.render(<App items={items} />, document.getElementById("root"));
