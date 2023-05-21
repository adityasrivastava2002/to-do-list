import React, { useEffect, useState } from 'react';
import TodoForm from './TodoForm';
import TodoList from './TodoList';
import TodoSort from './TodoSort';

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const createTodo = async (todo) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: todo }),
      });
      const data = await response.json();
      setTodos([...todos, data]);
    } catch (error) {
      console.error('Error creating todo:', error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`/api/todo/${id}`, {
        method: 'DELETE',
      });
      setTodos(todos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const editTodo = async (id, newName) => {
    try {
      const response = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newName }),
      });
      const data = await response.json();
      const updatedTodos = todos.map((todo) => {
        if (todo._id === data._id) {
          return data;
        }
        return todo;
      });
      setTodos(updatedTodos);
    } catch (error) {
      console.error('Error updating todo:', error);
    }
  };

  const sortTodos = async (order) => {
    try {
      const response = await fetch(`/api/todo?sort=${order}`);
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error sorting todos:', error);
    }
  };

  return (
    <div>
      <h1>To-Do List</h1>
      <TodoForm createTodo={createTodo} />
      <TodoSort sortTodos={sortTodos} />
      <TodoList todos={todos} deleteTodo={deleteTodo} editTodo={editTodo} />
    </div>
  );
};

export default App;
