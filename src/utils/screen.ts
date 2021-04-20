import { WIDTH_FRAMES, HEIGHT_FRAMES, WIDTH_TILE } from "../types/constants"
import { Frame, PieceType } from "../types/types"
import { calculateEdgeType } from "./frames"

const horizontalSpace = (window.innerWidth - WIDTH_FRAMES) / 2
const verticalSpace = (window.innerHeight - HEIGHT_FRAMES) / 2

const randomCoordinateAvoidFrames = (i: number) => {
  const randomIndex = Math.ceil(Math.random() * 4)
  const coordinateBasic: any = {
    1: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * verticalSpace - WIDTH_TILE,
    }, // top

    2: {
      x: Math.random() * horizontalSpace + horizontalSpace + WIDTH_FRAMES,
      y: Math.random() * window.innerHeight,
    },//right
    3: {
      x: Math.random() * window.innerWidth,
      y: Math.random() * verticalSpace + verticalSpace + HEIGHT_FRAMES,
    }, // bottom

    4: {
      x: Math.random() * horizontalSpace - WIDTH_TILE,
      y: Math.random() * window.innerHeight,
    } //left
  }
  return coordinateBasic[randomIndex]

}


export const generateShapes = (cols: number, rows: number) => {
  const tiles = cols * rows

  return [...Array(tiles)].map((_, i) => {

    const colIndex = Math.floor(i % cols);
    const rowIndex = Math.floor(i / rows);
    return ({
      id: i.toString() + "-piece",
      ...randomCoordinateAvoidFrames(i),
      draggable: true,
      fillColor: i % 3 === 0 ? '#84ce90' : i % 3 === 1 ? '#d5d690' : 'grey',
      isDragging: false,
      edgeType: {
        top: rowIndex === 0 ? 0 : -calculateEdgeType(colIndex, rowIndex),
        right:
          colIndex === cols - 1 ? 0 : calculateEdgeType(colIndex, rowIndex),
        bottom:
          rowIndex === rows - 1 ? 0 : -calculateEdgeType(colIndex, rowIndex),
        left: colIndex === 0 ? 0 : calculateEdgeType(colIndex, rowIndex)
      }
    })
  });
}

const arrayToObject = (pieces: any[]) =>
  pieces.reduce((acc, cur) => {
    const key = parseInt(cur.id, 10) + cur.x + cur.y
    acc[key] = key
    return acc
  }, {})


const objectToString = (object: object) => JSON.stringify(object)

export const checkPuzzleAnswers = (pieces: PieceType[], frames: Frame[]) =>
  objectToString(arrayToObject(pieces)) === objectToString(arrayToObject(frames))



