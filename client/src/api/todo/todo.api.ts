
import axios from 'axios';
import type Todo from '../../types/todo/todo';

const api = axios.create({
    baseURL: '/api'
});

export const getTodos = () => api.get<Todo[]>('/todos')
    .then((res) => {
        console.log(res)
        return res.data
    });

export const createTodo = (todo: Todo) =>
    api.post<Todo>('/todos',  todo )
    .then((res) => res.data);

export const removeTodo = (id: number) => api.delete(`/todos/${id}`)
    .then((res) => {
        console.log(res)
    })

export const modifyTodo = (id: number, checked: boolean) => 
    api.patch(`/todos/${id}`, {checked: checked})
    .then((res) => {
        console.log(res)
        return res.data
    })