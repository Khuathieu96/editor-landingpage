

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
  
export interface  EdgeType {
  top: number,
  right: number,
  bottom: number,
  left: number,
}
export interface Frame {
    id: string;
    x: number;
    y: number;
    isDragging: boolean;
    draggable: boolean;
    fillColor: string;
    edgeType: EdgeType
  }

export  type zoomState = {
    x: number;
    y: number;
    id: string;
    hidden: boolean;
};
  
