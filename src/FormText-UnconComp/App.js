import React from "react";
import "./App.css";

//Usually use controlled component (input stores the state) but sometimes we want something quick and so here the DOM handles state
//and we use a ref rather than value state to access input value
class NameForm extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.input = React.createRef();
  }

  handleSubmit(event) {
    alert("A name was submitted: " + this.input.current.value);
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" ref={this.input} />
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

const App = () => {
  <NameForm />;
};

export default App;
