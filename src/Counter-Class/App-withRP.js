import React from "react";
import "./App.css";

class Clicker extends React.Component {
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
    return this.props.children(
      this.state,
      this.OnAdd,
      this.OnSubtract,
      this.OnReset
    );
  }
}

//Counter render prop function uses state provided by Clicker wrapper class
//State variables passed within curly braces, functions passed inside bracket
const CounterRP = () => (
  <Clicker>
    {({ count }, OnAdd, OnSubtract, OnReset) => {
      return (
        <div>
          <h1>Counter</h1>
          <div>
            <button onClick={OnAdd}>+</button>
            <p>{count}</p>
            <button onClick={OnSubtract}>-</button>
          </div>
          <br />
          <div>
            <button onClick={OnReset}>Reset</button>
          </div>
        </div>
      );
    }}
  </Clicker>
);

const App = () => (
  <div>
    <CounterRP />
  </div>
);

export default App;
