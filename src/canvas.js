class Canvas {
    constructor() {
        this.canvas = document.getElementById("canvas")
        this.ctx = this.canvas.getContext("2d")

        window.addEventListener("resize", this.resize)
        this.resize()
    }

    resize() {
        const width = window.innerWidth % 2 === 0 ? window.innerWidth : window.innerWidth - 1
        const height = window.innerHeight % 2 === 0 ? window.innerHeight : window.innerHeight - 1

        this.canvas.setAttribute("width", width)
        this.canvas.setAttribute("height", height)
        this.canvas.setAttribute("style", `width: ${width}px; height: ${height}px;`)
    }

    getWidth() {
        return parseInt(this.canvas.getAttribute("width"))
    }

    getHeight() {
        return parseInt(this.canvas.getAttribute("height"))
    }

    drawText(text, x, y, font = "48px sans-serif", color = "black", align = "center", baseline = "middle") {
        this.ctx.font = font
        this.ctx.fillStyle = color
        this.ctx.textAlign = align
        this.ctx.textBaseline = baseline
        this.ctx.fillText(text, x, y)
    }

    drawImage(src, x, y, w, h, r, cb) {
        const img = new Image(w, h)
        img.src = src
        img.onload = () => {
            this.ctx.setTransform(1, 0, 0, 1, x + w / 2, y + h / 2) // set transform origin at middle of image
            this.ctx.rotate((r * Math.PI) / 180) // rotated by r degrees
            this.ctx.drawImage(img, -w / 2, -h / 2, w, h) // draw image from top left corner
            this.ctx.setTransform(1, 0, 0, 1, 0, 0)
            if (cb) cb()
        }
    }

    drawLine(x0, y0, x1, y1, color = "black", width = 1) {
        console.log("drawline", x0, y0, x1, y1, color)
        this.ctx.beginPath()
        this.ctx.strokeStyle = color
        this.ctx.lineWidth = width
        this.ctx.moveTo(x0, y0)
        this.ctx.lineTo(x1, y1)
        this.ctx.stroke()
    }

    drawRect(x, y, w, h, fill = "green", stroke = "red") {
        this.ctx.fillStyle = fill
        this.ctx.strokeStyle = stroke
        this.ctx.lineWidth = 1
        this.ctx.rect(x, y, w, h)
        this.ctx.fill()
        this.ctx.stroke()
    }
}

export default Canvas
