const canv = document.getElementById('gameScreen');

const ctx = canv.getContext('2d');

// cargar imágenes

let imageAlimento = new image();
imageAlimento.src = 'alimento.png';

// cargar audio

//let audioName = new Audio();
//audioName.src = '';
//audioName.play();

// dibujar imágenes

// ctx.drawImage(imageName, X, Y, Width, Heigt);

ctx.drawImage(imageAlimento, 40, 50, 25, 25);

// dibujar retángulo

ctx.fillStyle = 'red';
ctxfillRect (100, 300, 30, 30);
