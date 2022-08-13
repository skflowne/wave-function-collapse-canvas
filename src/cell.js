import { randomInt } from "./helpers"
import { oppositeOrientations, orientationDirection, orientations } from "./orientations"

class Cell {
    constructor(x, y, tilemap) {
        this.x = x
        this.y = y
        this.tileMap = tilemap

        this.possibilities = [...this.tileMap.tileSet.tiles]
    }

    randomlyResolveEntropy() {
        const randomTileIndex = randomInt(0, this.possibilities.length)
        console.log(randomTileIndex)
        this.possibilities = [this.possibilities[randomTileIndex]]

        //this.propagateResolution()
    }

    getNeighbors() {
        const neighbors = orientations.reduce((neighbors, orientation) => {
            const direction = orientationDirection[orientation]
            console.log("direction", direction, orientation)
            const coords = { x: this.x + direction.x, y: this.y + direction.y }
            if (coords.x < 0 || coords.x >= this.tileMap.size || coords.y < 0 || coords.y >= this.tileMap.size)
                return neighbors

            neighbors[orientation] = this.tileMap.getCell(coords.x, coords.y)
            return neighbors
        }, {})

        return neighbors
    }

    /*propagateResolution() {
        const neighbors = Object.values(this.getNeighbors()).filter((neighbor) => neighbor.possibilities.length !== 1)
        const randomNeighbor = neighbors[randomInt(0, neighbors.length)]
        
        if(randomNeighbor){
          randomNeighbor.reduceEntropy()
        } else {
          
        }
        console.log("random neighbor", randomNeighbor)
    }*/

    reduceEntropy() {
        const neighbors = this.getNeighbors()
        Object.keys(neighbors).forEach((orientation) => {
            const neighbor = neighbors[orientation]
            if (neighbor.possibilities.length !== 1) return
            const neighborTile = neighbor.possibilities[0]
            console.log("neighbord tile", orientation, oppositeOrientations[orientation])
            this.possibilities = this.possibilities.filter((tile) => {
                return tile.getSocket(orientation) === neighborTile.getReverseSocket(oppositeOrientations[orientation])
            })
        })

        /*if (this.possibilities.length === 1) {
            this.propagateResolution()
        } else {
            this.randomlyResolveEntropy()
        }*/
    }
}

export default Cell
