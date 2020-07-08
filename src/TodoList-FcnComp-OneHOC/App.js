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

const TodoList = ({ todos, isLoadingTodos }) => {
  //Content loading guard
  if (isLoadingTodos) {
    return (
      <div>
        <p>Loading todos...</p>
      </div>
    );
  }

  /* No input guard, replaced by Higher Order Component below withTodosNull
  if (!todos) {
    return null;
  }
  */

  //Guard if input has no data
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

//Higher Order Component: Conditional rendering for no input case, return the function that creates conditional render
//props are passed down to the component that ends up being rendered
const withTodosNull = (Component) => (props) =>
  !props.todos ? null : <Component {...props} />;
/* //replaced by above
const withTodosNull = (Component) => {
  return (props) => {
    return !props.todos ? null : <Component {...props} />;
  };
};*/

//TodoList component wrapped with higher order function withTodosNull that adds conditional rendering for null data
const TodoListWithNull = withTodosNull(TodoList);

const App = () => (
  <div>
    <TodoListWithNull todos={todaytodo} isLoadingTodos={false} />
  </div>
);
/* replaced by above using TodoList wrapped with higher order function
const App = () => (
  <div>
    <TodoList todos={todaytodo} />
  </div>
);*/

const TodoItem = ({ thing }) => {
  return <li>{thing}</li>;
};

export default App;
