import { push, ref } from 'firebase/database';
import style from './AddTodo.module.css'
import { useState } from 'react';
import { db } from '../../firebase';

const AddToDo = ({  data }) => {
    const [inputValue, setInputValue] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        if (inputValue.trim() === '') {
            return;
        }

        const dbRef = ref(db, 'todos')

        push(dbRef, {
            name:inputValue
        }).then((response) => {
            console.log('Задание добавлена: ', response);
            setInputValue('');
        });
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
