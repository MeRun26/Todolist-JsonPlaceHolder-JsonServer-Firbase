import { React,useState } from "react";
import style from './TodoItem.module.css'
import EditTodo from '../EditTodo/EditTodo'

const TodoItem = ({ editTodo, deleteTodo, todo }) => {

    const [isEdit, setIsEdit] = useState(false);

    const handleEdit = () => {
        setIsEdit((prevState)=>!prevState);
    };

    const handleDelete = async () => {
        try {
            await deleteTodo(todo.id);
            handleEdit();
        } catch (error) {
            console.error('Ошибка при удалении задачи', error);
        }
    };

    return (

    <>  
    {isEdit ? (
        <EditTodo todo={todo} handleEdit={handleEdit} editTodo={editTodo}  />
        ):(
            <ul className={style.TodoItem}>
                <li>
                    <div>
                        <h2 className={style.TodoH2}>{"Задание № - "+ todo.id}</h2>
                        <h3 className={style.TodoH3}>{todo.name}</h3>
                        <button type='button' onClick={handleEdit}>Изменить задачу</button>
                        <button type='button' onClick={handleDelete}>Удалить задачу</button>
                        
                    </div>
                </li>
            </ul>
        )
    }   
    </>
    );
}

export default TodoItem;