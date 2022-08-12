import Tile from "./tile"

const orientations = ["NORTH", "EAST", "SOUTH", "WEST"]

class TileSet {
    constructor(path, nTiles) {
        this.path = path
        this.nTiles = nTiles

        this.tiles = []
    }

    async buildTileSet() {
        for (let n = 0; n < this.nTiles; n++) {
            const json = await import(`./tilesets/${this.path}/${n}.json`)
            const img = await import(`./tilesets/${this.path}/${n}.png`)

            const sockets = json.default
            // for each tile make rotated variations at 0, 90, 180, 270 rotation
            for (let r = 0; r < 360; r += 90) {
                const tile = new Tile(img.default, r, this.getRotatedSockets(sockets, r))
                this.tiles.push(tile)
            }
        }
    }

    getTile(index) {
        return this.tiles[index]
    }

    /*
    EXAMPLE:
    sockets: { NORTH: "DDD", "EAST": "AAA", "SOUTH": "BBB", "WEST": "CCC"}
    rotation: 90
    move: 90 / 90 = 1
    first we look at NORTH: DDD
    orientationIndex = index of NORTH = 0 + move = 1 = 1
    newOrientation = orientations[1] = EAST
    "EAST": "DDD"
    */
    getRotatedSockets(sockets, rotation) {
        const move = rotation / 90
        const rotatedSockets = Object.entries(sockets).reduce((rotatedSockets, [orientation, socket]) => {
            const newOrientationIndex = orientations.indexOf(orientation) + move // find the new orientation key's index for this rotation
            const newOrientation = orientations[newOrientationIndex % 4] // only 4 rotations possible
            rotatedSockets[newOrientation] = socket // the socket will be the same, but on a different orientation
            return rotatedSockets
        }, {})

        return rotatedSockets
    }
}

export default TileSet
