import Cell from "./cell"
import { randomInt } from "./helpers"
import { orientationReadingDirection } from "./orientations"

class TileMap {
    constructor(canvas, options = { size: 10 }) {
        this.canvas = canvas
        const { size } = options
        this.grid = new Array(size).fill().map(() => new Array(size).fill(0))
        this.size = size
        this.tileSize = this.canvas.getHeight() / size

        this.tileSet = null

        this.manual = { x: 0, y: 0 }

        this.logGrid()
        this.drawGrid()
    }

    setManualStepping() {
        window.addEventListener("click", (e) => this.manualEntropyResolution())
    }

    setTileSet(tileset) {
        this.tileSet = tileset
        this.initCells()
    }

    initCells() {
        this.forEachGridCell((cell, x, y) => {
            this.initGridCell(x, y)
        })

        this.logGrid()
    }

    getCell(x, y) {
        return this.grid[y][x]
    }

    initGridCell(x, y) {
        this.grid[y][x] = new Cell(x, y, this)
    }

    manualEntropyResolution() {
        console.log(this.manual)
        let cell = this.getCell(this.manual.x, this.manual.y)
        this.step(cell)
        this.manual.x += 1
        if (this.manual.x === this.size) {
            this.manual.x = 0
            this.manual.y += 1
        }
    }

    randomlyResolveEntropy() {
        /*const cell = this.grid[1][0] //this.grid[randomInt(0, this.grid.length)][randomInt(0, this.grid[0].length)]
        cell.randomlyResolveEntropy()
        this.getCell(1, 1).reduceEntropy()
        this.getCell(1, 1).randomlyResolveEntropy()
        this.getCell(1, 2).reduceEntropy()
        this.getCell(1, 2).randomlyResolveEntropy()*/

        if (this.manual) return

        this.forEachGridCell((cell, x, y) => {
            this.step(cell)
        })
    }

    step(cell) {
        cell.reduceEntropy()
        this.drawTileMap()
        cell.randomlyResolveEntropy()
        this.drawTileMap()
    }

    drawTileMap() {
        this.forEachGridCell((cell, x, y) => {
            const entropy = cell.possibilities.length
            if (entropy > 1) {
                this.canvas.ctx.clearRect(
                    x * this.tileSize + 1,
                    y * this.tileSize + 1,
                    this.tileSize - 2,
                    this.tileSize - 2
                )
                this.canvas.drawText(
                    cell.possibilities.length,
                    x * this.tileSize + this.tileSize / 2,
                    y * this.tileSize + this.tileSize / 2
                )
            } else {
                const tile = cell.possibilities[0]
                this.drawTile(tile, x, y, false)
            }
        })
    }

    drawTileSet() {
        if (!this.tileSet) throw new Error("No tileset was set on the tilemap")
        const tiles = this.tileSet.tiles
        if (!tiles || !tiles.length) throw new Error("Tileset has no tiles")

        this.forEachGridCell((cell, x, y, index) => {
            const tileIndex = index
            if (tileIndex >= tiles.length) return true

            const tile = tiles[tileIndex]

            //if (index !== 16) return
            this.drawTile(tile, x, y, true)
        })
    }

    drawTile(tile, x, y, showSockets = false) {
        this.canvas.drawImage(
            tile.img,
            x * this.tileSize,
            y * this.tileSize,
            this.tileSize,
            this.tileSize,
            tile.rotation,
            () => {
                if (!showSockets) return
                this.drawTileSockets(tile, x * this.tileSize, y * this.tileSize)
            }
        )
    }

    drawTileSockets(tile, x, y, fontSize = 16, fontColor = "lightgreen") {
        const socketsPerOrientation = 3
        const spacing = this.tileSize / socketsPerOrientation

        const orientationOffset = {
            "NORTH": { x: spacing / 2, y: spacing / 2 },
            "EAST": { x: this.tileSize - spacing / 2, y: spacing / 2 },
            "SOUTH": { x: this.tileSize - spacing / 2, y: this.tileSize - spacing / 2 },
            "WEST": { x: spacing / 2, y: this.tileSize - spacing / 2 },
        }

        Object.entries(tile.sockets).forEach(([orientation, socket], index) => {
            for (let i = 0; i < socket.length; i++) {
                const socketIndex = i
                const offset = orientationOffset[orientation]
                let position = { x: x + offset.x, y: y + offset.y }
                position.x += socketIndex * orientationReadingDirection[orientation].x * spacing
                position.y += socketIndex * orientationReadingDirection[orientation].y * spacing

                const text = socket[socketIndex]

                this.canvas.drawText(text, position.x, position.y, `${fontSize}px sans-serif`, fontColor)
            }
        })
    }

    forEachGridCell(cb) {
        let getOut = false
        let index = 0
        for (let y = 0; y < this.grid.length; y++) {
            if (getOut) break
            for (let x = 0; x < this.grid[y].length; x++) {
                if (getOut) break
                getOut = cb(this.grid[y][x], x, y, index)
                index++
            }
        }
    }

    drawGrid() {
        const max = this.size * this.tileSize
        const color = "red"
        const width = 1
        this.grid.forEach((row, nRow) => {
            const y = nRow * this.tileSize
            const rowStart = { x: 0, y }
            const rowEnd = { x: max, y }

            this.canvas.drawLine(rowStart.x, rowStart.y, rowEnd.x, rowEnd.y, color, width)
            row.forEach((cell, nCol) => {
                const x = nCol * this.tileSize
                const colStart = { x, y: 0 }
                const colEnd = { x, y: max }

                this.canvas.drawLine(colStart.x, colStart.y, colEnd.x, colEnd.y, color, width)
            })
        })

        this.canvas.drawLine(0, max, max, max, color, width)
        this.canvas.drawLine(max, 0, max, max, color, width)
    }

    logGrid() {
        console.log("--- grid ---")
        console.table(this.grid)
        console.log("---  end ---")
    }
}

export default TileMap
