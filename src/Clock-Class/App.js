import React from "react";
import "./App.css";

const App = () => (
  <div>
    <Clock />
  </div>
);

//Notes:
//Constructor->Render->DidMount to set up timer
//Mount sets up timer
//Unmount clears resources for timer
//this.timerID has been added by coder--can add fields additional to this.props and this.state that don't participate directly in data flow
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      date: new Date(),
    };
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date(),
    });
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default App;
