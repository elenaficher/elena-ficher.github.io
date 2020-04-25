


// --------------------------------------------

function inicioContador(valor) {
    return function contador() {
        return valor++;
    }
}

let cont1 = inicioContador(0);
console.log(cont1());
console.log(cont1());

let cont2 = inicioContador(10);
console.log(cont2());
console.log(cont2());

// --------------------------------------------

function allData() {
    for(let i = 0; i < arguments.length; i++) {
        console.log(arguments[i]);
    }
}

allData(1,2,3,4,5);
allData('Ana','Ernesto','Maria');

// --------------------------------------------

function saludos(apellido) {
    console.log('Hola ' + apellido)
}

let apellido = 'Gutierrez';

saludos(apellido);

apellido = 'Fernandez';

saludos(apellido);

// --------------------------------------------

function saludo(nombre) {
    return 'Hello ' + nombre;
}

let mensaje = saludo('Jorge');

console.log(mensaje);

// --------------------------------------------

function suma(num1, num2) {
    return num1 + num2;
}

let resultado = suma(2,3);

console.log(resultado);
