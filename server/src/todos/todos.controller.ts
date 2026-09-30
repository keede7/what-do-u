import { Controller, Get, Post, Body, Param, Redirect, Header, HttpCode, ParseIntPipe, } from '@nestjs/common';
import { TodosService } from './todos.service.js';
import type Todo from './entity/todo.js';
// type이 있으면 nest가 실행시 어떤클래스로 바꿔야하는지 알 수 없다.
import CreateDto from './dto/create-dto.js';


// '/todos' 경로로 들어오는 HTTP 요청을 처리하는 컨트롤러.
// 요청/응답만 담당하고, 실제 로직은 TodosService에 위임한다.
@Controller('todos')
export class TodosController {
  // TodosModule의 providers에 등록된 TodosService가 자동으로 주입된다.
  constructor(
      private readonly todosService: TodosService
    ) { 

    }

  // GET /todos → 전체 목록
  @Get()
  findAll(): Todo[] {
    return this.todosService.findAll();
  }
  // GET /todos/:id → 한 건 조회
  // ParseIntPipe: URL의 문자열 id를 숫자로 변환한다. 숫자가 아니면 400 Bad Request 응답을 보낸다.
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Todo {
    return this.todosService.findOne(id);
  }

  @HttpCode(201)
  @Post()
  create(@Body() dto: CreateDto) {
    console.log(dto)
    this.todosService.register(dto)
    return dto;
  }

  // @Post()
  // @HttpCode(203)                                   // 응답 코드 지정
  // @Header('Cache-Control', 'no-store')             // 커스텀 헤더
  // create2() { return 'created'; }

  // @Get('docs')
  // @Redirect('https://docs.nestjs.com', 302)        // 리다이렉트
  // toDocs3() { }
}
