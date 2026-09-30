// E2E(End-to-End) 테스트
// 실제 AppModule 전체를 띄워 모든 도메인 모듈이 정상적으로 연결되는지 검증한다. `npm run test:e2e` 로 실행된다.
// 도메인별 컨트롤러 테스트는 이 폴더에 <도메인>.e2e-spec.ts 파일로 추가한다. (예: todos.e2e-spec.ts)
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from './../src/app.module.js';

describe('AppModule (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    // 루트 모듈(AppModule) 전체를 불러와 실제 앱과 동일하게 구성한다.
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    // 테스트용 Nest 애플리케이션을 생성하고 초기화한다. (포트를 열지 않고 메모리상에서 동작)
    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 의존성 주입 등에 문제가 없으면 앱이 정상적으로 초기화된다.
  it('should bootstrap', () => {
    expect(app).toBeDefined();
  });

  // 테스트가 끝날 때마다 앱을 종료해 리소스(커넥션 등)를 정리한다.
  afterEach(async () => {
    await app.close();
  });
});
