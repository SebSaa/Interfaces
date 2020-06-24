class Bonus {
    constructor() {
        this.position = null;
        this.bonusDiv = document.querySelector('.contieneBonus');
        this.width = Math.floor(window.getComputedStyle(this.bonusDiv, null).getPropertyValue("width").split("px")[0]);
        this.height = Math.floor(window.getComputedStyle(this.bonusDiv, null).getPropertyValue("height").split("px")[0]);
    }

    checkBonus(player){ 
       if (this.getLeft() <= player.getRight() && this.getRight() >= player.getLeft()){
           if (this.getTop() <= player.getLimInf() && this.getBottom() >= player.getTop()) {
            this.bonusDiv.classList.add('hide');
            return true;
           }
       }
    }

    setPositionIni(valor){
        this.bonusDiv.style.top = valor + "px";
    }

    setAnimation(){
        this.bonusDiv.classList.add('moverBonus');
    }

    removeAnimation(){
        this.bonusDiv.classList.remove('moverBonus');

    }

    addHide(){
        this.bonusDiv.classList.add('hide');
    }

    removeHide(){
        this.bonusDiv.classList.remove('hide');
    }
        
    getLeft() {
        return Math.floor(window.getComputedStyle(this.bonusDiv, null).getPropertyValue("left").split("px")[0]);
    }

    getRight() {
        return (this.getLeft() + this.width); 
    }

    getTop() {
        return Math.floor(window.getComputedStyle(this.bonusDiv, null).getPropertyValue("top").split("px")[0]);
    }

    getBottom() {
        return (this.getTop() + this.height);
    }

    setDelay(delay){
        this.bonusDiv.style.setProperty("animation-delay", delay + "s");
    }
   
}