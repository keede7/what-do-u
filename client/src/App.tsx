import './App.css'
import TodoList from './component/todo/TodoList'

function App() {

  return (
    <>
      <section id="center">
        <header className="app-header">
          <h1>Todo List</h1>
          <p>오늘 할 일을 정리해 보세요</p>
        </header>
        {/* 모듈화 이전 */}
        {/* <ul>
          {todos.map((todo) => 
            <TodoItem id={todo.id} key={todo.id} title={todo.title} done={todo.done} />
            // <li key={todo.id}>
            //      {todo.done ? '✅' : '⬜'} {todo.title}
            // </li>
          )}
        </ul>
        <button onClick={() => createTodo(todo)}>
            추가생성
        </button>
        <button onClick={() => getTodos()}>조회하기</button> */}
        {/* 모듈화 이후 */}
        <TodoList />
      </section>
    </>
  )
}

export default App
