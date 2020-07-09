import React from "react";

//Pass two functions as props, called from within Amount class
const App = () => <CurrenciesWithAmount />;

//HOC: withAmount accepts an array of currency components and outputs currency converter with each of the array elements listed
//Composition not as flexible as RP solution because have to add components in Amount
const withAmount = (currencyComponents) =>
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
          {currencyComponents.map((CurrencyComponent) => (
            <CurrencyComponent amount={this.state.amount} />
          ))}
        </div>
      );
    }
  };

const Euro = ({ amount }) => <p>Euro: {amount * 0.86}</p>;
const Pound = ({ amount }) => <p>Pound: {amount * 0.76}</p>;
const CurrenciesWithAmount = withAmount([Euro, Pound]);

export default App;
