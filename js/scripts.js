/* 
To Do : 
    - Make specific enemies, now it's just one big enemy
    - Ability to conquer enemy on one way or another
    - Ability to upgrade current tile (1 -> 10)
    - Ability to make an army

    - Ability to play multiplayer
*/
const HEXCONTAINER = document.querySelector('.honeycomb ');
const AMOUNT_X = 15;
const AMOUNT_Y = 6;
let currentBalance = 0;
const enemyAmount = 3;
let hexaHtml = '';

const wagesArr = ['0.15', '0.10', '1', '0.5']
const hexArr = ['farm', 'mine', 'city', 'industrial'];

function getRandom(min, max) {
    return Math.floor(Math.random() * max) + min
}

function getRandomArrElemen(arr, country) {
    const randomIndex = getRandom(0, arr.length);

    if (country == true) {
        const randomElement = arr[randomIndex];
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === randomElement) {
                return [i, randomElement];
            }
        }
    }
    return arr[getRandom(0, arr.length)];
}

let randomNum = 1
function expandLand(renew = false, min = 1, max = 1) {
    if(renew) {
        randomNum = getRandom(min, max)
        return randomNum;
    }

    return randomNum
}

for (let i = 0; i < AMOUNT_X; i++) {
    hexaHtml = `<div class="hexes ${i} column">`
    for (let j = 0; j < AMOUNT_Y; j++) {
        const funct = getRandomArrElemen(hexArr);
        hexaHtml += `
        <a class="hex ${funct}">
        <div class="wrapper">
        <div class="hexagon ${funct} color-${funct}"></div>
        </div>
        <span class="content">
        <strong>${funct}</strong>
        <small id='hexdesc'></small>
        </span>
        </a>`
    }
    hexaHtml += `</div>`
    HEXCONTAINER.innerHTML += hexaHtml;
}

const hexagons = document.querySelectorAll('a');
HEXCONTAINER.addEventListener('click', function (e) {
    e.preventDefault();
    if(e.target.nodeName == 'DIV') {
        loadStats(e.target)
    }
})


function loadStats(elem) {
    const stats = [];
    for(let i = 0; i < OWNED.length; i++) {
        stats.push(OWNED[i][1].classList[1]);
    }
    const counts = {};
    stats.forEach(function (x) { counts[x] = (counts[x] || 0) + 1; });
    
    document.getElementById('statistics').innerText += Object.keys(counts);
    document.getElementById('statistics').innerText += `(${Object.values(counts)})`;
    document.getElementById('debugwindow').innerText += elem.outerHTML;

}

console.log(hexagons, '1');

loadCivilization(true);
loadCivilization();
loadCivilization();
loadCivilization();

function loadCivilization(isPlayer = false) {
    const CAPITAL = getRandomArrElemen(hexagons, true);
    CAPITAL[1].querySelector('.hexagon').classList += ' capital ';
    CAPITAL[1].querySelector('#hexdesc').innerText = 'capital';
    console.log(CAPITAL[0]);
    const CAPITAL_ID = CAPITAL[0];
    
    OWNED = [
        CAPITAL,
        [CAPITAL_ID - expandLand(true, 4, 10), hexagons[CAPITAL_ID - expandLand()]],
        [CAPITAL_ID - expandLand(true, 2, 10), hexagons[CAPITAL_ID - expandLand()]],
        [CAPITAL_ID - expandLand(true, 2, 10), hexagons[CAPITAL_ID - expandLand()]],
        [CAPITAL_ID + expandLand(true, 2, 10), hexagons[CAPITAL_ID - expandLand()]],
        [CAPITAL_ID + expandLand(true, 2, 10), hexagons[CAPITAL_ID - expandLand()]],
        [CAPITAL_ID + expandLand(true, 4, 10), hexagons[CAPITAL_ID - expandLand()]],
    ];
    
    let classHexagon = 'owned';
    if(!isPlayer) {
        classHexagon = 'enemy';
    }
    for(let i = 0; i < OWNED.length; i++) {
       OWNED[i][1].querySelector('.hexagon').classList.add(classHexagon);
    }   
}

function calculateBalance(stats) {
    if(industry) {
        income += wagesArr[4];
    }
}