document.addEventListener('DOMContentLoaded', function(){
    
let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')
let arrFichas = new Array(42);
let gameStart = false;
canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let anchoTablero = (canvas.width /4) * 2;
let altoTablero = (70 * 6 ) + 20; 
let desdeTableroX = canvas.width/4;
let desdeTableroY = 120;
let alpha = 125;
let fichaMovil = null;
let imagenDeFicha = null;
let tablero;
let botonW = new BotonEfecto(500, 350, 150, "#000000", "WIN!!!");

    let img1 = new Image();         
    img1.src = './img/img1.jpg';         
    img1.onload = function() { 
        tablero = new Tablero(desdeTableroX, desdeTableroY, anchoTablero, altoTablero, "green", img1, canvas, context);
        tablero.crearTablero(imagenDeFicha);
    }


fichasJugador(90,450,"#FF0000",0);
fichasJugador(850,450,"#0000FF",21);

function fichasJugador(x, y, color, c){
    let img = new Image();         
    img.src = './img/ficha1.png';         
    img.onload = function() { 
        
        for (let i = 0; i < 126; i+=6) {
            ficha = new Circle((x + Math.floor(Math.random()*15+1)), (y+i), 30, color, img);
            ficha.drawImage();
            arrFichas[c] = ficha;
            c++;
        }
      }

    
}

let boton = new BotonEfecto(500, 350, 150, "#000000", "START");

boton.efectoBoton();

function turno(){
    let fichasRojas = 0;
    let fichasAzules = 0;
    for (let j = 0; j < arrFichas.length; j++) {
        if (arrFichas[j].getFill() == "#FF0000"){
            fichasRojas++;
        }else{
            fichasAzules++;
        }
    }
    if(fichasRojas > fichasAzules){
        return proxTurno = "#FF0000";
    }else{
        return proxTurno = "#0000FF";
    }
}

let dragging = false;
let draggingId = -1;

    canvas.addEventListener('mousedown', r => {
        if (botonW.hit(r.layerX, r.layerY)){
            botonW.finalizarEfecto();
            redraw();
        }

        if (boton.hit(r.layerX, r.layerY)){
            let img = new Image();         
            img.src = './img/ficha1.png';         
            img.onload = function() { 
                gameStart = true;
                boton.finalizarEfecto();
                imagenDeFicha = img;
                redraw();
            }

        }
        if (gameStart == true){
            dragging = true;
            elTurno = turno();
            console.log(elTurno);
            for (let i = 0; i < arrFichas.length; i++) {
                if (elTurno == arrFichas[i].getFill() || elTurno == "#FFFFFF"){
                    let status = arrFichas[i].hit(r.layerX, r.layerY);
                
                    if (status) {
                        draggingId = i;
                        fichaMovil = arrFichas[i];
                        break;
                    }
                }
            }
        }
    });

 
    function fijarFichaColumna(col){
        let cambio = tablero.setCol(col,fichaMovil.getFill());
        if (cambio == true){
            let a = arrFichas.indexOf(fichaMovil);
            arrFichas.splice(a,1);
            redraw();
        }
    }

    function cartelVictoria(){
        ganador = false;
        arrFichas.splice(0, arrFichas.length);
        fichasJugador(90,450,"#FF0000",0);
        fichasJugador(850,450,"#0000FF",21);
        tablero.crearTablero(imagenDeFicha);
        botonW.efectoBoton();
    }

    canvas.addEventListener('mouseup', r => {
        dragging = false;
        draggingId = -1;
        let solteX = r.layerX;
        let solteY = r.layerY;
        let ganador = false;
        if (fichaMovil != null){
            if (solteY > 50  && solteY < 120){
                if (solteX > 250 && solteX < 320) {
                    fijarFichaColumna(1);
                    ganador = tablero.comprobar(fichaMovil.getFill(), 5);
                }
                if (solteX > 320 && solteX < 390) {
                    fijarFichaColumna(2);
                    ganador = tablero.comprobar(fichaMovil.getFill(), 11);
                }
                if (solteX > 400 && solteX < 475) {
                    fijarFichaColumna(3);
                    ganador = tablero.comprobar(fichaMovil.getFill(), 17);
                }
                if (solteX > 475 && solteX < 550) {
                    fijarFichaColumna(4);
                    ganador = tablero.comprobar(fichaMovil.getFill(), 23);
                }
                if (solteX > 550 && solteX < 625) {
                    fijarFichaColumna(5);
                    ganador = tablero.comprobar(fichaMovil.getFill(), 29);
                }
                if (solteX > 625 && solteX < 700) {
                    fijarFichaColumna(6);
                    ganador = tablero.comprobar(fichaMovil.getFill(), 35);
                 }
                if (solteX > 700 && solteX < 775) {
                    fijarFichaColumna(7);
                    ganador = tablero.comprobar(fichaMovil.getFill(), 41);
                }
                
            }
            fichaMovil=null;
            
        }
        if (ganador == true){
            cartelVictoria();
        }
    });
    

    canvas.addEventListener('mousemove', r => {
        if (draggingId != -1) {
            arrFichas[draggingId].setPosition(r.layerX, r.layerY);
            redraw();
        }
    });

    function redraw() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        tablero.redrawTablero(imagenDeFicha);
        for (let i = 0; i < arrFichas.length; i++) {
            if (draggingId !== i) {
                arrFichas[i].drawImage();
                
            }
        }
        
        if (draggingId !== -1) {
            arrFichas[draggingId].drawImage();
        }

    }

});