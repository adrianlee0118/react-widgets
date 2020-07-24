import React from "react";
import "./components/Table/index.css";

/*
Create a simple table which contains the following three rows of data. You can find a Vue Table example online. Delete the non-essential feature such as CSS and filter:

```jsx
[{
    name: "Sammy Wen",
    email: "sammy@proto.cx",
    location: "Canada"
},
{
    name: "Brogdon Adaboug",
    email: "bbnn@example.com",
    location: "United States"
},
{
    name: "Sammy Sosa",
    email: "sammy@mlb.org",
    location: "United States"
}]
```
*/

const users = [
  {
    name: "Sammy Wen",
    email: "sammy@proto.cx",
    location: "Canada",
  },
  {
    name: "Brogdon Adaboug",
    email: "bbnn@example.com",
    location: "United States",
  },
  {
    name: "Sammy Sosa",
    email: "sammy@mlb.org",
    location: "United States",
  },
];

const Table = ({ data }) => (
  <div className="table">
    <div className="table-header">
      <span style={{ width: "20%" }}>Name</span>
      <span style={{ width: "60%" }}>Email</span>
      <span style={{ width: "20%" }}>Location</span>
    </div>
    <div className="table-body">
      {data.map((item) => (
        <div className="table-row">
          <span style={{ width: "20%" }}>{item.name}</span>
          <span style={{ width: "60%" }}>{item.email}</span>
          <span style={{ width: "20%" }}>{item.location}</span>
        </div>
      ))}
    </div>
  </div>
);

const App = () => <Table data={users} />;

export default App;
