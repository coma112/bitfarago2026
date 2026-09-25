function render() {
    if (!gameActive) return;

    const boardEl = document.getElementById('board');
    boardEl.innerHTML = '';

    for (let i = 0; i < size; i++) {
        for (let j = 0; j < size; j++) {
            const cell = document.createElement('div');
            cell.classList.add('cell');
            cell.dataset.row = i;
            cell.dataset.col = j;

            let content = mapData[i][j];
            if (playerPos && i === playerPos[0] && j === playerPos[1]) {
                cell.classList.add('cell--player');
                cell.textContent = 'P';
                cell.title = 'Itt állsz';
            } else if (content !== '.') {
                const info = fruitInfo[content];
                cell.classList.add('cell--fruit', 'fruit--' + content);
                cell.textContent = info.letter;

                if (playerPos) {
                    const distance = distanceTo(i, j);
                    cell.title = `${info.name} – ${distance} energia`;
                    if (distance > energy) cell.classList.add('cell--far');
                } else {
                    cell.title = `${info.name} – indulás innen`;
                }
            }

            boardEl.appendChild(cell);
        }
    }

    document.getElementById('energy-val').textContent = energy;
    document.getElementById('fruits-left').textContent = countFruitsOnMap();
    document.getElementById('score-val').textContent = calculateCurrentScore();

    fruits.forEach(type => {
        document.getElementById('inv-' + type).textContent = inventory[type];
        document.querySelector(`[data-eat="${type}"]`).disabled = inventory[type] <= 0;
    });
}

function showMessage(text, isError) {
    const messageEl = document.getElementById('game-message');
    messageEl.textContent = text;
    messageEl.classList.toggle('is-error', !!isError);
}
