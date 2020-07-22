import React from "react";
import "./App.css";

const App = () => (
  <div>
    <Calculator />
  </div>
);

class Calculator extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { temperature: "" };
  }
  handleChange(event) {
    this.setState({ temperature: event.target.value });
  }
  render() {
    const temperature = this.state.temperature;
    return (
      <fieldset>
        <legend>Enter temperature in Celsius:</legend>
        <input value={temperature} onChange={this.handleChange} />
        <BoilingVerdict celsius={parseFloat(temperature)} />
      </fieldset>
    );
  }
}

const BoilingVerdict = ({ celsius }) =>
  celsius >= 100 ? (
    <p>The water would boil.</p>
  ) : (
    <p>The water would not boil.</p>
  );

export default App;
