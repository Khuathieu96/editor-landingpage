import React, { useState, useRef } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

type BoardProps = {
  board: { stageScale: number; stageX: number; stageY: number };
  stars: {
    id: string;
    x: number;
    y: number;
    isDragging: boolean;
  }[];
  handleWheel: (e: any) => void;
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
  onDragMove: (e: any) => void;
  onDragEndStage: (e: any) => void;
  inputEl: any;
};

const Board = ({
  board,
  stars,
  handleWheel,
  handleDragStart,
  handleDragEnd,
  onDragMove,
  onDragEndStage,
  inputEl,
}: BoardProps) => {
  return (
    <Stage
      style={{ background: '#f2f2f2' }}
      width={window.innerWidth}
      height={window.innerHeight}
      scaleX={board.stageScale}
      scaleY={board.stageScale}
      x={board.stageX}
      y={board.stageY}
      onWheel={handleWheel}
      draggable={true}
      onDragMove={onDragMove}
      onDragEnd={onDragEndStage}
    >
      <Layer ref={inputEl} width={1000}>
        {stars.map((star) => (
          <Rect
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            width={50}
            height={50}
            fill='red'
            draggable
            shadowColor='black'
            shadowBlur={star.isDragging ? 10 : 0}
            shadowOpacity={star.isDragging ? 0.6 : 0}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Board;
