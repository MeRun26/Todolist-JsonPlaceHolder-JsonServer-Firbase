import { React } from "react";
import TodoItem from "../TodoItem/TodoItem";
import style from './TodoList.module.css';
import AddTodo from '../AddTodo/AddTodo';

const TodoList = ({ addMarker, setAddMarker, deleteTodo, editTodo, data, ...props}) => {
    return (
        <div className={style.TodoList}>
            <h1>Todolist На Новый Год!!!</h1>
            <AddTodo {...props} addMarker={addMarker} setAddMarker={setAddMarker} data={data}  />
            {data.map((todo)=>(
                    <TodoItem key={todo.id} todo={todo} editTodo={editTodo} deleteTodo={deleteTodo} />
            ))}
        </div>
    );
}

export default TodoList;