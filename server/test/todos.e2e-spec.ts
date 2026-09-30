// Todos API E2E 테스트
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest'; // HTTP 요청을 보내고 응답을 검증하는 라이브러리
import { AppModule } from './../src/app.module.js';

describe('Todos (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  // 전체 목록이 배열로 오는지 확인
  it('GET /todos', async () => {
    const res = await request(app.getHttpServer()).get('/todos').expect(200);
    expect(res.body).toHaveLength(3);
  });

  // 특정 id 한 건 조회
  it('GET /todos/1', async () => {
    const res = await request(app.getHttpServer()).get('/todos/1').expect(200);
    expect(res.body).toEqual({ id: 1, title: '장보기', done: false });
  });

  // 없는 id → 404
  it('GET /todos/999 → 404', () => {
    return request(app.getHttpServer()).get('/todos/999').expect(404);
  });

  // 숫자가 아닌 id → 400 (ParseIntPipe)
  it('GET /todos/abc → 400', () => {
    return request(app.getHttpServer()).get('/todos/abc').expect(400);
  });
});
