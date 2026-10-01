import type { ChangeEvent } from "react";
import type Todo from "../../types/todo/todo";

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
    onCheck: (id: number, e: ChangeEvent<HTMLInputElement>) => void;
  }
  

export function TodoItem(
    {todo, onDelete, onCheck}: TodoItemProps
) {
    return (
            <li>
                <input type="checkbox" checked={todo.done?? false} onChange={(e: ChangeEvent<HTMLInputElement>) => onCheck(todo.id, e)}/>
                {todo.done ? '✅' : '⬜'} {todo.title}
                <button onClick={() => onDelete(todo.id)}>X</button>
            </li>
    )
}