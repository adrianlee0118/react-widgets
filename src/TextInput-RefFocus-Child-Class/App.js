import React from "react";
import "./App.css";

const App = () => (
  <div>
    <Parent />
  </div>
);

const CustomTextInput = (
  props //3) Assign the ref passed from the parent to the input component
) => (
  <div>
    <input ref={props.inputRef} />
  </div>
);

class Parent extends React.Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef(); //1) create reference
  }
  //4) Refer to the child component's input component and focus whenever
  focus() {
    this.inputElement.current.focus();
  }
  render() {
    //2) Pass the reference to the child component
    return <CustomTextInput inputRef={this.inputElement} />;
  }
}

export default App;
