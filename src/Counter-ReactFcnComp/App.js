import React, { useState } from "react";
import "./App.css";

const App = () => (
  <div>
    <Counter />
  </div>
);

//Notes:
//useState allows function component to have state
//Wrap onclick in arrow function to prevent excessive re-render
const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Counter</h1>
      <div>
        <button onClick={() => setCount(count + 1)}>+</button>
        <p>{count}</p>
        <button onClick={() => setCount(count - 1)}>-</button>
      </div>
      <br />
      <div>
        <button onClick={() => setCount(0)}>Reset</button>
      </div>
    </div>
  );
};

export default App;
