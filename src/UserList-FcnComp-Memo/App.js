//NEXT: tictactoe mods, then userReducer with all FcnComps then Invoice Editor w/o material-ui : class, fcncomp, usereducer hooks, react-redux
//Using React's MEMO API to optimize render by preventing default unnecessary re-renders of components that haven't changed
import React, { useState, memo } from "react";
import { v4 as uuidv4 } from "uuid";

const UserList = () => {
  console.log("Render: App");
  const [users, setUsers] = useState([
    { id: "a", name: "Robin" },
    { id: "b", name: "Dennis" },
  ]);
  const [text, setText] = useState("");
  const handleText = (event) => {
    setText(event.target.value);
  };
  const handleAddUser = () => {
    setUsers(users.concat({ id: uuidv4(), name: text }));
  };
  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleAddUser}>
        Add User
      </button>
      <List list={users} />
    </div>
  );
};

//React memo prevents List from re-rendering when the input field's contents are changed
//Only UserList will re-render, not the List component
const List = memo(({ list }) => {
  console.log("Render: List");
  return (
    <ul>
      {list.map((item) => {
        <ListItem key={item.id} item={item} />;
      })}
    </ul>
  );
});

//React memo again prevents ListItems from re-rendering if unnecessary by i.e. simply changing content of input field
//When characters are added to input field, only the App component re-renders, not List and ListItems
const ListItem = memo(({ item }) => {
  console.log("Render: ListItem");
  return <li>{item.name}</li>;
});

const App = () => (
  <div>
    <UserList />
  </div>
);

export default App;
