import React, { useReducer } from "react";

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

const listReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.id);
    default:
      throw new Error();
  }
};

const List = ({ listinit }) => {
  //const [list, setList] = useState(listinit);
  const [list, dispatch] = useReducer(listReducer, INITIAL_LIST); //Use reducer to manage state, but establish initial state in the component
  const onRemoveItem = (id) => {
    //const newList = list.filter((item) => item.id !== id);
    //setList(newList);
    dispatch({ type: "REMOVE_ITEM", id: id });
  };
  return (
    <ul>
      {list.map((item) => (
        <li key={item.id}>
          <a href={item.url}>{item.title}</a>
          <button type="button" onClick={() => onRemoveItem(item.id)}>
            Remove
          </button>
        </li>
      ))}
    </ul>
  );
};

/*
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
*/

export default App;
