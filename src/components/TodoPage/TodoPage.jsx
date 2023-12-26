import { React, useEffect, useState } from "react";
import TodoList from "../TodoList/TodoList";
import style from './TodoPage.module.css'
import useDebounce from "../../hooks/useDebounce";

const TodoPage = () => {
    const [todos, setTodos] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [addMarker, setAddMarker] = useState(false);

    const debounceValue = useDebounce(search,2000);

    const loadTodo = async () => {
        try{
            const response = await fetch(`http://localhost:1326/todos?q=${debounceValue}`);
            const data = await response.json();
            setTodos(data);
            setIsLoading(false);
        }
        catch(error){}
    };
    let sortedTodos = [];

    // const sortTodosAlphabet = () => {
    // sortedTodos = [...todos].sort((a, b) => {
    //     const nameA = a.name.toLowerCase();
    //     const nameB = b.name.toLowerCase();
    //     if (nameA < nameB) {
    //         return -1;
    //     }
    //     if (nameA > nameB) {
    //         return 1;
    //     }
    //     return 0;
    // });
    //     setTodos(sortedTodos);
    // };

    const sortTodosAlphabet = () => {
        sortedTodos = todos
            .slice()
            .sort((a,b) => (a.name < b.name ? 1 : -1));
            setTodos(sortedTodos);
    }

    const deleteTodo = (id) => {
		fetch(`http://localhost:1326/todos/${id}`, {
			method: 'DELETE',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
		})
			.then((rawResponse) => rawResponse.json())
			.then((response) => {
				setTodos(
					todos.filter((todo, index, array) => {
						return todo.id !== id;
					}),
				);
			});
	};  

    const editTodo = async( id, payload ) => {
        const response = await fetch(`http://localhost:1326/todos/${id}`,{
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json;charset=utf-8', },
            body: JSON.stringify({ ...payload}),
            });
        const updateTodo = await response.json();
        
        const todoIndex = todos.findIndex((todo) => todo.id===id);
        const copyData = todos.slice();
        copyData[todoIndex] = updateTodo;
        setTodos(copyData);
    }
    
    const handleChange = (e) => {
        setSearch(e.target.value);
    }

    useEffect(() => {
            setTodos(todos);
            loadTodo();
    // eslint-disable-next-line
    }, [ addMarker, debounceValue ]);
    
    return (
        <div className={style.TodoPage}>
            <input placeholder="Поиск заданий..." value={search} onChange={handleChange}/>
                {isLoading ? (<h1>ЗАГРУЗКА...</h1>) : (
                <>
                    <button onClick={sortTodosAlphabet}>Отсортировать по Алфавиту</button>
                    <TodoList data={todos} editTodo={editTodo} deleteTodo={deleteTodo} addMarker={addMarker} setAddMarker={setAddMarker}/>
                </>
                )
            }
        </div>       
    );
};

export default TodoPage;
       