const MONTH_LABELS = ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'];

function getMonthlyCosts(refuels, year) {
  const totals = new Array(12).fill(0);

  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    if (isNaN(date) || date.getFullYear() !== year) return;
    totals[date.getMonth()] += refuel.cost;
  });

  return totals;
}

function renderMonthlyChart(container, refuels) {
  if (!container) return;

  const year = new Date().getFullYear();
  const yearLabel = document.querySelector('[data-chart-year]');
  if (yearLabel) yearLabel.textContent = year;

  const totals = getMonthlyCosts(refuels, year);
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