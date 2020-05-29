let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let arrFichas = new Array(42);
let pictures = [];

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;
let anchoTablero = (canvas.width /4) * 2;
let altoTablero = (70 * 6 ) + 20; 
let desdeTableroX = canvas.width/4;
let desdeTableroY = 120;
let alpha = 125;
let fichaMovil;

let tablero = new Tablero(desdeTableroX, desdeTableroY, anchoTablero, altoTablero, "green");

fichas(90,450,"#FF0000",0);
fichas(850,450,"#0000FF",21);

// setInterval(() => {
//     fichas(90,450,"#FF0000");
//     fichas(850,450,"#0000FF");  
// }, 1000)


function fichas(x, y, color, c){
    for (let i = 0; i < 126; i+=6) {
        ficha = new Circle((x + Math.floor(Math.random()*15+1)), (y+i), 30, color);
        ficha.draw();
        arrFichas[c] = ficha;
        c++;
    }
}



// fichaR = new Circle(30,300,30, "#FF0000");
// fichaR.draw();
// arrFichas[0]= fichaR;
// fichaA = new Circle(800,300,30, "#0000FF");
// fichaA.draw();
// arrFichas[1]= fichaA;


//console.log(arrFichas);


let dragging = false;
let draggingId = -1;

    canvas.addEventListener('mousedown', r => {
        dragging = true;
        for (let i = 0; i < arrFichas.length; i++) {
            let status = arrFichas[i].hit(r.layerX, r.layerY);
            if (status) {
                draggingId = i;
                fichaMovil = arrFichas[i];
                break;
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

    canvas.addEventListener('mouseup', r => {
        dragging = false;
        draggingId = -1;
        let solteX = r.layerX;
        let solteY = r.layerY;
        
        if ((solteY > 50  && solteY < 120) && (solteX > 250 && solteX < 320)) {
            fijarFichaColumna(1);
        }

        if ((solteY > 50  && solteY < 120) && (solteX > 320 && solteX < 390)) {
            fijarFichaColumna(2);
        }
        if ((solteY > 50  && solteY < 120) && (solteX > 400 && solteX < 475)) {
            fijarFichaColumna(3);
        }
        if ((solteY > 50  && solteY < 120) && (solteX > 475 && solteX < 550)) {
            fijarFichaColumna(4);
        }
        if ((solteY > 50  && solteY < 120) && (solteX > 550 && solteX < 625)) {
            fijarFichaColumna(5);
        }
        if ((solteY > 50  && solteY < 120) && (solteX > 625 && solteX < 700)) {
            fijarFichaColumna(6);
         }
        if ((solteY > 50  && solteY < 120) && (solteX > 700 && solteX < 775)) {
            fijarFichaColumna(7);
        }
    });





    canvas.addEventListener('mousemove', r => {
        if (draggingId != -1) {
            arrFichas[draggingId].setPosition(r.layerX, r.layerY);
            redraw();
        }
    });



    function redraw(x, y) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        tablero.redrawTablero();
        for (let i = 0; i < arrFichas.length; i++) {
            if (draggingId !== i) {
                arrFichas[i].draw();
            }
        }
        
        if (draggingId !== -1) {
            arrFichas[draggingId].draw();
        }

    }


function addRect() {
    let posX = Math.round(Math.random() * widthCanvas)
    let posY = Math.round(Math.random() * heightCanvas)
    let color = "green"//randomRGBA()
    let rect = new Rect(posX, posY, 200, 200)
    rect.fillIn(color)
    figures.push(rect)    
}

function addCircle() {  
    let posX = Math.round(Math.random() * widthCanvas)
    let posY = Math.round(Math.random() * heightCanvas)
    let color = randomRGBA()
    let circle = new Circle(posX, posY, 20)
    circle.fillIn(color)
    figures.push(circle)
}

function randomRGBA() {
	let r = Math.round(Math.random() * 255)
	let g = Math.round(Math.random() * 255)
	let b = Math.round(Math.random() * 255)
	let a = 255
	return `rgba(${r}, ${g}, ${b}, ${a})`
}