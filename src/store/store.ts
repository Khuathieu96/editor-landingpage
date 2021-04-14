import { makeObservable, observable, action, computed } from "mobx"

class GameSetting {

  WIDTH_TILE = 50
  WIDTH_FRAMES = 1000
  HEIGHT_FRAMES = 500
  NUMBER_TILES = 200
  NUMBER_COLUMNS = 20
  NUMBER_ROWS = 10
  IMAGE_URL = ''

  constructor() {
    makeObservable(this, {
      WIDTH_TILE: observable,
      WIDTH_FRAMES: observable,
      HEIGHT_FRAMES: observable,
      NUMBER_TILES: observable,
      NUMBER_COLUMNS: observable,
      NUMBER_ROWS: observable,
      IMAGE_URL: observable,
      setImageUrl: action,
      setWidthTitle: action,
      setWidthFrames: action,
      setHeightFrames: action,
      setNumberTiles: action,
      setNumberColumn: action,
      setNumberRows: action,
    })
  }

  setImageUrl(value: string) {
    this.IMAGE_URL = value
  }
  setWidthTitle(value: number) {
    this.WIDTH_TILE = value
  }
  setWidthFrames(value: number) {
    this.WIDTH_FRAMES = value
  }
  setHeightFrames(value: number) {
    this.HEIGHT_FRAMES = value
  }
  setNumberTiles(value: number) {
    this.NUMBER_TILES = value
  }
  setNumberColumn(value: number) {
    this.NUMBER_COLUMNS = value
  }
  setNumberRows(value: number) {
    this.NUMBER_ROWS = value
  }

}

const storeGameSetting = new GameSetting();

export { storeGameSetting }
