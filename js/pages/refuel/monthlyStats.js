const MONTH_LABELS = ['Jan', 'Feb', 'Már', 'Ápr', 'Máj', 'Jún', 'Júl', 'Aug', 'Szep', 'Okt', 'Nov', 'Dec'];

let chartYear = new Date().getFullYear();

function getMonthlyCosts(refuels, year) {
  const totals = new Array(12).fill(0);

  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    if (isNaN(date) || date.getFullYear() !== year) return;
    totals[date.getMonth()] += refuel.cost;
  });

  return totals;
}

function getRefuelYears(refuels) {
  const years = new Set([new Date().getFullYear()]);
  refuels.forEach(refuel => {
    const date = new Date(refuel.date);
    if (!isNaN(date)) years.add(date.getFullYear());
  });
  return [...years].sort((a, b) => b - a);
}

function renderYearSelect(select, refuels) {
  if (!select) return;

  const years = getRefuelYears(refuels);
  if (!years.includes(chartYear)) chartYear = years[0];

  select.innerHTML = years
    .map(year => `<option value="${year}">${year}</option>`)
    .join('');
  select.value = String(chartYear);
}

function initMonthlyChart(select) {
  if (!select) return;

  select.addEventListener('change', () => {
    chartYear = Number(select.value);
    renderMonthlyChart(document.querySelector('#monthlyChart'), getRefuels());
  });
}

function renderMonthlyChart(container, refuels) {
  if (!container) return;

  renderYearSelect(document.querySelector('[data-chart-year]'), refuels);

  const totals = getMonthlyCosts(refuels, chartYear);
  const yearTotal = totals.reduce((sum, value) => sum + value, 0);
  const totalLabel = document.querySelector('[data-chart-total]');
  if (totalLabel) totalLabel.textContent = formatCurrency(yearTotal);

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
          <div class="bar-chart__col" title="${MONTH_LABELS[i]}: ${formatCurrency(value)}">
            <div class="bar-chart__bar" style="height: ${heightPercent}%"></div>
            <span class="bar-chart__label">${MONTH_LABELS[i]}</span>
          </div>
        `;
      }).join('')}
    </div>
  `;
}

function formatCurrency(value) {
  return Math.round(value).toLocaleString('hu-HU') + ' Ft';
}
