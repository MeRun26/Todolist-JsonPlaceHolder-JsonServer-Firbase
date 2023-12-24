import { useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";
import style from './TodoPage.module.css'
import useDebounce from "../../hooks/useDebounce";
import { ref, set, onValue, remove } from "firebase/database";
import { db } from "../../firebase";

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [originalTodos, setOriginalTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [sortOrder, setSortOrder] = useState('asc');

    const debounceValue = useDebounce(search);

    const sortTodos = () => {
        let sortedTodos = [...todos];
        
        if (sortOrder === 'asc') {
            sortedTodos.sort((a, b) => a.name.localeCompare(b.name));
            setSortOrder('desc');
        } else {
            sortedTodos.sort((a, b) => b.name.localeCompare(a.name));
            setSortOrder('asc');
        }
        setTodos(sortedTodos);
    };
    const editTodo = async( id, payload ) => {
        const dbRef = ref(db, `todos/${id}`)
        set(dbRef, {
            name: payload
        })
    }
    const deleteTodo = (id) => {
        const dbRef = ref(db, `todos/${id}`);
        remove(dbRef).catch((error)=>{
            console.error('Ошибка при удалении задачи', error);
        });
    };

    useEffect(() => {
        const dbRef = ref(db, 'todos');
    
        return onValue(dbRef, (snapshot)=>{
            const data = snapshot.val() || {};
            const todosArray = Object.entries(data).map(([id, todo]) => ({ id, ...todo }));
            setTodos(todosArray);
            setOriginalTodos(todosArray);
            setIsLoading(false);
        });
    
    }, []);

    useEffect(() => {
        if (debounceValue.length === 0) {
            setTodos(originalTodos);
        } else {
            const filteredTodos = originalTodos.filter(todo =>
                todo.name.toLowerCase().includes(debounceValue.toLowerCase())
            );
            setTodos(filteredTodos);
        }
    }, [debounceValue, originalTodos]);

    return (
        <div className={style.TodoPage}>
            <input placeholder="Поиск заданий..." value={search} onChange={(e)=>setSearch(e.target.value)}/>
            {isLoading ? (<h1>ЗАГРУЗКА...</h1>) : (
                <>
                    <button onClick={sortTodos}>Отсортировать по Алфавиту</button>
                    <TodoList data={todos} deleteTodo={deleteTodo} editTodo={editTodo}/>
                </>
            )}
        </div>
    );
};

export default TodoPage;
