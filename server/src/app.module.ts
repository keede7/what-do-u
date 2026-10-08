import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm'
import { createObserveModule } from '@nestjs/observe';
import { TodosModule } from './todos/todos.module.js';

// Observe 모듈과 계측기(Instrument)를 한 쌍으로 생성한다.
// - ObserveModule: 아래 imports에 등록해 설정값(키, 서비스 ID 등)을 넘기는 용도
// - ObserveInstrument: main.ts에서 NestFactory.create()에 넘겨 앱 전체를 계측하는 용도
export const { ObserveModule, ObserveInstrument } = createObserveModule();

// 루트 모듈 (Root Module)
// 애플리케이션의 모든 도메인 모듈을 한곳에 모아 연결하는 역할을 한다.
// 각 도메인(todos, users 등)은 자신의 컨트롤러/서비스를 자기 모듈 안에 두고,
// 여기서는 그 도메인 모듈만 imports에 등록한다. 컨트롤러를 직접 등록하지 않는다.
//
// 새 도메인 추가 방법:
//   1. `nest g resource <이름>` (또는 module/controller/service 각각 생성)
//   2. 생성된 <이름>Module을 아래 imports 배열에 추가
@Module({
  imports: [
    // ── 공통/인프라 모듈 ──────────────────────────────
    // Distributed tracing, auto-correlated logs, request/job metrics, error
    // telemetry, alarms, and more — out of the box. Sign up at https://observe.nestjs.com
    // (분산 추적, 로그 자동 연결, 요청/작업 메트릭, 에러 수집, 알람 등을 제공)
    // TODO: appKey / appSecret은 실제 값으로 교체하고, 코드에 직접 쓰지 말고 환경변수로 관리하는 것을 권장
    // 테스트(Jest는 NODE_ENV=test로 실행)에서는 제외한다. 백그라운드 워커가 떠 있어 테스트 프로세스가 종료되지 않기 때문.
    ...(process.env.NODE_ENV === 'test' || 'dev'
      ? []
      : [
          ObserveModule.forRoot({
            appKey: 'YOUR_APP_KEY',
            appSecret: 'YOUR_APP_SECRET',
            serviceId: 'server',
          }),
        ]),
    TypeOrmModule.forRoot({
      // type: 'mysql',
      // host: 'localhost',
      // port: 3306,
      // username: 'root',
      // password: 'root',
      type: 'better-sqlite3',
      database: 'todo.sqlite',
      entities: [],
      // synchronize를 true로 설정하는 것은 운영 단계에서 데이터를 잃는 등 악영향을 끼칠 수 있는 요소가 많기 때문에 
      // 프로덕션 레벨에서는 false로 설정하는 것이 더 권장됩니다.
      synchronize: true,
    }),
    // ── 도메인 모듈 ──────────────────────────────────
    TodosModule, // /todos
  ],
})
export class AppModule {}
