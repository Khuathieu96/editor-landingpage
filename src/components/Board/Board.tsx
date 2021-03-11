import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Piece } from '../../types/types';

type BoardProps = {
  board: {
    stageScale: number;
    height: number;
    width: number;
    stageX: number;
    stageY: number;
  };
  pieces: Piece[];
  handleWheel: (e: any) => void;
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
  onDragMove: (e: any) => void;
  // onDragEndStage: (e: any) => void;
  inputEl: any;
};

const Board = ({
  board,
  pieces,
  handleWheel,
  handleDragStart,
  handleDragEnd,
  onDragMove,
  // onDragEndStage,
  inputEl,
}: BoardProps) => {
  return (
    <Stage
      style={{
        background: '#f2f2f2',
        width: board.width,
        height: board.height,
      }}
      width={board.width}
      height={board.height}
      scaleX={board.stageScale}
      scaleY={board.stageScale}
      x={board.stageX}
      y={board.stageY}
      onWheel={handleWheel}
      draggable={true}
      onDragMove={onDragMove}
      // onDragEnd={onDragEndStage}
    >
      <Layer ref={inputEl} width={1000}>
        {pieces.map((piece) => (
          <Rect
            key={piece.id}
            id={piece.id}
            x={piece.x}
            y={piece.y}
            width={piece.width}
            height={piece.height}
            fill={piece.fillColor}
            draggable={piece.draggable}
            shadowColor='black'
            shadowBlur={piece.isDragging ? 10 : 0}
            shadowOpacity={piece.isDragging ? 0.6 : 0}
            shadowOffsetX={piece.isDragging ? 10 : 5}
            shadowOffsetY={piece.isDragging ? 10 : 5}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Board;
