import { observer } from 'mobx-react-lite';
import React from 'react';
import { Group, Shape, Image } from 'react-konva';
import useImage from 'use-image';
import { useStores } from '../../store/useStore';
import { Frame } from '../../types/types';
import { renderTiles } from '../../utils/frames';

type FrameProps = {
  frames: Frame[];
};

const Frames = observer(({ frames }: FrameProps) => {
  const store = useStores();
  const [image, status] = useImage(store.currentGame?.image.url || '');

  return (
    <>
      {status &&
        frames.map((frame, index) => {
          const xImage = frame.x - frames[0].x;
          const yImage = frame.y - frames[0].y;

          const wGroup =
            store?.currentGame?.image.width / store?.currentGame?.cols;
          const hGroup =
            store?.currentGame?.image.height / store?.currentGame?.rows;

  
          const widthTile = wGroup / 3;
          const heightTile = hGroup / 3;
          const concaveHeightOfTile = heightTile / 2;
          const concaveWidthOfTile = widthTile / 2;
          return (
            <Group
              perfectDrawEnabled={false}
              transformsEnabled={'position'}
              listening={false}
              key={frame.id}
              x={frame.x}
              width={wGroup}
              height={hGroup}
              y={frame.y}
              id={frame.id}
              clipFunc={(context: any) => {
                context.beginPath();
                context.moveTo(0, 0);
                renderTiles(
                  context,
                  widthTile,
                  heightTile,
                  0,
                  0,
                  frame.edgeType,
                );
                context.closePath();
              }}
            >
              <Image
                perfectDrawEnabled={false}
                listening={false}
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
                opacity={0.3}
              />
              <Shape
                perfectDrawEnabled={false}
                listening={false}
                key={frame.id}
                id={frame.id}
                sceneFunc={(context, shape) => {
                  context.beginPath();
                  context.moveTo(0, 0);
                  renderTiles(
                    context,
                    widthTile,
                    heightTile,
                    0,
                    0,
                    frame.edgeType,
                  );

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
