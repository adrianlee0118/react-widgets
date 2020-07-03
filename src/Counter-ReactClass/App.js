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
          <button onClick={this.OnAdd}>+</button>
          <p>{this.state.count}</p>
          <button onClick={this.OnSubtract}>-</button>
        </div>
        <br />
        <div>
          <button onClick={this.OnReset}>Reset</button>
        </div>
      </div>
    );
  }
}

export default App;
