const refuelFilter = { from: '', to: '' };

function filterRefuels(refuels, from, to) {
  return refuels.filter(r => (!from || r.date >= from) && (!to || r.date <= to));
}

function initRefuelFilter(form) {
  if (!form) return;

  const update = () => {
    refuelFilter.from = form.elements.from.value;
    refuelFilter.to = form.elements.to.value;
    renderRefuelTable(document.querySelector('#refuelTable'), getRefuels());
    App.icons.refresh();
  };

  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => setTimeout(update));
}

function initRefuelTable(container) {
  if (!container) return;

  container.addEventListener('click', event => {
    const button = event.target.closest('[data-delete-id]');
    if (button) deleteRefuel(button.dataset.deleteId);
  });
}

function renderFilterSummary(filtered) {
  const summary = document.querySelector('[data-filter-summary]');
  if (!summary) return;

  const liters = filtered.reduce((sum, r) => sum + r.amount, 0);
  const cost = filtered.reduce((sum, r) => sum + r.cost, 0);
  summary.textContent = `${filtered.length} tankolás · ${App.format.num(liters)} L · ${formatCurrency(cost)}`;
}

function renderRefuelTable(container, refuels) {
  if (!container) return;

  const { from, to } = refuelFilter;

  if (from && to && from > to) {
    renderFilterSummary([]);
    container.innerHTML = '<p class="table-empty">A kezdő dátum nem lehet későbbi a záró dátumnál.</p>';
    return;
  }

  const filtered = filterRefuels(refuels, from, to).reverse();
  renderFilterSummary(filtered);

  if (!filtered.length) {
    container.innerHTML = refuels.length
      ? '<p class="table-empty">Nincs tankolás a megadott időszakban.</p>'
      : '<p class="table-empty">Még nincs rögzített tankolás.</p>';
    return;
  }

  container.innerHTML = `
    <table class="table">
      <thead>
        <tr>
          <th>Dátum</th>
          <th class="table__num">Mennyiség</th>
          <th class="table__num">Összeg</th>
          <th class="table__num">Egységár</th>
          <th class="table__num">Km-óra</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        ${filtered.map(r => `
          <tr>
            <td>${App.format.date(r.date)}</td>
            <td class="table__num">${App.format.num(r.amount)} L</td>
            <td class="table__num">${formatCurrency(r.cost)}</td>
            <td class="table__num">${App.format.num(r.cost / r.amount, 0)} Ft/L</td>
            <td class="table__num">${formatKm(r.odometer)}</td>
            <td class="table__action">
              <button type="button" class="btn btn--quiet btn--danger btn--icon" data-delete-id="${r.id}" title="Törlés" aria-label="Törlés">
                <i data-lucide="trash-2"></i>
              </button>
            </td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;
}
