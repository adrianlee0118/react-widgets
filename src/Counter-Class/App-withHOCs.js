import React from "react";
import "./App.css";

//HOC: adds clicker state/functionality to some Component
const withClicker = (Comp) =>
  class withClicker extends React.Component {
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
        <Comp
          {...this.props}
          count={this.state.count}
          OnAdd={this.OnAdd}
          OnSubtract={this.OnSubtract}
          OnReset={this.OnReset}
        />
      );
    }
  };

//Example base component that receives count state and functions as props and diaplays/assigns buttons
const Counter = ({ count, OnAdd, OnSubtract, OnReset }) => (
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

//Wrapping base component in HOC - note name of new component must be capitalized for React to read it
const CounterWithClick = withClicker(Counter);

const App = () => (
  <div>
    <CounterWithClick />
  </div>
);

export default App;
