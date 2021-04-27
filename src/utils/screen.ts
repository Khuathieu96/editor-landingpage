import { Frame, PieceType } from "../types/types"
import { calculateEdgeType } from "./frames"

const randomIntFromInterval = (min: number, max: number) => { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min);
}

const randomCoordinate = (xmin: number, ymin: number, xmax: number, ymax: number, halfW: number, halfH: number, wTile: number, hTile: number, type: string) => {
  const coordinateBasic: any = {
    "T": {
      x: randomIntFromInterval(xmin - halfH, xmax + halfH),
      y: randomIntFromInterval(ymin - halfW, ymin) - hTile,
    }, // top

    "R": {
      x: randomIntFromInterval(xmax, xmax + halfH),
      y: randomIntFromInterval(ymin - halfH, ymax + halfH),
    }, //right
    "B": {
      x: randomIntFromInterval(xmin - halfH, xmax + halfH),
      y: randomIntFromInterval(ymax, ymax + halfW),
    }, // bottom
    "L": {
      x: randomIntFromInterval(xmin - halfH, xmin) - wTile,
      y: randomIntFromInterval(ymin - halfH, ymax + halfH),
    } //left
  }
  return coordinateBasic[type]
}

const funcRenderArrType = (x: number, verticalRatio: number, horizontalRatio: number) =>
  [...Array(x)].map((_, i) => i < x * verticalRatio / 2 ? "T" : i < x * verticalRatio ? "B" : i < x * (verticalRatio + horizontalRatio / 2) ? "R" : "L")

export const generateShapes = (cols: number, rows: number, width: number, height: number) => {
  const tiles = cols * rows

  const wTile = width / cols
  const hTile = height / rows
  const xmin = (window.innerWidth - width) / 2
  const ymin = (window.innerHeight - height) / 2
  const xmax = xmin + width
  const ymax = ymin + height

  let arrType = funcRenderArrType(tiles, width / (width + height), height / (width + height))

  return [...Array(tiles)].map((_, i) => {
    const indexTypeRadom = Math.floor(Math.random() * arrType.length)
    const colIndex = Math.floor(i % cols);
    const rowIndex = Math.floor(i / cols);

    const type = arrType[indexTypeRadom]
    arrType = [...arrType.slice(0, indexTypeRadom), ...arrType.slice(indexTypeRadom + 1, arrType.length)]


    return ({
      id: i.toString() + "-piece",
      // ...randomCoordinateAvoidFrames(i),
      ...randomCoordinate(xmin, ymin, xmax, ymax, width / 2, height / 2, wTile, hTile, type),
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



