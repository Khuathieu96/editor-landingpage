import React, { useState, useRef, useEffect } from 'react';
import Board from '../Board';
import MiniMap from '../MiniMap';

function generateShapes() {
  return [...Array(2)].map((_, i) => ({
    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    // rotation: Math.random() * 180,
    isDragging: false,
  }));
}

const INITIAL_STATE = generateShapes();

const Screen: React.FC = () => {
  const [stars, setStars] = useState(INITIAL_STATE);
  const [board, setBoard] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0,
  });
  const [miniBoard, setMiniBoard] = useState({
    width: 300,
    height: 150,
    stageScale: 1,
  });
  const inputEl = useRef<any>(null);

  useEffect(() => {
    onDragEndStage();
  }, []);

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
  const onDragMove = (e: any) => {
    setStars(
      stars.map((star) => {
        if (e.target.attrs.id === star.id)
          return {
            ...star,
            x: e.target.attrs.x,
            y: e.target.attrs.y,
          };
        return star;
      }),
    );
  };

  const onDragEndStage = () => {
    const { width, height } = inputEl.current.getClientRect();
    const { width: widthBoard, height: heightBoard } = inputEl.current.size();
    // console.log('eeeeeeeee', width, height);
    // console.log('aaaaaaaaa', widthBoard, heightBoard);
    if (2 * height > width) {
      // console.log('aaaaaaaaa');
      setMiniBoard({
        width: (width * 150) / height,
        height: 150,
        stageScale: height / 150,
      });
    } else {
      setMiniBoard({
        width: 300,
        height: (height * 300) / width,
        stageScale: width / 300,
      });
    }
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

    const newScale =
      e.evt.deltaY > 0
        ? Math.min(oldScale * scaleBy, 10) // zoom out
        : Math.max(oldScale / scaleBy, 0.3);

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
    <div style={{ position: 'relative' }}>
      <Board
        board={board}
        stars={stars}
        handleWheel={handleWheel}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        onDragMove={onDragMove}
        onDragEndStage={onDragEndStage}
        inputEl={inputEl}
      />
      <MiniMap
        board={miniBoard}
        stars={stars}
        handleWheel={handleWheel}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
      />
    </div>
  );
};

export default Screen;
