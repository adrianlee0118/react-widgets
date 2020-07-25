import React from "react";
import "./App.css";

const App = () => (
  <div>
    <CustomTextInput />
  </div>
);

class CustomTextInput extends React.Component {
  constructor(props) {
    super(props);
    this.textInput = React.createRef(); //1) create reference
  }
  //3) Focus on the input box whenever you want
  focus() {
    this.textInput.current.focus();
  }
  render() {
    //2) Assign the reference with ref
    return <input type="text" ref={this.textInput} />;
  }
}

export default App;
