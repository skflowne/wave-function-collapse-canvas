export const orientations = ["NORTH", "EAST", "SOUTH", "WEST"]

export const orientationDirection = {
    "NORTH": { x: 0, y: -1 },
    "EAST": { x: 1, y: 0 },
    "SOUTH": { x: 0, y: 1 },
    "WEST": { x: -1, y: 0 },
}

export const orientationReadingDirection = {
    "NORTH": { x: 1, y: 0 },
    "EAST": { x: 0, y: 1 },
    "SOUTH": { x: -1, y: 0 },
    "WEST": { x: 0, y: -1 },
}

export const oppositeOrientations = {
    "NORTH": "SOUTH",
    "EAST": "WEST",
    "SOUTH": "NORTH",
    "WEST": "EAST",
}
