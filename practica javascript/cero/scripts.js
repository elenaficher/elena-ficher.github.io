let i = 0;
let x = 0;
let y = 0;
let w = 0;
let limite = 100;
let incremento = 20;
let angulo = 30;

function desaparece(){
    document.getElementById('caja').style.visibility='hidden';
}

function aparece(){
    document.getElementById('caja').style.visibility='visible';
}

function fondoNegro(){
    document.getElementById('caja').style.backgroundColor='black';
}

function fondoRojo(){
    document.getElementById('caja').style.backgroundColor='red';
}

function suma(){
    if (i < 5) {
        i = i + 1;
        numero = i.toString();
        document.getElementById('caja').innerHTML=numero;
    }

    else {
        document.getElementById('caja').innerHTML="NO";
    }
}

function resta(){
    if (i > -5) {
        i = i - 1;
        numero = i.toString();
        document.getElementById('caja').innerHTML=numero;
    }

    else {
        document.getElementById('caja').innerHTML="NO";
    }
}

function moveLeft(){
    if (x > -limite) {
        x = x - incremento;
        traslado = 'translate('+x+'px,'+y+'px)';
        document.getElementById('caja').style.transform = traslado;
    }   
}

function moveRight(){
    if (x < limite) {
        x = x + incremento;
        traslado = 'translate('+x+'px,'+y+'px)';
        document.getElementById('caja').style.transform = traslado;
    }
}

function moveUp(){
    if (y > -limite) {
        y = y - incremento;
        traslado = 'translate('+x+'px,'+y+'px)';
        document.getElementById('caja').style.transform = traslado;
    }
}

function moveDown(){
    if (y < limite) {
        y = y + incremento;
        traslado = 'translate('+x+'px,'+y+'px)';
        document.getElementById('caja').style.transform = traslado;
    }
}

function turnLeft(){
    w = w - angulo;
    rotacion = 'rotate('+w+'deg)';
    document.getElementById('caja').style.transform = rotacion;
}

function turnRight(){
    w = w + angulo;
    rotacion = 'rotate('+w+'deg)';
    document.getElementById('caja').style.transform = rotacion;
}

document.onkeydown = function(event) {
    switch (event.keyCode) {
       case 37:
        if (x > -limite) {
            x = x - incremento;
            traslado = 'translate('+x+'px,'+y+'px)';
            document.getElementById('caja').style.transform = traslado;
        }   
          break;
       case 38:
        if (y > -limite) {
            y = y - incremento;
            traslado = 'translate('+x+'px,'+y+'px)';
            document.getElementById('caja').style.transform = traslado;
        }
          break;
       case 39:
        if (x < limite) {
            x = x + incremento;
            traslado = 'translate('+x+'px,'+y+'px)';
            document.getElementById('caja').style.transform = traslado;
        }
          break;
       case 40:
        if (y < limite) {
            y = y + incremento;
            traslado = 'translate('+x+'px,'+y+'px)';
            document.getElementById('caja').style.transform = traslado;
        }
          break;
    }
};