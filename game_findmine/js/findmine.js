const form = document.querySelector('#form');
const timer = document.querySelector('#timer');
const tbody = document.querySelector('#table tbody');
const result = document.querySelector('#result');
let row;
let cell;
let mine;
const CODE = {
  NORMAL: -1,
  QUESTION: -2,
  FLAG: -3,
  QUESTION_MINE: -4,
  FLAG_MINE: -5,
  MINE: -6,
  OPENED: 0,
}

let data;
let openCount;
let startTime;
let interval;

function onSubmit(event) {
  event.preventDefault();
  row = parseInt(event.target.row.value);
  cell = parseInt(event.target.cell.value);
  mine = parseInt(event.target.mine.value);
  openCount = 0;
  clearInterval(interval);
  tbody.innerHTML = '';
  drawTable();
  firstClick = true;
  startTime = new Date();
  interval = setInterval(() => {
    const time = Math.floor((new Date() - startTime) / 1000);
    timer.textContent = `${time}초`;
  }, 1000);
}

form.addEventListener('submit', onSubmit);

function plantMine() {
  const candidate = Array(row * cell).fill().map((arr, i) => {
    return i;
  });
  const shuffle = [];
  while (candidate.length > row * cell - mine) {
    const chosen = candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0];
    shuffle.push(chosen);
  }
  const data = [];
  for (let i = 0; i < row; i++) {
    const rowData = [];
    data.push(rowData);
    for (let j = 0; j < cell; j++) {
      rowData.push(CODE.NORMAL);
    }
  }
  for (let k = 0; k < shuffle.length; k++) {
    // 몇 번 째 줄인지 알아내기
    const ver = Math.floor(shuffle[k] / cell);
    const hor = shuffle[k] % cell;
    data[ver][hor] = CODE.MINE;
  }
  return data;
}

function onRightClick(event) {
  event.preventDefault();
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  const cellData = data[rowIndex][cellIndex];
  // 지뢰라면
  if (cellData === CODE.MINE) {
    // 물음표 지뢰로
    data[rowIndex][cellIndex] = CODE.QUESTION_MINE;
    target.className = 'question';
    target.textContent = '?';
    // 물음표 지뢰라면
  } else if (cellData === CODE.QUESTION_MINE) {
    // 깃발 지뢰로
    data[rowIndex][cellIndex] = CODE.FLAG_MINE;
    target.className = 'flag';
    target.textContent = '!';
    // 깃발 지뢰라면
  } else if (cellData === CODE.FLAG_MINE) {
    // 지뢰로
    data[rowIndex][cellIndex] = CODE.MINE;
    target.className = '';
    // 닫힌 칸이라면
  } else if (cellData === CODE.NORMAL) {
    // 물음표로
    data[rowIndex][cellIndex] = CODE.QUESTION;
    target.className = 'question';
    target.textContent = '?';
    // 물음표라면
  } else if (cellData === CODE.QUESTION) {
    // 깃발로
    data[rowIndex][cellIndex] = CODE.FLAG;
    target.className = 'flag';
    target.textContent = '!';
    // 깃발이라면
  } else if (cellData === CODE.FLAG) {
    // 닫힌칸으로
    data[rowIndex][cellIndex] = CODE.NORMAL;
    target.className = '';
    target.textContent = '';
  }
}

// 1 2 3
// 4 5 6
// 7 8 9

function countMine(rowIndex, cellIndex) {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  let i = 0;
  // 내가 5번칸일 때 1번이 된다
  mines.includes(data[rowIndex - 1]?.[cellIndex - 1] && i++);
  // 2번칸
  mines.includes(data[rowIndex - 1]?.[cellIndex] && i++);
  // 3번칸
  mines.includes(data[rowIndex - 1]?.[cellIndex + 1] && i++);
  // 4번칸
  mines.includes(data[rowIndex]?.[cellIndex - 1] && i++);
  // 6번칸
  mines.includes(data[rowIndex]?.[cellIndex - 1] && i++);
  // 7번칸
  mines.includes(data[rowIndex + 1]?.[cellIndex - 1] && i++);
  // 8번칸
  mines.includes(data[rowIndex + 1]?.[cellIndex] && i++);
  // 9번칸
  mines.includes(data[rowIndex + 1]?.[cellIndex + 1] && i++);
  return i;
}

function open(rowIndex, cellIndex) {
  if (data[rowIndex]?.[cellIndex] >= CODE.OPENED) return;
  // 이미 연 칸은 다시 열지 않게 하기 위함
  const target = tbody.children[rowIndex]?.children[cellIndex];
  if (!target) {
    return;
  }
  const count = countMine(rowIndex, cellIndex);
  // target.textContent = count || '';
  target.className = 'opened';
  data[rowIndex][cellIndex] = count;
  openCount++;
  if (openCount === row * cell - mine) {
    const time = (new Date() - startTime) / 1000;
    clearInterval(interval);
    tbody.removeEventListener('contextmenu', onRightClick);
    tbody.removeEventListener('click', onLeftClick);
    setTimeout(() => {
      alert(`게임 승리 ! ${time}초 걸렸습니다`)
      window.close();
    }, 500);
  }
  return count;
}

function openAround(rI, cI) {
  setTimeout(() => {
    const count = open(rI, cI);
    if (count === 0) {
      openAround(rI - 1, cI - 1);
      openAround(rI - 1, cI);
      openAround(rI - 1, cI + 1);
      openAround(rI, cI - 1);
      openAround(rI, cI + 1);
      openAround(rI + 1, cI - 1);
      openAround(rI + 1, cI);
      openAround(rI + 1, cI + 1);
    }
  }, 0)
}

let normalCellFound = false;
let searched;
let firstClick = true;

function transferMine(rI, cI) {
  if (normalCellFound) return;
  if (rI < 0 || rI >= row || cI < 0 || cI >= cell) return;
  if (searched[rI][cI]) return;
  if (data[rI][cI] === CODE.NORMAL) {
    normalCellFound = true;
    data[rI][cI] = CODE.MINE;
  } else {
    searched[rI][cI] = true;
    transferMine(rI - 1, cI - 1);
    transferMine(rI - 1, cI);
    transferMine(rI - 1, cI + 1);
    transferMine(rI, cI - 1);
    transferMine(rI, cI + 1);
    transferMine(rI + 1, cI - 1);
    transferMine(rI + 1, cI);
    transferMine(rI + 1, cI + 1);
  }
}

function showMines() {
  const mines = [CODE.MINE, CODE.QUESTION_MINE, CODE.FLAG_MINE];
  data.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (mines.includes(cell)) {
        tbody.children[rowIndex].children[cellIndex].textContent = 'X'
      }
    });
  });
}

function onLeftClick(event) {
  const target = event.target;
  const rowIndex = target.parentNode.rowIndex;
  const cellIndex = target.cellIndex;
  let cellData = data[rowIndex][cellIndex];
  if (firstClick) {
    firstClick = false;
    searched = Array(row).fill().map(() => []);
    // 첫 클릭이 지뢰라면
    if (cellData === CODE.MINE) {
      transferMine(rowIndex, cellIndex);
      data[rowIndex][cellIndex] = CODE.NORMAL;
      cellData = CODE.NORMAL;
    }
  }
  // 닫힌 칸이라면
  if (cellData === CODE.NORMAL) {
    openAround(rowIndex, cellIndex);
  } else if (cellData === CODE.MINE) {
    showMines();
    target.textContent('펑');
    target.className = 'opened';
    clearInterval(interval);
    tbody.removeEventListener('contextmenu', onRightClick);
    tbody.removeEventListener('click', onLeftClick);
  }
}

function drawTable() {
  data = plantMine();
  data.forEach((row) => {
    const tr = document.createElement('tr');
    row.forEach((cell) => {
      const td = document.createElement('td');
      if (cell === CODE.MINE) {}
      tr.append(td);
    });
    tbody.append(tr);
    tbody.addEventListener('contextmenu', onRightClick);
    tbody.addEventListener('click', onLeftClick);
  });
}