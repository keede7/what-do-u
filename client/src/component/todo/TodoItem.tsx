import type Todo from "../../types/todo/todo";

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
  }
  

export function TodoItem(
    {todo, onDelete}: TodoItemProps
) {
    return (
            <li>
                {todo.done ? '✅' : '⬜'} {todo.title}
                <button onClick={() => onDelete(todo.id)}>X</button>
            </li>
    )
}