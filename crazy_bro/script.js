const grid = document.querySelector('#grid');

const area = 10 * 10;
const cells = [];

//create playing board
for (let i = 0; i < area; i++) {
    const cell = document.createElement('div');
    grid.appendChild(cell);
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

function assignCharacterPosition() {
    let usedPositions = [];
    usedPositions = goodFoodPositions.concat(rottenFoodPositions);
    do {
        randomNumber = Math.floor(Math.random() * 100);
        condition = usedPositions.includes(randomNumber);
        if (!condition) {
            const characterPosition = randomNumber;
            cells[characterPosition].classList.add('character');
        }
    }
    while (condition);
}

assignCharacterPosition();



//Move character
/* character can move in all directions using keys up, down, left, right.
If she/he runs against good food the score goes up whereas if they run against rotten food they lose the game
*/
document.addEventListener('keydown', function (event) {

    if (event.code === 'Arrow')
    console.log(event);
});


function moveCharacter() {

}



