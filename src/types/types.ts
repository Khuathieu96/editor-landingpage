

export interface Piece {
    id: string;
    x: number;
    width: number;
    height: number;
    y: number;
    isDragging: boolean;
    draggable: boolean;
    fillColor: string;
  }

export  type zoomState = {
    x: number;
    y: number;
    id: string;
    hidden: boolean;
  };