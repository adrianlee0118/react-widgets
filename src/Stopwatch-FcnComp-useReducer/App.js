import React, { useEffect, useReducer } from "react";

const App = () => (
  <div>
    <Stopwatch />
  </div>
);

const stopwatchReducer = (state, action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        isOn: true,
      };
    case "TICK":
      return {
        ...state,
        timer: state.timer + 1,
      };
    case "STOP":
      return {
        ...state,
        isOn: false,
      };
    case "RESET":
      return {
        ...state,
        isOn: false,
        timer: 0,
      };
    default:
      throw new Error();
  }
};

const Stopwatch = () => {
  /*  //ison and timer logic bundled into the reducer so that we can't have impossible states
  const [isOn, setIsOn] = useState(false);
  const [timer, setTimer] = useState(0);
  */
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
  }, [state.isOn]); //Only re-render if isOn changes

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

export default App;
