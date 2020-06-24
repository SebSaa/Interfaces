class Game {
    constructor() {
        this.container = document.querySelector(".contienePersonaje");
        this.body = document.querySelector('body');
        this.bodyHeight = window.getComputedStyle(this.body, null).getPropertyValue("height");
        this.BODYHEIGHT = parseInt(this.bodyHeight.split('px')[0]);
        this.height = window.getComputedStyle(this.container, null).getPropertyValue("height");
        this.diferencia = this.BODYHEIGHT - parseInt(this.height.split('px')[0]);
        this.player = new Player();
        this.obstacles = [];
        this.bonus;
        this.score;
        this.bestScore = 0;
        this.goUp = false;
        this.interval;
        this.scoreSpan = document.querySelector('.spanScore');
        this.bestScoreSpan = document.querySelector('.spanBestScore');
        this.cartelVictoria = document.querySelector('.victoria');
        this.random = 2500;
    }

    initGame() {
        this.cartelVictoria.classList.add('hide');
        this.score = 0;
        this.player.setPositionIni(350);
        this.player.setAnimation('personajeNormal');
        this.bonus = new Bonus();
        this.bonus.removeHide();
        this.bonus.setAnimation();
        for (let i = 0; i < 3; i++) {
            this.obstacles.push(new Obstaculo(i, (3.5 * i)));
        }

        window.addEventListener('keyup', e => {
            if (e.keyCode === 38) {
                console.log("entre");

                this.goUp = true;
            }
        });

        this.interval = setInterval(this.loop.bind(this), 17);

    }

    loop() {
        let top = window.getComputedStyle(this.container, null).getPropertyValue("top");
        top = parseInt(top.split('px')[0]);
        if (this.goUp) {
            
                if ((top - 25) >= 0) {
                    this.player.goUp(top - 25);
                    this.goUp = false;
                } else {
                    top = 0;
                    this.goUp = false;
                }
       
        } else {
            if ((top + 1) <= this.diferencia) {
                this.player.setPosition(top + 1);
            } else {
                this.endGame();
            }
        }

        this.updateScreen();
        for (let i = 0; i < this.obstacles.length; i++) {

            if (this.checkColition(this.obstacles[i])) {
                this.endGame();
            } else {
                this.obstacles[i].setNewHeight();
                this.score++;
                this.scoreSpan.innerHTML = this.score;
                if (this.score > 10000) {
                    this.victoria();
                }
            }
        }

        if (this.bonus.checkBonus(this.player)){
            this.score = 10000;
        }

        if (this.bonus.getRight() <= 0) {
            if (Math.random() * 1 > 0.5) {
                this.bonus.setPositionIni(50);
            } else {
                this.bonus.setPositionIni(650);
            }
            this.bonus.removeAnimation();
            this.bonus.removeHide();
        }

        if (this.score >= this.random) {
            this.random += 2000;
            this.bonus.setAnimation();
        }
    }
    
    checkColition(obstacle) {
        let obsIzq = obstacle.getLeft();
        let obsDer = obstacle.getRight();
        let altInf = obstacle.getLimiteSup();
        let altSup = obstacle.getLimiteInf();
        let perDer = this.player.getRight();
        let perIzq = this.player.getLeft();
        let perInf = this.player.getLimInf();
        let perSup = this.player.getTop();
        
        //comienzo a pasar el obstaculo
        if (perDer >= obsIzq && perIzq <= obsDer){
            if (perInf >= altInf || perSup <= altSup){
                return true;
            }
        }
    }

    updateScreen() {
        this.player.updateScreen();
    }

    victoria(){
        this.bonus.addHide();
        this.bonus.removeAnimation();
        this.cartelVictoria.classList.remove('hide');
        clearInterval(this.interval);
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].removerAnimacion();
        }
        this.obstacles = [];
        setTimeout(() => {
            this.score = 0;
            let restart = document.querySelector('.restart');
            restart.classList.remove('hide');
        }, 5000);
    }

    endGame() {
        this.bonus.addHide();
        this.bonus.removeAnimation();
        this.player.setAnimation('personajeMuere');
        clearInterval(this.interval);
        for (let i = 0; i < this.obstacles.length; i++) {
            this.obstacles[i].removerAnimacion();
        }
        this.obstacles = [];
        if (this.score > this.bestScore){
            this.bestScore = this.score;
            this.bestScoreSpan.innerHTML = this.bestScore;
        }
        let restart = document.querySelector('.restart');
        restart.classList.remove('hide');
        this.updateScreen();
    }

}