const startingBoard = {
  x: 0,
  y: 0,
  height: 600,
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

export { startingBoard, startingFloor, startingPlayer };
