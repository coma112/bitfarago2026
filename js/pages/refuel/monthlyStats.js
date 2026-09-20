const MONTH_LABELS = ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'];

function getMonthlyCosts(refuels) {
  const totals = new Array(12).fill(0);

  refuels.forEach(refuel => {
    const month = new Date(refuel.date).getMonth(); 
    totals[month] += refuel.cost;
  });

  return totals;
}

function renderMonthlyChart(container, refuels) {
  if (!container) return;

  const totals = getMonthlyCosts(refuels);
  const maxValue = Math.max(...totals, 1); 
  const yMax = Math.ceil(maxValue / 20000) * 20000 || 20000; 

  const ySteps = 5; 
  const yLabels = [];
  for (let i = ySteps; i >= 0; i--) {
    yLabels.push(Math.round((yMax / ySteps) * i));
  }

  container.innerHTML = `
    <div class="bar-chart__y-axis">
      ${yLabels.map(v => `<span>${formatCurrency(v)}</span>`).join('')}
    </div>
    <div class="bar-chart__bars">
      ${totals.map((value, i) => {
        const heightPercent = (value / yMax) * 100;
        return `
          <div class="bar-chart__col">
            <div class="bar-chart__bar" style="height: ${heightPercent}%"></div>
            <span class="bar-chart__label">${MONTH_LABELS[i]}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function formatCurrency(value) {
  return value.toLocaleString('hu-HU') + ' Ft';
}