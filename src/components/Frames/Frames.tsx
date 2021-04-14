import { observer } from 'mobx-react-lite';
import React from 'react';
import { Group, Shape, Image } from 'react-konva';
import useImage from 'use-image';
import { useStores } from '../../store/useStore';
import { WIDTH_TILE } from '../../types/constants';
import { Frame } from '../../types/types';
import { renderTiles } from '../../utils/frames';

type FrameProps = {
  frames: Frame[];
};

const Frames = observer(({ frames }: FrameProps) => {
  const gameSettingStore = useStores();
  const [image, status] = useImage(gameSettingStore.IMAGE_URL);

  return (
    <>
      {status === 'loaded' &&
        frames.map((frame, index) => {
          const xImage = frame.x - frames[0].x;
          const yImage = frame.y - frames[0].y;
          return (
            <Group
              perfectDrawEnabled={false}
              transformsEnabled={'position'}
              listening={false}
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
                perfectDrawEnabled={false}
                listening={false}
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
                perfectDrawEnabled={false}
                listening={false}
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
});

export default Frames;
