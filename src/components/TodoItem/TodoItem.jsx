import { React,useState } from "react";
import style from './TodoItem.module.css'
import EditTodo from '../EditTodo/EditTodo'

const TodoItem = ({ editTodo, deleteTodo, todo, id }) => {
    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit((prevState)=>!prevState);
    };

    return (

    <>  
    {isEdit ? (
        <EditTodo todo={todo} id={id} handleEdit={handleEdit} editTodo={editTodo}  />
        ):(
            <ul className={style.TodoItem}>
                <li>
                    <div>
                    <h2 className={style.TodoH2}>{"Задание № - " + (Number(id) + 1)}</h2>
                        <h3 className={style.TodoH3}>{todo.name}</h3>
                        <button type='button' onClick={handleEdit}>Изменить задачу</button>
                        <button onClick={() => deleteTodo(todo.id)}>Удалить задачу</button>
                    </div>
                </li>
            </ul>
        )
    }   
    </>
    );
}

export default TodoItem;