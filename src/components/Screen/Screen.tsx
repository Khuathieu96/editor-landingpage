import React, { useState, useRef, useEffect } from 'react';
import Board from '../Board';
import MiniMap from '../MiniMap';
import { Stars } from '../../types/types';

function generateShapes() {
  return [
    {
      id: 'frame',
      x: (window.innerWidth - 1000) / 2,
      y: (window.innerHeight - 500) / 2,
      width: 1000,
      height: 500,
      fillColor: '#de9191',
      draggable: false,
      isDragging: false,
    },
    ...[...Array(10)].map((_, i) => ({
      id: i.toString(),
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      width: 50,
      height: 50,
      draggable: true,
      fillColor: i % 3 === 0 ? '#84ce90' : i % 3 === 1 ? '#d5d690' : 'grey',
      isDragging: false,
    })),
  ];
}

const INITIAL_STATE = generateShapes();

const Screen: React.FC = () => {
  const [stars, setStars] = useState<Stars[]>(INITIAL_STATE);
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

    const indexStarSelected = stars.findIndex((item) => item.id === id);
    const stareSelected = stars.find((item) => item.id === id);

    if (stareSelected) {
      const sortedStars: Stars[] = [
        ...stars.slice(0, indexStarSelected),
        ...stars.slice(indexStarSelected + 1, stars.length + 1),
        { ...stareSelected, isDragging: true },
      ];

      setStars(sortedStars);
    }
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
        if (e.target.attrs.id === star.id) {
          return {
            ...star,
            x: e.target.attrs.x,
            y: e.target.attrs.y,
          };
        }
        return star;
      }),
    );

    const { width, height } = inputEl.current.getClientRect({
      skipTransform: true,
    });
    if (2 * height > width) {
      setMiniBoard({
        width: (width * 150) / height,
        height: 150,
        stageScale: 150 / height,
      });
    } else {
      setMiniBoard({
        width: 300,
        height: (height * 300) / width,
        stageScale: 300 / width,
      });
    }
  };

  const onDragEndStage = () => {
    const { width, height } = inputEl.current.getClientRect({
      skipTransform: true,
    });
    if (2 * height > width) {
      setMiniBoard({
        width: (width * 150) / height,
        height: 150,
        stageScale: 150 / height,
      });
    } else {
      setMiniBoard({
        width: 300,
        height: (height * 300) / width,
        stageScale: 300 / width,
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
        // onDragEndStage={onDragEndStage}
        inputEl={inputEl}
      />
      <MiniMap
        stageScale={board.stageScale}
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
