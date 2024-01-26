# 작전명 : 미니게임천국

## 프로젝트
```
기획 : HTML, CSS, JS 를 배우고 프로젝트를 만들어야 한다고 들었을 때 가장 먼저 게임이 생각나서 제작하게 되었습니다
만들 게임 :
1. 1 To 50
2. 테트리스
3. 지뢰찾기
4. 핑퐁게임
5. 수박게임
```

## 일정
```
2024.01.19 ~ 2024.01.28
1. 01.19 - 만들어야 할 게임 구조 및 설계 공부
2. 01.20 - 테트리스 HTML, CSS, JS
3. 01.21 - 1 To 50 HTML, CSS, JS
4. 01.22 - Snake HTML, CSS
5. 01.23 - 2048 HTML, CSS
6. 01.24 - 수박게임을 위한 matter.js 공부, 핑퐁게임 HTML, CSS, JS
7. 01.25 - matter.js 공부 및 수박게임 JS
8. 01.26 - 지뢰찾기, 순서도
9. 01.27, 01.28 - 반응형 웹페이지(최대한)
```
## 순서도
<img width="615" alt="1to50" src="https://github.com/kyungjae-Y/JSProject_Yoon/assets/153978815/a0925b7b-7774-44db-9811-971c16116c10">
<img width="611" alt="테트리스" src="https://github.com/kyungjae-Y/JSProject_Yoon/assets/153978815/62d6e60d-4d43-44b5-9518-df9192842c3e">
<img width="605" alt="지뢰찾기" src="https://github.com/kyungjae-Y/JSProject_Yoon/assets/153978815/33ef39a2-c3a3-444a-901d-52971a2b03a1">
<img width="604" alt="핑퐁" src="https://github.com/kyungjae-Y/JSProject_Yoon/assets/153978815/0a25814e-07c7-4fd4-9e8a-154ee251c752">
<img width="608" alt="수박게임" src="https://github.com/kyungjae-Y/JSProject_Yoon/assets/153978815/67dc365c-2cb0-4bb7-a5db-0f1ebdb5c47f">

## 디자인
```
페이지 구성 - 메인 페이지, 게임을 위한 버튼, 종료 버튼, 제작자 및 기간
1. 메인페이지 (main.html)
  프로젝트 이름과 게임들의 링크
2. 게임 1 (game_1to50 폴더의 1to50.html)
  메인페이지에서 버튼을 클릭하면 새 창으로 열림
  - 1 부터 50 까지 순서대로 누르는 게임
  - 다 눌렀다면 alert 창에 걸린 시간과 게임 종료 팝업
3. 게임 2 (game_tetris 폴더의 tetris.html)
  메인페이지에서 버튼을 클릭하면 새 창으로 열림
  - ↑ 방향키를 제외한 나머지 방향키로 움직이며 space bar 를 누른다면 블럭 회전
  - 게임 오버시 alert 창에 현재 레벨과 점수 팝업
4. 게임 3 (game_findmine 폴더의 findmine.html)
  메인페이지에서 버튼을 클릭하면 새 창으로 열림
  - 지뢰를 피해서 안전한 땅을 클릭하는 게임
  - 안전한 땅을 다 찾는다면 alert 창에 걸린 시간 팝업
5. 게임 4 (game_pingpong 폴더의 pingpong.html)
  메인페이지에서 버튼을 클릭하면 새 창으로 열림
  - 방향키 ↑, ↓ 로 움직이거나 마우스로 움직이면서 상대 골대에 골을 넣는 게임
  - 플레이어 1은 방향키나 마우스
  - 플레이어 2는 AI
  - 플레이어 1이 승리 시 alert 창에 게임 승리 팝업
  - 플레이어 2가 승리 시 alert 창에 게임 패배 팝업
7. 종료 버튼
  버튼 클릭시 창 닫힘
8. 제작자 및 기간
  프로젝트 제작자 이름 및 프로젝트 기간

번외
9. 게임 5 (game_watermelon 폴더의 index.html)
  터미널에서 npm run dev 로 게임 실행
  게임 오버시 alert 창 뜨고 확인 누르면 메인페이지로 이동
```

## 개발
```
현재 만든 게임 말고도 만들 수 있는 게 있다면 더 추가 예정
만들고 싶은 게임은 많지만 능력 부족으로 조금 아쉬움이 남음
```

## 테스트
```
1 to 50 - 테스트 완료
tetris - 테스트 완료
지뢰찾기 - 테스트 완료 (약간의 오류 ..?)
pingpong - 테스트 완료
watermelon - 테스트 완료
```

## 배포
```
계획 없음
```
