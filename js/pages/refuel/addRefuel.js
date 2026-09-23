const REFUEL_KEY = 'refuels';

function handleRefuelSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);
  const errorEl = form.querySelector('[data-form-error]');

  const newRefuel = {
    id: crypto.randomUUID(),
    date: formData.get('date'),
    amount: parseFloat(formData.get('amount')),
    cost: parseFloat(formData.get('cost')),
    odometer: parseInt(formData.get('odometer'), 10),
  };

  const error = validateRefuel(newRefuel, getRefuels());
  if (errorEl) {
    errorEl.textContent = error;
    errorEl.hidden = !error;
  }
  if (error) return;

  saveRefuel(newRefuel);
  form.reset();
}

function validateRefuel(refuel, refuels) {
  const earlier = refuels.filter(r => r.date <= refuel.date);
  const later = refuels.filter(r => r.date > refuel.date);

  const conflictEarlier = earlier.find(r => r.odometer >= refuel.odometer);
  if (conflictEarlier) {
    return `Több kell legyen, mint ${formatKm(conflictEarlier.odometer)} (${App.format.date(conflictEarlier.date)}).`;
  }

  const conflictLater = later.find(r => r.odometer <= refuel.odometer);
  if (conflictLater) {
    return `Kevesebb kell legyen, mint ${formatKm(conflictLater.odometer)} (${App.format.date(conflictLater.date)}).`;
  }

  return '';
}

function getRefuels() {
  const stored = localStorage.getItem(REFUEL_KEY);
  return stored ? JSON.parse(stored) : [];
}

function storeRefuels(refuels) {
  refuels.sort((a, b) => a.date.localeCompare(b.date) || a.odometer - b.odometer);
  localStorage.setItem(REFUEL_KEY, JSON.stringify(refuels));
  renderRefuelPage();
}

function saveRefuel(refuel) {
  const refuels = getRefuels();
  refuels.push(refuel);
  storeRefuels(refuels);
}

function deleteRefuel(id) {
  storeRefuels(getRefuels().filter(r => r.id !== id));
}

function renderRefuelPage() {
  const refuels = getRefuels();

  renderStatCards(document.querySelector('#statCards'), refuels);
  renderMonthlyChart(document.querySelector('#monthlyChart'), refuels);
  renderRefuelTable(document.querySelector('#refuelTable'), refuels);
  renderEfficiencyRanking(document.querySelector('#efficiencyTable'), refuels);
  App.icons.refresh();
}

function formatKm(value) {
  return value.toLocaleString('hu-HU') + ' km';
}
