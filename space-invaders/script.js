const grid = document.querySelector('#grid');
const scoreEl = document.querySelector('#score');
scoreEl.innerText = 0;
const size = 15;
const rxc = size * size;
const cells = [];
const speed = 400;

const aliens = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
];

const aliensKilled = [];
let alienMoveIntVal = null;
let score = 0;



for (let i = 0; i < rxc; i++) {
    const cell = document.createElement('div');
  //  cell.innerText = i;
    cells.push(cell); //salvo il singolo quadratino della griglia
    grid.appendChild(cell);
}


function checkForHumanWin() {
    if (aliensKilled.length === aliens.length) {      
        showAlert('HUMAN WINS!');
        clearInterval(alienMoveIntVal);
    }
}


function checkForAlienWin() {
    for(let i = 0; i < aliens.length; i++ ){
        if (!aliensKilled.includes(aliens[i])  && aliens[i] >= spaceshipIdx) {
            showAlert('ALIEN WINS');
            clearInterval(alienMoveIntVal);
        } else {

        }
    }
}


//piazzo gli alieni
function drawAliens() {
    for (let i = 0; i < aliens.length; i++) {

        if (!aliensKilled.includes(i)) {
            cells[aliens[i]].classList.add('alien');
        }

    }
}

function removeAliens() {
    for (let i = 0; i < aliens.length; i++) {
        cells[aliens[i]].classList.remove('alien');
    }
}

/* Movimento degli alieni */
let step = 1; //quanti passi devono fare gli alieni
let direction = 'forward'; //valore contrario backward; senso di marcia
//impartisco nuovi ordini. Prima rimuovo tutti gli alieni dalla loro posizione, li faccio avanzare e poi invoco nuovamente drawAliens() per riposizionarli
function moveAliens() {
    const leftEdge = aliens[0] % size === 0;
    const rightEdge = aliens[aliens.length - 1] % size === size - 1;

    removeAliens();

    if (direction === 'forward' && rightEdge) {

        for (let i = 0; i < aliens.length; i++) { //per ogni alieno
            //Scalare di una riga 
            aliens[i] = aliens[i] + size + 1;
            //invertire il senso di marcia
            step = - 1;
            //cambiare direzione
            direction = 'backward';

        }
    }

    if (direction === 'backward' && leftEdge) {

        for (let i = 0; i < aliens.length; i++) { //per ogni alieno
            //Scalare di una riga 
            aliens[i] = aliens[i] + size - 1;
            //invertire il senso di marcia
            step = 1;
            //cambiare direzione
            direction = 'forward';
        }
    }

    for (let i = 0; i < aliens.length; i++) {
        aliens[i] = aliens[i] + step;
    }

    checkForAlienWin();
    drawAliens();
}


//ciclicamente (dal punto di vista temporale) faccio spostare gli alieni sulla griglia
alienMoveIntVal = setInterval(moveAliens, speed);




//ASTRONAVE
let spaceshipIdx = 217;
cells[spaceshipIdx].classList.add('spaceship');

function moveSpaceship(event) {
    const leftEdge = spaceshipIdx % size === 0;
    const rightEdge = spaceshipIdx % size === size - 1;

    if (event.code === 'ArrowLeft' && !leftEdge) {
        //mi muovo a sx 
        cells[spaceshipIdx].classList.remove('spaceship');
        spaceshipIdx--;
        cells[spaceshipIdx].classList.add('spaceship');
    } else if (event.code === 'ArrowRight' && !rightEdge) {
        //mi muovo a dx
        cells[spaceshipIdx].classList.remove('spaceship');
        spaceshipIdx++;
        cells[spaceshipIdx].classList.add('spaceship');
    }

}
document.addEventListener('keydown', moveSpaceship);


//SHOOT

function shoot(event) {
    if (event.code !== 'Space') return; //circoscrivo l'attività alla sola occasione in cui il tasto schiacciato sia spazio

    let laserIdx = spaceshipIdx;
    let laserInterval = null;
    function moveLaser() {
        cells[laserIdx].classList.remove('laser');
        laserIdx = laserIdx - size;

        if (laserIdx < 0) {
            //clear del setInterval
            clearInterval(laserInterval);
            return;
        }

        //capire se abbiamo beccato un alieno
        if (cells[laserIdx].classList.contains('alien')) {
            //clear del setInterval
            clearInterval(laserInterval);
            cells[laserIdx].classList.remove('alien', 'laser');
            cells[laserIdx].classList.add('boom');
            setTimeout(function () {
                cells[laserIdx].classList.remove('boom');
            }, 200);


            const killed = aliens.indexOf(laserIdx);
            aliensKilled.push(killed);

            //incremento punteggio
            score++;
            scoreEl.innerText = score;
            checkForHumanWin();

            return; //questo return serve per non far assegnare nuovamente la classe laser alla cella corrente

        }



        cells[laserIdx].classList.add('laser');
    }

    laserInterval = setInterval(moveLaser, 200);

}
document.addEventListener('keydown', shoot);


