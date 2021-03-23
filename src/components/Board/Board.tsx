import React from 'react';
import { Stage, Layer } from 'react-konva';
import { PieceType, Frame } from '../../types/types';
import { Frames } from '../Frames';
import { Pieces } from '../Pieces';

type BoardProps = {
  board: {
    stageScale: number;
    height: number;
    width: number;
    stageX: number;
    stageY: number;
  };
  pieces: PieceType[];
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
      <Layer listening={false} transformsEnabled={'position'}>
        <Frames frames={frames} />
      </Layer>
      <Layer ref={inputEl} transformsEnabled={'position'}>
        <Pieces
          pieces={pieces}
          handleDragStart={handleDragStart}
          handleDragEnd={handleDragEnd}
        />
      </Layer>
    </Stage>
  );
};

export default Board;
