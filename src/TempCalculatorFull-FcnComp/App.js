import React, { useState } from "react";
import "./App.css";

const scaleNames = {
  c: "Celsius",
  f: "Fahrenheit",
};

const App = () => (
  <div>
    <Calculator />
  </div>
);

const Calculator = () => {
  const [temperature, setTemperature] = useState("");
  const [scale, setScale] = useState("c");
  const handleCelsiusChange = (temperature) => {
    setScale("c");
    setTemperature(temperature);
  };
  const handleFahrenheitChange = (temperature) => {
    setScale("f");
    setTemperature(temperature);
  };
  return (
    <div>
      <TemperatureInput
        scale="c"
        temperature={
          scale === "f" ? tryConvert(temperature, toCelsius) : temperature
        }
        onTemperatureChange={handleCelsiusChange}
      />
      <TemperatureInput
        scale="f"
        temperature={
          scale === "c" ? tryConvert(temperature, toFahrenheit) : temperature
        }
        onTemperatureChange={handleFahrenheitChange}
      />
      <BoilingVerdict
        celsius={parseFloat(
          scale === "f" ? tryConvert(temperature, toCelsius) : temperature
        )}
      />
    </div>
  );
};

const TemperatureInput = ({ scale, temperature, onTemperatureChange }) => {
  const handleChange = (event) => {
    onTemperatureChange(event.target.value);
  };
  return (
    <fieldset>
      <legend>Enter temperature in {scaleNames[scale]}:</legend>
      <input value={temperature} onChange={handleChange} />
    </fieldset>
  );
};

const toCelsius = (fahrenheit) => {
  return ((fahrenheit - 32) * 5) / 9;
};

const toFahrenheit = (celsius) => {
  return (celsius * 9) / 5 + 32;
};

const tryConvert = (temperature, convert) => {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return "";
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
};

const BoilingVerdict = ({ celsius }) =>
  celsius >= 100 ? (
    <p>The water would boil.</p>
  ) : (
    <p>The water would not boil.</p>
  );

export default App;
