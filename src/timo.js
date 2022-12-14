let timo = document.getElementById("timo");
let body = document.querySelector("body");
let bodyX = document.body.clientWidth;
let bodyY = document.body.clientHeight;
console.log();
var rafId = null;
let ex = 0;
let ey = 0;
let speed = 10;
let speedX = 0;
let speedY = 0;

// 投掷物变量
let missileId = null;
let difficult = 10;
let difficultSpeedX = 0;
let difficultSpeedY = 0;

// 时间，
let time = 0;

function render (pOrNX, pOrNY) {
  let newLeft = getPosition(timo.style.left) + (pOrNX ? speedX : -speedX);
  let newTop = getPosition(timo.style.top) + (pOrNY ? speedY : -speedY);

  timo.style.left = ` ${newLeft}px`;
  timo.style.top = ` ${newTop}px`;
}

//requestAnimationFrame效果
function animloop (pOrNX, pOrNY) {
  render(pOrNX, pOrNY);
  rafId = requestAnimationFrame(() => {
    animloop(pOrNX, pOrNY);
  });
  let elmX = getPosition(timo.style.left);
  let elmY = getPosition(timo.style.top);
  if (
    elmX <= ex + 10 &&
    elmX >= ex - 10 &&
    elmY <= ey + 10 &&
    elmY >= ey - 10
  ) {
    cancelAnimationFrame(rafId);
  }
}


function newGame () {
  time = new Date().getTime();
  rafId = null;
  ex = 0;
  ey = 0;
  speed = 10;
  speedX = 0;
  speedY = 0;
  difficult = 10;
  difficultSpeedX = 0;
  difficultSpeedY = 0;
  let left = bodyX / 2 - 50;
  let top = bodyY - 300;
  console.log(left, top);
  timo.style.left = `${left}px`;
  timo.style.top = `${top}px`;
  gameBegin();
}

function gameBegin () {
  let begin = document.querySelector(".begin");
  begin.addEventListener("click", beginClick);
}

function beginClick () {
  let begin = document.querySelector(".begin");
  begin.style.display = "none";
  let timer = setTimeout(() => {
    timer = null;
    characterInit();
    missileInit();
  }, 30);
}

function missileRender (missile, missileEnd, pOrNX, pOrNY) {
  let newLeft =
    getPosition(missile.style.left) +
    +(pOrNX ? difficultSpeedX : -difficultSpeedX);
  let newBottom =
    getPosition(missile.style.bottom) +
    (pOrNY ? difficultSpeedY : -difficultSpeedY);
  missile.style.left = setPosition(newLeft);
  missile.style.bottom = setPosition(newBottom);
  missileId = requestAnimationFrame(() => {
    let timer = document.querySelector(".time");
    timer.innerHTML = getScore();
    missileRender(missile, missileEnd, pOrNX, pOrNY);
  });
  collisionDetection(missile);
  if (
    getPosition(missile.style.left) +
    getPosition(missile.clientWidth) +
    20 >
    missileEnd[0]
  ) {
    console.log("end");
    body.removeChild(missile);
    cancelAnimationFrame(missileId);
    missileInit();
  }
}

function missileInit () {
  if (getScore() > 5000) {
    log("难度升级，二级难度");
    document.styleSheets[0].addRule(
      ".missile",
      "background-color: rgb(220, 169, 169)"
    );
    difficult = 20;
  }
  if (getScore() > 10000) {
    log("难度升级，三级难度");
    document.styleSheets[0].addRule(
      ".missile",
      "background-color: rgb(216, 130, 130)"
    );
    difficult = 30;
  }
  if (getScore() > 20000) {
    log("难度升级，四级难度");
    document.styleSheets[0].addRule(
      ".missile",
      "background-color: rgb(213, 94, 94)"
    );

    difficult = 40;
  }
  if (getScore() > 40000) {
    log("难度升级，五级难度");
    document.styleSheets[0].addRule(
      ".missile",
      "background-color: rgb(212, 56, 56)"
    );
    difficult = 50;
  }
  let beginY = randomRange(1, bodyY);
  let endY = randomRange(1, bodyY);
  let missileBegin = [0, beginY];
  let missileEnd = [bodyX, endY];
  let transFormX = missileEnd[0] - missileBegin[0];
  let transFormY = missileEnd[1] - missileBegin[1];

  let missileTransFormX = Math.pow(transFormX, 2);
  let missileTransFormY = Math.pow(transFormY, 2);
  let difficultPow = Math.pow(difficult, 2);
  difficultSpeedX = Math.sqrt(
    (missileTransFormX / (missileTransFormX + missileTransFormY)) *
    difficultPow
  );
  difficultSpeedY = Math.sqrt(
    (missileTransFormY / (missileTransFormY + missileTransFormX)) *
    difficultPow
  );
  let missile = document.createElement("div");
  missile.className = "missile";
  missile.style.cssText = `
          position: absolute;
          left: ${missileBegin[0]}px;
          bottom: ${missileBegin[1]}px;
        `;
  body.appendChild(missile);
  missileRender(
    missile,
    missileEnd,
    missileEnd[0] - missileBegin[0] > 0,
    missileEnd[1] - missileBegin[1] > 0
  );
}

function characterInit () {
  window.addEventListener("click", windowClick);
}

function windowClick (e) {
  cancelAnimationFrame(rafId);
  ex = e.x - timo.clientWidth / 2;
  ey = e.y - timo.clientHeight / 2;
  let transFormX = ex - getPosition(timo.style.left);
  let transFormY = ey - getPosition(timo.style.top);

  let squareTransFormX = Math.pow(transFormX, 2);
  let squareTransFormY = Math.pow(transFormY, 2);
  let squareSpeed = Math.pow(speed, 2);
  speedX = Math.sqrt(
    (squareTransFormX / (squareTransFormX + squareTransFormY)) *
    squareSpeed
  );
  speedY = Math.sqrt(
    (squareTransFormY / (squareTransFormY + squareTransFormX)) *
    squareSpeed
  );
  animloop(
    ex - getPosition(timo.style.left) > 0,
    ey - getPosition(timo.style.top) > 0
  );
}

function collisionDetection (missile) {
  let missileTL = [
    getPosition(missile.style.left) + 10,
    getPosition(missile.style.bottom) - 10,
  ];
  let missileTR = [
    getPosition(missile.style.left) + 50,
    getPosition(missile.style.bottom) - 10,
  ];
  let missileBL = [
    getPosition(missile.style.left) + 10,
    getPosition(missile.style.bottom) - 50,
  ];
  let missileBR = [
    getPosition(missile.style.left) + 50,
    getPosition(missile.style.bottom) - 50,
  ];

  let timoBottom = bodyY - getPosition(timo.style.top);
  let timoTL = [getPosition(timo.style.left) + 20, timoBottom - 90];
  let timoTR = [getPosition(timo.style.left) + 80, timoBottom - 90];
  let timoBL = [getPosition(timo.style.left) + 20, timoBottom - 180];
  let timoBR = [getPosition(timo.style.left) + 80, timoBottom - 180];

  function TR () {
    return (
      missileTL[0] <= timoTR[0] &&
      missileBR[0] >= timoTR[0] &&
      missileTL[1] >= timoTR[1] &&
      missileBR[1] <= timoTR[1]
    );
  }
  function TL () {
    return (
      missileTL[0] <= timoTL[0] &&
      missileBR[0] >= timoTL[0] &&
      missileTL[1] >= timoTL[1] &&
      missileBR[1] <= timoTL[1]
    );
  }
  function BR () {
    return (
      missileTL[0] <= timoBR[0] &&
      missileBR[0] >= timoBR[0] &&
      missileTL[1] >= timoBR[1] &&
      missileBR[1] <= timoBR[1]
    );
  }
  function BL () {
    return (
      missileTL[0] <= timoBL[0] &&
      missileBR[0] >= timoBL[0] &&
      missileTL[1] >= timoBL[1] &&
      missileBR[1] <= timoBL[1]
    );
  }
  if (TR() || TL() || BR() || BL()) {
    gameEnd();
  }
}

function getScore () {
  let data = new Date();
  return data.getTime() - time;
}

function gameEnd () {
  alert("最终成绩为" + getScore());
  let begin = document.querySelector(".begin");
  let timer = document.querySelector(".time");
  timer.innerHTML = "0";
  time = 0;
  let missileArr = document.querySelectorAll(".missile");
  missileArr.forEach((item) => {
    body.removeChild(item);
  });
  begin.style.display = "block";
  cancelAnimationFrame(rafId);
  cancelAnimationFrame(missileId);
  begin.removeEventListener("click", beginClick);
  window.removeEventListener("click", windowClick);
  newGame();
}

function log (a) {
  console.log(a);
}

function randomRange (min, max) {
  // min最小值，max最大值
  return Math.floor(Math.random() * (max - min)) + min;
}

function getPosition (str) {
  return parseFloat(str) || 0;
}

function setPosition (num) {
  return `${num}px`;
}

newGame();