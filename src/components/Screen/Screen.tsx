import React, { useState, useRef, useEffect } from 'react';
import Board from '../Board';
import MiniMap from '../MiniMap';
import { PieceType, Frame, zoomState } from '../../types/types';
import { NUMBER_COLUMNS, WIDTH_TILE, NUMBER_ROWS } from '../../types/constants';
import { generateFrame } from '../../utils/frames';
import { checkPuzzleAnswers, generateShapes } from '../../utils/screen';
import { Setting } from '../Setting';
import { Dialog } from '../Dialog';
import MusicBackground from '../MusicBackground';

const INITIAL_STATE = generateShapes();
const INITIAL_FRAMES = generateFrame();
const framesLocalStorage = localStorage.getItem('frames');
const piecesLocalStorage = localStorage.getItem('pieces');

const Screen: React.FC = () => {
  const [pieces, setPieces] = useState<PieceType[]>(
    (piecesLocalStorage && JSON.parse(piecesLocalStorage)) || INITIAL_STATE,
  );
  const [frames, setFrames] = useState<Frame[]>(
    (framesLocalStorage && JSON.parse(framesLocalStorage)) || INITIAL_FRAMES,
  );

  const [isFinish, setIsFinish] = useState(false);
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

  const handleDragStart = (e: any) => {
    const id = e.target.id();
    const indexStarSelected = pieces.findIndex((item) => item.id === id);
    const pieceSelected = pieces.find((item) => item.id === id);

    if (pieceSelected) {
      const sortedPiece: PieceType[] = [
        ...pieces.slice(0, indexStarSelected),
        ...pieces.slice(indexStarSelected + 1, pieces.length + 1),
        { ...pieceSelected, isDragging: true },
      ];

      setPieces(sortedPiece);
    }
  };

  const handleDragEnd = (e: any) => {
    const { x, y } = e.target.attrs;
    const { id } = e.target.attrs;
    const selectedFrames = frames.find(
      (frame) => Math.abs(frame.x - x) < 25 && Math.abs(frame.y - y) < 25,
    );

    const indexRowSelectedFrame = selectedFrames
      ? Math.floor(parseInt(selectedFrames.id, 10) / NUMBER_COLUMNS) + 1
      : 0;

    if (e.target.getType() !== 'Stage') {
      const newPiece = pieces.map((piece) => {
        if (selectedFrames && piece.id === id) {
          if (
            JSON.stringify(piece.edgeType) ===
            JSON.stringify(selectedFrames.edgeType)
          ) {
            return {
              ...piece,
              x: selectedFrames.x,
              y: selectedFrames.y,
              isDragging: false,
            };
          } else {
            return {
              ...piece,
              y:
                indexRowSelectedFrame < 6
                  ? selectedFrames.y -
                    indexRowSelectedFrame * WIDTH_TILE -
                    NUMBER_COLUMNS
                  : selectedFrames.y +
                    (NUMBER_ROWS - indexRowSelectedFrame + 1) * WIDTH_TILE +
                    NUMBER_COLUMNS,
              x: selectedFrames.x,
              isDragging: false,
            };
          }
        }
        return { ...piece, isDragging: false };
      });
      setPieces(newPiece);

      setFrames(
        frames.map((item) => ({
          ...item,
          strokeColor: 'black',
          strokeWidth: 0.5,
        })),
      );

      if (selectedFrames) {
        if (checkPuzzleAnswers(newPiece, frames)) setIsFinish(true);
      }
    }
  };

  const handleMoveOverFrames = (x: number, y: number) => {
    setFrames(
      frames.map((frame) => {
        if (
          Math.abs(frame.x - x) < 25 &&
          Math.abs(frame.y - y) < 25 // tinh gia tri width overlap va height overlap deu phai > 25
        ) {
          return {
            ...frame,
            strokeColor: 'red',
            strokeWidth: 3,
          };
        }
        return {
          ...frame,
          strokeColor: 'black',
          strokeWidth: 0.5,
        };
      }),
    );
  };

  const handleDragMove = (e: any) => {
    const { x, y } = e.target.attrs;
    if (e.target.getType() === 'Stage')
      setZoom({
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

    if (e.target.getType() !== 'Stage') handleMoveOverFrames(x, y);

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

  const handleZoom = (value: string) => {
    let newScale = 0;
    if (value === 'out') {
      newScale = Math.min(board.stageScale + 0.25, 5);
    } else if (value === 'in') {
      newScale = Math.max(board.stageScale - 0.25, 0.25);
    } else {
      newScale = 1;
    }

    const oldScale = board.stageScale;

    const mousePointTo = {
      x: window.innerWidth / 2 / oldScale - board.stageX / oldScale,
      y: window.innerHeight / 2 / oldScale - board.stageY / oldScale,
    };

    const newBoard = {
      ...board,
      stageScale: newScale,
      stageX: -(mousePointTo.x - window.innerWidth / 2 / newScale) * newScale,
      stageY: -(mousePointTo.y - window.innerHeight / 2 / newScale) * newScale,
    };

    setBoard(newBoard);
  };

  const handleWheel = (e: any) => {
    e.evt.preventDefault();

    const scaleBy = 1.25;
    const stage = e.target.getStage();
    const oldScale = stage.scaleX();
    const mousePointTo = {
      x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
      y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale,
    };

    const newScale =
      e.evt.deltaY > 0
        ? Math.min(oldScale * scaleBy, 5) // zoom out
        : Math.max(oldScale / scaleBy, 0.25);

    const newBoard = {
      ...board,
      stageScale: newScale,
      stageX:
        -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
      stageY:
        -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale,
    };

    // stage.scale({ x: newScale, y: newScale });

    setBoard(newBoard);

    setZoom({
      ...zoom,
      x: -(newBoard.stageX * miniBoard.miniBoardScale) / newScale,
      y: -(newBoard.stageY * miniBoard.miniBoardScale) / newScale,
    });
  };

  const handleDragMoveZoom = (e: any) => {
    setZoom((prevState) => ({ ...prevState, hidden: false }));
    setBoard((prevState) => ({
      ...prevState,
      stageX: (-e.target.attrs.x / miniBoard.miniBoardScale) * board.stageScale,
      stageY: (-e.target.attrs.y / miniBoard.miniBoardScale) * board.stageScale,
    }));
  };

  const handleClickZoom = (e: any) => {
    if (zoom.hidden) return setZoom({ ...zoom, hidden: false });
    if (e.target.getType() === 'Stage') {
      setBoard((prevState) => ({
        ...prevState,
        stageX: (-e.evt.offsetX / miniBoard.miniBoardScale) * board.stageScale,
        stageY: (-e.evt.offsetY / miniBoard.miniBoardScale) * board.stageScale,
      }));

      setZoom({
        ...zoom,
        hidden: false,
        x: e.evt.offsetX,
        y: e.evt.offsetY,
      });
    }
  };

  return (
    <div style={{ position: 'relative', overflow: 'hidden' }}>
      <Board
        board={board}
        pieces={pieces}
        frames={frames}
        handleWheel={handleWheel}
        handleDragStart={handleDragStart}
        handleDragEnd={handleDragEnd}
        handleDragMove={handleDragMove}
        // onDragEndStage={onDragEndStage}
        inputEl={inputEl}
      />
      <MiniMap
        stageScale={board.stageScale}
        miniBoard={miniBoard}
        pieces={pieces}
        frames={frames}
        handleClickZoom={handleClickZoom}
        zoom={zoom}
        handleDragMoveZoom={handleDragMoveZoom}
        handleZoom={handleZoom}
      />

      <Setting />

      <Dialog
        title='Congratulation'
        handleOk={() => {
          setIsFinish(false);
        }}
        handleCancel={() => setIsFinish(false)}
        visible={isFinish}
        content={<div>You win!!!!</div>}
      />
      <MusicBackground />
    </div>
  );
};

export default Screen;
