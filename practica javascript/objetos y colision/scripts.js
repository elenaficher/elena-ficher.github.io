function showData(textoDato) {
    document.getElementById('info').textContent = textoDato;
}

function otroNombre() {
    persona.nombre = 'Jorge';
}

let persona = {
    edad: 23,
    altura: 173,
    nombre: 'Atenea',
    showInfo: function(verdaderaEdad) {
        showData(this.nombre + ' tiene ' + verdaderaEdad);
    }
}

function btnAll() {
    persona.showInfo(27);
}

function btnName() {
    otroNombre();
}









// generador de números aleatorios entre 1 y -1

let valorIntervalo = 100;
setInterval(rndm,valorIntervalo);
function rndm() {
    valor = Math.floor(Math.random() * 2) + 1;
    console.log(valor);
    if (valor === 1) {
        showData(1);
    }
    else if (valor === 2) {
        showData(-1);
    }
}

// -----------------------------------------------------------------------


// ejemplo de modificacion de dato dentro de una funcion a traves de botones

/*
function showData(textoDato) {
    document.getElementById('info').innerContent = textoDato;
}

function btnName() {
    showData(persona.nombre);
}

function btnAge() {
    showData(persona.edad);
}

function btnHigh() {
    showData(persona.altura);
}

function btnAll() {
    showData(persona.nombre + ' - ' + persona.edad + ' - ' + persona.altura)
}
*/


// -----------------------------------------------------------------------


//  ejemplo de funcion con entrada de 2 datos

/*
function mensaje(dato1,dato2) {
    console.log(dato1,dato2)
}

mensaje('43','33');
*/

