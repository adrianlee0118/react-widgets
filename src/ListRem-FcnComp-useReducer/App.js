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
    <List />
  </div>
);

const listReducer = (state, action) => {
  switch (action.type) {
    case "REMOVE_ITEM":
      return state.filter((item) => item.id !== action.id); //filter state directly because the state is the list--if state is many components, we would call .componentname to state
    default:
      throw new Error();
  }
};

const List = () => {
  //const [list, setList] = useState(INITIAL_LIST);
  const [list, dispatch] = useReducer(listReducer, INITIAL_LIST);
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

export default App;
