"use client";
import React, { useRef, useEffect, useState } from "react";
import {
  startingBoard,
  startingFloor,
  startingPlayer,
  startingBlocks,
  createStairs
} from "./game-constants";

const MainGame = () => {
  const canvasRef = useRef(null);
  const [board, setBoard] = useState(startingBoard);
  const [floor, setFloor] = useState(startingFloor);
  const [player, setPlayer] = useState(startingPlayer);
  const [blocks, setBlocks] = useState(createStairs(5));

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

      movePlayer();
    }, 5);

    const handleKeyDown = (event: any) => {
      if (event.key === "a") {
        setPlayer({
          ...player,
          xSpeed: player.xSpeed < -5 ? player.xSpeed : -5,
        });
      } else if (event.key === "d") {
        setPlayer({
          ...player,
          xSpeed: player.xSpeed > 5 ? player.xSpeed : 5,
        });
      } else if (event.key === " ") {
        setPlayer((p) => {
          if (player.ySpeed !== 0) return p;
          const newPlayer = { ...p };
          newPlayer.jump();
          return newPlayer;
        });
      }
    };

    const handleKeyUp = (event: any) => {
      if (event.key === "a" || event.key === "d") {
        setPlayer({
          ...player,
          xSpeed: 0, // Stop movement when key is released
        });
      }
    };


    function movePlayer() {
      setPlayer((p) => {
        const newPlayer = { ...p };
        if (player.y + player.height < floor.y) {
          newPlayer.fall();
          newPlayer.y += player.ySpeed;
          newPlayer.x += player.xSpeed;
        } else {
          if (newPlayer.ySpeed > 0) {
            newPlayer.ySpeed = 0;
            newPlayer.y = floor.y - player.height;
          } else {
            newPlayer.y += player.ySpeed;
            newPlayer.x += player.xSpeed;
          }
        }
        return newPlayer;
      });
    }

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      clearInterval(interval);
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [player, floor, board]);

  return (
    <canvas ref={canvasRef} width={board.width} height={board.height}></canvas>
  );
};

export default MainGame;
