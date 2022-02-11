const grid = document.querySelector('#grid');
const errorCounter = document.querySelector('#error');
const cards = ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'];
/* creiamo il mazzo a partire dall'array delle card iniziali: array "spread" è un operatore rappresentato da tre punti
consente di creare una copia di un array espandendo il contenuto. Infatti è utilizzato per operazioni di merging o cloning.
*/
const deck = [...cards, ...cards];
/*console.log(deck);  (12) ['alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac', 'alien', 'bug', 'duck', 'rocket', 'spaceship', 'tiktac'] */

let pick = []; /* array di carte scelte */

let errors = 0;

deck.sort(function () {
    return 0.5 - Math.random();
});

for (let i = 0; i < deck.length; i++) {
    const card = document.createElement('div');
    const cardName = deck[i];
    card.classList.add('card');
    card.setAttribute('data-name', cardName)
    card.addEventListener('click', flipCard);
    grid.appendChild(card);
}

errorCounter.innerText = errors;

function flipCard(event) { /* il parametro è ciò che il metodo addEventListener crea e contiene tutte le informazioni a riguardo. Il nome, così come per ogni parametro, non è una parola chiave ma bensì possiamo utilizzare qualsiasi nome */
    const card = event.target;

    if (card.classList.contains('flipped')) return;

    card.classList.add(card.getAttribute('data-name'), 'flipped');

    pick.push(card);


    if (pick.length === 2) {
        // check for match
        checkForMatch();
    }
}


function checkForMatch() {
    const card1 = pick[0];
    const card2 = pick[1];

    const card1Name = card1.getAttribute('data-name');
    const card2Name = card2.getAttribute('data-name');

    if (card1Name === card2Name) {
        checkForWin();
    } else {
        setTimeout(function () {
            card1.classList.remove(card1Name, 'flipped');
            card2.classList.remove(card2Name, 'flipped');
            errors++;
            errorCounter.innerText = errors;
        }, 500);
    }

    pick = [];
}

function checkForWin() {
    const flippedCards = document.querySelectorAll('.flipped');

    if (flippedCards.length === deck.length) {
        showAlert('Hai vinto!');
    }
}