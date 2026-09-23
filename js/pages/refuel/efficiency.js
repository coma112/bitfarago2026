function getRefuelSegments(refuels) {
  const sorted = [...refuels].sort((a, b) => a.odometer - b.odometer);
  const segments = [];

  for (let i = 1; i < sorted.length; i++) {
    const prev = sorted[i - 1];
    const curr = sorted[i];
    const distance = curr.odometer - prev.odometer;
    if (distance <= 0) continue;

    segments.push({
      from: prev.date,
      to: curr.date,
      distance,
      liters: curr.amount,
      consumption: (curr.amount / distance) * 100,
    });
  }

  return segments.sort((a, b) => a.consumption - b.consumption);
}

function rankBadgeClass(index, count) {
  if (count > 1 && index === 0) return 'badge badge--success';
  if (count > 1 && index === count - 1) return 'badge badge--danger';
  return 'badge';
}

function renderEfficiencyRanking(container, refuels) {
  if (!container) return;

  const segments = getRefuelSegments(refuels);

  if (!segments.length) {
    container.innerHTML = '<p class="table-empty">Legalább két tankolás kell hozzá.</p>';
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Időszak</th>
          <th class="table__num">Megtett út</th>
          <th class="table__num">Fogyasztott</th>
          <th class="table__num">Átlag</th>
        </tr>
      </thead>
      <tbody>
        ${segments.map((s, i) => `
          <tr>
            <td><span class="${rankBadgeClass(i, segments.length)}">${i + 1}.</span></td>
            <td>${App.format.date(s.from)} – ${App.format.date(s.to)}</td>
            <td class="table__num">${formatKm(s.distance)}</td>
            <td class="table__num">${App.format.num(s.liters)} L</td>
            <td class="table__num"><strong>${App.format.num(s.consumption, 1)}</strong> L/100km</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
