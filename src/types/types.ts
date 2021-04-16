

export interface PieceType {
  id: string;
  x: number;
  y: number;
  isDragging: boolean;
  draggable: boolean;
  fillColor: string;
  edgeType: EdgeType
}

export interface EdgeType {
  top: number,
  right: number,
  bottom: number,
  left: number,
}
export interface Frame {
  id: string;
  x: number;
  y: number;
  strokeWidth: number;
  isDragging: boolean;
  draggable: boolean;
  fillColor: string;
  strokeColor: string;
  edgeType: EdgeType
}

export type zoomState = {
  x: number;
  y: number;
  id: string;
  hidden: boolean;
};

export enum StatusGameType {
  NEW = "new",
  FINISHED = 'finished',
  UNFINISHED = 'unfinished',
}
