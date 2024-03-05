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

// function to update headlines of visited and feeded animals
function updateTimesVisitedFeeded() {
  // get the selectedVisitor from localStorage
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  // get the html elements of the headlines of the number of visited
  const numOfVisited = document.getElementById("visited-animals");
  const numOfFeeded = document.getElementById("feeded-animals");

  if (selectedVisitor) {
    // update number of visited animals
    const visitedCount = selectedVisitor.visitedAnimals
      ? Object.keys(selectedVisitor.visitedAnimals).length
      : 0;
    numOfVisited.textContent = `Visited Animals: ${visitedCount}`;

    // update number of feeded animals
    const feededCount = selectedVisitor.feededAnimals
      ? Object.keys(selectedVisitor.feededAnimals).length
      : 0;
    numOfFeeded.textContent = `Feeded Animals: ${feededCount}`;

    // remove the unecessary sections
    if (visitedCount == 0) {
      document.getElementById("visited-animals-headline").style.display =
        "none";
    }
    if (feededCount == 0) {
      document.getElementById("feeded-animals-headline").style.display = "none";
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
  const favAnimalSection = document.getElementById("favorite-animal");

  if (selectedVisitor) {
    let favoriteAnimal = null;
    let maxVisits = 0;

    for (const animalName in selectedVisitor.visitedAnimals) {
      if (selectedVisitor.visitedAnimals[animalName].count > maxVisits) {
        maxVisits = selectedVisitor.visitedAnimals[animalName].count;
        favoriteAnimal = animalName;
      }
    }

    if (favoriteAnimal) {
      // clean the view in the div
      favAnimalSection.innerHTML = "";
      // create headlines for the favorite animal section
      const nameHeadline = document.createElement("h4");
      const timesVisitedHeadline = document.createElement("h5");

      // add content to headlines
      nameHeadline.textContent = `Favorite Animal: ${favoriteAnimal}`;
      timesVisitedHeadline.textContent = `Times Visited: ${maxVisits}`;

      // append headlines to the div
      favAnimalSection.appendChild(nameHeadline);
      favAnimalSection.appendChild(timesVisitedHeadline);
    }
  } else {
    nameHeadline.textContent = "";
    timesVisitedHeadline.textContent = "";
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
    // update visitor's details - name and coins
    const nameObj = document.getElementById("name-dash");
    const coinsObj = document.getElementById("coins-dash");
    nameObj.textContent = `Name: ${selectedVisitor.name}`;
    coinsObj.textContent = `Coins: ${selectedVisitor.coins}`;

    // update the number of visited and feeded animals
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
  updateTimesVisitedFeeded();
});
