import style from "./TodoPage.module.css";
import React, { useEffect, useState } from 'react';

const TodoPage = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((response) => response.json())
      .then((data) => {
        const limitedTodos = data.slice(0, 20);
        setTodos(limitedTodos);
      });
  }, []);

  return (
    <div className={style.todoListContainer}>
      <h1>Todo List</h1>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default TodoPage;