class BotonEfecto extends Circle {
    constructor(posX, posY, radio, color, texto) {
        super(posX, posY, radio, color);
        this.texto = texto;
        this.intervalo;
        this.fichas = [];
    }

    efectoBoton(){
        this.draw();
        let x = 400;
        let y = 270;
        this.intervalo = setInterval(() => {
        this.draw();
            for (let i = 0; i < 100; i++) {
                ficha = new Circle((x + Math.floor(Math.random()*200+1)), (y+ Math.floor(Math.random()*170+1)), Math.floor(Math.random()*15+1), this.randomRGBA());
                this.fichas[i] = ficha; 
                ficha.draw();
            }
        this.context.font = "bold 66px sans-serif";
        this.context.fillStyle = "yellow";
        this.context.strokeStyle = "black";
        this.context.fillText(this.texto,390,375);
        this.context.stroke();
        }, 500);
    }

    randomRGBA() {
        let r = Math.round(Math.random() * 255)
        let g = Math.round(Math.random() * 255)
        let b = Math.round(Math.random() * 255)
        let a = 255
        return `rgba(${r}, ${g}, ${b}, ${a})`
    }

    finalizarEfecto(){
        clearInterval(this.intervalo);
    }
}