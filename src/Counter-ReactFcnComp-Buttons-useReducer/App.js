import React, { useReducer } from "react";
import "./App.css";

const App = () => (
  <div>
    <Counter />
  </div>
);

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    case "RESET":
      return 0;
    default:
      throw new Error();
  }
};

//Notes:
//changed from useState to reducer--not technically necessary for primitive type or simple states
//dispatch actions replaces setter method because it changes state--all setters centralized now in reducer
const Counter = () => {
  //const [count, setCount] = useState(0);
  const [count, dispatch] = useReducer(counterReducer, 0);
  return (
    <div>
      <h1>Counter</h1>
      <div>
        <FcnBtn fcn={() => dispatch({ type: "INCREMENT" })} text="+" />
        <p>Count: {count}</p>
        <FcnBtn fcn={() => dispatch({ type: "DECREMENT" })} text="-" />
      </div>
      <br />
      <div>
        <FcnBtn fcn={() => dispatch({ type: "RESET" })} text="Reset" />
      </div>
    </div>
  );
};

const FcnBtn = ({ fcn, text }) => <button onClick={fcn}>{text}</button>;

export default App;
