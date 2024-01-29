const myAudio = new Audio();
myAudio.src = './메인테마.mp3';

const btnPlay = document.getElementById('btnPlay');
const btnPause = document.getElementById('btnPause');

let button1 = document.querySelector('#to50')
let button3 = document.querySelector('#tetris')
let button4 = document.querySelector('#fm')
let button6 = document.querySelector('#pp')
let button7 = document.querySelector('#git')
let opendWindow;

btnPlay.onclick = function () {
  myAudio.play();
}

btnPause.onclick = function () {
  myAudio.pause();
}

button1.addEventListener('click', () => {
  // window.location.href = './game_1to50/1to50.html';
  opendWindow = window.open('./game_1to50/1to50.html')
})

button3.addEventListener('click', () => {
  // window.location.href = './game_tetris/tetris.html';
  opendWindow = window.open('./game_tetris/tetris.html')
})

button4.addEventListener('click', () => {
  // window.location.href = './game_findmine/findmine.html';
  opendWindow = window.open('./game_findmine/findmine.html')
})

button6.addEventListener('click', () => {
  // window.location.href = './game_pingpong/pingpong.html';
  opendWindow = window.open('./game_pingpong/pingpong.html')
})

button7.addEventListener('click', () => {
  opendWindow = window.open('https://github.com/kyungjae-Y/JSProject_Yoon')
})