class Rect extends Figure {
    constructor(posX, posY, width, height, color) {
        super(posX, posY, color)
        this.width = width
        this.height = height
    }

    draw() {
        this.context.fillStyle = this.fill;
        this.context.strokeRect(this.posX, this.posY, this.width, this.height)
        this.context.fillRect(this.posX, this.posY, this.width, this.height)
    }
    
    getWidth() {
        return this.width
    }
    getHeight() {
        return this.height
    }
    hit(x, y) {
        let temp = false;
        let m = Math.pow(x - this.posX, 2) + Math.pow(y - this.posY, 2);
        return m < Math.pow(this.radio, 2);
    }
}
