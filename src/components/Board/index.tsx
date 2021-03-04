import React, { useState } from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

function generateShapes() {
  return [...Array(10)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    // rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Board = () => {
  const [stars, setStars] = useState(INITIAL_STATE);
  const [board, setBoard] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0,
  });

  const handleDragStart = (e: any) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      }),
    );
  };

  const handleDragEnd = () => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      }),
    );
  };

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.3;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };
    if (e.evt.deltaY > 0) {
      console.log('zoom out', oldScale * scaleBy);
    } else {
      console.log('zoom In', oldScale * scaleBy);
    }

    const newScale = e.evt.deltaY > 0 ? oldScale * scaleBy : oldScale / scaleBy;

    stage.scale({ x: newScale, y: newScale });

    setBoard({
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    });
  };

  return (
    <Stage
      width={window.innerWidth * 2}
      height={window.innerHeight * 2}
      scaleX={board.stageScale}
      scaleY={board.stageScale}
      x={board.stageX}
      y={board.stageY}
      onWheel={handleWheel}
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
            draggable
            // rotation={star.rotation}
            shadowColor='black'
            shadowBlur={star.isDragging ? 10 : 0}
            shadowOpacity={star.isDragging ? 0.6 : 0}
            shadowOffsetX={star.isDragging ? 10 : 5}
            shadowOffsetY={star.isDragging ? 10 : 5}
            // scaleX={star.isDragging ? 1.2 : 1}
            // scaleY={star.isDragging ? 1.2 : 1}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          />
        ))}
      </Layer>
    </Stage>
  );
};

export default Board;
