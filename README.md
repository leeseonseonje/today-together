# Today Together
하루를 함께 - 할 일 추천, 오늘의 명언, todo 등 하루를 함께해 주는 서비스다.
- 할 일 추천: 할 일 추천 api를 이용하여 할 일 추천을 해준다.
- 오늘의 명연: 명언 api를 이용해 하루를 시작하는 오늘의 명언을 보여준다.
- todo: 할 일을 등록, 수정, 삭제, 조회, 완료 등을 할 수 있다. 지난날에 미완료한 할 일들은 오늘 할 일로 자동으로 이동된다.
- 챌린지: 할 일을 완료하게 되면 commit 횟수가 올라가게 되고 지난 commit 내역들을 날짜별로 조회할 수 있다.
- 푸시 알람: 미완료한 todo가 있는 사용자들에게 푸시 알람 전송

## Skills
- Node.js, TypeScript, NestJS, TypeORM, jest, MySQL, Docker, FCM

## 실행 방법
1. git clone https://github.com/leeseonseonje/today-together.git

2. libs/infra/yml/oauth2-sample.yml, libs/infra/yml/translator-sample.yml 파일을 참고하여 libs/infra/yml/oauth2.yml, libs/infra/yml/translator.yml 파일 작성

3. 프로젝트 루트 디렉토리에 fcm 서버키 json 파일 업로드, 파일명 변경 (파일명: fcm-config.json)

4. 프로젝트 루트 디렉토리에서 docker-compose up

## API Spec (Swagger)
  - api: http://localhost:3000/api
 
  - push: http://localhost:3001/api
  
## ERD
![today together](https://user-images.githubusercontent.com/72899707/233413615-87d7eaf5-9ee1-4654-8b15-297ac510a59d.png)

## Architecture
<img width="1083" alt="스크린샷 2023-05-10 오전 2 00 36" src="https://github.com/leeseonseonje/today-together/assets/72899707/2c9e799f-f107-466f-8fb3-085d93232c23">

