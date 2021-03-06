import React from "react";
import "./App.css";

const App = () => (
  <div>
    <SignUpDialog />
  </div>
);

const FancyBorder = (props) => (
  <div className={"FancyBorder FancyBorder-" + props.color}>
    {props.children}
  </div>
);

const Dialog = (props) => (
  <FancyBorder color="blue">
    <h1 className="Dialog-title">{props.title}</h1>
    <p className="Dialog-message">{props.message}</p>
    {props.children}
  </FancyBorder>
);

//Example of using containment composition with FancyBorder
const WelcomeDialog = () => (
  <FancyBorder color="blue">
    <h1 className="Dialog-title">Welcome</h1>
    <p className="Dialog-message">Thank you for visiting our spacecraft!</p>
  </FancyBorder>
);

//Example of using child components as props to populate multiple 'holes'
const SplitPane = (props) => (
  <div className="SplitPane">
    <div className="SplitPane-left">{props.left}</div>
    <div className="SplitPane-right">{props.right}</div>
  </div>
);

//Specialization example using Dialog and SignUpDialog on top of FancyBorder
class SignUpDialog extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
    this.state = { login: "" };
  }
  handleChange(event) {
    this.setState({ login: event.target.value });
  }
  handleSignUp() {
    alert(`Welcome aboard, ${this.state.login}!`);
  }
  render() {
    return (
      <Dialog
        title="Mars Exploration Program"
        message="How should we refer to you?"
      >
        <input value={this.state.login} onChange={this.handleChange} />
        <button onClick={this.handleSignUp}>Sign Me Up!</button>
      </Dialog>
    );
  }
}

export default App;
