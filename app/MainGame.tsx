"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  startingBoard,
  startingFloor,
  startingPlayer,
  startingBlocks,
} from "./game-constants";

const MainGame = () => {
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(startingBoard);
  const [floor, setFloor] = useState(startingFloor);
  const [player, setPlayer] = useState(startingPlayer);
  const [blocks, setBlocks] = useState(startingBlocks);

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

      blocks.forEach((block) => {
        drawPiece(context, block);
      });

      playerGravity();
    }, 16);

    const handleKeyDown = (event: any) => {
      if (event.key === "a") {
        setPlayer({ ...player, x: player.x - 20 });
      } else if (event.key === "d") {
        setPlayer({ ...player, x: player.x + 20 });
      } else if (event.key === " ") {
        setPlayer((p) => {
          if (player.ySpeed !== 0) return p;
          const newPlayer = { ...p };
          newPlayer.jump();
          return newPlayer;
        });
      }
    };


    function playerGravity() {
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
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [player, floor, board]);

  return (
    <canvas ref={canvasRef} width={board.width} height={board.height}></canvas>
  );
};

export default MainGame;
