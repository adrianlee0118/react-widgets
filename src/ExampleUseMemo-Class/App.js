import React, { useState, useMemo } from "react";
import "./App.css";

const users = [
  { id: "a", name: "Robin" },
  { id: "b", name: "Dennis" },
];

const App = () => {
  const [text, setText] = useState("");
  const [search, setSearch] = useState("");

  const handleText = (event) => {
    setText(event.target.value);
  };

  const handleSearch = () => {
    setSearch(text);
  };

  //useMemo causes the function enclosed to run only when the second parameter changes
  //without useMemo, because filteredUsers is called in render, it will be called everytime the UI changes (i.e. each key stroke for
  //changing input) even though the change does not require filteredUsers to be re-calculated until submit is pressed
  const filteredUsers = useMemo(
    () =>
      users.filter((user) => {
        console.log("Filter function is running...");
        return user.name.toLowerCase().includes(search.toLowerCase());
      }),
    [search]
  );

  return (
    <div>
      <input type="text" value={text} onChange={handleText} />
      <button type="button" onClick={handleSearch}>
        Search
      </button>
      <List list={filteredUsers} />
    </div>
  );
};

const List = ({ list }) => (
  <ul>
    {list.map((item) => (
      <ListItem key={item.id} item={item} />
    ))}
  </ul>
);

const ListItem = ({ item }) => <li>{item.name}</li>;

export default App;
