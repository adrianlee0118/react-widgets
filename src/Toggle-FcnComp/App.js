import React, { useState } from "react";
import "./App.css";

const App = () => (
  <div>
    <Toggle />
  </div>
);

const Toggle = () => {
  const [isToggleOn, setIsToggleOn] = useState(true);
  return (
    <button onClick={() => setIsToggleOn(!isToggleOn)}>
      {isToggleOn ? "ON" : "OFF"}
    </button>
  );
};

/*
class Toggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isToggleOn: true };
  }
  handleClick = () => {
    this.setState({ isToggleOn: !this.state.isToggleOn });
  };
  render() {
    return (
      <button onClick={this.handleClick}>
        {this.state.isToggleOn ? "ON" : "OFF"}
      </button>
    );
  }
}
*/

export default App;
