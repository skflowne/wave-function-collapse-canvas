/*
min included
max excluded
*/
export function randomInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
