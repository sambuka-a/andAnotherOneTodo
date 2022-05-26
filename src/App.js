import Header from "./components/Header";
import TodoList from "./features/todos/TodoList";
import NewTodo from "./features/todos/NewTodo";

function App() {
  return (
    <>
      <Header/>
      <NewTodo/>
      <TodoList/>
    </>
  );
}

export default App;
