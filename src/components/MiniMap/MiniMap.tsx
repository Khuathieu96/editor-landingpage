import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { Stars } from '../../types/types';
import { MiniBar } from './components/MiniBar';

type BoardProps = {
  board: { stageScale: number; width: number; height: number };
  stars: Stars[];
  stageScale: number;
  handleWheel: (e: any) => void;
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
};

type zoomState = {
  x: number;
  y: number;
  id: string;
};

const MiniMap = ({
  board,
  stars,
  handleWheel,
  handleDragStart,
  handleDragEnd,
  stageScale,
}: BoardProps) => {
  const [zoom, setZoom] = useState<zoomState>({
    x: 1,
    y: 1,
    id: 'zoom',
  });

  const handleClickZoom = (e: any) => {
    if (e.target.getType() === 'Stage')
      setZoom((prevState) => ({
        ...prevState,
        x: e.evt.offsetX - 100 / 2,
        y: e.evt.offsetY - 100 / 2,
      }));
  };
  const minStarX = Math.min(...stars.map((item) => item.x));
  const minStarY = Math.min(...stars.map((item) => item.y));

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
      <div
        style={{
          width: 300,
          height: 150,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Stage
          width={board.width}
          height={board.height}
          scaleX={board.stageScale}
          scaleY={board.stageScale}
          // onWheel={handleWheel}
          draggable={true}
        >
          <Layer>
            {stars.map((star) => (
              <Rect
                key={star.id}
                id={star.id}
                x={star.x - minStarX}
                y={star.y - minStarY}
                width={star.width}
                height={star.height}
                fill={star.fillColor}
              />
            ))}
          </Layer>
        </Stage>
      </div>

      <Stage
        style={{ position: 'absolute', top: 0, left: 0 }}
        width={300}
        height={150}
        onClick={handleClickZoom}
      >
        <Layer>
          <Rect
            key={zoom.id}
            id={zoom.id}
            x={zoom.x}
            y={zoom.y}
            width={window.innerWidth / stageScale / 10}
            height={window.innerHeight / stageScale / 10}
            stroke={'black'}
            strokeWidth={1}
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
