class Obstaculo {
    constructor(valor, delay) {
        this.posicion = null;
        this.body = document.querySelector('body');
        this.heighScreen = Math.floor(window.getComputedStyle(this.body, null).getPropertyValue("height").split("px")[0]);
        this.obstaculoDiv = document.querySelector('.contieneObstaculo' + valor) ;
        this.obstaculoDivSup = document.querySelector('.contieneObstaculoSup' + valor);
        this.width = Math.floor(window.getComputedStyle(this.obstaculoDiv, null).getPropertyValue("width").split("px")[0]);
        this.obstaculoDiv.classList.add("moverObstaculo");
        this.obstaculoDivSup.classList.add("moverObstaculo");
        this.obstaculoDiv.style.setProperty("animation-delay", delay + "s");
        this.obstaculoDivSup.style.setProperty("animation-delay", delay + "s");
        
    }

    removerAnimacion(){
        this.obstaculoDiv.classList.remove('moverObstaculo');
        this.obstaculoDivSup.classList.remove('moverObstaculo');
    }

    getLimiteInf(){
        return Math.floor(window.getComputedStyle(this.obstaculoDivSup, null).getPropertyValue("height").split("px")[0]);

    }


    getLimiteSup(){
        return (this.heighScreen - Math.floor(window.getComputedStyle(this.obstaculoDiv, null).getPropertyValue("height").split("px")[0]));
    }

    getRight(){
       return (this.getLeft() + this.width);
    }
    
    getLeft(){
       return Math.floor(window.getComputedStyle(this.obstaculoDiv, null).getPropertyValue("left").split("px")[0]);
    }

    updateScreen() {
        this.playerDiv.style.top = this.posicion + "px";
    }

    setPosition(top) {
        this.posicion = top;
    }

    goUp(top) {
        this.setPosition(top);
    }

    update() {

    }

    setNewHeight() {
        if (this.getLeft() <= -78) {
            let random = (Math.floor((Math.random() * 500)) + 1);
            let random2 = (775 - random) - 300;
            this.obstaculoDiv.style.setProperty("height", random + "px");
            this.obstaculoDivSup.style.setProperty("height", random2 + "px");
        }
    }
}