import { React } from "react";
import TodoItem from "../TodoItem/TodoItem";
import style from './TodoList.module.css';
import AddTodo from '../AddTodo/AddTodo';

const TodoList = ({ deleteTodo, editTodo, data }) => {
    return (
        <div className={style.TodoList}>
            <h1>Todolist На Новый Год!!!</h1>
            <AddTodo data={data}  />
            {Object.entries(data)?.map(([id, todo])=>(
                    <TodoItem key={id} todo={todo} id={id} editTodo={editTodo} deleteTodo={deleteTodo} />
            ))}
        </div>
    );
}

export default TodoList;