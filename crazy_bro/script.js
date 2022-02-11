const grid = document.querySelector('#grid');

const area = 10 * 10;
const cells = [];


for (let i = 0; i < area; i++){
    const cell = document.createElement('div');
    grid.appendChild(cell);    
    cells.push(cell);
}
console.log(cells[100]);