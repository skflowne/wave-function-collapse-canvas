class Tile {
    constructor(img, rotation, sockets) {
        this.rotation = rotation
        this.img = img
        this.sockets = sockets
    }

    getSocket(orientation) {
        return this.sockets[orientation]
    }

    getReverseSocket(orientation) {
        return this.sockets[orientation].split("").reverse().join("")
    }
}

export default Tile
