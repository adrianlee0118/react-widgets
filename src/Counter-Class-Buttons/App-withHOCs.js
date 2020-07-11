import React from "react";
import "./App.css";

const withClicker = (Comp) =>
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

const FcnButton = ({ fcn, text }) => <button onClick={fcn}>{text}</button>;

const Counter = ({ count, OnAdd, OnSubtract, OnReset }) => (
  <div>
    <h1>Counter</h1>
    <div>
      <FcnButton fcn={OnAdd} text="+" />
      <p>{count}</p>
      <FcnButton fcn={OnSubtract} text="-" />
    </div>
    <br />
    <div>
      <FcnButton fcn={OnReset} text="Reset" />
    </div>
  </div>
);
const CounterWithClicker = withClicker(Counter);

const App = () => (
  <div>
    <CounterWithClicker />
  </div>
);

export default App;
