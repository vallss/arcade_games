// TIMER E PUNTEGGIO
/*
in entrambi i casi prima dobbiamo prendere il riferimento all'oggetto quindi al contenitore
in cui metteremo il tempo e il punteggio
definiamo poi una variabile let (in quanto il suo valore cambia viene sovrascritto) 
e assegniamo il suo valore al riferimento.innerText
*/
const scoreDisplay = document.querySelector('#score-display');
let score = 0;
scoreDisplay.innerText = score;

const timerDisplay = document.querySelector('#timer-display');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;


// inseriamo il bug in una cella via JS
const cells = document.querySelectorAll('.cell');


//Diamo un valore di velocità iniziale
let bugSpeed = 800; /* millisecondi */

// Logica per randomizzare il bug in una cella
function randomBug() {
    //Pulire tutte le celle prima di randomizzarne un'altra
    removeBug();

    //aumentiamo la difficoltà se il giocatore è troppo bravo
    if (score >= 20) {
        bugSpeed = bugSpeed - 400;
    }

    //randomizzo il posizionamento del bug sulla cella
    const randomNumber = Math.floor(Math.random() * cells.length);
    const cell = cells[randomNumber];
    cell.classList.add('bug');
}

const bugMovement = setInterval(randomBug, bugSpeed);

function removeBug() {
    for (let i = 0; i < cells.length; i++) {
        const cellToClean = cells[i];
        cellToClean.classList.remove('bug');
    }
}

// Diamo modo all'utente di colpire il bug!
for (let i = 0; i < cells.length; i++) {
    const cell = cells[i];
    cell.addEventListener('click', function () {
        if (cell.classList.contains('bug')) {
            score++;
            scoreDisplay.innerText = score;

            cell.classList.remove('bug');
            cell.classList.add('splat');

            //puliamo la cella dallo splat
            setTimeout(function () {
                cell.classList.remove('splat');
            }, 200);
        }
    });
}


// gestione del timer
const timer = setInterval(countDown, 1000); /*NB: non ci sono le parentesi quindi la funzione non è richiamata con la sintassi countDown() in quanto 
stiamo specificando il riferimento e sarà poi javascript ad andare a richiamarla. Infatti l'uso delle parentesi impica che la funzione verrà richiamata all'istante.
*/

// impostiamo un conto alla rovescia
function countDown() {
    timeLeft--;
    timerDisplay.innerText = timeLeft;

    if (timeLeft === 0) {
        clearInterval(timer);
        clearInterval(bugMovement);
        removeBug();

        showAlert(`GAME OVER! Punti: ${score}`);
    }
}



// tasto rigioca
const restartButton = document.getElementById('restart');
restartButton.addEventListener('click', function() {
    window.location.reload(); //ricarico la pagina
});
