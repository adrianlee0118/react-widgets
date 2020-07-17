//NEXT: tictactoe mods, then userReducer with all FcnComps then Invoice Editor w/o material-ui : class, fcncomp, usereducer hooks, react-redux
//Using React's MEMO API to optimize render by preventing default unnecessary re-renders of components that haven't changed
import React, { memo, useReducer } from "react";
import { v4 as uuidv4 } from "uuid"; //generates id keys

const userListReducer = (state, action) => {
  switch (action.type) {
    case "HANDLE_TEXT":
      return {
        ...state,
        text: action.text,
      };
    case "HANDLE_ADD_USER":
      return {
        ...state,
        users: [...state.users, { id: uuidv4(), name: action.name }],
      };
    case "HANDLE_REMOVE":
      return {
        ...state,
        users: state.users.filter((user) => user.id !== action.id),
      };
    default:
      throw new Error();
  }
};

const UserList = () => {
  console.log("Render: UserList");
  /*     state hooks replaced by reducer hook
  const [users, setUsers] = useState([
    { id: "a", name: "Robin" },
    { id: "b", name: "Dennis" },
  ]);
  const [text, setText] = useState("");
  */
  const [state, dispatch] = useReducer(userListReducer, {
    users: [
      { id: "a", name: "Robin" },
      { id: "b", name: "Dennis" },
    ],
    text: "",
  });

  const handleText = (event) => {
    //setText(event.target.value);
    dispatch({ type: "HANDLE_TEXT", text: event.target.value });
  };

  const handleAddUser = () => {
    //setUsers(users.concat({ id: uuidv4(), name: text }));
    //setUsers([...users, { id: uuidv4(), name: text }]);
    dispatch({ type: "HANDLE_ADD_USER", name: state.text });
  };

  const handleRemove = (id) => {
    //setUsers(users.filter((user) => user.id !== id));
    dispatch({ type: "HANDLE_REMOVE", id: id });
  };

  return (
    <div>
      <input type="text" value={state.text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>
      <List list={state.users} onRemove={handleRemove} />
    </div>
  );
};

/*  Class replaced by Function component above
class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [
        { id: "a", name: "Robin" },
        { id: "b", name: "Dennis" },
      ],
      text: "",
    };
  }
  handleText = (event) => {
    this.setState({ text: event.target.value });
  };
  handleAddUser = () => {
    this.setState({
      users: [...this.state.users, { id: uuidv4(), name: this.state.text }],
    });
  };
  handleRemove = (id) => {
    this.setState({
      users: this.state.users.filter((user) => user.id !== id),
    });
  };
  render() {
    return (
      <div>
        <input type="text" value={this.state.text} onChange={this.handleText} />
        <button type="button" onClick={this.handleAddUser}>
          Add User
        </button>
        <List list={this.state.users} onRemove={this.handleRemove} />
      </div>
    );
  }
}
*/

//React memo prevents List from re-rendering when the input field's contents are changed
//Only UserList will re-render, not the List component
const List = memo(({ list, onRemove }) => {
  console.log("Render: List");
  return (
    <ul>
      {list.map((item) => (
        <ListItem key={item.id} item={item} onRemove={onRemove} />
      ))}
    </ul>
  );
});

//React memo again prevents ListItems from re-rendering if unnecessary by i.e. simply changing content of input field
//When characters are added to input field, only the App component re-renders, not List and ListItems
const ListItem = memo(({ item, onRemove }) => {
  console.log("Render: ListItem");
  return (
    <li>
      {item.name}
      <button type="button" onClick={() => onRemove(item.id)}>
        Remove
      </button>
    </li>
  );
});

const App = () => (
  <div>
    <UserList />
  </div>
);

export default App;
