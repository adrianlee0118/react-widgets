import React from "react";

const INITIAL_LIST = [
  {
    id: "0",
    title: "React with RxJS for State Management Tutorial",
    url: "https://www.robinwieruch.de/react-rxjs-state-management-tutorial/",
  },
  {
    id: "1",
    title: "React with Apollo and GraphQL Tutorial",
    url: "https://www.robinwieruch.de/react-graphql-apollo-tutorial",
  },
];

const App = () => (
  <div>
    <List listinit={INITIAL_LIST} />
  </div>
);

class List extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.listinit,
    };
  }
  onRemoveItem = (id) => {
    this.setState({
      list: this.state.list.filter((item) => item.id !== id),
    });
  };
  render() {
    return (
      <ul>
        {this.state.list.map((item) => (
          <li key={item.id}>
            <a href={item.url}>{item.title}</a>
            <button type="button" onClick={() => this.onRemoveItem(item.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
