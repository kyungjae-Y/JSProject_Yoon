let button1 = document.querySelector('#to50')
let button2 = document.querySelector('#snake')
let button3 = document.querySelector('#tetris')
let button4 = document.querySelector('#two')

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