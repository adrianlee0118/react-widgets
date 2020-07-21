import React from "react";
import "./App.css";

const App = () => (
  <div>
    <FlavorForm />
  </div>
);

class FlavorForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "coconut",
    };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = (event) => {
    alert("Your favorite flavor is: " + this.state.value);
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick you favorite flavor:
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="grapefruit">Grapefruit</option>
            <option value="lime">Lime</option>
            <option value="coconut">Coconut</option>
            <option value="mango">Mango</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default App;
