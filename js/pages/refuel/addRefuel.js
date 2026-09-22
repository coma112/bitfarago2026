const REFUEL_KEY = 'refuels';

function handleRefuelSubmit(event) {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const newRefuel = {
    id: crypto.randomUUID(),
    date: formData.get('date'),
    amount: parseFloat(formData.get('amount')),
    cost: parseFloat(formData.get('cost')),
    odometer: parseInt(formData.get('odometer'), 10),
  };

  saveRefuel(newRefuel);
  form.reset();
}

function getRefuels() {
  const stored = localStorage.getItem(REFUEL_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveRefuel(refuel) {
  const refuels = getRefuels();
  refuels.push(refuel);
  refuels.sort((a, b) => new Date(a.date) - new Date(b.date));
  localStorage.setItem(REFUEL_KEY, JSON.stringify(refuels));

  renderStatCards(document.querySelector('#statCards'), refuels);
  renderMonthlyChart(document.querySelector('#monthlyChart'), refuels);
  App.icons.refresh();
}

