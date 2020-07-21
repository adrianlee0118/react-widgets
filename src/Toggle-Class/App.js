import React from "react";
import "./App.css";

const App = () => (
  <div>
    <Toggle />
  </div>
);

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

export default App;
