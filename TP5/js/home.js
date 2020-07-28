document.addEventListener("DOMContentLoaded", e => {
    $("div.resumen").text(function(index, currentText) {
        return currentText.substr(0, 270) + "...";
    });

    let botonUser = document.querySelector(".user");
        botonUser.addEventListener("click", e => {
            var abrir = document.querySelector(".menuUser");
            abrir.classList.add("aparece");
            // window.location="iniciar.html";
    });

    let botonHome = document.querySelector("#home");
        botonHome.addEventListener("click", e => {
            window.location="home.html";
    });

    let botonMenu = document.querySelector(".menuHamb");
        botonMenu.addEventListener("click", e => {
            var menu = document.querySelector(".menuUser");
            menu.classList.toggle("aparece");
    });

    let botonesEscuchar = document.querySelectorAll(".escuchar");
    let imagenReproductor = document.querySelector(".imagenEscuchar");
    botonesEscuchar.forEach(btn => {
        btn.addEventListener("click", e => {
            var imagenTransladar = btn.parentElement.parentElement.parentElement.querySelector(".imagenTransladar").src;
            imagenReproductor.children[0].src = imagenTransladar;
        });

    });
    

    

    
});
    
  