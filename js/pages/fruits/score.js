function calculateScore(inv) {
    let a = inv.a;
    let k = inv.k;
    let s = inv.s;

    let applePoints = a * 2;
    let grapePoints = s * 3;
    let pearPoints = (k * (k + 1)) / 2;
    let pairs = Math.min(a, s);
    let pairPoints = pairs * 2;

    return {
        a, k, s,
        applePoints, grapePoints, pearPoints, pairs, pairPoints,
        total: applePoints + grapePoints + pearPoints + pairPoints
    };
}

function calculateCurrentScore() {
    return calculateScore(inventory).total;
}
