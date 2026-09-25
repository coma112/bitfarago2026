App.page('fruits', function () {
    App.dom.on(document.getElementById('board'), 'click', '.cell', function (event, cell) {
        handleCellClick(Number(cell.dataset.row), Number(cell.dataset.col));
    });

    document.querySelectorAll('[data-eat]').forEach(btn => {
        btn.addEventListener('click', () => eatFruit(btn.dataset.eat));
    });

    document.querySelector('[data-end-game]').addEventListener('click', () => endGame());
    document.querySelector('[data-new-game]').addEventListener('click', () => {
        document.querySelector('[data-end-game]').disabled = false;
        initGame();
    });

    initGame();
});
