import React from "react";

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

const App = () => (
  <div>
    <StopWatch />
  </div>
);

/* Function Component with Hooks replaced by class above
const Stopwatch = () => {
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    let interval;
    if (isOn) {
      interval = setInterval(() => setTimer((timer) => timer + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isOn]); //Only re-render if isOn changes

  const onReset = () => {
    setIsOn(false);
    setTimer(0);
  };

  return (
    <div>
      {timer}
      {!isOn && (
        <button type="button" onClick={() => setIsOn(true)}>
          Start
        </button>
      )}
      {isOn && (
        <button type="button" onClick={() => setIsOn(false)}>
          Stop
        </button>
      )}
      <button type="button" disabled={timer === 0} onClick={onReset}>
        Reset
      </button>
    </div>
  );
};
*/

export default App;
