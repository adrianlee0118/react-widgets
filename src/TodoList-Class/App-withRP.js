//NEXT: RENDER PROPS then tictactoe mods, then userReducer with all FcnComps then Invoice Editor w/o material-ui : class, fcncomp, usereducer hooks, react-redux
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

//State of TodoList
class WithTodoListState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: this.props.todos,
    };
  }
  render() {
    return this.props.children(this.state);
  }
}

//Rendering of TodoList
const TodoListRP = () => {
  return (
    <WithTodoListState todos={todaytodo}>
      {({ todos }) => {
        return (
          <ol>
            {todos.map((todo) => (
              <TodoItem key={todo.id} thing={todo.thing} />
            ))}
          </ol>
        );
      }}
    </WithTodoListState>
  );
};

const App = () => (
  <div>
    <TodoListRP />
  </div>
);

const TodoItem = ({ thing }) => {
  return <li>{thing}</li>;
};

export default App;
