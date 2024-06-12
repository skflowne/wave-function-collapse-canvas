class TileMap {
    constructor(canvas, options = { size: 10 }) {
        this.canvas = canvas
        const { size } = options
        this.grid = new Array(size).fill(new Array(size).fill(0))
        this.size = size
        this.tileSize = this.canvas.getHeight() / size

        console.log("tileSize", this.tileSize)

        this.logGrid()
        this.drawGrid()
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
