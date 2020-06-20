class Obstaculo {
    constructor() {
        this.posicion = null;
        this.obstaculoDiv = document.querySelector('.obstaculo');

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
}