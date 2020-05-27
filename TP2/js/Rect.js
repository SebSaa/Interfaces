class Rect extends Figure {
    constructor(posX, posY, width, height, color) {
        super(posX, posY, color)
        //this.color = color;
        this.width = width
        this.height = height
        //this.context = super.getContext()
    }
    
    // fillFigure(pattern) {
    //     this.context.beginPath()
    //     this.context.fillStyle = this.color
    //     this.context.fillRect(this.posX, this.posY, this.width, this.height)
    //     // this.context.fillStyle = this.color
    //     this.context.fill()
    //     this.context.closePath()
    // }

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
    
}
