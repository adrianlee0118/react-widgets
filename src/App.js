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

const App = () => (
  <div>
    <TodoList todos={todaytodo} />
  </div>
);

const TodoList = ({ todos }) => {
  //Content loading guard
  if (isLoadingTodos) {
    return (
      <div>
        <p>Loading todos...</p>
      </div>
    );
  }

  //No input guard
  if (!todos) {
    return null;
  }

  //Input has no data guard
  if (!todos.length) {
    return (
      <div>
        <p>You have no Todos.</p>
      </div>
    );
  }
  return (
    <ol>
      {todos.map((todo) => (
        <TodoItem key={todo.id} thing={todo.thing} />
      ))}
    </ol>
  );
};

const TodoItem = ({ thing }) => {
  return <li>{thing}</li>;
};

export default App;
