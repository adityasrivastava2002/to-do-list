import React from 'react';

const TodoList = ({ todos, deleteTodo, editTodo }) => {
  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo._id}>
          {todo.name}
          <button onClick={() => deleteTodo(todo._id)}>Delete</button>
          <button onClick={() => editTodo(todo._id)}>Edit</button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
