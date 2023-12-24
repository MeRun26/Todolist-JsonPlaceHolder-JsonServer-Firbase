import style from './AddTodo.module.css'
import { useState } from 'react';

const AddToDo = ({ addMarker, setAddMarker, data }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            return;
        }

        const lastId = data.length > 0 ? data[data.length - 1].id : 0;
        const newId = Number(lastId) + 1;
        const lastnewId = String(newId);
        
        fetch('http://localhost:1326/todos', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json;charset=utf-8' },
            body: JSON.stringify({
                id: lastnewId,
                name: inputValue
            })
        }).then((rawResponse) => rawResponse.json())
        .then((response) => {
            console.log('Задание добавлена: ', response);
            setAddMarker(!addMarker);
            setInputValue('');
        });
        console.log(' data: ', data);
    };
    
    const handleCancel = () => {
        setInputValue('');
    };

    return (
        <div>
            <form className={style.AddTodoName} onSubmit={handleSubmit}>
                <input
                    name={data.id}
                    type="text"
                    value={inputValue}
                    onChange={({ target }) => setInputValue(target.value)}
                />
                <button type="submit">Добавить задачу</button>
                <button type='button' onClick={handleCancel}>Отменить</button>
            </form>
        </div>
    );
};

export default AddToDo;
