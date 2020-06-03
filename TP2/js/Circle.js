class Circle extends Figure {
    constructor(posX, posY, radio, color, image) {
        super(posX, posY, color, image)
        this.radio = radio
    }

    drawImage(){
        this.context.beginPath()
        this.context.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI)
        this.context.fillStyle = this.fill
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.lineCap = 'round';
        this.context.strokeStyle = 'black';
        this.context.stroke();
        if (this.image!=null){
            this.context.drawImage(this.image, this.posX - this.radio, this.posY - this.radio, this.radio * 2, this.radio * 2);
        }
        this.context.closePath()
    }

    draw() {
        this.context.beginPath()
        this.context.arc(this.posX, this.posY, this.radio, 0, 2 * Math.PI)
        this.context.fillStyle = this.fill
        this.context.fill();
        this.context.lineWidth = 1;
        this.context.lineCap = 'round';
        this.context.strokeStyle = 'black';
        this.context.stroke();
        this.context.closePath()
    }

    getRadio() {
        return this.radio
    }

    hit(x, y) {
        let temp = false;
        let m = Math.pow(x - this.posX, 2) + Math.pow(y - this.posY, 2);
        return m < Math.pow(this.radio, 2);
    }

}

