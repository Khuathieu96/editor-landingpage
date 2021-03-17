import React from 'react';
import { Shape } from 'react-konva';
import { PieceType } from '../../types/types';
import { renderTiles } from '../../utils/frames';

type PieceProps = {
  pieces: PieceType[];
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
};

const Pieces = ({ pieces, handleDragStart, handleDragEnd }: PieceProps) => {
  return (
    <>
      {pieces.map((piece) => (
        <Shape
          key={piece.id}
          id={piece.id}
          fill={piece.fillColor}
          draggable={true}
          x={piece.x}
          width={50}
          height={50}
          y={piece.y}
          sceneFunc={(context, shape) => {
            const widthTile = 50 / 3;
            context.beginPath();
            context.moveTo(0, 0);
            renderTiles(context, widthTile, 0, 0, piece.edgeType);

            context.closePath();
            context.fillStrokeShape(shape);
          }}
          stroke='black'
          strokeWidth={0.5}
          shadowBlur={piece.isDragging ? 10 : 0}
          shadowOpacity={piece.isDragging ? 0.6 : 0}
          shadowOffsetX={piece.isDragging ? 10 : 5}
          shadowOffsetY={piece.isDragging ? 10 : 5}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        />
      ))}
    </>
  );
};

export default Pieces;
