const SZINEK = ['♠', '♥', '♦', '♣'];
const ERTEKEK = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

function ujPakli() {
  const pakli = [];
  for (const szin of SZINEK) {
    for (const ertek of ERTEKEK) {
      pakli.push({ szin: szin, ertek: ertek });
    }
  }
  return pakli;
}

function randint(a,b){
  return Math.floor(Math.random()*(b-a+1))+a;
}

// console.log(ujPakli().length);

function megkever(pakli){
    for(let i = pakli.length-1;i>0;i--){
      let j = randint(0,i);
      let seged = pakli[i];
      pakli[i] = pakli[j];
      pakli[j] = seged;
    }
}

function pontErtek(lap){
  if (lap.ertek === 'J' || lap.ertek === 'Q' || lap.ertek === 'K' || lap.ertek === 'A') { return 0; }
  return Number(lap.ertek);
}

console.log(pontErtek({szin:'+',ertek:'10'}));
console.log(pontErtek({szin:'+',ertek:'K'}));