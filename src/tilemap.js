class TileMap {
    constructor(canvas, options = { size: 10 }) {
        this.canvas = canvas
        const { size } = options
        this.grid = new Array(size).fill(new Array(size).fill(0))
        this.size = size
        this.tileSize = this.canvas.getHeight() / size

        this.tileSet = null

        console.log("tileSize", this.tileSize)

        this.logGrid()
        this.drawGrid()
    }

    setTileSet(tileset) {
        this.tileSet = tileset
    }

    drawTileSet() {
        if (!this.tileSet) throw new Error("No tileset was set on the tilemap")
        const tiles = this.tileSet.tiles
        if (!tiles || !tiles.length) throw new Error("Tileset has no tiles")

        this.forEachGridCell((cell, nRow, nCol, index) => {
            const tileIndex = index
            if (tileIndex >= tiles.length) return true

            const tile = tiles[tileIndex]
            const size = this.tileSize
            const x = nRow * size
            const y = nCol * size

            //if (index !== 16) return
            this.drawTile(tile, x, y, true)
        })
    }

    drawTile(tile, x, y, showSockets = false) {
        this.canvas.drawImage(tile.img, x, y, this.tileSize, this.tileSize, tile.rotation, () => {
            if (!showSockets) return
            this.drawTileSockets(tile, x, y)
        })
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

        const orientationDirection = {
            "NORTH": { x: 1, y: 0 },
            "EAST": { x: 0, y: 1 },
            "SOUTH": { x: -1, y: 0 },
            "WEST": { x: 0, y: -1 },
        }

        Object.entries(tile.sockets).forEach(([orientation, socket], index) => {
            for (let i = 0; i < socket.length; i++) {
                const socketIndex = i
                const offset = orientationOffset[orientation]
                let position = { x: x + offset.x, y: y + offset.y }
                position.x += socketIndex * orientationDirection[orientation].x * spacing
                position.y += socketIndex * orientationDirection[orientation].y * spacing

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
            for (let x = 0; x < this.grid[0].length; x++) {
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
