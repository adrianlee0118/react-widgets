import React from "react";

//HOC adds stopwatch state to some component
const withStopWatch = (Comp) =>
  class withStopWatch extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isOn: false,
        timer: 0,
      };
    }
    onStart = () => {
      this.setState({ isOn: true, timer: this.state.timer + 1 });
      this.timerID = setInterval(
        () => this.setState({ timer: this.state.timer + 1 }),
        1000
      );
    };
    onStop = () => {
      this.setState({ isOn: false });
      clearInterval(this.timerID);
    };
    onReset = () => {
      this.setState({ isOn: false, timer: 0 });
    };
    render() {
      return (
        <Comp
          timer={this.state.timer}
          isOn={this.state.isOn}
          onStart={this.onStart}
          onStop={this.onStop}
          onReset={this.onReset}
        />
      );
    }
  };

//The stopwatch ui component
const WatchUI = ({ timer, isOn, onStart, onStop, onReset }) => (
  <div>
    {timer}
    {!isOn && (
      <button type="button" onClick={onStart}>
        Start
      </button>
    )}
    {isOn && (
      <button type="button" onClick={onStop}>
        Stop
      </button>
    )}
    <button type="button" disabled={timer === 0} onClick={onReset}>
      Reset
    </button>
  </div>
);
const StopWatch = withStopWatch(WatchUI);

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
