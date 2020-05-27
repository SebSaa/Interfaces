class Figure {
    constructor(posX, posY) {
        this.posX = posX
        this.posY = posY
        this.fill = "#FFFFFF"
        this.canvas = document.getElementById('canvas')
        this.context = this.canvas.getContext('2d')
    } 
  
    // getContext() {    
    //     let canvas = document.getElementById('canvas')
    //     let context = canvas.getContext('2d')
    //     return context
    // }
    
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

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;

    }
}
