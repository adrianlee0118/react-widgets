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

const CounterRP = () => (
  <Clicker>
    {({ count }, OnAdd, OnSubtract, OnReset) => {
      return (
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
    }}
  </Clicker>
);

const FcnButton = ({ fcn, text }) => <button onClick={fcn}>{text}</button>;

const App = () => (
  <div>
    <CounterRP />
  </div>
);

export default App;
