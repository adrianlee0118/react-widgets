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
        <FcnBtn fcn={() => setCount(count + 1)} text="+" />
        <p>{count}</p>
        <FcnBtn fcn={() => setCount(count - 1)} text="-" />
      </div>
      <br />
      <div>
        <FcnBtn fcn={() => setCount(0)} text="Reset" />
      </div>
    </div>
  );
};

const FcnBtn = ({ fcn, text }) => <button onClick={fcn}>{text}</button>;

export default App;
