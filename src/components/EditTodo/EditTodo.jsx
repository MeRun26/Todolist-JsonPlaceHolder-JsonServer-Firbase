import React, { useEffect, useState } from "react";
import style from './EditTodo.module.css'

const EditTodo = ({ handleEdit, editTodo, todo }) => {
    
    const [value, setValue] = useState(todo);

    const handleChange = (event) => {
        const { name, value } = event.target;

        setValue((prevState) => 
        ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try { 
            await editTodo(todo.id, value);
            handleEdit();
        }   
        catch (error){
            console.error('Ошибка при редактировании', error);
        }
    }

    useEffect(() => {}, [value]);  
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
                    name='name'
                    value={value.name}
                    onChange={handleChange}
                />
                <button type='submit'>Сохранить изменения</button>
                <button type='button' onClick={handleCancel}>Отменить изменения</button>
            </div>
        </form>
    );
};

export default EditTodo;