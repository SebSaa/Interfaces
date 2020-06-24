document.addEventListener("DOMContentLoaded", e => {

let game = new Game();
    
let botonStart = document.querySelector(".botonEfecto");
    botonStart.addEventListener("click", e => {
        game.initGame();
        botonStart.classList.add("hide");
});

let restart = document.querySelector('.restart');
    restart.addEventListener("click", e => {
        restart.classList.add("hide");
        game.initGame();
});





});