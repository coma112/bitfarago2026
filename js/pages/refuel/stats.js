const cards = [
    {
        id:0,
        title: "Összes tankolás",
        value: 0,
        unit: "alkalom",
        icon: '<i data-lucide="fuel" class="icon--lg"></i>'
    },
    {
        id:1,
        title: "Összes üzemanyag",
        value: 0,
        unit: "liter",
        icon: '<i data-lucide="droplet" class="icon--lg"></i>'

    },
    {
        id:2,
        title: "Összes költség",
        value: 0,
        unit: "forint",
        icon: '<i data-lucide="banknote" class="icon--lg"></i>'

    },
    {
        id:3,
        title: "Átlagfogyasztás",
        value: 0,
        unit: "liter / 100 km",
        icon: '<i data-lucide="gauge" class="icon--lg"></i>'

    }
];


const statCards = document.querySelector("#statCards");


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