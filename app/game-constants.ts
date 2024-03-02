const startingBoard = {
  x: 0,
  y: 0,
  height: 800,
  width: 800,
  color: "lightblue",
};

const startingFloor = {
  x: 0,
  y: startingBoard.height * 0.75,
  height: startingBoard.height * 0.25,
  width: startingBoard.width,
  color: "green",
};

const startingPlayer = {
  x: startingBoard.width / 3,
  y: 0,
  xSpeed: 0,
  ySpeed: 0,
  height: 60,
  width: 30,
  color: "red",
  jump() {
    return (this.ySpeed -= 10);
  },
  fall() {
    return (this.ySpeed += 0.2);
  },
};

const startingBlocks = [
  {
    x: startingFloor.width - 300,
    y: startingFloor.y - 300,
    height: 50,
    width: 50,
    color: "brown",
  },
];

function createStairs(num: number) {
  let arr = [];
  let y = 50;
  let x = 300;
  for (let i = 0; i < num; i++) {
    if (num % i === 0) {
      y += 50;
      x = 300;
    } else x -= 50

    arr.push({
      x: startingFloor.width - x,
      y: startingFloor.y - y,
      height: 50,
      width: 50,
      color: "brown",
    });
  }
  return arr;
}

export { startingBoard, startingFloor, startingPlayer, startingBlocks, createStairs };
