let mapData = [];
let playerPos = null;
let energy = startEnergy;
let inventory = { a: 0, k: 0, s: 0 };
let gameActive = true;

function initGame() {
    mapData = [];
    playerPos = null;
    energy = startEnergy;
    inventory = { a: 0, k: 0, s: 0 };
    gameActive = true;

    document.getElementById('game-over-screen').hidden = true;

    for (let i = 0; i < size; i++) {
        let row = [];
        for (let j = 0; j < size; j++) {
            row.push('.');
        }
        mapData.push(row);
    }

    let placedFruits = 0;
    let targetFruits = Math.floor((size * size) * fruitRatio);
    while (placedFruits < targetFruits) {
        let rx = Math.floor(Math.random() * size);
        let ry = Math.floor(Math.random() * size);
        if (mapData[rx][ry] === '.') {
            let randomFruit = fruits[Math.floor(Math.random() * fruits.length)];
            mapData[rx][ry] = randomFruit;
            placedFruits++;
        }
    }

    render();
}

function distanceTo(x, y) {
    return Math.abs(playerPos[0] - x) + Math.abs(playerPos[1] - y);
}

function countFruitsOnMap() {
    let count = 0;
    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (fruits.includes(mapData[i][j])) count++;
        }
    }
    return count;
}
