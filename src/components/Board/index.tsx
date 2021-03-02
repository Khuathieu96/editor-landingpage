import React from 'react';
import { Stage, Layer, Rect, Text } from 'react-konva';

interface cardData {
  target: object;
}

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
  const [stars, setStars] = React.useState(INITIAL_STATE);

  const handleDragStart = (e : cardData) => {
    const id = e.target.id();
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: star.id === id,
        };
      })
    );
  };
  const handleDragEnd = () => {
    setStars(
      stars.map((star) => {
        return {
          ...star,
          isDragging: false,
        };
      })
    );
  };

  return (
    <>
     <div>something</div>
    <Stage width={window.innerWidth} height={window.innerHeight}>
      <Layer>
       
        <Text text="Try to drag a star" />
        {stars.map((star) => (
          <Rect
            key={star.id}
            id={star.id}
            x={star.x}
            y={star.y}
            width={50}
            height={50}
            fill="red"
            draggable
            // rotation={star.rotation}
            shadowColor="black"
            shadowBlur={star.isDragging && 10}
            shadowOpacity={star.isDragging && 0.6}
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
    </>
  );
};



export default Board;

