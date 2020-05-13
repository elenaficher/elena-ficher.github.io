/*
function factorial(x){
    num = 1;
    for (i = 1 ; i <= x ; i++){
        num = num*i;
        console.log(num);
    }
    return num;
}

console.log(factorial(5));
*/


/*
function alturaArbolUtopico(x){
    let alturaInicial = 1;
    let altura = 0;
    for (i = 0 ; i <= x ; i++){
        if (i%2 == 0){
            altura++;
        }else{
            altura = altura*2;
        }
        console.log(altura);
    }
    return (altura);
}

console.log(alturaArbolUtopico(2));
*/


/*
let ingresosDelLunes = [10, -5, -1, 0, 30];
let ingresosDelMartes = [-10, -5, 5, 0, 50];
let ingresosDelMiercoles = [-10, -5, -1, 0, 2];
let ingresosDelJueves = [10, 5, 1, 3, 6];
let ingresosDelViernes = [3,0,3];
let semanaCompleta = [ingresosDelLunes, ingresosDelMartes, ingresosDelMiercoles, ingresosDelJueves, ingresosDelViernes]

function seAbre(minutos, tolerancia){
    let alumnos = 0;
    for (i = 0 ; i < minutos.length ; i++){
        if (minutos[i] <= 0){
            alumnos++;
        }
    }
    return alumnos >= tolerancia;
}

function aperturas(dias, tolerancia){
    let sss = [];
    for (i = 0 ; i < dias.length ; i++){
        let alumnos = 0;
        for (n = 0 ; n < dias[i].length ; n++){
            if (dias[i][n] <= 0){
                alumnos++;
            }
        }
        sss.push(alumnos >= tolerancia);
    }
    return sss;
}


console.log(seAbre(ingresosDelJueves,1));
console.log(aperturas(semanaCompleta,1));
*/


/*
function escalera(escalones){
    let ladder = [];
    for (i = 0 ; i < escalones ; i++){
        ladder.push(" ".repeat(escalones-i-1) + "#".repeat(i+1));
    }
    return ladder;
}

console.log(escalera(5));
*/


/*
function masMenos(arr){
    sumPos = 0;
    sumCero = 0;
    sumNeg = 0;
    sumTotal = 0;
    for (i = 0 ; i < arr.length ; i++){
        if (arr[i] > 0){
            sumPos++;
        }else if (arr[i] == 0){
            sumCero++;
        }else{
            sumNeg++;
        }
    }
    sumTotal = sumPos + sumCero + sumNeg;
    newArr = [sumPos/sumTotal, sumCero/sumTotal, sumNeg/sumTotal];
    return (newArr);
}

console.log(masMenos([1, 5, 0, -1, 9]));
*/


/*
function productoria(arr){
    suma = 1;
    for (i = 0 ; i < arr.length ; i++){
        suma *= arr[i];
    }
    return suma;
}

console.log(productoria([1,5,7]));
*/


let h = 0;
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