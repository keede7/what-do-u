import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import Todo from './entity/todo.js'
import CreateDto from './dto/create-dto.js';
import ModifyDto from './dto/modify-dto.js';
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
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {

  }
  // 임시 데이터 (DB 연결 전까지 메모리에 보관, 서버 재시작 시 초기화됨)
  private todos: Todo[] = [
    { id: 1, title: '장보기', done: false },
    { id: 2, title: 'NestJS 공부하기', done: true },
    { id: 3, title: '운동하기', },
  ];

  /*
  async await를 사용해야하는 이유는 nodejs는 싱글 스레드로 동작하고 논블락킹의 메커니즘을 가졌기 때문에
  해당 작업이 종료되기 전에 다음 작업이 처리되므로 spring 과는 다르게 일이 순서대로 처리되지 않는다.
  */

  // 전체 목록 조회
  async findAll(): Promise<Todo[]> {
    return await this.todoRepository.find();
  }

  // id로 한 건 조회. 없으면 404 Not Found 응답을 보낸다.
  async findOne(id: number): Promise<Todo> {

    const todo = await this.todoRepository.findOneBy({id})

    if (!todo) {
      throw new NotFoundException(`Todo #${id} not found`);
    }
    return todo;
  }

  async register(todo: CreateDto): Promise<Todo> {
    // const nextId =
    // this.todos.length > 0
    //   ? Math.max(...this.todos.map((todo) => todo.id)) + 1
    //   : 1;

    const target: Todo = {
      ...todo.toEntity(),
      // id: nextId,
    }

    const entity = await this.todoRepository.save(target)
    console.log(`target : ${JSON.stringify(entity)}`)
    return entity
  }

  async remove(id: number) {
    const target = await this.findOne(id);
    const result = await this.todoRepository.delete(id)
    // 성공 result : {"raw":[],"affected":1}
    console.log(`result : ${JSON.stringify(result)}`)
  }

  async modify(id: number, dto: ModifyDto): Promise<Todo> {
    const target = await this.findOne(id)
    const updated = await this.todoRepository.save({...target, done: dto.checked})

    return updated;
  }
}
