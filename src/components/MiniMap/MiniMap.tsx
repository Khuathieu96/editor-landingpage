import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { MiniBar } from './components/MiniBar';

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
};

const MiniMap = ({
  board,
  stars,
  handleWheel,
  handleDragStart,
  handleDragEnd,
}: BoardProps) => {
  return (
    <div
      style={{
        position: 'absolute',
        zIndex: 1,
        boxShadow: '0 8px 16px 0 rgb(0 0 0 / 12%)',
        background: 'white',
        borderRadius: 4,
        bottom: 20,
        right: 20,
      }}
    >
      <Stage
        width={window.innerWidth / 4}
        height={window.innerHeight / 4}
        scaleX={board.stageScale / 4}
        scaleY={board.stageScale / 4}
        x={board.stageX / 4}
        y={board.stageY / 4}
        // onWheel={handleWheel}
        // draggable={true}
      >
        <Layer>
          {stars.map((star) => (
            <Rect
              key={star.id}
              id={star.id}
              x={star.x}
              y={star.y}
              width={50}
              height={50}
              fill='red'
              // draggable
              // rotation={star.rotation}

              scaleX={star.isDragging ? 1.2 : 1}
              scaleY={star.isDragging ? 1.2 : 1}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
            />
          ))}
        </Layer>
      </Stage>

      <Stage
        style={{ position: 'absolute', top: 0, left: 0 }}
        width={window.innerWidth / 4}
        height={window.innerHeight / 4}
        scaleX={board.stageScale / 4}
        scaleY={board.stageScale / 4}
        x={board.stageX / 4}
        y={board.stageY / 4}
        // onWheel={handleWheel}
        // draggable={true}
      >
        <Layer>
          <Rect
            key={'star.id'}
            id={'star.id'}
            x={12}
            y={12}
            width={500}
            height={500}
            stroke={'black'}
            strokeWidth={2}
            draggable
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage>

      <div>
        <MiniBar />
      </div>
    </div>
  );
};

export default MiniMap;
