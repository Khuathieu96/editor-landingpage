import { makeObservable, observable, action, computed } from "mobx"
import { StatusGameType } from "../types/types"


export type GameType = {
  cols: number
  rows: number
  url: string
  name: string
  id: string
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
  cols = 0
  rows = 0
  name = ''
  url = ''
  id = ''
  dataGrid = { x: 0, y: 0, w: 1, h: 1, i: '' }
  status = StatusGameType.NEW

  constructor(cols: number, rows: number, id: string, url: string, name: string, status: StatusGameType, dataGrid: DataGridType) {
    makeObservable(this, {
      cols: observable,
      rows: observable,
      url: observable,
      status: observable,
      dataGrid: observable,
      // setUrl: action,
      // setCols: action,
      // setRows: action,
      // setStatus: action,
    })
    this.cols = cols
    this.id = id
    this.rows = rows
    this.url = url
    this.name = name
    this.status = status
    this.dataGrid = dataGrid
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

class Games {
  games: GameType[] = []

  get newGamesList() {
    return this.games.filter(game => game.status === StatusGameType.NEW)
  }

  getGame(id: string) {
    return this.games.find(item => item.id === id)
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
      getGame: action,
      addNewGame: action
    })
    this.games = games
  }

  addNewGame({ cols, rows, id, url, name, status, dataGrid }: GameType) {
    const newTodo = new Game(cols, rows, id, url, name, status, dataGrid)
    this.games = [...this.games, newTodo]

  }

  remove(id: string) {
    this.games = this.games.filter(game => game.id !== id)
  }
}
// 
// const newGame = new Game(1, 1, "id", "url", "name", StatusGameType.UNFINISHED, { x: 1, y: 1, h: 1, w: 1, i: "id" })

const storeGamesList = new Games([]);

export { storeGamesList }
