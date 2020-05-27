let canvas = document.getElementById('canvas')
let context = canvas.getContext('2d')

let arrFichas = []
let pictures = []

canvas.width = canvas.offsetWidth
canvas.height = canvas.offsetHeight
let anchoTablero = (canvas.width /4) * 2
let altoTablero = (70 * 6 ) + 20 
let desdeTableroX = canvas.width/4
let desdeTableroY = 120
let alpha = 125

let tablero = new Tablero(desdeTableroX, desdeTableroY, anchoTablero, altoTablero, "green");

fichas(90,450,"#FF0000",2);
fichas(850,450,"#0000FF",23);

// setInterval(() => {
//     fichas(90,450,"#FF0000");
//     fichas(850,450,"#0000FF");  
// }, 1000)


function fichas(x, y, color, c){
    for (let i = 0; i < 126; i+=6) {
        ficha = new Rect((x + Math.floor(Math.random()*15+1)), (y+i), 60, 6, color);
        ficha.draw();
        arrFichas[c] = ficha;
        c++;
    }
}


fichaR = new Circle(30,300,30, "#FF0000")
fichaR.draw()
arrFichas[0]= fichaR;
fichaA = new Circle(800,300,30, "#0000FF")
fichaA.draw()
arrFichas[1]= fichaA;





let dragging = false;
let draggingId = -1;

    canvas.addEventListener('mousedown', r => {
        dragging = true;
        for (let i = 0; i < arrFichas.length; i++) {
            let status = arrFichas[i].hit(r.layerX, r.layerY);
            if (status) {
                draggingId = i;
                //console.log('le pegue');
                break;
            }
        }
    });

    canvas.addEventListener('mouseup', r => {
        dragging = false;
        draggingId = -1;
    });

    canvas.addEventListener('mousemove', r => {
        if (draggingId != -1) {
            arrFichas[draggingId].setPosition(r.layerX, r.layerY);
            redraw();
        }
    });



    function redraw(x, y) {
        context.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < arrFichas.length; i++) {
            if (draggingId !== i) {
                arrFichas[i].draw();
            }
        }
        tablero.dibujarTablero();

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