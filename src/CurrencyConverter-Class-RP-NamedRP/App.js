import React from "react";

//Without function wrapping, would need to lift state to App so that amount could be passed to Pound and Euro
//Render Prop function wrapping allows for children arrangement (within divs) to be flexible and for Pound and Euro to be separate from Amount, while amounts can be passed to the function to share state
//*The render prop function is a prop, and amount is passed from within Amount
const App = () => (
  <Amount
    render={(amount) => (
      <div>
        <h1>My Currency Converter</h1>
        <Pound amount={amount} />
        <Euro amount={amount} />
      </div>
    )}
  />
);

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;
const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;

class Amount extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amount: 0,
    };
  }

  onIncrement = () => {
    this.setState((state) => ({ amount: state.amount + 1 }));
  };

  onDecrement = () => {
    this.setState((state) => ({ amount: state.amount - 1 }));
  };

  //Note children() is a function that was passed as a prop--we pass the state.amount to that function so Pound and Euro, outside of Amount, can render!
  render() {
    return (
      <div>
        <span>US Dollar: {this.state.amount}</span>
        <button type="button" onClick={this.onIncrement}>
          +
        </button>
        <button type="button" onClick={this.onDecrement}>
          -
        </button>
        {this.props.render(this.state.amount)}
      </div>
    );
  }
}

export default App;
