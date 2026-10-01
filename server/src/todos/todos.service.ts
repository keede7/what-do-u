import { Injectable, NotFoundException } from '@nestjs/common';
import Todo from './entity/todo.js'
import CreateDto from './dto/create-dto.js';
// Todo 한 건의 형태
// export interface Todo {
//   id: number;
//   title: string;
//   done: boolean;
// }

// Todos의 비즈니스 로직(조회, 생성, 수정, 삭제 등)을 담당하는 서비스.
// @Service의 역할
@Injectable()
export class TodosService {
  // 임시 데이터 (DB 연결 전까지 메모리에 보관, 서버 재시작 시 초기화됨)
  private todos: Todo[] = [
    { id: 1, title: '장보기', done: false },
    { id: 2, title: 'NestJS 공부하기', done: true },
    { id: 3, title: '운동하기', },
  ];

  // 전체 목록 조회
  findAll(): Todo[] {
    return this.todos;
  }

  // id로 한 건 조회. 없으면 404 Not Found 응답을 보낸다.
  findOne(id: number): Todo {
    const todo = this.todos.find((t) => t.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return todo;
  }

  register(todo: CreateDto): Todo {
    const nextId =
    this.todos.length > 0
      ? Math.max(...this.todos.map((todo) => todo.id)) + 1
      : 1;

    const target: Todo = {
      ...todo.toEntity(),
      id: nextId,
    }
    
    this.todos.push(target);
    console.log('push 직후:', this.todos);
    return target
  }

  remove(id: number): Todo {
    const target = this.findOne(id);
    this.todos = this.todos.filter(todo => todo.id !== id);
    console.log(`삭제 후 목록 결과 : ${JSON.stringify(this.todos)}`)
    return target;
  }
}
