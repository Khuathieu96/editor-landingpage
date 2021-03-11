import React, { useState, useRef, useEffect } from 'react';
import Board from '../Board';
import MiniMap from '../MiniMap';
import { Piece, zoomState } from '../../types/types';

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
  const [pieces, setPieces] = useState<Piece[]>(INITIAL_STATE);
  const [board, setBoard] = useState({
    stageScale: 1,
    stageX: 0,
    stageY: 0,
    width: window.innerWidth,
    height: window.innerHeight,
  });
  const [miniBoard, setMiniBoard] = useState({
    width: 300,
    height: 150,
    miniBoardScale: 1,
  });
  const [zoom, setZoom] = useState<zoomState>({
    x: 0,
    y: 0,
    id: 'zoom',
    hidden: true,
  });
  const inputEl = useRef<any>(null);

  useEffect(() => {
    handleUpdateSizeMiniMap();
  }, []);

  window.onresize = function () {
    setBoard({
      ...board,
      width: window.innerWidth,
      height: window.innerHeight,
    });
  };

  const handleSetCoordinateZoom = (val: zoomState) => {
    setZoom(val);
  };

  const handleDragStart = (e: any) => {
    const id = e.target.id();

    const indexStarSelected = pieces.findIndex((item) => item.id === id);
    const pieceSelected = pieces.find((item) => item.id === id);

    if (pieceSelected) {
      const sortedPiece: Piece[] = [
        ...pieces.slice(0, indexStarSelected),
        ...pieces.slice(indexStarSelected + 1, pieces.length + 1),
        { ...pieceSelected, isDragging: true },
      ];

      setPieces(sortedPiece);
    }
  };

  const handleDragEnd = () => {
    setPieces(
      pieces.map((piece) => {
        return {
          ...piece,
          isDragging: false,
        };
      }),
    );
  };

  const onDragMove = (e: any) => {
    if (e.target.getType() === 'Stage')
      handleSetCoordinateZoom({
        ...zoom,
        x: (-e.target.attrs.x * miniBoard.miniBoardScale) / board.stageScale,
        y: (-e.target.attrs.y * miniBoard.miniBoardScale) / board.stageScale,
      });

    setPieces(
      pieces.map((piece) => {
        if (e.target.attrs.id === piece.id) {
          return {
            ...piece,
            x: e.target.attrs.x,
            y: e.target.attrs.y,
          };
        }
        return piece;
      }),
    );

    handleUpdateSizeMiniMap();
  };

  const handleUpdateSizeMiniMap = () => {
    const { width, height } = inputEl.current.getClientRect({
      skipTransform: true,
    });
    if (2 * height > width) {
      setMiniBoard({
        width: (width * 150) / height,
        height: 150,
        miniBoardScale: 150 / height,
      });
    } else {
      setMiniBoard({
        width: 300,
        height: (height * 300) / width,
        miniBoardScale: 300 / width,
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

    const newBoard = {
      ...board,
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };

    stage.scale({ x: newScale, y: newScale });

    setBoard(newBoard);

    handleSetCoordinateZoom({
      ...zoom,
      x: -(newBoard.stageX * miniBoard.miniBoardScale) / newScale,
      y: -(newBoard.stageY * miniBoard.miniBoardScale) / newScale,
    });
  };

  const handleDragStartZoom = () => {
    setZoom((prevState) => ({ ...prevState, hidden: false }));
  };

  const handleDragEndZoom = () => {
    setZoom((prevState) => ({ ...prevState, hidden: false }));
  };
  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Board
        board={board}
        pieces={pieces}
        handleWheel={handleWheel}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        onDragMove={onDragMove}
        // onDragEndStage={onDragEndStage}
        inputEl={inputEl}
      />
      <MiniMap
        stageScale={board.stageScale}
        miniBoard={miniBoard}
        pieces={pieces}
        handleSetCoordinateZoom={handleSetCoordinateZoom}
        zoom={zoom}
        handleDragStart={handleDragStartZoom}
        handleDragEnd={handleDragEndZoom}
      />
    </div>
  );
};

export default Screen;
