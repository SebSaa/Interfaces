class Player {
    constructor() {
        this.posicion = null;
        this.playerDiv = document.querySelector('.contienePersonaje');
        this.player = document.querySelector('.personaje');
        this.left = Math.floor(window.getComputedStyle(this.playerDiv, null).getPropertyValue("left").split("px")[0]);
        this.width = Math.floor(window.getComputedStyle(this.playerDiv, null).getPropertyValue("width").split("px")[0]);
        this.height = Math.floor(window.getComputedStyle(this.playerDiv, null).getPropertyValue("height").split("px")[0]);
    }

    setPositionIni(valor){
        this.playerDiv.style.top = valor + "px";
    }
    
    setAnimation(animation){
        if (animation == 'personajeNormal'){
            this.player.classList.add(animation);
            this.playerDiv.classList.remove('kill');
            this.player.classList.remove('personajeMuere');
        } else {
            this.player.classList.add(animation);
            this.playerDiv.classList.add('kill');
            this.player.classList.remove('personajeNormal');
        }
    }

    getLimInf(){
       return (this.posicion + this.height);
    }

    getTop(){
        return this.posicion;
    }

    getLeft(){
        return this.left;
    }

    getRight(){
        return (this.left + this.width);
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