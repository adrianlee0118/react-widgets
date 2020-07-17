import React, { useEffect, useReducer } from "react";

const stopwatchReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return { ...state, isOn: true };
    case "TICK":
      return { ...state, timer: state.timer + 1 };
    case "STOP":
      return { ...state, isOn: false };
    case "RESET":
      return { ...state, isOn: false, timer: 0 };
    default:
      throw new Error();
  }
};

const StopWatch = () => {
  //const [isOn, setIsOn] = useState(false);
  //const [timer, setTimer] = useState(0);
  const [state, dispatch] = useReducer(stopwatchReducer, {
    isOn: false,
    timer: 0,
  });

  useEffect(() => {
    let interval;
    if (state.isOn) {
      interval = setInterval(() => dispatch({ type: "TICK" }), 1000);
    }
    return () => clearInterval(interval);
  }, [state.isOn]); //useEffect gets toggled by toggling the isOn variable

  /*const onReset = () => {
    setIsOn(false);
    setTimer(0);
  };*/

  return (
    <div>
      {state.timer}
      {!state.isOn && (
        <button type="button" onClick={() => dispatch({ type: "START" })}>
          Start
        </button>
      )}
      {state.isOn && (
        <button type="button" onClick={() => dispatch({ type: "STOP" })}>
          Stop
        </button>
      )}
      <button
        type="button"
        disabled={state.timer === 0}
        onClick={() => dispatch({ type: "RESET" })}
      >
        Reset
      </button>
    </div>
  );
};

/*   class replaced by function component above
class StopWatch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOn: false,
      timer: 0,
    };
  }
  start = () => {
    this.setState({ isOn: true, timer: this.state.timer + 1 });
    this.timerID = setInterval(
      () => this.setState({ timer: this.state.timer + 1 }),
      1000
    );
  };
  stop = () => {
    this.setState({ isOn: false });
    clearInterval(this.timerID);
  };
  reset = () => {
    if (this.state.isOn) this.stop();
    this.setState({ timer: 0 });
  };
  render() {
    return (
      <div>
        {this.state.timer}
        {!this.state.isOn && (
          <button type="button" onClick={this.start}>
            Start
          </button>
        )}
        {this.state.isOn && (
          <button type="button" onClick={this.stop}>
            Stop
          </button>
        )}
        <button
          type="button"
          disabled={this.state.timer === 0}
          onClick={this.reset}
        >
          Reset
        </button>
      </div>
    );
  }
}
*/

const App = () => (
  <div>
    <StopWatch />
  </div>
);

export default App;
