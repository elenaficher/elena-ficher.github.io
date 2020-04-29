// JAVASCRIPT CODE //

const cvs = document.getElementById('bird');
const ctx = cvs.getContext('2d');

// variables del juego

let frames = 0;
const degree = Math.PI/180;

// cargar sprite

const sprite = new Image();
sprite.src = "img/sprite.png";

// control del juego

const state = {
    current : 0,
    getReady : 0,
    game : 1,
    over : 2,
}

cvs.addEventListener('click', function(evt){
    switch(state.current){
        // en el state get ready, si haces click setea el state current a game
        case state.getReady:
            state.current = state.game;
            break;
        // en el state game, al hacer click ejecuta la funcion flap() de bird
        case state.game:
            bird.flap();
            break;
        // en el state over, al hacer click setea el state current a get ready
        case state.over:
            state.current = state.getReady;
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
    }
}


// se dibujan las cañerias

const pipes = {
    bottom : {
        sX : 502,
        sY : 0
    },
    top : {
        sX : 553,
        sY : 0
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
            ctx.drawImage(sprite, this.top.sX, this.top.sY, this.w, this.h, this.x, topYPos, this.w, this.h);

            // caño inferior
            ctx.drawImage(sprite, this.bottom.sX, this.bottom.sY, this.w, this.h, this.x, bottomYPos, this.w, this.h);
        }
    },

    update : function(){
        if(state.current !== state.game) return;

        if(frames%100 == 0){
            this.position.push({
                x : cvx.width,
                y : this.maxYPos * ( Math.random() + 1)
            })
        }
        for(let i = 0; i < this.position.length; i++){
            let p = this.position[i];

            p.x -= this.dx;
        }
    }
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

    // dibuja el fondo y el frente
    bg.draw();
    fg.draw();
    bird.draw();
    pipes.draw();
    getReady.draw();
    gameOver.draw();
}

function update(){
    bird.update();
    fg.update();
    //pipes.update();
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