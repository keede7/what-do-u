import { useEffect, useState } from 'react'
import type Todo from '../../types/todo/todo';
import { getTodos, createTodo, removeTodo } from '../../api/todo/todo.api'
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

    function remove(id: number) {
        console.log(`remove id : ${id}`)
        removeTodo(id)
            .then(
                // 새 배열로 교체하기 위해서 todo => todo.filter로 적용한다. 
                () => setTodos(todos => todos.filter((todo) => todo.id !== id))
            )
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
                {/* 상위 구조에서 값과 기능 자체만을 넘겨준다. */}
                {todos.map((todo) =>
                    <TodoItem key={todo.id} todo={todo} onDelete={remove} />
                    // <li key={todo.id}>
                    //      {todo.done ? '✅' : '⬜'} {todo.title}
                    // </li>
                )}
            </ul>
        </>
    )
}