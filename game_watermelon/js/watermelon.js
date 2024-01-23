// import {
//   Engine,
//   Render,
//   Runner,
//   Bodies,
//   World,
//   Body,
//   Events,
//   collision,
// } from 'matter-js';

// import {
//   FRUITS
// } from './fruits';

// const engine = Engine.create();
// const render = Render.create({
//   engine,
//   element: document.body,
//   options: {
//     wireframes: false,
//     background: '#F7F4C8',
//     width: 620,
//     height: 850,
//   },
// });

// const world = engine.world;

// const leftWall = Bodies.rectangle(15, 395, 30, 790, {
//   isStatic: true,
//   render: {
//     fillStyle: '#E7B143'
//   },
// });

// const rightWall = Bodies.rectangle(605, 395, 30, 790, {
//   isStatic: true,
//   render: {
//     fillStyle: '#E7B143'
//   },
// });

// const ground = Bodies.rectangle(310, 820, 620, 60, {
//   isStatic: true,
//   render: {
//     fillStyle: '#E7B143'
//   },
// });

// const topLine = Bodies.rectangle(310, 150, 620, 2, {
//   name: 'topLine',
//   isStatic: true,
//   isSensor: true,
//   render: {
//     fillStyle: '#E6B143',
//   },
// });

// let currentBody = null;
// let currentFruit = null;
// let disableAction = false;
// let interval = null;
// let num_suika = 0;

// World.add(world, [leftWall, rightWall, ground, topLine]);

// Render.run(render);
// Render.run(engine);

// function addFruit() {
//   const index = Math.floor(Math.random() * 5);
//   const fruit = FRUITS[index];

//   const body = Bodies.circle(300, 50, fruit.radius, {
//     index: index,
//     isSleeping: true,
//     render: {
//       sprite: {
//         texture: `${fruit.name}.png`,
//       }
//     },
//     resitution: 0.4,
//   });

//   currentBody = body;
//   currentFruit = fruit;

//   World.add(world, body);
// }

// window.onkeydown = (event) => {
//   if (disableAction) {
//     return;
//   }
//   switch (event.code) {
//     case 'ArrowLeft':
//       if (interval) return;
//       interval = setInterval(() => {
//         if (currentBody.position.x - currentFruit.radius > 30)
//           Body.setPosition(currentBody, {
//             x: currentBody.position.x - 2,
//             y: currentBody.position.y,
//           });
//       }, 5)
//       break;
//     case 'ArrowRight':
//       if (interval) return;
//       interval = setInterval(() => {
//         if (currentBody.position.x + currentFruit.radius < 590)
//           Body.setPosition(currentBody, {
//             x: currentBody.position.x + 2,
//             y: currentBody.position.y,
//           });
//       }, 5)
//       break;
//     case 'Space':
//       currentBody.isSleeping = false;
//       disableAction = true;
//       setTimeout(() => {
//         addFruit();
//         disableAction = false;
//       }, 500);
//       break;
//   }
// };

// window.onkeyup = (event) => {
//   switch (event.code) {
//     case 'ArrowLeft':
//       clearInterval(interval);
//       interval = null;
//     case 'ArrowRight':
//       clearInterval(interval);
//       interval = null;
//   }
// };

// Events.on(engine, 'collisionStart', (event) => {
//   event.pairs.forEach((collision) => {
//     if (collision.bodyA.index === collision.bodyB.index) {
//       const index = collision.bodyA.index;
//       if (index === FRUITS.length - 1) {
//         return;
//       }
//       World.remove(world, [collision.bodyA, collision.bodyB]);

//       const newFruit = FRUITS[index + 1];

//       const newBody = Bodies.circle(
//         collision.collision.supports[0].x,
//         collision.collision.supports[0].y,
//         newFruit.radius, {
//           render: {
//             sprite: {
//               texture: `${newFruit.name}.png`
//             }
//           },
//           index: index + 1,
//         }
//       );
//       World.add(world, newBody);
//       if (newFruit === FRUITS[9]) {
//         num_suika++;
//       }
//     }
//     if (!disableAction && (collision.bodyA.name === 'topLine' || collision.bodyB.name === 'topLine')) {
//       alert('game over');
//       window.location.reload();
//     }
//     if (num_suika === 2) {
//       alert('Victory');
//       window.location.reload();
//     }
//   });
// });

// window.addEventListener('keydown', (e) => console.log(e));

// addFruit();

(() => {
  const Engine = Matter.Engine,
    Render = Matter.Render,
    World = Matter.World,
    Body = Matter.Body,
    Bodies = Matter.Bodies,
    Events = Matter.Events,
    Composite = Matter.Composite;

  const parent = document.getElementById("game");
  const canvas = document.getElementById("canvas");
  var gameOverlayer = document.getElementById("overlay");
  const floor = document.getElementById("floor");

  const ctx = canvas.getContext("2d");

  const engine = Engine.create();

  const render = Render.create({
    canvas: canvas,
    engine: engine,
    options: {
      width: 480,
      height: 720,
      wireframes: false,
    },
  });

  const times = [];
  let fps = 100;

  let mousePos;
  let isClicking = false;
  let isMouseOver = false;
  let newSize = 1;

  let isGameOver = false;
  let score = 0;

  let isLineEnable = false;

  const background = Bodies.rectangle(240, 360, 480, 720, {
    isStatic: true,
    render: {
      fillStyle: "#fe9"
    },
  });
  background.collisionFilter = {
    group: 0,
    category: 1,
    mask: -2,
  };
  const ground = Bodies.rectangle(400, 1220, 810, 1000, {
    isStatic: true,
    render: {
      fillStyle: "transparent"
    },
  });
  const wallLeft = Bodies.rectangle(-50, 500, 100, 1000, {
    isStatic: true,
    render: {
      fillStyle: "transparent"
    },
  });
  const wallRight = Bodies.rectangle(530, 500, 100, 1000, {
    isStatic: true,
    render: {
      fillStyle: "transparent"
    },
  });
  World.add(engine.world, [wallLeft, wallRight, ground, background]);

  Engine.run(engine);
  Render.run(render);

  resize();

  refreshLoop();

  init();

  window.addEventListener("resize", resize);

  addEventListener("mousedown", () => {
    if (isGameOver) return;

    isClicking = isMouseOver;
  });
  addEventListener("touchstart", (e) => {
    if (isGameOver) return;

    isClicking = true;
    mousePos = e.touches[0].clientX / parent.style.zoom;
  });

  addEventListener("mouseup", () => {
    if (isGameOver) return;

    isClicking = false;
  });
  addEventListener("touchend", () => {
    if (isGameOver) return;

    isClicking = false;

    if (isGameOver) return;

    if (ball != null) {
      ball.createdAt = 0;
      ball.collisionFilter = {
        group: 0,
        category: 1,
        mask: -1,
      };
      Body.setVelocity(ball, {
        x: 0,
        y: (100 / fps) * 5.5
      });
      ball = null;

      newSize = Math.ceil(Math.random() * 3);

      setTimeout(() => createNewBall(newSize), 500);
    }
  });

  addEventListener("mousemove", (e) => {
    if (isGameOver) return;

    const rect = canvas.getBoundingClientRect();
    mousePos = e.clientX / parent.style.zoom - rect.left;
  });
  addEventListener("touchmove", (e) => {
    if (isGameOver) return;

    const rect = canvas.getBoundingClientRect();
    mousePos = e.touches[0].clientX / parent.style.zoom - rect.left;
  });

  addEventListener("click", () => {
    if (isGameOver || !isMouseOver) return;

    if (ball != null) {
      ball.createdAt = 0;
      ball.collisionFilter = {
        group: 0,
        category: 1,
        mask: -1,
      };
      Body.setVelocity(ball, {
        x: 0,
        y: (100 / fps) * 5.5
      });
      ball = null;

      newSize = Math.ceil(Math.random() * 3);

      setTimeout(() => createNewBall(newSize), 500);
    }
  });

  canvas.addEventListener("mouseover", () => {
    isMouseOver = true;
  });

  canvas.addEventListener("mouseout", () => {
    isMouseOver = false;
  });

  Events.on(engine, "beforeUpdate", () => {
    if (isGameOver) return;

    if (ball != null) {
      const gravity = engine.world.gravity;
      Body.applyForce(ball, ball.position, {
        x: -gravity.x * gravity.scale * ball.mass,
        y: -gravity.y * gravity.scale * ball.mass,
      });

      if (isClicking && mousePos !== undefined) {
        ball.position.x = mousePos;

        if (mousePos > 455) ball.position.x = 455;
        else if (mousePos < 25) ball.position.x = 25;
      }

      ball.position.y = 50;
    }

    isLineEnable = false;
    const bodies = Composite.allBodies(engine.world);
    for (let i = 4; i < bodies.length; i++) {
      body = bodies[i];

      if (body.position.y < 100) {
        if (
          body !== ball &&
          Math.abs(body.velocity.x) < 0.2 &&
          Math.abs(body.velocity.y) < 0.2
        ) {
          gameOver();
        }
      } else if (body.position.y < 150) {
        if (
          body !== ball &&
          Math.abs(body.velocity.x) < 0.5 &&
          Math.abs(body.velocity.y) < 0.5
        ) {
          isLineEnable = true;
        }
      }
    }
  });

  Events.on(engine, "collisionActive", collisionEvent);
  Events.on(engine, "collisionStart", collisionEvent);

  function collisionEvent(e) {
    if (isGameOver) return;

    e.pairs.forEach((collision) => {
      bodies = [collision.bodyA, collision.bodyB];

      if (bodies[0].size === undefined || bodies[1].size === undefined) return;

      if (bodies[0].size === bodies[1].size) {
        allBodies = Composite.allBodies(engine.world);
        if (allBodies.includes(bodies[0]) && allBodies.includes(bodies[1])) {
          if (
            (Date.now() - bodies[0].createdAt < 100 ||
              Date.now() - bodies[1].createdAt < 100) &&
            bodies[0].createdAt != 0 &&
            bodies[1].createdAt != 0
          ) {
            return;
          }

          World.remove(engine.world, bodies[0]);
          World.remove(engine.world, bodies[1]);

          World.add(
            engine.world,
            newBall(
              (bodies[0].position.x + bodies[1].position.x) / 2,
              (bodies[0].position.y + bodies[1].position.y) / 2,
              bodies[0].size === 11 ? 11 : bodies[0].size + 1
            )
          );

          score += bodies[0].size;

          var audio = new Audio("assets/pop.wav");
          audio.play();
        }
      }
    });
  }

  Events.on(render, "afterRender", () => {
    if (isGameOver) {
      ctx.fillStyle = "#ffffff55";
      ctx.rect(0, 0, 480, 720);
      ctx.fill();

      writeText("Game Over", "center", 240, 280, 50);
      writeText("Score: " + score, "center", 240, 320, 30);
    } else {
      writeText(score, "start", 25, 60, 40);

      if (isLineEnable) {
        ctx.strokeStyle = "#f55";
        ctx.beginPath();
        ctx.moveTo(0, 100);
        ctx.lineTo(480, 100);
        ctx.stroke();
      }
    }
  });

  function writeText(text, textAlign, x, y, size) {
    ctx.font = `${size}px NanumSquare`;
    ctx.textAlign = textAlign;
    ctx.lineWidth = size / 8;

    ctx.strokeStyle = "#000";
    ctx.strokeText(text, x, y);

    ctx.fillStyle = "#fff";
    ctx.fillText(text, x, y);
  }

  function resize() {
    canvas.height = 720;
    canvas.width = 480;

    if (isMobile()) {
      parent.style.zoom = window.innerWidth / 480;
      parent.style.top = "0px";

      floor.style.height = `${
        (window.innerHeight - canvas.height * parent.style.zoom) /
        parent.style.zoom
      }px`;
    } else {
      parent.style.zoom = window.innerHeight / 720 / 1.3;
      parent.style.top = `${(canvas.height * parent.style.zoom) / 15}px`;

      floor.style.height = "50px";
    }

    Render.setPixelRatio(render, parent.style.zoom * 2);
  }

  function refreshLoop() {
    window.requestAnimationFrame(() => {
      const now = performance.now();
      while (times.length > 0 && times[0] <= now - 1000) {
        times.shift();
      }
      times.push(now);
      fps = times.length;
      refreshLoop();
    });
  }

  function isMobile() {
    return window.innerHeight / window.innerWidth >= 1.49;
  }

  function init() {
    isGameOver = false;
    ball = null;
    engine.timing.timeScale = 1;
    score = 0;

    gameOverlayer.style.display = "none";

    while (engine.world.bodies.length > 4) {
      engine.world.bodies.pop();
    }

    createNewBall(1);
  }

  function gameOver() {
    isGameOver = true;
    engine.timing.timeScale = 0;

    gameOverlayer.style.display = "";

    if (ball != null) World.remove(engine.world, ball);
  }

  function createNewBall(size) {
    ball = newBall(render.options.width / 2, 50, size);
    ball.collisionFilter = {
      group: -1,
      category: 2,
      mask: 0,
    };

    World.add(engine.world, ball);
  }

  function newBall(x, y, size) {
    c = Bodies.circle(x, y, size * 10, {
      render: {
        sprite: {
          texture: `assets/img/${size}.png`,
          xScale: size / 12.75,
          yScale: size / 12.75,
        },
      },
    });
    c.size = size;
    c.createdAt = Date.now();
    c.restitution = 0.3;
    c.friction = 0.1;

    return c;
  }
})();