import React from 'react';
import { Group, Shape, Image } from 'react-konva';
import useImage from 'use-image';
import { WIDTH_TILE } from '../../types/constants';
import { Frame } from '../../types/types';
import { renderTiles } from '../../utils/frames';

type FrameProps = {
  frames: Frame[];
};

const Frames = ({ frames }: FrameProps) => {
  const [image, status] = useImage(
    'https://www.commercialintegrator.com/wp-content/uploads/2020/04/EUjK4szU0AEn88O-1.jpg',
  );

  return (
    <>
      {status === 'loaded' &&
        frames.map((frame, index) => {
          const indexCol = Math.floor(index % 20);
          const indexRow = Math.floor(index / 20);

          const xImage = frame.x - frames[0].x;
          const yImage = frame.y - frames[0].y;
          return (
            <Group
              key={frame.id}
              x={frame.x}
              width={WIDTH_TILE}
              height={WIDTH_TILE}
              y={frame.y}
              id={frame.id}
              clipFunc={(context: any) => {
                const widthTile = WIDTH_TILE / 3;
                context.beginPath();
                context.moveTo(0, 0);
                renderTiles(context, widthTile, 0, 0, frame.edgeType);
                context.closePath();
              }}
            >
              <Image
                x={-10}
                y={-10}
                crop={{
                  x: xImage - 10,
                  y: yImage - 10,
                  width: 70,
                  height: 70,
                }}
                width={70}
                height={70}
                image={image}
                opacity={0.3}
              />
              <Shape
                key={frame.id}
                id={frame.id}
           
                sceneFunc={(context, shape) => {
                  const widthTile = WIDTH_TILE / 3;
                  context.beginPath();
                  context.moveTo(0, 0);
                  renderTiles(context, widthTile, 0, 0, frame.edgeType);

                  context.closePath();
                  context.fillStrokeShape(shape);
                }}
                stroke={frame.strokeColor}
                strokeWidth={frame.strokeWidth}
              />
            </Group>
          );
        })}
    </>
  );
};

export default Frames;
