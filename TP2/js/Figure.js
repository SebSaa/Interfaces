class Figure {
    constructor(posX, posY, color) {
        this.posX = posX
        this.posY = posY
        this.fill = color
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

    setFill(color){
        console.log("color llegado " + color);
        this.fill = color;
        console.log("color cambiado " + this.fill);
    }

    setPosition(x, y) {
        this.posX = x;
        this.posY = y;

    }
}
