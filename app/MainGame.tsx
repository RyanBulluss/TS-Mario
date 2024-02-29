"use client";
import React, { useRef, useEffect, useState } from "react";
import { startingBoard, startingFloor, startingPlayer } from "./game-constants";

const MainGame = () => {
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(startingBoard);
  const [floor, setFloor] = useState(startingFloor);
  const [player, setPlayer] = useState(startingPlayer);

  function drawPiece(context: any, piece: any) {
    context.fillStyle = piece.color;
    context.fillRect(piece.x, piece.y, piece.width, piece.height);
  }

  useEffect(() => {
    const canvas: any = canvasRef.current;
    const context = canvas.getContext("2d");

    const interval = setInterval(() => {
      drawPiece(context, board);
      drawPiece(context, floor);
      drawPiece(context, player);
      setPlayer((p) => {
        const newPlayer = { ...p };
        if (player.y + player.height < floor.y) {
          newPlayer.fall();
          newPlayer.y += player.ySpeed;
        } else {
          if (newPlayer.ySpeed > 0) {
            newPlayer.ySpeed = 0;
            newPlayer.y = floor.y - player.height;
          } else {
            newPlayer.y += player.ySpeed;
          }
        }
        return newPlayer;
      });
    }, 16);

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player, floor, board]);

  const handleKeyDown = (event: any) => {
    if (event.key === "a") {
      setPlayer({ ...player, x: player.x - 10 });
    } else if (event.key === "d") {
      setPlayer({ ...player, x: player.x + 10 });
    } else if (event.key === " ") {
      setPlayer((p) => {
        if (player.ySpeed !== 0) return p;
        const newPlayer = { ...p };
        newPlayer.jump();
        console.log(player.ySpeed);
        return newPlayer;
      });
    }
  };

  return <canvas ref={canvasRef} width={800} height={600}></canvas>;
};

export default MainGame;
