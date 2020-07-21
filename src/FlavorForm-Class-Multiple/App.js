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
      values: [],
    };
  }
  handleChange = (event) => {
    /*
    var options = event.target.options;
    var value = [];
    for (var i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    this.setState({
      values: value
    });
    */
    this.setState({
      values: Array.from(event.target.selectedOptions, (item) => item.value),
    });
  };
  handleSubmit = (event) => {
    alert("Your favorite flavor is: " + this.state.values);
    event.preventDefault();
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Pick you favorite flavor:
          <select
            multiple={true}
            value={this.state.values}
            onChange={this.handleChange}
          >
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
