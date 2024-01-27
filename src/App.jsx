import { useState } from "react";
import "./App.css";

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    description: "",
    status: "",
  });
  const [filterStatus, setFilterStatus] = useState("all");

  const addTodo = () => {
    setTodos([...todos, newTodo]);
    setNewTodo({ name: "", description: "", status: "" });
  };

  const deleteTodo = (index) => {
    const updatedTodos = [...todos];
    updatedTodos.splice(index, 1);
    setTodos(updatedTodos);
  };

  const updateTodo = (index, updatedTodo) => {
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;
    setTodos(updatedTodos);
  };

  const handleStatusChange = (index, newStatus) => {
    const updatedTodo = { ...todos[index], status: newStatus };
    updateTodo(index, updatedTodo);
  };

  const filterTodos = () => {
    if (filterStatus === "all") {
      return todos;
    } else {
      return todos.filter((todo) => todo.status === filterStatus);
    }
  };

  return (
    <div className="todo-app">
      <h1>My Todo</h1>

      {/* Form to add new todo */}
      <div className="add-todo">
        <input
          type="text"
          placeholder="Task Name"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTodo.description}
          onChange={(e) =>
            setNewTodo({ ...newTodo, description: e.target.value })
          }
        />
        <button onClick={addTodo}>Add Todo</button>
      </div>

      {/* Filter dropdown */}
      <p className="filter-heading">My ToDos</p>
      <div className="filter">
        <label className="status-filter"> Status Filter:</label>
        <select onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="not completed">Not Completed</option>
        </select>
      </div>

      {/* Display todos in cards */}
      <div className="todo-list">
        {filterTodos().map((todo, index) => (
          <div className="todo-card" key={index}>
            <p>Name: {todo.name}</p>
            <p>Description: {todo.description}</p>
            <div className="filter-1">
              <label>Status </label>
              <select
                value={todo.status}
                onChange={(e) => handleStatusChange(index, e.target.value)}
              >
                <option value="completed">Completed</option>
                <option value="not completed">Not Completed</option>
              </select>
            </div>
            <div className="card-btn">
              <button
                className="edit-btn"
                onClick={() =>
                  updateTodo(index, {
                    ...todo,
                    name: prompt("Enter new task name", todo.name),
                  })
                }
              >
                Edit
              </button>
              <button className="delete-btn" onClick={() => deleteTodo(index)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoApp;
