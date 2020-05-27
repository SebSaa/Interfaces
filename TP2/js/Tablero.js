class Tablero {
    constructor (startCanvasX, startCanvasY, widthCanvas, heightCanvas, color){
        this.tablero = new Rect(startCanvasX, startCanvasY, widthCanvas, heightCanvas, color)
        this.tablero.draw();
        this.dibujarTablero();
    }

    
    dibujarTablero(){
        let iniciox = 20;
        let inicioy = 20;
        let arreglo = [];
        let circulo;
        let c = 0;
        for (let i = 0; i < 420; i+=70) {
            for (let j = 0; j < 490; j+=70) {
             circulo = new Circle(290+j,160+i,30)
             circulo.draw()
             arreglo[c]= circulo; 
             c++  
            } 
         }
         console.log(arreglo);
    }
    



}