# Today Together
하루를 함께 - 할 일 추천, 오늘의 명언, todo 등 하루를 함께 해주는 서비스다.
- 할 일 추천: 할 일 추천 api를 이용하여 할 일 추천을 해준다.
- 오늘의 명연: 명언 api를 이용해 하루를 시작하는 오늘의 명언을 보여준다.
- todo: 할 일을 등록, 수정, 삭제, 조회, 완료등을 할 수 있다. 지난 날에 미완료한 할 일들은 오늘 할 일로 자동으로 이동된다.
- 챌린지: 할 일을 완료하게 되면 commit 횟수가 올라가게 되고 지난 commit 내역들을 날짜별로 조회할 수 있다.

## Skills
- Node.js, TypeScript, NestJS, TypeORM, jest, MySQL

## 실행방법
1. git clone https://github.com/leeseonseonje/today-together.git

2. src/resources/oauth2-sample.yml, translator-sample.yml 파일을 참고하여 src/resources/oauth2.yml, src/resources/translator.yml 파일 생성 후 작성

3. 프로젝트 루트 디렉토리에서 docker-compose up

## API Spec (Swagger)
  - http://localhost:3000/api
  
## ERD
![today together](https://user-images.githubusercontent.com/72899707/233413615-87d7eaf5-9ee1-4654-8b15-297ac510a59d.png)

## did
- 할 일 추천 API (Bored API)를 이용하여 할 일 추천

- 영어로 된 데이터 Papago API를 이용하여 번역한 데이터를 캐싱하여 API 호출 최소화

- Zen Quote API을 이용하여 오늘의 명언 기능 구현

- 스케쥴러를 이용하여 오늘의 명언 갱신 후 저장 (API 호출 최소화)

- 프록시 패턴을 적용하여 오늘의 명언을 메모리에 저장 (DB 호출 최소화)

- 날짜별 조회 쿼리를 인덱스를 활용하여 성능 튜닝 (date() 함수를 사용하는 부분을 범위 조건으로 변경)
