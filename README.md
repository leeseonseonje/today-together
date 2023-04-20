# Today Together
하루를 함께

```
사용기술: Node.js, TypeScript, NestJS, TypeORM, jest, MySQL
```

## ERD
![today together](https://user-images.githubusercontent.com/72899707/233413615-87d7eaf5-9ee1-4654-8b15-297ac510a59d.png)

## did
- 할 일 추천 API (Bored API)를 이용하여 할 일 추천

- 영어로 된 데이터 Papago API를 이용하여 번역한 데이터를 캐싱하여 API 호출 최소화

- Zen Quote API을 이용하여 오늘의 명언 기능 구현

- 스케쥴러를 이용하여 오늘의 명언 갱신 후 저장 (API 호출 최소화)

- 프록시 패턴을 적용하여 오늘의 명언을 메모리에 저장 (DB 호출 최소화)

- 날짜별 조회 쿼리를 인덱스를 활용하여 성능 튜닝 (date() 함수를 사용하는 부분을 범위 조건으로 변경)
