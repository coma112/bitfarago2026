function renderStatCards(container, refuels) {
  if (!container) return;

  const totalCount = refuels.length;
  const totalLiters = refuels.reduce((sum, r) => sum + r.amount, 0);
  const totalCost = refuels.reduce((sum, r) => sum + r.cost, 0);
  const avgConsumption = calcAvgConsumption(refuels);

  const cards = [
    {
      id: 0,
      title: "Összes tankolás",
      value: totalCount,
      unit: "alkalom",
      icon: '<i data-lucide="fuel" class="icon--lg"></i>'
    },
    {
      id: 1,
      title: "Összes üzemanyag",
      value: totalLiters.toFixed(2).replace('.', ',') + " L",
      unit: "liter",
      icon: '<i data-lucide="droplet" class="icon--lg"></i>'
    },
    {
      id: 2,
      title: "Összes költség",
      value: totalCost.toLocaleString('hu-HU') + " Ft",
      unit: "forint",
      icon: '<i data-lucide="banknote" class="icon--lg"></i>'
    },
    {
      id: 3,
      title: "Átlagfogyasztás",
      value: avgConsumption.toFixed(1).replace('.', ',') + " L/100km",
      unit: "liter / 100 km",
      icon: '<i data-lucide="gauge" class="icon--lg"></i>'
    }
  ];

  const statCards = document.querySelector("#statCards");
  statCards.innerHTML = '';   

  cards.forEach(card => {

    statCards.innerHTML += `
        <div class="stat-card">

            <div class="card-icon">
                ${card.icon}
            </div>

            <div class="card-content">

                <p class="card-title">
                    ${card.title}
                </p>

                <h2 class="card-value">
                    ${card.value}
                </h2>

                <p class="card-unit">
                    ${card.unit}
                </p>

            </div>

        </div>
    `;
  });

  App.icons.refresh(); 
}

function calcAvgConsumption(refuels) {
  if (refuels.length < 2) return 0;

  const sorted = [...refuels].sort((a, b) => a.odometer - b.odometer);
  let totalDistance = 0;
  let totalLiters = 0;

  for (let i = 1; i < sorted.length; i++) {
    const distance = sorted[i].odometer - sorted[i - 1].odometer;
    if (distance > 0) {
      totalDistance += distance;
      totalLiters += sorted[i].amount;
    }
  }

  if (totalDistance === 0) return 0;
  return (totalLiters / totalDistance) * 100;
}