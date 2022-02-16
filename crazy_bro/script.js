const grid = document.querySelector('#grid');

const area = 10 * 10;
const cells = [];

const scoreEl = document.querySelector('#score');
scoreEl.innerText = 0;
let score = 0;

const startButton = document.querySelector('#btn-start');

const timerDisplay = document.querySelector('#time-left');
let timeLeft = 30;
timerDisplay.innerText = timeLeft;


//create playing board
for (let i = 0; i < area; i++) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
    //  cell.innerText = i;
    cells.push(cell);
}

// POSITIONING GOOD AND ROTTEN FOOD 
// Random number between 0 and 100, since we have 100 elements:  Math.floor(Math.random() * 100)

//generate random positions for good food
function randomGoodFoodPositions(elements) {
    const goodFoodCells = [];
    let isUsed;
    let randomNumber;

    for (let i = 0; i < elements; i++) {
        do {
            randomNumber = Math.floor(Math.random() * 100);
            isUsed = goodFoodCells.includes(randomNumber);

            if (!isUsed) {
                goodFoodCells.push(randomNumber);
            }
        }
        while (isUsed);
    }

    return goodFoodCells;
}

//positioning good food
function assignPositions(goodFoodPositions) {
    for (let i = 0; i < goodFoodPositions.length; i++) {
        cells[goodFoodPositions[i]].classList.add('good-food');
    }
}

goodFoodPositions = randomGoodFoodPositions(20);
assignPositions(goodFoodPositions);



//rotten food positions: array of unique positions not included in good food positions
function randomRottenFoodPositions(elements) {
    const rottenFoodCells = [];
    let isUsed;
    let isGoodFoodPosition;
    let condition;
    let randomNumber;

    for (let i = 0; i < 10; i++) {
        do {
            randomNumber = Math.floor(Math.random() * 100);
            isUsed = rottenFoodCells.includes(randomNumber);
            isGoodFoodPosition = goodFoodPositions.includes(randomNumber);
            condition = !isUsed && !isGoodFoodPosition;
            if (condition) {
                rottenFoodCells.push(randomNumber);
            }
        }
        while (!condition);
    }
    return rottenFoodCells;
}


//positioning rotten food
function assignRottenPositions(rottenFoodPositions) {
    for (let i = 0; i < rottenFoodPositions.length; i++) {
        cells[rottenFoodPositions[i]].classList.add('rotten-food');
    }
}

rottenFoodPositions = randomRottenFoodPositions(10);
assignRottenPositions(rottenFoodPositions);



//Set character position
//const characterPos;
let characterPosition = 0;

function assignCharacterPosition() {
    let usedPositions = [];
    usedPositions = goodFoodPositions.concat(rottenFoodPositions);
    do {
        randomNumber = Math.floor(Math.random() * 100);
        condition = usedPositions.includes(randomNumber);
        if (!condition) {
            characterPosition = randomNumber;
            // cells[characterPosition].classList.add('character');
        }
    }
    while (condition);
    return characterPosition;
}

//START TIMER
startButton.addEventListener('click', function(){
    characterPosition = assignCharacterPosition();
    cells[characterPosition].classList.add('character');
    
    const timer = setInterval(countDown, 1000);
});


function countDown() {
    if (timeLeft != 0) {
        timeLeft--;
        timerDisplay.innerText = timeLeft;
    } else if (timeLeft === 0) {
        showAlert('TIME\'S UP!');
    }
}






//Move character - 
/* character can move in all directions using keys up, down, left, right.
If she/he runs against good food the score goes up whereas if they run against rotten food they lose the game
*/  // ArrowDown (+10), ArrowUp (-10), ArrowLeft (-1), ArrowRight(+1)
//borders:  if (position % 10 === 0 || position % 10 === 9)

function moveCharacter(event) {
    const topEdge = characterPosition >= 0 && characterPosition <= 9;
    const bottomEdge = characterPosition >= 90 && characterPosition <= 99;
    const rightEdge = characterPosition % 10 === 9;
    const leftEdge = characterPosition % 10 === 0;
    if (event.code === 'ArrowUp' && !topEdge) {
        cells[characterPosition].classList.remove('character');
        characterPosition -= 10;
        cells[characterPosition].classList.add('character');
        checkForFood();
    } else if (event.code === 'ArrowDown' && !bottomEdge) {
        cells[characterPosition].classList.remove('character');
        characterPosition += 10;
        cells[characterPosition].classList.add('character');
        checkForFood();
    } else if (event.code === 'ArrowLeft' && !leftEdge) {
        cells[characterPosition].classList.remove('character');
        characterPosition--;
        cells[characterPosition].classList.add('character');
        checkForFood();
    } else if (event.code === 'ArrowRight' && !rightEdge) {
        cells[characterPosition].classList.remove('character');
        characterPosition++;
        cells[characterPosition].classList.add('character');
        checkForFood();
    }
}

document.addEventListener('keydown', moveCharacter);

//check for good food or rotten food

function checkForFood() {
    if (cells[characterPosition].classList.contains('good-food')) {
        score++;
        scoreEl.innerText = score;
        cells[characterPosition].classList.remove('good-food');

        checkForWin();

    } else if (cells[characterPosition].classList.contains('rotten-food')) {
        showAlert(`YOU LOST! SCORE ${score}`);
    }
}



//Check if user has won - stop countdown, show alert
function checkForWin() {
    if (score === goodFoodPositions.length) {
        showAlert(`YOU WON! YOU COLLECTED ALL THE ${score} GOOD ELEMENTS!`);
        clearInterval(timer);
    }
}
