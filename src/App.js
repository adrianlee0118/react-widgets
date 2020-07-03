import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => (
  <div>
    <Clock />
  </div>
);

//Notes:
//Use React hooks useState to simulate state, and useEffect to simulate didMount lifecycle methods in a function component
const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const tick = () => setTime(new Date());
    setInterval(tick, 1000);
  });

  return (
    <div>
      <h1>Hello, world!</h1>
      <h2>It is {time.toLocaleTimeString()}.</h2>
    </div>
  );
};

export default App;
