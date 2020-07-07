import React, { useEffect, useReducer } from "react";
import "./App.css";

const App = () => (
  <div>
    <Clock />
  </div>
);

const clockReducer = (state, action) => {
  switch (action.type) {
    case "NEW_TIME":
      return new Date();
    default:
      throw new Error();
  }
};

//Notes:
//Use React hooks useState to simulate state, and useEffect to simulate didMount lifecycle methods in a function component
const Clock = () => {
  //const [time, setTime] = useState(new Date());
  const [time, dispatch] = useReducer(clockReducer, new Date());
  useEffect(() => {
    const interval = setInterval(() => dispatch({ type: "NEW_TIME" }), 1000);
    return () => clearInterval(interval); //cleanup function
  }, [time]);

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {time.toLocaleTimeString()}.</h2>
    </div>
  );
};

export default App;
