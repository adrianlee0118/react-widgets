//TodoList is a class demonstrating basic if statement guard techniques for condtiional rendering based on inputs
import React from "react";
import { compose } from "recompose";

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
  return (
    <ol>
      {todos.map((todo) => (
        <TodoItem key={todo.id} thing={todo.thing} />
      ))}
    </ol>
  );
};

//Higher Order Components for conditional renderings
const withTodosNull = (Component) => (props) =>
  !props.todos ? null : <Component {...props} />;

const withTodosEmpty = (Component) => (props) =>
  !props.todos.length ? (
    <div>
      <p>You have no Todos.</p>
    </div>
  ) : (
    <Component {...props} />
  );

const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  isLoadingTodos ? (
    <div>
      <p>Loading todos...</p>
    </div>
  ) : (
    <Component {...others} />
  );

//Composing all HOCs together and wrapping component
const withConditionalRenderings = compose(
  withLoadingIndicator,
  withTodosNull,
  withTodosEmpty
);

const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);

const App = () => (
  <div>
    <TodoListWithConditionalRendering
      todos={todaytodo}
      isLoadingTodos={false}
    />
  </div>
);

const TodoItem = ({ thing }) => {
  return <li>{thing}</li>;
};

export default App;
