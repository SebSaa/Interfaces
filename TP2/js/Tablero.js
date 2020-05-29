class Tablero {
    constructor (startCanvasX, startCanvasY, widthCanvas, heightCanvas, color){
        this.x = startCanvasX;
        this.y = startCanvasY;
        this.ancho = widthCanvas;
        this.alto = heightCanvas;
        this.color = color;
        this.arrTablero = [];
        this.tablero;
        this.crearTablero();
    }

    
    crearTablero(){
        let chupaFicha = new Rect(this.x, (this.y-70), this.ancho, 70, "#FF00FF");
        console.log(this.x + "----------" + this.y + " ancho " +  this.ancho );
        chupaFicha.draw();
        this.tablero = new Rect(this.x, this.y, this.ancho, this.alto, this.color);
        this.tablero.draw();
        let inicioX = 160;
        let inicioY = 290;
        let circulo;
        let c = 0;
        for (let i = 0; i < 490; i+=70) {
            for (let j = 0; j < 420; j+=70) {
                 circulo = new Circle(inicioY+i, inicioX+j, 30, "#FFFFFF");
             circulo.draw();
             this.arrTablero[c]= circulo; 
             c++;
            } 
         }
         //console.log(arreglo);
    }

    redrawTablero(){
        this.tablero.draw();
        for (let i = 0; i < this.arrTablero.length; i++) {
            this.arrTablero[i].draw(); 
        }
        // console.log(this.arrTablero);
    }
    
    setCol(col, color){
        console.log(color);
        let libre = false;
        if (col == 1){
            libre = this.setColorColumna(0, 5, color, libre); 
        }
        if (col == 2){
            libre = this.setColorColumna(6, 11, color, libre); 
        }
        if (col == 3){
            libre = this.setColorColumna(12, 17, color, libre); 
        }
        if (col == 4){
            libre = this.setColorColumna(18, 23, color, libre);
        }
        if (col == 5){
            libre = this.setColorColumna(24, 29, color, libre);
        }
        if (col == 6){
            libre = this.setColorColumna(30, 35, color, libre);
        }
        if (col == 7){
            libre = this.setColorColumna(36, 41, color, libre);
        }
        this.redrawTablero();
        return libre;
    }
    //deberia ser privada pero no se como 
    setColorColumna(desde, hasta, color, libre) {
        for (let i = hasta; i >= desde ; i--) {
            if(this.arrTablero[i].getFill() == '#FFFFFF'){
                this.arrTablero[i].setFill(color);
                libre = true;
                break;
            }
        }
        return libre;
    }

}//fin clase

