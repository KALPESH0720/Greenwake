window.loadHeroes = function(data) {
  const container = document.getElementById("hero-cards");
  container.innerHTML = "";

  data.forEach(hero => {
    if (!hero.imageUrl || !hero.name) return;

    const card = document.createElement("div");
    card.className = "card";
    card.style.width = "18rem";
    card.innerHTML = `
      <img src="${hero.imageUrl}" class="card-img-top" alt="${hero.name}'s Contribution">
      <div class="card-body">
        <h5 class="card-title">${hero.name}</h5>
        <p class="card-text">contributed to this movement 🌱</p>
      </div>
    `;
    container.appendChild(card);
  });
};