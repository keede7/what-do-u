// Jest(테스트 러너) 설정 파일
import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import ts from 'typescript';

// Path aliases (e.g. the ones added by `nest g library`) live in tsconfig.json,
// so they are read from there instead of being duplicated here.
// (tsconfig.json의 paths 별칭 설정을 읽어와 Jest에서도 동일하게 쓰도록 한다)
const { config: tsconfig } = ts.readConfigFile(
  './tsconfig.json',
  ts.sys.readFile,
);
const paths = tsconfig?.compilerOptions?.paths ?? {};

const config: Config = {
  // 테스트 시 인식할 파일 확장자
  moduleFileExtensions: ['js', 'json', 'ts'],
  // 테스트 기준 루트 디렉터리 (server 폴더)
  rootDir: '.',
  // 파일명이 .spec.ts로 끝나는 파일을 테스트 파일로 인식
  testRegex: '.*\\.spec\\.ts$',
  // .ts / .js 파일은 ts-jest로 변환(컴파일)해서 실행
  transform: {
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  // tsconfig의 경로 별칭(예: @app/xxx)을 실제 경로로 매핑
  moduleNameMapper: pathsToModuleNameMapper(paths, { prefix: '<rootDir>/' }),
  // 커버리지(`npm run test:cov`) 측정 대상 파일
  collectCoverageFrom: [
    'src/**/*.(t|j)s',
    'libs/**/*.(t|j)s',
    'apps/**/*.(t|j)s',
  ],
  // 커버리지 리포트 출력 위치
  coverageDirectory: './coverage',
  // Node.js 환경에서 테스트 실행 (브라우저 DOM 없음)
  testEnvironment: 'node',
};

export default config;
