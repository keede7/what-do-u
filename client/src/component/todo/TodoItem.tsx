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
            <li className={`todo-item${todo.done ? ' done' : ''}`}>
                {/* 체크 아이콘(⬜/✅)은 Todo.css의 .todo-check 스타일로 표시한다. */}
                <input type="checkbox" className="todo-check" checked={todo.done?? false} onChange={(e: ChangeEvent<HTMLInputElement>) => onCheck(todo.id, e)}/>
                <span className="todo-title">{todo.title}</span>
                <button className="todo-delete" onClick={() => onDelete(todo.id)} aria-label="삭제">✕</button>
            </li>
    )
}
