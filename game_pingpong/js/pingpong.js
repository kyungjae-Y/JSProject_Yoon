const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const keysPressed = [];
const KEY_UP = 38;
const KEY_DOWN = 40;

// ↓ 키 눌렀을 때 아래로 이동
window.addEventListener('keydown', function (e) {
  keysPressed[e.keyCode] = true;
})

// ↑ 키 눌렀을 때 위로 이동
window.addEventListener('keyup', function (e) {
  keysPressed[e.keyCode] = false;
})

// 마우스 올렸을 때 내 스틱 움직임 (y 좌표만)
window.addEventListener('mousemove', function (e) {
  paddle1.pos.y = e.clientY;
  paddle1.style.left = `${y}px`
})

function vec2(x, y) {
  return {
    x: x,
    y: y
  };
}

// 공에 대한 함수
function Ball(pos, velocity, radius) {
  // 포지션
  this.pos = pos;
  // 속도
  this.velocity = velocity;
  // 둥글기
  this.radius = radius;
  // 포지션에 따라 속도가 달라진다
  this.update = function () {
    this.pos.x += this.velocity.x;
    this.pos.y += this.velocity.y;
  };
  // 공 그리기
  this.draw = function () {
    ctx.fillStyle = '#33ff00';
    ctx.strokeStyle = '#33ff00';
    ctx.beginPath();
    ctx.arc(this.pos.x, this.pos.y, this.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }
}

// 스틱에 대한 함수
function Paddle(pos, velocity, width, height) {
  // 포지션
  this.pos = pos;
  // 속도
  this.velocity = velocity;
  // 길이
  this.width = width;
  // 너비
  this.height = height;
  // 점수
  this.score = 0;

  this.update = function () {
    if (keysPressed[KEY_UP]) {
      this.pos.y -= this.velocity.y;
    }
    if (keysPressed[KEY_DOWN]) {
      this.pos.y += this.velocity.y;
    }
  }
  // 그리기
  this.draw = function () {
    ctx.fillStyle = '#33ff00';
    ctx.fillRect(this.pos.x, this.pos.y, this.width, this.height);
  }
  this.getHalfWidth = function () {
    return this.width / 2;
  }
  this.getHalfHeight = function () {
    return this.height / 2;
  }
  this.getCenter = function () {
    return vec2(
      this.pos.x + this.getHalfWidth(),
      this.pos.y + this.getHalfHeight()
    );
  }
}

// 스틱이 벽에 닿았을 때
function paddleCollisionWithTheEdges(paddle) {
  // 스틱이 위쪽 벽에 닿았을 때
  if (paddle.pos.y <= 0) {
    paddle.pos.y = 0;
  }
  // 스틱이 아래쪽 벽에 닿았을 때
  if (paddle.pos.y + paddle.height >= canvas.height) {
    paddle.pos.y = canvas.height - paddle.height;
  }
}

// 공이랑 벽이랑 닿았을 때
function ballCollisionWithTheEdges(ball) {
  // 아래의 벽
  if (ball.pos.y + ball.radius >= canvas.height) {
    ball.velocity.y *= -1;
  }
  // 위의 벽
  if (ball.pos.y - ball.radius <= 0) {
    ball.velocity.y *= -1;
  }
}

// 공이랑 스틱이랑 닿았을 때
function ballPaddleCollision(ball, paddle) {
  let dx = Math.abs(ball.pos.x - paddle.getCenter().x);
  let dy = Math.abs(ball.pos.y - paddle.getCenter().y);
  if (dx <= (ball.radius + paddle.getHalfWidth()) &&
    dy <= (paddle.getHalfHeight() + ball.radius)) {
    ball.velocity.x *= -1;
  }
}

// 컴퓨터랑 이동 조건
function player2AI(ball, paddle) {
  if (ball.velocity.x > 0) {
    // 공의 y 좌표가 스틱의 y 좌표보다 크다면
    if (ball.pos.y > paddle.pos.y) {
      paddle.pos.y += paddle.velocity.y;
      if (paddle.pos.y + paddle.height >= canvas.height) {
        paddle.pos.y = canvas.height - paddle.height;
      }
    }
    // 공의 y 좌표가 스틱의 y 좌표보다 작다면
    if (ball.pos.y < paddle.pos.y) {
      paddle.pos.y -= paddle.velocity.y;
      if (paddle.pos.y <= 0) {
        paddle.pos.y = 0;
      }
    }
  }
}

// 공 재생성
function respawnBall(ball) {
  if (ball.velocity.x > 0) {
    ball.pos.x = canvas.width - 150;
    ball.pos.y = (Math.random() * (canvas.height - 200)) + 100;
  }
  if (ball.velocity.x < 0) {
    ball.pos.x = 150;
    ball.pos.y = (Math.random() * (canvas.height - 200)) + 100;
  }
  ball.velocity.x *= -1;
  ball.velocity.y *= -1;
}

// 점수
function increaseScore(ball, paddle1, paddle2) {
  if (paddle1.score >= 10) {
    alert('게임 승리 !')
    window.close();
  }
  if (paddle2.score >= 10) {
    alert('게임 패배 !')
    window.close();
  }
  if (ball.pos.x <= -ball.radius) {
    paddle2.score++;
    document.getElementById('player2Score').innerHTML = paddle2.score;
    respawnBall(ball);
  }
  if (ball.pos.x >= canvas.width + ball.radius) {
    paddle1.score++;
    document.getElementById('player1Score').innerHTML = paddle1.score;
    respawnBall(ball);
  }
}

// 게임판 모양
function drawGameScene() {
  ctx.strokeStyle = '#ffff00'
  // 위쪽 벽
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.moveTo(0, 0);
  ctx.lineTo(canvas.width, 0);
  ctx.stroke();

  // 아래쪽 벽
  ctx.beginPath();
  ctx.lineWidth = 20;
  ctx.moveTo(0, canvas.height);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();

  // 왼쪽 벽
  ctx.beginPath();
  ctx.lineWidth = 15;
  ctx.moveTo(0, 0);
  ctx.lineTo(0, canvas.height);
  ctx.stroke();

  // 오른쪽 벽
  ctx.beginPath();
  ctx.lineWidth = 15;
  ctx.moveTo(canvas.width, 0);
  ctx.lineTo(canvas.width, canvas.height);
  ctx.stroke();

  // 가운데 라인
  ctx.beginPath();
  ctx.lineWidth = 10;
  ctx.moveTo(canvas.width / 2, 0);
  ctx.lineTo(canvas.width / 2, canvas.height);
  ctx.stroke();

  // 가운데 원
  ctx.beginPath();
  ctx.arc(canvas.width / 2, canvas.height / 2, 50, 0, Math.PI * 2);
  ctx.stroke();
}

const ball = new Ball(vec2(200, 200), vec2(10, 10), 20);
// 내 스틱(시작위치, 속도, 면적, 길이)
const paddle1 = new Paddle(vec2(0, 50), vec2(15, 15), 20, 160);
// 상대 스틱(시작위치, 속도, 면적, 길이)
const paddle2 = new Paddle(vec2(canvas.width - 20, 30), vec2(5, 5), 20, 160);

function gameUpdate() {
  ball.update();
  paddle1.update();
  paddleCollisionWithTheEdges(paddle1);
  ballCollisionWithTheEdges(ball);

  player2AI(ball, paddle2);

  ballPaddleCollision(ball, paddle1);
  ballPaddleCollision(ball, paddle2);

  increaseScore(ball, paddle1, paddle2);
}

function gameDraw() {
  ball.draw();
  paddle1.draw();
  paddle2.draw();

  drawGameScene();
}

function gameLoop() {
  // 잔상
  // rgba(red, green, blue, 투명도)
  ctx.fillStyle = 'rgba(0,0,0,0.2)';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  window.requestAnimationFrame(gameLoop)
  gameUpdate();
  gameDraw();
}
gameLoop();