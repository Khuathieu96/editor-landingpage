import { HEIGHT_FRAMES, WIDTH_FRAMES, WIDTH_TILE } from "../types/constants";
import { EdgeType } from "../types/types";


const renderEdges = (
  ctx: any,
  startedPointed: { x: number, y: number },
  edgesWidth: number,
  edgesType: string,
  curvedType: number
) => {
  const { x, y } = startedPointed;
  const depth = edgesWidth / 2;
  ctx.lineTo(x, y);

  switch (edgesType) {
    case "top":
      ctx.bezierCurveTo(
        x,
        y - curvedType * depth,
        x + edgesWidth,
        y - curvedType * depth,
        x + edgesWidth,
        y
      );
      ctx.lineTo(x + 2 * edgesWidth, y);
      break;
    case "right":
      ctx.bezierCurveTo(
        x + curvedType * depth,
        y,
        x + curvedType * depth,
        y + edgesWidth,
        x,
        y + edgesWidth
      );
      ctx.lineTo(x, y + 2 * edgesWidth);
      break;
    case "bottom":
      ctx.bezierCurveTo(
        x,
        y + curvedType * depth,
        x - edgesWidth,
        y + curvedType * depth,
        x - edgesWidth,
        y
      );
      ctx.lineTo(x - 2 * edgesWidth, y);
      break;
    case "left":
      ctx.bezierCurveTo(
        x - curvedType * depth,
        y,
        x - curvedType * depth,
        y - edgesWidth,
        x,
        y - edgesWidth
      );
      ctx.lineTo(x, y - 2 * edgesWidth);
      break;

    default:
      break;
  }
};

export const renderTiles = (context: any, widthTile: number, startPointx: number, startPointy: number, EdgeType: EdgeType) => {
  renderEdges(
    context,
    { x: startPointx + widthTile, y: startPointy },
    widthTile,
    "top",
    EdgeType.top
  );
  renderEdges(
    context,
    { x: startPointx + 3 * widthTile, y: startPointy + widthTile },
    widthTile,
    "right",
    EdgeType.right
  );
  renderEdges(
    context,
    { x: startPointx + 2 * widthTile, y: startPointy + 3 * widthTile },
    widthTile,
    "bottom",
    EdgeType.bottom
  );
  renderEdges(
    context,
    { x: startPointx, y: startPointy + 2 * widthTile },
    widthTile,
    "left",
    EdgeType.left
  );
};

export const isEven = (number: number) => number % 2 === 0;

export const calculateEdgeType = (colIndex: number, rowIndex: number) => {
  return (isEven(colIndex) && isEven(rowIndex)) ||
    (!isEven(colIndex) && !isEven(rowIndex))
    ? -1
    : 1;
};


export const generateFrame = (cols: number, rows: number, width: number, height: number) => {
  const tiles = cols * rows
  const wTile = width / cols
  const hTile = height / rows
  
  return [...Array(tiles)].map((_, i) => {

    const colIndex = Math.floor(i % cols);
    const rowIndex = Math.floor(i / cols);

    return {
      id: i.toString() + "-frame",
      x: (window.innerWidth - width) / 2 + wTile * Math.floor(i % cols),
      y: (window.innerHeight - height) / 2 + hTile * Math.floor(i / cols),
      draggable: false,
      fillColor: i % 3 === 0 ? '#84ce90' : i % 3 === 1 ? '#d5d690' : 'grey',
      isDragging: false,
      strokeWidth: 0.5,
      strokeColor: "black",
      edgeType: {
        top: rowIndex === 0 ? 0 : -calculateEdgeType(colIndex, rowIndex),
        right:
          colIndex === cols - 1 ? 0 : calculateEdgeType(colIndex, rowIndex),
        bottom:
          rowIndex === rows - 1 ? 0 : -calculateEdgeType(colIndex, rowIndex),
        left: colIndex === 0 ? 0 : calculateEdgeType(colIndex, rowIndex)
      }
    }
  });
}
