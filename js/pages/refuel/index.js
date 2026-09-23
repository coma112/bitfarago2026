App.page('refuel', function () {
  const form = document.querySelector('#refuelForm');
  if (form) form.addEventListener('submit', handleRefuelSubmit);

  initMonthlyChart(document.querySelector('[data-chart-year]'));
  initRefuelFilter(document.querySelector('[data-refuel-filter]'));
  initRefuelTable(document.querySelector('#refuelTable'));

  renderRefuelPage();
});
