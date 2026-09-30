import type Todo from "../../types/todo/todo";

export function TodoItem(todo: Todo) {
    return <li key={todo.id}>
        {todo.done ? '✅' : '⬜'} {todo.title}
    </li>
}