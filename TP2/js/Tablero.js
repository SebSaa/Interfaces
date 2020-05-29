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
        console.log(this.arrTablero);
    }
    
    setCol(col, color){
        console.log(color);
        let libre = false;
        if (col == 1){
            for (let i = 5; i >= 0 ; i--) {
                if(this.arrTablero[i].getFill() == '#FFFFFF'){
                    this.arrTablero[i].setFill(color);
                    libre = true;
                    break;
                }
            }
        }
        if (col == 2){
            for (let i = 11; i >= 6 ; i--) {
                if(this.arrTablero[i].getFill() == '#FFFFFF'){
                    this.arrTablero[i].setFill(color);
                    libre = true;
                    break;
                }
            }
        }
        if (col == 3){
            for (let i = 17; i >= 12 ; i--) {
                if(this.arrTablero[i].getFill() == '#FFFFFF'){
                    this.arrTablero[i].setFill(color);
                    libre = true;
                    break;
                }
            }
        }
        if (col == 4){
            for (let i = 23; i >= 18 ; i--) {
                if(this.arrTablero[i].getFill() == '#FFFFFF'){
                    this.arrTablero[i].setFill(color);
                    libre = true;
                    break;
                }
            }
        }
        if (col == 5){
            for (let i = 29; i >= 24 ; i--) {
                if(this.arrTablero[i].getFill() == '#FFFFFF'){
                    this.arrTablero[i].setFill(color);
                    libre = true;
                    break;
                }
            }
        }
        if (col == 6){
            for (let i = 35; i >= 30 ; i--) {
                if(this.arrTablero[i].getFill() == '#FFFFFF'){
                    this.arrTablero[i].setFill(color);
                    libre = true;
                    break;
                }
            }
        }
        if (col == 7){
            for (let i = 41; i >= 36 ; i--) {
                if(this.arrTablero[i].getFill() == '#FFFFFF'){
                    this.arrTablero[i].setFill(color);
                    libre = true;
                    break;
                }
            }
        }
        this.redrawTablero();
        return libre;
    }


}//fin clase