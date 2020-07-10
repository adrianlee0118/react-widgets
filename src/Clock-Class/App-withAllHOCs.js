import React from "react";
import "./App.css";

//HOC for conditional render
const withEither = (conditionFn, EitherComp) => (Comp) => (props) =>
  conditionFn(props) ? <EitherComp /> : <Comp {...props} />;
const noDataCond = (props) => !props.date;
const noDataIndicator = () => (
  <div>
    <p>Couldn't find any data...</p>
  </div>
);

//HOC for adding state of a ticking timer inside Component, with the date passed to the Component
const withTimer = (Component) =>
  class withTimer extends React.Component {
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
      return <Component {...this.props} {...this.state} />;
    }
  };

//One instance of a base component to be modified by withTimer such that it receives a date prop
const Clock = ({ date }) => (
  <div>
    <h1>Hello, world!</h1>
    <h2>It is {date.toLocaleTimeString()}.</h2>
  </div>
);

//Wrap the base component in the HOCs, conditional render first, and render
const ClockWithConditionalRender = withEither(
  noDataCond,
  noDataIndicator
)(Clock);
const TickingClock = withTimer(ClockWithConditionalRender);
const App = () => (
  <div>
    <TickingClock />
  </div>
);

export default App;
