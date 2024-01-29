import {
  Engine,
  Render,
  Runner,
  Bodies,
  World,
  Body,
  Sleeping,
  Events,
} from "matter-js";
import {
  FRUITS
} from "./fruits";

const engine = Engine.create();
const render = Render.create({
  engine,
  element: document.body,
  options: {
    wireframes: false,
    background: "#F7F4C8",
    width: 620,
    height: 850,
  },
});

const world = engine.world;

// 왼쪽 벽
const leftWall = Bodies.rectangle(15, 395, 30, 790, {
  // 벽이 떨어지지 않도록
  isStatic: true,
  render: {
    fillStyle: "#E6B143",
  },
});

// 오른쪽 벽
const rightWall = Bodies.rectangle(605, 395, 30, 790, {
  // 벽이 떨어지지 않도록
  isStatic: true,
  render: {
    fillStyle: "#E6B143",
  },
});

// 땅
const ground = Bodies.rectangle(310, 820, 620, 60, {
  // 벽이 떨어지지 않도록
  isStatic: true,
  render: {
    fillStyle: "#E6B143",
  },
});

// 종료 조건에 따른 선
const topLine = Bodies.rectangle(310, 150, 620, 2, {
  // 벽이 떨어지지 않도록
  isStatic: true,
  // 센서에 닿았는가 아닌가
  isSensor: true,
  render: {
    fillStyle: "#E6B143"
  },
  name: "topLine",
});

World.add(world, [ground, leftWall, rightWall, topLine]);

Render.run(render);
Runner.run(engine);

let currentBody = null;
let currentFruit = null;
let interval = null;
let disableAction = false;

// 과일 생성
function addCurrentFruit() {
  const randomFruit = getRandomFruit();
  const body = Bodies.circle(300, 50, randomFruit.radius, {
    name: randomFruit.name,
    isSleeping: true,
    render: {
      fillStyle: randomFruit.color,
      sprite: {
        texture: `/${randomFruit.name}.png`
      },
    },
    restitution: 0.2,
  });
  currentBody = body;
  currentFruit = randomFruit;
  World.add(world, body);
}

// 과일 생성 (랜덤 - 5개 중에 하나)
function getRandomFruit() {
  const randomIndex = Math.floor(Math.random() * 5);
  const fruit = FRUITS[randomIndex];
  if (currentFruit && currentFruit.name === fruit.name)
    return getRandomFruit();
  return fruit;
}

// 움직이는 키
window.onkeydown = (event) => {
  if (disableAction) return;
  switch (event.code) {
    // → 키 눌렀을 때
    case "ArrowLeft":
      if (interval) return;
      interval = setInterval(() => {
        if (currentBody.position.x - 20 > 30)
          Body.setPosition(currentBody, {
            x: currentBody.position.x - 1,
            y: currentBody.position.y,
          });
      }, 5);
      break;
      // ← 눌렀을 때
    case "ArrowRight":
      if (interval) return;
      interval = setInterval(() => {
        if (currentBody.position.x + 20 < 590)
          Body.setPosition(currentBody, {
            x: currentBody.position.x + 1,
            y: currentBody.position.y,
          });
      }, 5);
      break;
      // 스페이스바 눌렀을 때 떨어뜨림
    case "Space":
      disableAction = true;
      Sleeping.set(currentBody, false);
      setTimeout(() => {
        addCurrentFruit();
        disableAction = false;
      }, 1000);
      break;
  }
};

// 이동할 때 자연스럽게 이동
window.onkeyup = (event) => {
  switch (event.code) {
    case "ArrowLeft":
    case "ArrowRight":
      clearInterval(interval);
      interval = null;
  }
};

// matter.js 이벤트
Events.on(engine, "collisionStart", (event) => {
  event.pairs.forEach((collision) => {
    // 같은 과일이라면
    if (collision.bodyA.name === collision.bodyB.name) {
      // 과일을 제거하고
      World.remove(world, [collision.bodyA, collision.bodyB]);
      // 합쳐질 때 소리
      let audio = new Audio("./public/pop.wav");
      // 재생
      audio.play();
      const index = FRUITS.findIndex(
        (fruit) => fruit.name === collision.bodyA.name
      );
      // 마지막 과일이라면 합치지 않기
      if (index === FRUITS.length - 1) return;
      // 다음 과일 생성
      const newFruit = FRUITS[index + 1];
      const body = Bodies.circle(
        collision.collision.supports[0].x,
        collision.collision.supports[0].y,
        newFruit.radius, {
          render: {
            fillStyle: newFruit.color,
            sprite: {
              texture: `/${newFruit.name}.png`
            },
          },
          name: newFruit.name,
        }
      );
      World.add(world, body);
    }
    // 종료 조건
    if ((collision.bodyA.name === "topLine" ||
        collision.bodyB.name === "topLine") &&
      !disableAction
    ) {
      // alert 창 띄우고 메인 페이지 이동
      alert("Game over");
      location.href = "http://127.0.0.1:5500/index.html";
    }
  });
});

addCurrentFruit();