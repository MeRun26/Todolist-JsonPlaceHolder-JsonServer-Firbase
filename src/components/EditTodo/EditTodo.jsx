import React, {  useState } from "react";
import style from './EditTodo.module.css'

const EditTodo = ({ handleEdit, editTodo, todo, id }) => {
    
    const [value, setValue] = useState(todo.name);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try { 
            await editTodo(id, value);
            handleEdit();
        }   
        catch (error){
            console.error('Ошибка при редактировании', error);
        }
    }

    const handleCancel = () => {
        setValue(todo.name);
        handleEdit();
    };

    return (
        <form onSubmit={handleSubmit}>    
            <div>
                <input
                    className={style.TodoName}
                    type='text'
                    id='name'
                    name={todo.name}
                    value={value}
                    onChange={(e)=>{setValue(e.target.value)}}
                />
                <button type='submit'>Сохранить</button>
                <button type='button' onClick={handleCancel}>Отмена</button>
            </div>
        </form>
    );
};

export default EditTodo;