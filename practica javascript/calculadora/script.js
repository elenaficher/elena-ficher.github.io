
/*
function sumar(){
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let expresion = n1 + " + " + n2 + " = ";
    let suma = n1 + n2;
    document.getElementById("resultado").innerText = expresion + suma;
}

function restar(){
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let expresion = n1 + " - " + n2 + " = ";
    let resta = n1 - n2;
    document.getElementById("resultado").innerText = expresion + resta;
}

function multiplicar(){
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let expresion = n1 + " x " + n2 + " = ";
    let multiplica = n1 * n2;
    document.getElementById("resultado").innerText = expresion + multiplica;
}

function dividir(){
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let expresion = n1 + " / " + n2 + " = ";
    if (n2 != 0){
        let divide = n1 / n2;
        document.getElementById("resultado").innerText = expresion + divide;
    }else{
        document.getElementById("resultado").innerText = expresion + "Infinito";
    }
}
*/

function calcular(operacion){
    let n1 = parseInt(document.getElementById("num1").value);
    let n2 = parseInt(document.getElementById("num2").value);
    let resultado;
    let op;
    switch(operacion) {
        case 'suma':
            resultado = n1 + n2;
            op = '+';
            break;
        case 'resta':
            resultado = n1 - n2;
            op = '-';
            break;
        case 'multiplicacion':
            resultado = n1 * n2;
            op = 'x';
            break;
        case 'division':
            if (n2 != 0){
                resultado = n1 / n2;
            }else{
                resultado = "Infinito";
            }
            op = '/';
            break;
    }
    let expresion = n1 + ' ' + op + ' ' + n2 + " = ";
    document.getElementById("resultado").innerText = expresion + resultado;
}