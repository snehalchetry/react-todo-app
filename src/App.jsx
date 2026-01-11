import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) setTodos(storedTodos);
  }, []);

  // Save todos to localStorage
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!todo.trim()) return;

    setTodos([
      ...todos,
      { id: Date.now(), text: todo, completed: false },
    ]);
    setTodo("");
  };

  const toggleTodo = (id) => {
    setTodos(
      todos.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((item) => item.id !== id));
  };

  return (
    <div className="container">
      <h1>Todo App</h1>

      <div className="input-box">
        <input
          type="text"
          placeholder="Add a new task..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTodo()}
        />
        <button onClick={addTodo}>Add</button>
      </div>

      <ul className="todo-list">
        {todos.length === 0 && <p>No tasks yet 🚀</p>}

        {todos.map((item) => (
          <li key={item.id} className={item.completed ? "done" : ""}>
            <span onClick={() => toggleTodo(item.id)}>
              {item.text}
            </span>
            <button onClick={() => deleteTodo(item.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
