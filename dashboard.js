// dashboard.js

// function to display visited animals cards
function showVisitedAnimals() {
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  const visitedAnimalsDiv = document.getElementById("visited-animals-div");
  visitedAnimalsDiv.innerHTML = ""; // clear existing content

  // add a headline
  const headlineDiv = document.getElementById("visited-animals-headline");
  headlineDiv.innerHTML = ""; // clear existing headline
  const visitedAnimalsHeadline = document.createElement("h1");
  visitedAnimalsHeadline.textContent = "Visited Animals";
  headlineDiv.appendChild(visitedAnimalsHeadline);

  if (selectedVisitor && selectedVisitor.visitedAnimals) {
    for (const animalName in selectedVisitor.visitedAnimals) {
      const interactionCount = selectedVisitor.visitedAnimals[animalName].count;
      const animalDetails = getAnimalByName(animalName);
      if (animalDetails) {
        const animalCard = createAnimalCard(
          animalDetails,
          "visitedAnimals",
          interactionCount
        );
        visitedAnimalsDiv.appendChild(animalCard);
      }
    }
  }
}

// function to display feeded animals cards
function showFeededAnimals() {
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  const feededAnimalsDiv = document.getElementById("feeded-animals-div");
  feededAnimalsDiv.innerHTML = ""; // clear existing content

  // add a headline
  const headlineDiv = document.getElementById("feeded-animals-headline");
  headlineDiv.innerHTML = ""; // clear existing headline
  const fedAnimalsHeadline = document.createElement("h1");
  fedAnimalsHeadline.textContent = "Feeded Animals";
  headlineDiv.appendChild(fedAnimalsHeadline);

  if (selectedVisitor && selectedVisitor.feededAnimals) {
    for (const animalName in selectedVisitor.feededAnimals) {
      const animalCount = selectedVisitor.feededAnimals[animalName].count;
      const animalDetails = getAnimalByName(animalName);
      if (animalDetails) {
        const animalCard = createAnimalCard(
          animalDetails,
          "feededAnimals",
          animalCount
        );
        feededAnimalsDiv.appendChild(animalCard);
      }
    }
  }
}

// function to get animal details by name
function getAnimalByName(animalName) {
  const animals = JSON.parse(localStorage.getItem("animals"));
  return animals.find((animal) => animal.name === animalName);
}

function showFavoriteAnimal() {
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  const visitedAnimals =
    JSON.parse(localStorage.getItem("visitedAnimals")) || {};
  const visitorVisitedAnimals = visitedAnimals[selectedVisitor.name] || {};

  let favoriteAnimal = null;
  let maxVisits = 0;

  for (const animalName in visitorVisitedAnimals) {
    if (visitorVisitedAnimals[animalName] > maxVisits) {
      maxVisits = visitorVisitedAnimals[animalName];
      favoriteAnimal = animalName;
    }
  }

  if (favoriteAnimal) {
    document.getElementById(
      "favorite-animal"
    ).textContent = `Favorite Animal: ${favoriteAnimal} (Visited ${maxVisits} times)`;
  }
}

// function to create a relatedAnimalCard
function createAnimalCard(animal, interactionType, interactionCount) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  // build the card for each animal
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";

  // image build
  const img = document.createElement("img");
  img.className = "card-animal-img-top";
  img.src = animal.image;
  img.alt = "Image of " + animal.name;

  // card body build
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  // title card build
  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = "Name: " + animal.name;

  // interaction count display
  const interactionDisplay = document.createElement("p");
  interactionDisplay.className = "interaction-count";
  interactionDisplay.textContent = `Times ${
    interactionType === "visitedAnimals" ? "Visited" : "Fed"
  }: ${interactionCount}`;

  // append elements to card-body
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(interactionDisplay);

  // append the elements to the card div
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);

  return colDiv;
}

// function to load selectedVisitor details and remove unecessary objects from localStorage
function loadVisitor() {
  // get the selectedVisiter from localStorage
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));

  // rmeove unecessary objects from localStorage
  localStorage.removeItem("selectedAnimal");

  if (selectedVisitor) {
    const nameObj = document.getElementById("name-dash");
    const coinsObj = document.getElementById("coins-dash");
    nameObj.textContent = `Name: ${selectedVisitor.name}`;
    coinsObj.textContent = `Coins: ${selectedVisitor.coins}`;
  } else {
    window.location.href = "./login.html";
  }
}

// event for loading the page
document.addEventListener("DOMContentLoaded", function () {
  loadVisitor();
  showVisitedAnimals();
  showFeededAnimals();
  showFavoriteAnimal();
});
