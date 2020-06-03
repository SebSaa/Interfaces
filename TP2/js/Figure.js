class Figure {
    constructor(posX, posY, color, image) {
        this.posX = posX
        this.posY = posY
        this.fill = color
        this.canvas = document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')
        this.image = image;
    } 
  
    setImage(imagen){
        this.image = imagen;
    }

    fillIn(fill) {
        this.fill = fill
    }
    
    getPosition() {
        return { 
            x: this.getPosX(),
            y: this.getPosY()
        }
    }

    getPosX() {
        return this.posX
    }
    getPosY() {
        return this.posY
    }
    getFill() {
        return this.fill
    }

    setFill(color){
        this.fill = color;
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;

    }
}
