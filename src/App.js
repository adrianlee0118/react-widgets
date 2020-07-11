import React, { useState } from "react";
import "./App.css";

const App = () => (
  <div>
    <Counter />
  </div>
);

class Counter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      count: 0,
    };
  }
  OnAdd = () => {
    this.setState({ count: this.state.count + 1 });
  };
  OnSubtract = () => {
    this.setState({ count: this.state.count - 1 });
  };
  OnReset = () => {
    this.setState({ count: 0 });
  };
  render() {
    return (
      <div>
        <h1>Counter</h1>
        <div>
          <FcnButton fcn={this.OnAdd} text="+" />
          <p>{this.state.count}</p>
          <FcnButton fcn={this.OnSubtract} text="-" />
        </div>
        <br />
        <div>
          <FcnButton fcn={this.OnReset} text="Reset" />
        </div>
      </div>
    );
  }
}

const FcnButton = ({ fcn, text }) => <button onClick={fcn}>{text}</button>;

export default App;
