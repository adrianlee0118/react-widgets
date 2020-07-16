import React, { useState, useEffect } from "react";
import "./App.css";

const App = () => (
  <div>
    <Clock />
  </div>
);

const Clock = () => {
  const [time, setTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, [time]);
  return (
    <div>
      <h1>Hello world!</h1>
      <h2>It is {time.toLocaleTimeString()}.</h2>
    </div>
  );
};

/*
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}*/

export default App;
