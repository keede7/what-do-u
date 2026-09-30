import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller.js';
import { TodosService } from './todos.service.js';

// Todos 기능 모듈 (Feature Module)
// 할 일(todo) 관련 컨트롤러와 서비스를 하나로 묶는다.
// AppModule의 imports에 등록되어 앱에 연결된다.
@Module({
  controllers: [TodosController],
  providers: [TodosService]
})
export class TodosModule {}
