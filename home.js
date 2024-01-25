let button1 = document.querySelector('#to50')
let button2 = document.querySelector('#snake')
let button3 = document.querySelector('#tetris')
let button4 = document.querySelector('#two')
let button6 = document.querySelector('#pp')
let button7 = document.querySelector('.end')
let opendWindow;

button1.addEventListener('click', () => {
  // window.location.href = './game_1to50/1to50.html';
  opendWindow = window.open('./game_1to50/1to50.html')
})

button2.addEventListener('click', () => {
  // window.location.href = './game_snake/snake.html';
  opendWindow = window.open('./game_snake/snake.html')
})

button3.addEventListener('click', () => {
  // window.location.href = './game_tetris/tetris.html';
  opendWindow = window.open('./game_tetris/tetris.html')
})

button4.addEventListener('click', () => {
  // window.location.href = './game_2048/2048.html';
  opendWindow = window.open('./game_2048/2048.html')
})

button6.addEventListener('click', () => {
  // window.location.href = './game_pingpong/pingpong.html';
  opendWindow = window.open('./game_pingpong/pingpong.html')
})

button7.addEventListener('click', () => {
  if (confirm('정말 그만하실건가요 ?') == true) {
    window.close();
  } else {
    return;
  }
})