// import { useEffect, useState } from 'react'
import heroImg from './assets/hero.png'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import './App.css'
import TodoList from './component/todo/TodoList'

function App() {

  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={heroImg} className="base" width="170" height="179" alt="" />
          <img src={reactLogo} className="framework" alt="React logo" />
          <img src={viteLogo} className="vite" alt="Vite logo" />
        </div>
        <div>
          <h1>Get started</h1>
          <p>
            Edit <code>src/App.tsx</code> and save to test <code>HMR</code>
          </p>
        </div>
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


      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App
