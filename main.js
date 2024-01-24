let button1 = document.querySelector('#to50')
let button2 = document.querySelector('#snake')
let button3 = document.querySelector('#tetris')
let button4 = document.querySelector('#two')
let button5 = document.querySelector('#wm')
let button6 = document.querySelector('#pp')

button1.addEventListener('click', () => {
  window.location.href = './game_1to50/1to50.html';
})

button2.addEventListener('click', () => {
  window.location.href = './game_snake/snake.html';
})

button3.addEventListener('click', () => {
  window.location.href = './game_tetris/tetris.html';
})

button4.addEventListener('click', () => {
  window.location.href = './game_2048/2048.html';
})

button5.addEventListener('click', () => {
  window.location.href = './game_watermelon/watermelon.html';
})

button6.addEventListener('click', () => {
  window.location.href = './game_pingpong/pingpong.html';
})