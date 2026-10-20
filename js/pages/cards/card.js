(function () {
  'use strict';

  const SZINEK = ['♠', '♥', '♦', '♣'];
  const ERTEKEK = ['7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

  let allapot = null;
  let idozito = null;

  // ===== Pakli =====
  function ujPakli() {
    const pakli = [];
    for (const szin of SZINEK) {
      for (const ertek of ERTEKEK) {
        pakli.push({ szin: szin, ertek: ertek });
      }
    }
    return pakli;
  }

  function randint(a, b) {
    return Math.floor(Math.random() * (b - a + 1)) + a;
  }

  function megkever(pakli) {
    for (let i = pakli.length - 1; i > 0; i--) {
      const j = randint(0, i);
      const seged = pakli[i];
      pakli[i] = pakli[j];
      pakli[j] = seged;
    }
  }

  function pontErtek(lap) {
    if (lap.ertek === 'J' || lap.ertek === 'Q' || lap.ertek === 'K' || lap.ertek === 'A') return 0;
    return Number(lap.ertek);
  }


  function utes(hivo, valasz) {
    if (valasz.ertek === hivo.ertek) return true;
    if (valasz.szin === hivo.szin &&
        ERTEKEK.indexOf(valasz.ertek) > ERTEKEK.indexOf(hivo.ertek)) return true;
    return false;
  }

  function keses(fn, ms) {
    clearTimeout(idozito);
    idozito = setTimeout(fn, ms);
  }

  function ujJatek() {
    clearTimeout(idozito);
    const pakli = ujPakli();
    megkever(pakli);
    allapot = {
      pakli: pakli,
      kez: { jatekos: [], gep: [] },
      pont: { jatekos: 0, gep: 0 },
      hivo: Math.random() < 0.5 ? 'jatekos' : 'gep',
      asztal: null,
      kijelolt: null,
      zarolva: false,
      kor :1
    };

    for (let i = 0; i < 4; i++) {
      allapot.kez.jatekos.push(allapot.pakli.pop());
      allapot.kez.gep.push(allapot.pakli.pop());
    }

    document.getElementById('info').textContent =
      'Kezdd a játékot, és próbáld meg megelőzni a gépet!';

    if (allapot.hivo === 'gep') {
      allapot.zarolva = true;
      uzen('A gép kezd...');
      kirajzol();
      keses(gepHiv, 900);
    } else {
      uzen('Te kezdesz, válassz egy lapot!');
      kirajzol();
    }
  }

  function lapElem(lap, index) {
    const div = document.createElement('div');
    div.className = 'lap' + (lap.szin === '♥' || lap.szin === '♦' ? ' piros' : '');
    div.innerHTML = '<span>' + lap.ertek + '</span><span>' + lap.szin + '</span>';
    if (index !== undefined) {
      if (index === allapot.kijelolt) div.classList.add('kijelolt');
      div.onclick = function () { kattintas(index); };
    }
    return div;
  }

  function hatlapElem() {
    const div = document.createElement('div');
    div.className = 'lap hatlap';
    return div;
  }

  function kirajzol() {
    const gepKez = document.getElementById('robotCards');
    const jatekosKez = document.getElementById('playerCards');
    const hivoHely = document.querySelector('.callerCard');
    const valaszHely = document.querySelector('.responseCard');

    gepKez.innerHTML = '';
    jatekosKez.innerHTML = '';
    hivoHely.innerHTML = '';
    valaszHely.innerHTML = '';

    allapot.kez.gep.forEach(function () { gepKez.appendChild(hatlapElem()); });
    allapot.kez.jatekos.forEach(function (lap, i) { jatekosKez.appendChild(lapElem(lap, i)); });

    if (allapot.asztal) {
      hivoHely.appendChild(lapElem(allapot.asztal.lap));
      if (allapot.asztal.valasz) valaszHely.appendChild(lapElem(allapot.asztal.valasz));
    }

    document.getElementById('robotPoint').textContent = allapot.pont.gep;
    document.getElementById('playerPoint').textContent = allapot.pont.jatekos;
    const oldalJ = document.getElementById('playerPointSide');
    const oldalG = document.getElementById('robotPointSide');
    if (oldalJ) oldalJ.textContent = allapot.pont.jatekos;
    if (oldalG) oldalG.textContent = allapot.pont.gep;

    document.getElementById('playBtn').disabled = allapot.zarolva;
    document.getElementById('autoBtn').disabled = allapot.zarolva;
    korKiiras();

  }

  function uzen(szoveg) {
    document.getElementById('status').textContent = szoveg;
  }

  function korKiiras(){
    const roundTrack = document.querySelector("#roundCounter");
    if(roundTrack) roundTrack.textContent ='Kör: ' + allapot.kor + ' / 16';
  }
  
  function kattintas(i) {
    if (allapot.zarolva) return;
    allapot.kijelolt = (allapot.kijelolt === i) ? null : i;
    kirajzol();
  }

  function kijatszas() {
    if (allapot.zarolva) return;
    if (allapot.kijelolt === null) { uzen('Előbb válassz egy lapot!'); return; }
    jatekosLep(allapot.kijelolt);
  }

  function automatikus() {
    if (allapot.zarolva) return;
    let lehetseges = allapot.kez.jatekos.map(function (l, i) { return i; });
    if (allapot.hivo === 'gep' && allapot.asztal) {
      const uto = lehetseges.filter(function (i) {
        return utes(allapot.asztal.lap, allapot.kez.jatekos[i]);
      });
      if (uto.length > 0) lehetseges = uto;
    }
    jatekosLep(lehetseges[randint(0, lehetseges.length - 1)]);
  }

  function jatekosLep(i) {
    const lap = allapot.kez.jatekos[i];
    if (!lap) return;

    if (allapot.hivo === 'jatekos' && !allapot.asztal) {
      allapot.kez.jatekos.splice(i, 1);
      allapot.asztal = { lap: lap, ki: 'jatekos', valasz: null };
      allapot.kijelolt = null;
      allapot.zarolva = true;
      uzen('A gép gondolkodik...');
      kirajzol();
      keses(gepValaszol, 900);
    } else if (allapot.hivo === 'gep' && allapot.asztal) {
      const hivoLap = allapot.asztal.lap;
      const vanUto = allapot.kez.jatekos.some(function (l) { return utes(hivoLap, l); });
      if (vanUto && !utes(hivoLap, lap)) {
        uzen('Kötelező ütnöd, válassz ütő lapot!');
        return;
      }
      allapot.kez.jatekos.splice(i, 1);
      allapot.kijelolt = null;
      korLezar(lap, 'jatekos');
    }
  }

  function gepHiv() {
    if (!allapot || allapot.asztal) return;
    const kez = allapot.kez.gep;
    if (kez.length === 0) return;
    let legjobb = 0;
    for (let i = 1; i < kez.length; i++) {
      const a = kez[i];
      const b = kez[legjobb];
      if (pontErtek(a) < pontErtek(b) ||
          (pontErtek(a) === pontErtek(b) && ERTEKEK.indexOf(a.ertek) > ERTEKEK.indexOf(b.ertek))) {
        legjobb = i;
      }
    }
    const lap = kez.splice(legjobb, 1)[0];
    allapot.asztal = { lap: lap, ki: 'gep', valasz: null };
    allapot.zarolva = false;
    uzen('A gép hívott, válaszolj!');
    kirajzol();
  }

  
  function gepValaszol() {
    if (!allapot || !allapot.asztal || allapot.asztal.valasz) return;
    const kez = allapot.kez.gep;
    const hivoLap = allapot.asztal.lap;
    let jeloltek = kez.filter(function (l) { return utes(hivoLap, l); });
    if (jeloltek.length === 0) jeloltek = kez;

    let valasztott = jeloltek[0];
    for (const l of jeloltek) {
      if (pontErtek(l) < pontErtek(valasztott)) valasztott = l;
    }
    kez.splice(kez.indexOf(valasztott), 1);
    korLezar(valasztott, 'gep');
  }
  function korLezar(valaszLap, valaszolo) {
    const hivoLap = allapot.asztal.lap;
    const hivoKi = allapot.asztal.ki;
    const nyertes = utes(hivoLap, valaszLap) ? valaszolo : hivoKi;

    allapot.pont[nyertes] += pontErtek(hivoLap) + pontErtek(valaszLap);
    allapot.asztal.valasz = valaszLap;
    allapot.zarolva = true;
    uzen(nyertes === 'jatekos' ? 'Te viszed a kört!' : 'A gép viszi a kört.');
    
    kirajzol();
    keses(function () { kovetkezoKor(nyertes); }, 1500);
  }

  function kovetkezoKor(nyertes) {
    allapot.asztal = null;
    allapot.hivo = nyertes;
    allapot.kijelolt = null;

    const sorrend = nyertes === 'jatekos' ? ['jatekos', 'gep'] : ['gep', 'jatekos'];
    for (const ki of sorrend) {
      if (allapot.pakli.length > 0) allapot.kez[ki].push(allapot.pakli.pop());
    }

    if (allapot.kez.jatekos.length === 0 && allapot.kez.gep.length === 0) {
      kirajzol();
      vegeJatek();
      return;
    }
    if (nyertes === 'gep') {
      allapot.zarolva = true;
      uzen('A gép hív...');
      kirajzol();
      keses(gepHiv, 800);
    } else {
      allapot.zarolva = false;
      uzen('Te hívsz, válassz egy lapot!');
      kirajzol();
    }
    allapot.kor++;

  }

  function vegeJatek() {
    const j = allapot.pont.jatekos;
    const g = allapot.pont.gep;
    const eredmeny = j > g ? 'Te nyertél!' : g > j ? 'A gép nyert!' : 'Döntetlen!';
    allapot.zarolva = true;
    kirajzol();
    uzen('Vége a játéknak! ' + eredmeny);
    document.getElementById('info').textContent =
      'Végeredmény: Te ' + j + ' pont, Gép ' + g + ' pont. ' + eredmeny +
      ' Kattints az „Új játék" gombra az újrakezdéshez.';
  }

    function init() {
    document.addEventListener('click', function (e) {
      if (e.target.closest('#newGameBtn')) ujJatek();
      else if (e.target.closest('#playBtn')) kijatszas();
      else if (e.target.closest('#autoBtn')) automatikus();
    });
    ujJatek();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();