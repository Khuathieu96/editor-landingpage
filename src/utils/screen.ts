
export const generateShapes = (numTiles: number, width: number) => {

  return [...Array(numTiles)].map((_, i) => {
    return ({

    id: i.toString(),
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    width: width,
    height: width,
    draggable: true,
    fillColor: i % 3 === 0 ? '#84ce90' : i % 3 === 1 ? '#d5d690' : 'grey',
    isDragging: false,
  })});
}