import React from "react";
import "./App.css";

const App = () => (
  <div>
    <BlurExample />
  </div>
);

class BlurExample extends React.Component {
  constructor(props) {
    super(props);

    this.state = { isOpen: false };
    this.timeOutId = null;

    this.onClickHandler = this.onClickHandler.bind(this);
    this.onBlurHandler = this.onBlurHandler.bind(this);
    this.onFocusHandler = this.onFocusHandler.bind(this);
  }

  onClickHandler() {
    this.setState((currentState) => ({
      isOpen: !currentState.isOpen,
    }));
  }

  //Periodically ensure popover is closed.
  //Pass this function to onBlur to ensure that popovers for non-focused elements are always closed regardless of keyboard or mouse use.
  onBlurHandler() {
    this.timeOutId = setTimeout(() => {
      this.setState({
        isOpen: false,
      });
    });
  }

  //If a child receives focus, do not close the popover.
  onFocusHandler() {
    clearTimeout(this.timeOutId);
  }

  render() {
    return (
      <div onBlur={this.onBlurHandler} onFocus={this.onFocusHandler}>
        <button
          onClick={this.onClickHandler}
          aria-haspopup="true"
          aria-expanded={this.state.isOpen}
        >
          Select an option
        </button>
        {this.state.isOpen && (
          <ul>
            <li>Option 1</li>
            <li>Option 2</li>
            <li>Option 3</li>
          </ul>
        )}
      </div>
    );
  }
}

export default App;
