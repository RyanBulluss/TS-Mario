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
    height: 300,
    width: 300,
    color: "brown",
  }
]

export { startingBoard, startingFloor, startingPlayer, startingBlocks };
