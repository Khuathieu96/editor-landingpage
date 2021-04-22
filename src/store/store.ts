import { makeObservable, observable, action, computed } from "mobx"
import { ImageType, StatusGameType } from "../types/types"
import { generateFrame } from "../utils/frames"
import { generateShapes } from "../utils/screen"


export type GameType = {
  cols: number
  rows: number
  image: ImageType
  name: string
  id: string
  pieces: any[]
  frames: any[]
  status: StatusGameType
  dataGrid: DataGridType
}


type DataGridType = {
  x: number
  y: number
  h: number
  w: number
  i: string
  minW?: number
  minH?: number
  maxW?: number
  maxH?: number
  static?: boolean
}

class Game {
  cols: number = 0
  rows: number = 0
  name: string = ''
  image: ImageType = { url: '', width: 0, height: 0, }
  id: string = ''
  pieces: any[] = []
  frames: any[] = []
  dataGrid: DataGridType = { x: 0, y: 0, w: 1, h: 1, i: '' }
  status: StatusGameType = StatusGameType.NEW

  constructor(cols: number, rows: number, id: string, image: ImageType, name: string, status: StatusGameType, dataGrid: DataGridType) {
    makeObservable(this, {
      cols: observable,
      rows: observable,
      image: observable,
      status: observable,
      dataGrid: observable,
      pieces: observable,
      frames: observable,
      // setUrl: action,
      // setCols: action,
      // setRows: action,
      // setStatus: action,
    })
    this.cols = cols
    this.id = id
    this.rows = rows
    this.image = image
    this.name = name
    this.status = status
    this.dataGrid = dataGrid
    this.pieces = generateShapes(
      cols || 0,
      rows || 0,
    )
    console.log("generateShapes", generateFrame(
      cols || 0,
      rows || 0,
      image.width || 0,
      image.height || 0,
    ))
    this.frames = generateFrame(
      cols || 0,
      rows || 0,
      image.width || 0,
      image.height || 0,
    )

  }

  // setUrl(value: string) {
  //   this.url = value
  // }
  // setCols(value: number) {
  //   this.cols = value
  // }
  // setRows(value: number) {
  //   this.rows = value
  // }
  // setStatus(value: StatusGameType) {
  //   this.status = value
  // }
}

const initialGame = {
  cols: 0,
  rows: 0,
  name: '',
  image: { url: '', width: 0, height: 0, },
  id: '',
  pieces: [],
  frames: [],
  dataGrid: { x: 0, y: 0, w: 1, h: 1, i: '' },
  status: StatusGameType.NEW,
}

class Games {
  games: GameType[] = []
  currentGame: GameType = initialGame

  get newGamesList() {
    return this.games.filter(game => game.status === StatusGameType.NEW)
  }

  setCurrentGame(id: string) {
    this.currentGame = this.games.find(item => item.id === id) || initialGame
  }

  get finishedGamesList() {
    return this.games.filter(game => game.status === StatusGameType.FINISHED)
  }
  get unfinishedGamesList() {
    return this.games.filter(game => game.status === StatusGameType.UNFINISHED)
  }

  constructor(games: GameType[]) {
    makeObservable(this, {
      games: observable,
      newGamesList: computed,
      finishedGamesList: computed,
      unfinishedGamesList: computed,
      setCurrentGame: action,
      addNewGame: action
    })

    const gamesList = localStorage.getItem('games')

    this.games = gamesList ? JSON.parse(gamesList) : games
  }

  addNewGame({ cols, rows, id, image, name, status, dataGrid }: GameType) {
    const newTodo = new Game(cols, rows, id, image, name, status, dataGrid)
    this.games.push(newTodo)

    localStorage.setItem('games', JSON.stringify(this.games));

  }

  remove(id: string) {
    this.games = this.games.filter(game => game.id !== id)
  }
}
// 
// const newGame = new Game(1, 1, "id", "url", "name", StatusGameType.UNFINISHED, { x: 1, y: 1, h: 1, w: 1, i: "id" })

const storeGamesList = new Games([]);

export { storeGamesList }
