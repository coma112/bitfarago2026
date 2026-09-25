function handleCellClick(targetX, targetY) {
    if (!gameActive) return;

    let targetContent = mapData[targetX][targetY];

    if (playerPos && targetX === playerPos[0] && targetY === playerPos[1]) {
        showMessage('Már ezen a mezőn vagy!', true);
        return;
    }

    if (!fruits.includes(targetContent)) {
        showMessage('Csak gyümölcsre léphetsz!', true);
        return;
    }

    if (!playerPos) {
        playerPos = [targetX, targetY];
        inventory[targetContent]++;
        mapData[targetX][targetY] = '.';
        showMessage(`Innen indulsz. Válaszd ki a következő gyümölcsöt!`);
        render();
        return;
    }

    let distance = distanceTo(targetX, targetY);

    if (distance > energy) {
        showMessage(`Nincs elég energiád ehhez a lépéshez! Szükséges: ${distance}, elérhető: ${energy}`, true);
        return;
    }

    energy -= distance;
    playerPos = [targetX, targetY];

    inventory[targetContent]++;
    mapData[targetX][targetY] = '.';

    showMessage(`${fruitInfo[targetContent].name} felszedve (−${distance} energia).`);
    render();

    if (!canContinue()) {
        endGame('Nincs több elérhető gyümölcs – az energiád evéssel sem lenne elég.');
    }
}

function eatFruit(type) {
    if (!gameActive) return;
    if (!playerPos) {
        showMessage('Előbb válassz kezdő gyümölcsöt!', true);
        return;
    }
    if (inventory[type] <= 0) {
        showMessage('Nincs ilyen gyümölcsöd a kosárban!', true);
        return;
    }

    inventory[type]--;
    energy += fruitInfo[type].energy;

    showMessage(`Megettél egy gyümölcsöt: ${fruitInfo[type].name} (+${fruitInfo[type].energy} energia).`);
    render();
}

function canContinue() {
    let maxEnergy = energy;
    fruits.forEach(type => { maxEnergy += inventory[type] * fruitInfo[type].energy; });

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            if (fruits.includes(mapData[i][j]) && distanceTo(i, j) <= maxEnergy) return true;
        }
    }
    return false;
}

function endGame(reason) {
    if (!gameActive) return;
    gameActive = false;

    const score = calculateScore(inventory);

    document.getElementById('game-over-screen').hidden = false;
    document.getElementById('game-over-reason').textContent = reason || '';
    document.getElementById('final-score').textContent = score.total + ' pont';

    document.getElementById('final-breakdown').innerHTML = `
        <li><span>Alma (${score.a} db)</span><strong>${score.applePoints}</strong></li>
        <li><span>Szőlő (${score.s} db)</span><strong>${score.grapePoints}</strong></li>
        <li><span>Körte (${score.k} db)</span><strong>${score.pearPoints}</strong></li>
        <li><span>Alma–szőlő pár (${score.pairs} db)</span><strong>${score.pairPoints}</strong></li>
    `;

    document.querySelectorAll('[data-eat], [data-end-game]').forEach(btn => { btn.disabled = true; });
    document.getElementById('game-over-screen').scrollIntoView({ block: 'start' });
}
