class Tablero {
    constructor (startCanvasX, startCanvasY, widthCanvas, heightCanvas, color, img, canvas, context){
        this.x = startCanvasX;
        this.y = startCanvasY;
        this.ancho = widthCanvas;
        this.alto = heightCanvas;
        this.color = color;
        this.arrTablero = [];
        this.tablero;
        this.fondo = img;
        this.canvas = canvas;
        this.context = context;
    }

    
    crearTablero(imagenFicha){
        this.context.drawImage(this.fondo, this.x, this.y, this.ancho, this.alto);
        let inicioX = 160;
        let inicioY = 290;
        let circulo;
        let c = 0;
        for (let i = 0; i < 490; i+=70) {
            for (let j = 0; j < 420; j+=70) {
                circulo = new Circle(inicioY+i, inicioX+j, 30, "#FFFFFF",imagenFicha);
                circulo.drawImage();
                this.arrTablero[c]= circulo; 
                c++;
            } 
         }
    }

    redrawTablero(img){
        this.context.drawImage(this.fondo, this.x, this.y, this.ancho, this.alto);
        for (let i = 0; i < this.arrTablero.length; i++) {
            this.arrTablero[i].setImage(img);
            this.arrTablero[i].drawImage(); 
        }
    }
    
    setCol(col, color){
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

    comprobar(color, columna){
        let ganador = false;
        let cont = 0;
        for (let index = 0; index < this.arrTablero.length; index++) {
            if(this.arrTablero[index].getFill() == color){
                for (let j = index; j < this.arrTablero.length; j+=6) {
                    //busca por derecha
                    if(this.arrTablero[j].getFill() == color){
                        cont++;
                        if(cont == 4){
                            return (ganador = true);    
                        }
                    }else{
                        break;
                    }
                }
                    
                cont = 0;
                //busca por izquierda
                for (let j = index; j >= 0 ; j-=6) {
                    if(this.arrTablero[j].getFill() == color){
                        cont++;
                        if(cont == 4){
                            return (ganador = true);                            
                        }
                    }else{
                        break;
                    }
                }

                cont = 0;
                //busca por columna hacia abajo
                let columnaAbajo =[0,6,12,18,24,30,36,1,7,13,19,25,31,37,2,8,14,20,26,32,38];
                if (columnaAbajo.includes(index)){
                    for (let j = index; j <= columna ; j++) {
                        if(this.arrTablero[j].getFill() == color){
                            cont++;
                            if(cont == 4){
                                return (ganador = true);                            
                            }
                        }else{
                            break;
                        }
                    }
                }

                cont = 0;
                let columnaDiagDerAbajo =[0,1,2,6,7,8,12,13,14,18,19,20];
                if (columnaDiagDerAbajo.includes(index)){
                //busca por diagonal derecha abajo
                    for (let j = index; j < this.arrTablero.length ; j+=7) {
                        if(this.arrTablero[j].getFill() == color){
                            cont++;
                            if(cont == 4){
                                return (ganador = true);                            
                            }
                        }else{
                            break;
                        }
                    }
                }
                
                cont = 0;
                let columnaDiagIzqAbajo =[18,19,20,24,25,26,30,31,32,36,37,38];
                if (columnaDiagIzqAbajo.includes(index)){
                //busca por diagonal izquierda abajo
                    for (let j = index; j >= 0 ; j-=5) {
                        if(this.arrTablero[j].getFill() == color){
                            cont++;
                            if(cont == 4){
                                return (ganador = true);                            
                            }
                        }else{
                            break;
                        }
                    }
                }
                cont = 0;
            }
        }
    }

}//fin clase

