import React from 'react';
import { Shape } from 'react-konva';
import { Frame } from '../../types/types';
import { renderTiles } from '../../utils/frames';

type FrameProps = {
  frames: Frame[];
};

const Frames = ({ frames }: FrameProps) => {
  return (
    <>
      {frames.map((frame) => (
        <Shape
          key={frame.id}
          id={frame.id}
          fill={frame.fillColor}
          sceneFunc={(context, shape) => {
            const widthTile = 50 / 3;
            context.beginPath();
            context.moveTo(frame.x, frame.y);
            renderTiles(context, widthTile, frame.x, frame.y, frame.edgeType);

            context.closePath();
            context.fillStrokeShape(shape);
          }}
          stroke='black'
        />
      ))}
    </>
  );
};

export default Frames;
