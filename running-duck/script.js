//selezione della strada
const road = document.querySelectorAll('#grid > div'); //posso utilizzare lo stesso selettore css
const scoreEl = document.querySelector('#score');

for (let i = 0; i < road.length; i++) {
    road[i].innerText = i; //innerText serve per inserire del semplice testo nel nodo; differentemente innerHTML invece prende non solo del testo ma anche del'html quindi del markup
}

//conservo in variabile i riferimento all'elemento contenente la papera
const duckIdx = 1;
const duck = road[duckIdx];
duck.classList.add('duck');

let speed = 200;
let score = 0;

function addPlant() {
    let currentPlantIdx = road.length - 1;
    road[currentPlantIdx].classList.add('plant');

    const plantIntVal = setInterval(function () {
        score++;
        scoreEl.innerText = score;

        //aumentiamo la velocità quando arriviamo a punteggi che sono multipli di 50
        if (score % 50 === 0) {
            speed = speed - 20;
        }

        road[currentPlantIdx].classList.remove('plant');
        currentPlantIdx--;

        if (currentPlantIdx < 0) {
            //rimuovo intervallo che scorre
            clearInterval(plantIntVal);
            addPlant();
            return;
        }

        //c'è un momento in cui le tre classi, plant + jump + duck, si sovrappongono 
        if (duckIdx === currentPlantIdx && !road[currentPlantIdx].classList.contains('duck-jump')) {
            //nel momento in cui paperella e pianta sono allo stesso idx E nella posizione in cui è la pianta non c'è la classe jump vuol dire che non abbiamo fatto saltare la paperella
            showAlert('CRASH!');
            clearInterval(plantIntVal);
            road[currentPlantIdx].classList.remove('duck');
            road[currentPlantIdx].classList.add('plant');

            return;
        }

        road[currentPlantIdx].classList.add('plant');
    }, speed);
}


addPlant();





function jump(event) {
    if (event.code === 'Space' && !event.repeat) {
        //facciamo saltare la paperella 
        /* per fare questo facciamo "saltare" il div in cui è perchè abbiamo una sola riga di div */
        duck.classList.add('duck-jump');
        setTimeout(function () {
            duck.classList.remove('duck-jump');
        }, 300);
    }
}


//keyboard events: keydown e keyup. gli eventi da tastiera vengono visti dall'intera pagina a differenza degli eventi sul click che vengono visti dal singolo elemento
document.addEventListener('keydown', jump);


