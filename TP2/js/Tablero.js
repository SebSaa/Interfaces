class Tablero {
    constructor (startCanvasX, startCanvasY, widthCanvas, heightCanvas, color){
        this.x = startCanvasX;
        this.y = startCanvasY;
        this.ancho = widthCanvas;
        this.alto = heightCanvas;
        this.color = color;
        this.dibujarTablero();
    }

    
    dibujarTablero(){
        let tablero = new Rect(this.x, this.y, this.ancho, this.alto, this.color)
        tablero.draw();
        let inicioX = 290;
        let inicioY = 160;
        let arreglo = [];
        let circulo;
        let c = 0;
        for (let i = 0; i < 420; i+=70) {
            for (let j = 0; j < 490; j+=70) {
             circulo = new Circle(inicioX+j,inicioY+i,30, "#FFFFFF")
             circulo.draw()
             arreglo[c]= circulo; 
             c++  
            } 
         }
         console.log(arreglo);
    }
    



}