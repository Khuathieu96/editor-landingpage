import { NUMBER_TILES, NUMBER_COLUMNS, NUMBER_ROWS } from "../types/constants"
import { calculateEdgeType } from "./frames"

const horizontalSpace = (window.innerWidth - 1000) / 2
const verticalSpace = (window.innerHeight - 500) / 2

const randomCoordinateAvoidFrames = (i: number) => {
  const randomIndex = Math.ceil(Math.random() * 4)
  const coordinateBasic: any = {
    1: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * verticalSpace - 50,
    }, // top

    2: {
      x: Math.random() * horizontalSpace + horizontalSpace + 1000,
      y: Math.random() * window.innerHeight,
    },//right
    3: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * verticalSpace + verticalSpace + 500,
    }, // bottom

    4: {
      x: Math.random() * horizontalSpace - 50,
      y: Math.random() * window.innerHeight,
    } //left
  }
  return coordinateBasic[randomIndex]

}


export const generateShapes = () => {

  return [...Array(1)].map((_, i) => {

    const colIndex = Math.floor(i % NUMBER_COLUMNS);
    const rowIndex = Math.floor(i / NUMBER_COLUMNS);
    return ({
      id: "piece" + i.toString(),
      ...randomCoordinateAvoidFrames(i),
      draggable: true,
      fillColor: i % 3 === 0 ? '#84ce90' : i % 3 === 1 ? '#d5d690' : 'grey',
      isDragging: false,
      edgeType: {
        top: rowIndex === 0 ? 0 : -calculateEdgeType(colIndex, rowIndex),
        right:
          colIndex === NUMBER_COLUMNS - 1 ? 0 : calculateEdgeType(colIndex, rowIndex),
        bottom:
          rowIndex === NUMBER_ROWS - 1 ? 0 : -calculateEdgeType(colIndex, rowIndex),
        left: colIndex === 0 ? 0 : calculateEdgeType(colIndex, rowIndex)
      }
    })
  });
}