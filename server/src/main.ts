// 앱 진입점 (Entry Point)
// `npm run start` 시 가장 먼저 실행되는 파일로, Nest 애플리케이션을 생성하고 HTTP 서버를 띄운다.
import { NestFactory } from '@nestjs/core';
import { AppModule, ObserveInstrument } from './app.module.js';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import {DocumentBuilder, SwaggerModule} from '@nestjs/swagger'

async function bootstrap() {
  // 루트 모듈(AppModule)을 기반으로 Nest 애플리케이션 인스턴스를 생성한다.
  // Nest는 AppModule에서 시작해 imports / controllers / providers를 따라가며 의존성 그래프를 구성한다.
  const app = await NestFactory.create(AppModule, {
    // @nestjs/observe의 계측(instrumentation) 훅을 등록한다.
    // 요청 추적, 로그 상관관계, 메트릭 수집 등을 자동으로 처리하기 위해 앱 생성 시점에 연결한다.
    instrument: ObserveInstrument,
  })

  app.useGlobalPipes(
    new ValidationPipe({
        transform: true
    })
  )

  app.enableCors({
    origin: 'http://localhost:5173'
  })

  const swagger = new DocumentBuilder()
  .setTitle('Todo API')
  .setDescription('Todo 목록 관리 API')
  .setVersion('1.0')
  .build();

  const document = SwaggerModule.createDocument(app, swagger);
  SwaggerModule.setup('docs', app, document) // localhost:3000/docs 서버 포트의 docs URI
  // 환경변수 PORT가 있으면 그 포트를, 없으면 3000번 포트로 서버를 연다.
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
