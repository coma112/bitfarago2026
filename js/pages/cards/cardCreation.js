const szinek = ['♠', '♥', '♦', '♣'];
const ertekek = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function lapKirajzol(lap) {
  const div = document.createElement('div');
  div.className = 'lap' + (lap.szin === '♥' || lap.szin === '♦' ? ' piros' : '');
  div.innerHTML = `<span>${lap.ertek}</span><span>${lap.szin}</span>`;
  return div;
}