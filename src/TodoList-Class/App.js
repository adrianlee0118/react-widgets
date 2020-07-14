//TodoList is a class demonstrating basic if statement guard techniques for condtiional rendering based on inputs
import React from "react";

const todaytodo = [
  {
    id: 1,
    thing: "Read",
  },
  {
    id: 2,
    thing: "Exercise",
  },
];

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      list: this.props.todos,
    };
  }
  render() {
    return (
      <ol>
        {this.state.list.map((todo) => (
          <TodoItem key={todo.id} thing={todo.thing} />
        ))}
      </ol>
    );
  }
}

const App = () => (
  <div>
    <TodoList todos={todaytodo} />
  </div>
);

const TodoItem = ({ thing }) => {
  return <li>{thing}</li>;
};

export default App;
