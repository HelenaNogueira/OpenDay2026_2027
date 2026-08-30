const uploadForm = document.getElementById("uploadForm");
const carImage = document.getElementById("carImage");
const carName = document.getElementById("carName");
const carBrand = document.getElementById("carBrand");
const carLocation = document.getElementById("carLocation");
const carGrid = document.getElementById("carGrid");
const spotCount = document.getElementById("spotCount");
const fileName = document.getElementById("fileName");
const formMessage = document.getElementById("formMessage");
const searchInput = document.getElementById("searchInput");
const emptyMessage = document.getElementById("emptyMessage");

carImage.addEventListener("change", () => {
  if (carImage.files.length > 0) {
    fileName.textContent = carImage.files[0].name;
  }
});

uploadForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const file = carImage.files[0];

  if (!file) {
    formMessage.textContent = "Escolhe primeiro uma fotografia.";
    return;
  }

  const imageURL = URL.createObjectURL(file);

  const card = document.createElement("article");
  card.className = "car-card";
  card.dataset.name = carName.value;

  card.innerHTML = `
    <img src="${imageURL}" alt="${escapeHTML(carName.value)}" />
    <div class="card-content">
      <div>
        <span class="tag">${escapeHTML(carBrand.value)}</span>
        <h3>${escapeHTML(carName.value)}</h3>
      </div>
      <span class="location">📍 ${escapeHTML(carLocation.value)}</span>
    </div>
  `;

  carGrid.prepend(card);
  spotCount.textContent = carGrid.children.length;

  formMessage.textContent = "Spot adicionado com sucesso!";
  uploadForm.reset();
  fileName.textContent = "JPG, PNG ou WEBP";

  document.getElementById("spots").scrollIntoView({ behavior: "smooth" });

  setTimeout(() => {
    formMessage.textContent = "";
  }, 3000);
});

searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase().trim();
  const cards = [...document.querySelectorAll(".car-card")];
  let visibleCount = 0;

  cards.forEach((card) => {
    const cardText = card.textContent.toLowerCase();
    const matches = cardText.includes(query);
    card.style.display = matches ? "" : "none";

    if (matches) visibleCount++;
  });

  emptyMessage.style.display = visibleCount === 0 ? "block" : "none";
});

function escapeHTML(value) {
  return value.replace(/[&<>"']/g, (char) => {
    const characters = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;"
    };

    return characters[char];
  });
}
