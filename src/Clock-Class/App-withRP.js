import React from "react";
import "./App.css";

//A wrapper class that provides a timer state to children components
class Timer extends React.Component {
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
    this.setState({ date: new Date() });
  }
  render() {
    return this.props.children(this.state);
  }
}

//One example of the wrapper Timer class used to render child components passed as a render prop function
const ClockRP = () => (
  <Timer>
    {({ date }) => {
      return (
        <div>
          <h1>Hello, world!</h1>
          <h2>It is {date.toLocaleTimeString()}.</h2>
        </div>
      );
    }}
  </Timer>
);

const App = () => (
  <div>
    <ClockRP />
  </div>
);

/* Class below replaced with render prop and function above
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
