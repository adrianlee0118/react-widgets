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
  /* guard functions now re-written further below as HOCs
  if (isLoadingTodos) {
    return (
      <div>
        <p>Loading todos...</p>
      </div>
    );
  }

  if (!todos.length) {
    return (
      <div>
        <p>You have no Todos.</p>
      </div>
    );
  }*/
  return (
    <ol>
      {todos.map((todo) => (
        <TodoItem key={todo.id} thing={todo.thing} />
      ))}
    </ol>
  );
};

//Higher Order Component: Conditional rendering for no input case, return the function that creates conditional render
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

//Destructuring used to separate isLoadingTodos from other props, only pass others to render component because it doesn't need to account for isLoadingTodos
//isLoadingTodos is split out from the props and only used in the HOC
const withLoadingIndicator = (Component) => ({ isLoadingTodos, ...others }) =>
  isLoadingTodos ? (
    <div>
      <p>Loading todos...</p>
    </div>
  ) : (
    <Component {...others} />
  );

const withConditionalRenderings = compose(
  withLoadingIndicator,
  withTodosNull,
  withTodosEmpty
);

//TodoList component wrapped with all higher order components for conditional renderings
const TodoListWithConditionalRendering = withConditionalRenderings(TodoList);
//const TodoListWithNull = withTodosNull(TodoList);

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
