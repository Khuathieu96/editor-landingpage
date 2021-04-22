import { observer } from 'mobx-react-lite';
import React from 'react';
import { Shape, Group, Image } from 'react-konva';
import useImage from 'use-image';
import { useStores } from '../../store/useStore';
// import { useStores } from '../../store/useStore';
import { PieceType } from '../../types/types';
import { renderTiles } from '../../utils/frames';

type PieceProps = {
  pieces: PieceType[];
  handleDragStart: (e: any) => void;
  handleDragEnd: (e: any) => void;
};

const Pieces = observer(
  ({ pieces, handleDragStart, handleDragEnd }: PieceProps) => {
    const store = useStores();
    const [image, status] = useImage(store.currentGame?.image.url || '');

    return (
      <>
        {status &&
          pieces.map((piece, index) => {
            const indexCol = Math.floor(
              parseInt(piece.id, 10) % store?.currentGame?.cols,
            );
            const indexRow = Math.floor(
              parseInt(piece.id, 10) / store?.currentGame?.cols,
            );

            const wGroup =
              store?.currentGame?.image.width / store?.currentGame?.cols;
            const hGroup =
              store?.currentGame?.image.height / store?.currentGame?.rows;

            const xImage =
              (indexCol * store?.currentGame?.image.width) /
              store?.currentGame?.cols;
            const yImage =
              (indexRow * store?.currentGame?.image.height) /
              store?.currentGame?.rows;

            const widthTile = wGroup / 3;
            const heightTile = hGroup / 3;
            const concaveHeightOfTile = heightTile / 2;
            const concaveWidthOfTile = widthTile / 2;

            return (
              <Group
                perfectDrawEnabled={false}
                transformsEnabled={'position'}
                key={piece.id}
                x={piece.x}
                width={wGroup}
                height={hGroup}
                y={piece.y}
                id={piece.id}
                clipFunc={(context: any) => {
                  context.beginPath();
                  context.moveTo(0, 0);
                  renderTiles(
                    context,
                    widthTile,
                    heightTile,
                    0,
                    0,
                    piece.edgeType,
                  );
                  context.closePath();
                }}
                draggable={true}
                // shadowBlur={piece.isDragging ? 10 : 0}
                // shadowOpacity={piece.isDragging ? 0.6 : 0}
                // shadowOffsetX={piece.isDragging ? 10 : 5}
                // shadowOffsetY={piece.isDragging ? 10 : 5}
                onDragStart={handleDragStart}
                onDragEnd={handleDragEnd}
              >
                <Image
                  perfectDrawEnabled={false}
                  // listening={false}
                  x={-concaveWidthOfTile}
                  y={-concaveHeightOfTile}
                  crop={{
                    x: xImage - concaveWidthOfTile,
                    y: yImage - concaveHeightOfTile,
                    width: wGroup + concaveWidthOfTile * 2,
                    height: hGroup + concaveHeightOfTile * 2,
                  }}
                  width={wGroup + concaveWidthOfTile * 2}
                  height={hGroup + concaveHeightOfTile * 2}
                  image={image}
                />
                <Shape
                  perfectDrawEnabled={false}
                  listening={false}
                  key={piece.id}
                  id={piece.id}
                  sceneFunc={(context, shape) => {
                    context.beginPath();
                    context.moveTo(0, 0);
                    renderTiles(
                      context,
                      widthTile,
                      heightTile,
                      0,
                      0,
                      piece.edgeType,
                    );

                    context.closePath();
                    context.fillStrokeShape(shape);
                  }}
                  stroke='black'
                  strokeWidth={0.5}
                />
              </Group>
              // <Shape
              //   key={piece.id}
              //   id={piece.id}
              //   fill={piece.fillColor}
              //   draggable={true}
              //   x={piece.x}
              //   width={WIDTH_TILE}
              //   height={WIDTH_TILE}
              //   y={piece.y}
              //   sceneFunc={(context, shape) => {
              //     const widthTile = WIDTH_TILE / 3;
              //     context.beginPath();
              //     context.moveTo(0, 0);
              //     renderTiles(context, widthTile, 0, 0, piece.edgeType);

              //     context.closePath();
              //     context.fillStrokeShape(shape);
              //   }}
              //   stroke='black'
              //   strokeWidth={0.5}
              // shadowBlur={piece.isDragging ? 10 : 0}
              // shadowOpacity={piece.isDragging ? 0.6 : 0}
              // shadowOffsetX={piece.isDragging ? 10 : 5}
              // shadowOffsetY={piece.isDragging ? 10 : 5}
              // onDragStart={handleDragStart}
              // onDragEnd={handleDragEnd}
              // />
            );
          })}
      </>
    );
  },
);

export default Pieces;
