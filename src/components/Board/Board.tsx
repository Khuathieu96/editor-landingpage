import React from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import { Piece, Frame } from '../../types/types';
import { Frames } from '../Frames';

type BoardProps = {
  board: {
    stageScale: number;
    height: number;
    width: number;
    stageX: number;
    stageY: number;
  };
  pieces: Piece[];
  frames: Frame[];
  handleWheel: (e: any) => void;
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
  handleDragMove: (e: any) => void;
  // onDragEndStage: (e: any) => void;
  inputEl: any;
};

const Board = ({
  board,
  pieces,
  frames,
  handleWheel,
  handleDragStart,
  handleDragEnd,
  handleDragMove,
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
      onDragMove={handleDragMove}
      // onDragEnd={onDragEndStage}
    >
      <Layer ref={inputEl} width={1000}>
        <Frames frames={frames} />
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
