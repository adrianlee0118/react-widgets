//NEXT: tictactoe mods, then userReducer with all FcnComps then Invoice Editor w/o material-ui : class, fcncomp, usereducer hooks, react-redux
//Using React's MEMO API to optimize render by preventing default unnecessary re-renders of components that haven't changed
import React, { memo } from "react";
import { v4 as uuidv4 } from "uuid";

//HOC container component for adding state to some UI component 'Comp'
const withUserList = (Comp) =>
  class withUserList extends React.Component {
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
        <Comp
          users={this.state.users}
          text={this.state.text}
          handleText={this.handleText}
          handleAddUser={this.handleAddUser}
          handleRemove={this.handleRemove}
        />
      );
    }
  };

//UserList display (UI) component
const UserListUI = ({
  users,
  text,
  handleText,
  handleAddUser,
  handleRemove,
}) => (
  <div>
    <input type="text" value={text} onChange={handleText} />
    <button type="button" onClick={handleAddUser}>
      Add User
    </button>
    <List list={users} onRemove={handleRemove} />
  </div>
);

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
const UserList = withUserList(UserListUI);

const App = () => (
  <div>
    <UserList />
  </div>
);

export default App;
