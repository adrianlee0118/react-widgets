import React from "react";
import "./App.css";

const App = () => (
  <div>
    <NameForm />
  </div>
);

class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }
  handleChange = (event) => {
    this.setState({ value: event.target.value });
  };
  handleSubmit = (event) => {
    alert("A name was submitted: " + this.state.value);
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={this.state.value}
            onChange={this.handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}

export default App;
