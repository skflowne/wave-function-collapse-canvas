import "./style.css"
import Canvas from "./src/canvas"
import TileMap from "./src/tilemap"
import TileSet from "./src/tileset"

const canvas = new Canvas()
const tilemap = new TileMap(canvas)
const tileset = new TileSet("circuit-coding-train", 13)

await tileset.buildTileSet()

tilemap.setTileSet(tileset)
tilemap.drawTileSet()

/*canvas.drawText("B", 96 - 16, (96 / 3) * 1 - 8, "16px sans-serif")
canvas.drawText("C", 96 - 16, (96 / 3) * 2 - 8, "16px sans-serif")
canvas.drawText("D", 96 - 16, (96 / 3) * 3 - 8, "16px sans-serif")*/
