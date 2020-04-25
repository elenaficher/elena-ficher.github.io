let x = 0;
let y = 0;
let incremento = 15;
let limite = 200;
let f = 0;

let asteroides = {
    velCaida : 1,
    posicionV : 0,
    posicionH : 0,
    tamaño : 5
};

let nave = {
    velNave : 1,
    posicionH : 1
};

let i1 = 0;
let j1 = Math.floor(Math.random() * limite);
let w1 = 20;
let velCaida1 = 3;

let i2 = 0;
let j2 = Math.floor(Math.random() * limite);
let w2 = 10;
let velCaida2 = 2;

let i3 = 0;
let j3 = -1*(Math.floor(Math.random() * limite));
let w3 = 5;
let velCaida3 = 3;

let i4 = 0;
let j4 = -1*(Math.floor(Math.random() * limite));
let w4 = 5;
let velCaida4 = 4;

let contador = 0;

let velAsteroides = 12; // mas chico el numero, mas rápido el asteroide

// controles nave

document.onkeydown = function(event) {
    switch (event.keyCode) {
       case 37:
        if (x > -limite) {
            x = x - incremento;
            traslado = 'translateX('+x+'px)';
            document.getElementById('nave').style.transform = traslado;
        }   
          break;

       case 39:
        if (x < limite) {
            x = x + incremento;
            traslado = 'translateX('+x+'px)';
            document.getElementById('nave').style.transform = traslado;
        }
          break;
       
       case 32:
            if (f > -300) {
                document.getElementById('misil').style.display = 'block';
                var i;
                for (i = 0; i < 400; i++) {
                    setInterval(vueloMisil, 10);
                    function vueloMisil() {
                        f = f - 0.01;
                        velMisil = 'translateY('+f+'px)';
                        document.getElementById('misil').style.transform = velMisil;
                    }        
                }
            }
            else if (f < -300) {
            f = 0;
        }
        
          break;   
    }
}

// asteroides

function caida1() {
    if (i1 < 480) {
        i1 = i1 + velCaida1;
        document.getElementById('asteroide1').style.transform = 'translate('+j1+'px,'+i1+'px)';
        document.getElementById('asteroide1').style.width = w1+'px';
        document.getElementById('asteroide1').style.height = w1+'px';
    }
    else {
        i1 = 0;
        j1 = x;
        velCaida1 = Math.floor(Math.random() * 3) + 1 + contador/300;
        w1 = Math.floor(Math.random() * 30) + 5 + contador/30;
        contador++;
        document.getElementById("contador").innerHTML = contador;
    }
}

function caida2() {
    if (contador > 3) {
        if (i2 < 480) {
            i2 = i2 + velCaida2;
            document.getElementById('asteroide2').style.transform = 'translate('+j2+'px,'+i2+'px)';
            document.getElementById('asteroide2').style.width = w2+'px';
            document.getElementById('asteroide2').style.height = w2+'px';
        }
        else {
            i2 = 0;
            j2 = (Math.floor(Math.random() * limite) + 10) - (Math.floor(Math.random() * limite) + 10);
            velCaida2 = Math.floor(Math.random() * 6) + 1 + contador/300;
            w2 = Math.floor(Math.random() * 40) + 5 + contador/30;
            contador++;
            document.getElementById("contador").innerHTML = contador;
        }
    }
}

function caida3() {
    if (contador > 10) {
        if (i3 < 480) {
            i3 = i3 + velCaida3;
            document.getElementById('asteroide3').style.transform = 'translate('+j3+'px,'+i3+'px)';
            document.getElementById('asteroide3').style.width = w3+'px';
            document.getElementById('asteroide3').style.height = w3+'px';
        }
        else {
            i3 = 0;
            j3 = (Math.floor(Math.random() * limite) + 10) - (Math.floor(Math.random() * limite) + 10);
            velCaida3 = Math.floor(Math.random() * 2) + 2 + contador/300;
            w3 = Math.floor(Math.random() * 40) + 5 + contador/30;
            contador++;
            document.getElementById("contador").innerHTML = contador;
        }
    }
}

function caida4() {
    if (contador > 30) {
        if (i4 < 480) {
            i4 = i4 + velCaida4;
            document.getElementById('asteroide4').style.transform = 'translate('+j4+'px,'+i4+'px)';
            document.getElementById('asteroide4').style.width = w4+'px';
            document.getElementById('asteroide4').style.height = w4+'px';
        }
        else {
            i4 = 0;
            j4 = (Math.floor(Math.random() * limite) + 10) - (Math.floor(Math.random() * limite) + 10);
            velCaida4 = Math.floor(Math.random() * 3) + 3 + contador/400;
            w4 = Math.floor(Math.random() * 40) + 5 + contador/20;
            contador++;
            document.getElementById("contador").innerHTML = contador;
        }
    }
}

setInterval(caida1, velAsteroides);
setInterval(caida2, velAsteroides);
setInterval(caida3, velAsteroides);
setInterval(caida4, velAsteroides);


// colision

let colision = {
    posicionH : 10,
    posicionV : 10,
    tamaño : 5
};




/*
var circle = {  x : 10,  y : 10,  radius : 5};

function collision(circle1, circle2) {
    var totalRadius = circle1.radius + circle2.radius;
    if(distance(circle1, circle2) <= totalRadius) {
        return true;
    }
    else {
        return false;
    }
}

function distance(circle1, circle2) {
    var xDist = circle2.x - circle1.x;
    var yDist =circle2.y - circle1.y;
    var hypotenuse = Math.sqrt(xDist*xDist + yDist*yDist);
    return hypotenuse;
}
*/


