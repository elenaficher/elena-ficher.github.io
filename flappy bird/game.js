// JAVASCRIPT CODE //

const cvs = document.getElementById('bird');
const ctx = cvs.getContext('2d');

// variables del juego

let frames = 0;
const degree = Math.PI/180;

// se carga el sprite, después cada elemento recorta de este sprite lo que necesite para dibujarse

const sprite = new Image();
sprite.src = "img/sprite.png";

// se cargan todos los sonidos individualmente

const SCORE_S = new Audio();
SCORE_S.src = "audio/sfx_point.wav"

const FLAP = new Audio();
FLAP.src = "audio/sfx_flap.wav"

const HIT = new Audio();
HIT.src = "audio/sfx_hit.wav"

const SWOOSHING = new Audio();
SWOOSHING.src = "audio/sfx_swooshing.wav"

const DIE = new Audio();
DIE.src = "audio/sfx_die.wav"


// estados del juego

const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2,
}

// boton de start y reseteo del juego

const startBtn = {
    x : 120,
    y : 263,
    w : 83,
    h : 29,
}

// control del juego

cvs.addEventListener('click', function(evt){
    switch(state.current){
        // en el state get ready, si haces click setea el state current a game
        case state.getReady:
            state.current = state.game;
            SWOOSHING.play();
            break;
        // en el state game, al hacer click ejecuta la funcion flap() de bird
        case state.game:
            bird.flap();
            FLAP.play();
            break;
        // en el state over, al hacer click setea el state current a get ready
        case state.over:
            let rect = cvs.getBoundingClientRect();
            let clickX = evt.clientX - rect.left;
            let clickY = evt.clientY - rect.top;

            // chequea si se hace click dentro del área del botón. El botón no es un objeto en si, sino que se detecta que se clickee detro de ciertas coordenadas que limitan el startBtn (está definido en const startBtn mas arriba)
            if (clickX >= startBtn.x && clickX <= startBtn.x + startBtn.w && clickY >= startBtn.y && clickY <= startBtn.y + startBtn.h){
                // cuando ocurre, llama a las funciones de reseteo en cada elemento para volver a su estado inicial
                pipes.reset();
                bird.speedReset();
                score.reset();
                state.current = state.getReady;
            }
            break;
    }
});


// dibujar fondo - bg = background

const bg = {
    sX : 0, // sX = source X, es la coordenada 'x' en la imagen de referencia
    sY : 0, // sY = source Y, es la coordenada 'y' en la imagen de referencia
    w : 275, // w = width, es el ancho del sprite en la imagen de referencia
    h : 226, // h = height, es la altura del sprite en la imagen de referencia
    x : 0, // x = es la coordenada x en destino, el canvas
    y : cvs.height - 226, // y = es la coordenada y en destino, el canvas

    // dibuja el fondo
    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    // una copia del fondo para rellenar
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    }
}


// dibujar frente - fg = frontground

const fg = {
    sX : 276, // sX = source X, es la coordenada 'x' en la imagen de referencia
    sY : 0, // sY = source Y, es la coordenada 'y' en la imagen de referencia
    w : 224, // w = width, es el ancho del sprite en la imagen de referencia
    h : 112, // h = height, es la altura del sprite en la imagen de referencia
    x : 0, // x = es la coordenada x en destino, el canvas
    y : cvs.height - 112, // y = es la coordenada y en destino, el canvas
    dx : 2,

    // dibuja el frente
    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);

    // una copia del frente para rellenar
        ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x + this.w, this.y, this.w, this.h);
    },

    // movimiento del frente
    update : function(){
        if(state.current == state.game){
            this.x = (this.x - this.dx)%(this.w/2);
        }
    }
}


// se dibuja el pajaro

const bird = {

    // para las coordenadas de referencia se crea un array con 3 ubicaciones, una de ellas se repite
    animation : [
        {sX : 276, sY : 112},
        {sX : 276, sY : 139},
        {sX : 276, sY : 164},
        {sX : 276, sY : 139}
    ],

    // parametros iniciales
    speed : 0,
    gravity : 0.15,
    jump : 3.5,
    x : 50,
    y : 150,
    w : 34,
    h : 26,
    frame : 0,
    radius : 12,
    rotation: 0,

    draw : function(){
        let bird = this.animation[this.frame];

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.drawImage(sprite, bird.sX, bird.sY, this.w, this.h, - this.w/2, - this.h/2, this.w, this.h);

        ctx.restore();
    },

    flap : function(){
        this.speed = - this.jump;
    },

    update : function(){

        // si el juego está en get ready, el período es 10, si no, el período es 5
        this.period = state.current == state.getReady ? 10 : 5;

        // incrementa 1 en cada período
        this.frame += frames%this.period == 0 ? 1 : 0;

        // va de 0 a 4 en la animación = animation[0] / animation[1] / etc..
        this.frame = this.frame%this.animation.length;
        
        // funcion de salto y caida
        if(state.current == state.getReady){

            // en la pantalla get ready el pajaro está en la altura 150
            this.y = 150;

            // en la pantalla get ready el pajaro tiene rotacion 0
            this.rotation = 0 * degree;
        }else{

            // la velocidad se incrementa por la gravedad
            this.speed += this.gravity;

            // la posicion de y se incrementa por la velocidad
            this.y += this.speed;

            // si el pajaro tiene la misma posicion del suelo, se detiene, la animacion se detiene en el frame 1 y la rotacion vuelve a 0
            if(this.y + this.h/2 >= cvs.height-fg.h){
                this.y = cvs.height - fg.h - this.h/2;
                this.rotation = 0 * degree;
                this.speed = 0;
                this.frame = 1;
                // el state pasa a over
                if(state.current == state.game){
                    state.current = state.over;
                    DIE.play();
                }
            }

            // cuando la velocidad es mas grande que el salto
            if(this.speed >= this.jump){
                this.rotation = 90 * degree;
                this.frame = 1;
            }else{
                this.rotation = -25 * degree
            }
        }
    },

    // funcion para resetear la velocidad (se llama desde el event click del start Btn)
    speedReset : function(){
        this.speed = 0;
    },
}


// se dibujan las cañerias

const pipes = {
    position : [],

    top:{
        sX : 553,
        sY : 0,
    },
    bottom:{
        sX : 502,
        sY : 0,
    },

    w : 53,
    h : 400,
    gap : 85,
    maxYPos : -150,
    dx : 2,

    draw : function(){
        for (let i = 0; i < this.position.length; i++){
            let p = this.position[i];

            let topYPos = p.y;
            let bottomYPos = p.y + this.h + this.gap;

            // caño superior
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, p.x, topYPos, this.w, this.h);

            // caño inferior
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, p.x, bottomYPos, this.w, this.h);
        }
    },

    update : function(){
        if(state.current !== state.game) return;

        if(frames%100 == 0){
            this.position.push({
                x : cvs.width,
                y : this.maxYPos * ( Math.random() + 1)
            })
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];

            
            let bottomPipeYPos = p.y + this.h + this.gap;

            // Detección de colision

            // Colisión del caño superior
            if ( bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > p.y && bird.y - bird.radius < p.y + this.h){
                state.current = state.over;
                HIT.play();
            }

            // Colisión del caño inferior
            if ( bird.x + bird.radius > p.x && bird.x - bird.radius < p.x + this.w && bird.y + bird.radius > bottomPipeYPos && bird.y - bird.radius < bottomPipeYPos + this.h){
                state.current = state.over;
                HIT.play();
            }

            // Movimiento de los caños hacia la izquierda
            p.x -= this.dx;

            // cuando la posición de la cañeria supera la pantalla se elimina por comando .shift() el elemento del array que contiene esa cañeria
            if (p.x + this.w <= 0){
                this.position.shift();
                score.value += 1;
                SCORE_S.play();
                score.best = Math.max(score.value, score.best);
                localStorage.setItem("best", score.best);
            }
        }
    },

    // funcion para resetear la posición (se llama desde el event click del start Btn)
    reset : function(){
        this.position = [];
    },
}


// contador de puntos

const score = {
    best : parseInt(localStorage.getItem("best")) || 0,
    value : 0,
    draw : function(){

        ctx.fillStyle = "#FFF";
        ctx.strokeStyle = "#000";

        if (state.current == state.game){

            ctx.lineWidth = 2;
            ctx.font = "35px Teko";

            // valor de score en pantalla juego
            ctx.fillText(this.value, cvs.width/2, 50);
            ctx.strokeText(this.value, cvs.width/2, 50);

        }else if(state.current == state.over){

            ctx.lineWidth = 2;
            ctx.font = "25px Teko";

            // valor de score en pantalla de over
            ctx.fillText(this.value, 225, 186);
            ctx.strokeText(this.value, 225, 186);

            // valor de best en pantalla de over
            ctx.fillText(this.best, 225, 228);
            ctx.strokeText(this.best, 225, 228);
        }
    },

    // funcion para resetear el conteo del score (se llama desde el event click del start Btn)
    reset : function(){
        this.value = 0;
    },
}

// mensaje de get ready

const getReady = {
    sX : 0,
    sY : 228,
    w : 173,
    h : 152,
    x : cvs.width/2 - 173/2,
    y : 80,

    // dibuja el mensaje
    draw : function(){
        if (state.current == state.getReady){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}


// mensaje de game over

const gameOver = {
    sX : 175,
    sY : 228,
    w : 225,
    h : 202,
    x : cvs.width/2 - 225/2,
    y : 90,

    // dibuja el mensaje
    draw : function(){
        if (state.current == state.over){
            ctx.drawImage(sprite, this.sX, this.sY, this.w, this.h, this.x, this.y, this.w, this.h);
        }
    }
}


// draw update loop

function draw(){
    // dibuja un rectángulo de las dimensiones del canvas
    ctx.fillStyle = '#70c5ce'; 
    ctx.fillRect(0, 0, cvs.width, cvs.height);

    // dibuja el fondo, el frente, el pajaro, las cañerias y las distintas pantallas de juego
    bg.draw();
    bird.draw();
    pipes.draw();
    fg.draw();
    getReady.draw();
    gameOver.draw();
    score.draw();
}

function update(){
    bird.update();
    fg.update();
    pipes.update();
}


// frames de la pantalla para redibujar el contenido

function loop(){
    update();
    draw();
    frames++;

    requestAnimationFrame(loop);
}

loop();



/* EJEMPLO DE UN ELEMENTO A DIBUJAR

const name = {

    sede donde viene, con que ancho y alto
    sX : 276,
    sY : 112,
    sW : 34,
    sH : 26,

    se define a donde va, con que ancho y que alto
    x : 0,
    y : 0,
    w : 0,
    h : 0,

    se dibuja el elemento

    draw : function(){
        ctx.drawImage(sprite, this.sX, this.sY, this.sW, this.sH, this.x, this.y, this.w, this.h)
    }
}

*/