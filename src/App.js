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

const withEither = (conditionFn, EitherComp) => (Comp) => (props) =>
  conditionFn(props) ? <EitherComp /> : <Comp {...props} />;
const NoTodosCondn = (props) => !props.todos.length;
const NoTodosComp = () => (
  <div>
    <p>You have no todos.</p>
  </div>
);
const withNoTodos = withEither(NoTodosCondn, NoTodosComp);
const NoDataCondn = (props) => !props.todos;
const NoDataComp = () => (
  <div>
    <p>Something went wrong...</p>
  </div>
);
const withNoData = withEither(NoDataCondn, NoDataComp);

const withConditionalRenderings = compose(withNoTodos, withNoData);

class TodoList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todos,
    };
  }
  render() {
    return (
      <ol>
        {this.state.todos.map((todo) => (
          <TodoItem key={todo.id} thing={todo.thing} />
        ))}
      </ol>
    );
  }
}

const EnhancedTodoList = withConditionalRenderings(TodoList);

const App = () => (
  <div>
    <EnhancedTodoList todos={todaytodo} />
  </div>
);

const TodoItem = ({ thing }) => {
  return <li>{thing}</li>;
};

export default App;
