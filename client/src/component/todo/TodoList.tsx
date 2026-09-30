import { useEffect, useState } from 'react'
import type Todo from '../../types/todo/todo';
import { getTodos, createTodo } from '../../api/todo/todo.api'
import { TodoItem } from './TodoItem';
import type { ChangeEvent, MouseEvent } from 'react'

export default function TodoList() {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    
    const [title, setTitle] = useState('')
    const [done, setDone] = useState(false)

    function changeTitle(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.target.value)
    }

    function changeDone(e: ChangeEvent<HTMLInputElement>) {
        setDone(e.target.checked)
    }

    const todo = {
        id: 0,
        title: '새로추가',
        done: false
    }

    // 화면이 처음 뜰 때 한 번만 목록을 불러온다.
    useEffect(() => {
        getTodos()
            .then((data) => {
                console.log(data)
                if (!Array.isArray(data)) throw new Error('예상과 다른 응답');
                setTodos(data)
            })
            .catch(() => setError('목록을 불러오지 못했어요.'))
            .finally(() => setLoading(false));
    }, []);

    if (loading) return <p>불러오는 중...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <input value={title} onChange={changeTitle} placeholder='할일을 작성하세요' />
            <input type='checkbox' checked={done} onChange={changeDone}/>
            <button onClick={
                () => createTodo({
                    id: 0, 
                    title: title,
                    done: done
                })
                    .then((res) => {
                        setTodos((prev) => [...prev, res])
                        setTitle('')
                    })
            }>
                추가생성
            </button>
            <button onClick={() => getTodos()}>조회하기</button>
            <ul>
                {todos.map((todo) =>
                    <TodoItem id={todo.id} title={todo.title} done={todo.done} />
                    // <li key={todo.id}>
                    //      {todo.done ? '✅' : '⬜'} {todo.title}
                    // </li>
                )}
            </ul>
        </>
    )
}