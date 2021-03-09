import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';
import { MiniBar } from './components/MiniBar';

type BoardProps = {
  board: { stageScale: number; width: number; height: number };
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
}: BoardProps) => {
  const [zoom, setZoom] = useState<zoomState>({
    x: 1,
    y: 1,
    id: 'zoom',
  });

  const handleClickZoom = (e: any) => {
    setZoom((prevState) => ({
      ...prevState,
      x: e.evt.offsetX * 4 - 500 / 2,
      y: e.evt.offsetY * 4 - 500 / 2,
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
        // width: 270,
        // height: 220,
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
          style={{ background: 'yellow' }}
        >
          <Layer>
            {stars.map((star) => {
              console.log('minStarX', minStarX, board.stageScale);

              console.log('fasdfdas', (star.x - minStarX) / board.stageScale);
              return (
                <Rect
                  key={star.id}
                  id={star.id}
                  x={(star.x - minStarX) / board.stageScale}
                  y={(star.y - minStarY) / board.stageScale}
                  width={50 / board.stageScale}
                  height={50 / board.stageScale}
                  fill='red'
                />
              );
            })}
          </Layer>
        </Stage>
      </div>

      {/* <Stage
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
            width={500 / 4}
            height={500 / 4}
            stroke={'black'}
            strokeWidth={1}
            draggable
            // onDragStart={handleDragStart}
            // onDragEnd={handleDragEnd}
          />
        </Layer>
      </Stage> */}

      <div>
        <MiniBar />
      </div>
    </div>
  );
};

export default MiniMap;
