const popular = document.querySelector(".card-container");
const special = document.querySelector(".card-display");

async function displayPopular() {
  const res = await fetch("../js/JSON/popular.json");
  const data = await res.json();
  console.log(data);

  for (let food of data) {
    popular.innerHTML += `
    <div class="card">
        <img src=${food.image} alt="" width="200px">
        <div class="info">
            <h1 class="food-title">${food.name}</h1>
            <p class="price">${food.price}</p>
            <p class="serves">${food.serves}</p>
        </div>
    </div>
    `;
  }
}
displayPopular();

async function displaySpecial() {
  const res = await fetch("../js/JSON/special-combos.json");
  const data = await res.json();
  console.log(data);

  for (let food of data) {
    special.innerHTML += `
    <div class="card">
        <img src=${food.image} alt="" width="200px">
        <div class="info">
            <h1 class="food-title">${food.name}</h1>
            <p class="price">${food.price}</p>
            <p class="serves">${food.serves}</p>
        </div>
    </div>
    `;
  }
}
displaySpecial();
