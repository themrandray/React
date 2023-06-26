import React, { useState, useEffect } from 'react';
import TodoList from './TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://dummyjson.com/todos');
      const data = await response.json();
      const modifiedData = data.todos.map((todo) => ({ task: todo.todo, completed: todo.completed, id: todo.id }));
      setTodos(modifiedData);
    } catch (error) {
      console.error('Error fetching TODOs:', error);
    }
  };

  const handleAddTodo = (task) => {
    setTodos((prevTodos) => [
      { id: Date.now(), task, completed: false },
      ...prevTodos
    ]);
  };

  const handleToggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const handleDeleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="container">
      <h1 className="mt-4">Darāmo lietu saraksts</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const task = e.target.task.value;
          if (task.trim() !== '') {
            handleAddTodo(task);
            e.target.task.value = '';
          }
        }}
        className="mt-4"
      >
        <div className="input-group mb-3">
          <input type="text" name="task" className="form-control" placeholder="Enter a task" />
          <button className="btn btn-primary" type="submit">Add Task</button>
        </div>
      </form>
      <TodoList
        todos={todos}
        onToggleTodo={handleToggleTodo}
        onDeleteTodo={handleDeleteTodo}
      />
    </div>
  );
}

export default App;
