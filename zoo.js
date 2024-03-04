// zoo.js

// function to create a card fot an animal = div with className='card'
function createAnimalCard(animal) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  // build the card for each animal
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  // add eventListener for click event - trigger loginAtAnimal
  cardDiv.addEventListener("click", function () {
    visitAnimal(animal.name);
  });

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

  // first section of details - properties
  const cardProps = document.createElement("p");
  cardProps.className = "card-props";
  cardProps.textContent = `Color: ${animal.color}, Weight: ${animal.weight}, Height: ${animal.height}`;

  // second section of details - data
  const cardData = document.createElement("p");
  cardData.className = "card-data";
  cardData.textContent = `Is Predator: ${animal.isPredator}, Habitat: ${animal.habitat}`;

  // append elements to card-body
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardProps);
  cardBody.appendChild(cardData);

  // append the elements to the card div
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);

  return colDiv;
}

// function to display animals cards - filtered or all
function renderAvailableAnimals() {
  // get the animals object from localStorage
  const animals = JSON.parse(localStorage.getItem("animals"));
  // get the filteredAnimals object from localStorage
  let filteredAnimals = JSON.parse(localStorage.getItem("filteredAnimals"));
  // get the rowContainer - for displaying the animals cards
  const container = document.querySelector(".row-cols-md-3");
  // clear existing cards
  container.innerHTML = "";

  if (animals) {
    if (!filteredAnimals) {
      filteredAnimals = animals;
    }

    // display animals (filtered or all)
    filteredAnimals.forEach((animal) => {
      const card = createAnimalCard(animal);
      container.appendChild(card);
    });
  }
}

// function to set values at search fields at every refresh - from the localStorage
function handleSearchFiltersValues() {
  // get animalFilter
  const animalFilter = JSON.parse(localStorage.getItem("animalFilter"));
  if (!animalFilter) {
    localStorage.removeItem("selectedAnimal");
    return;
  }

  // Set color filter
  const colorFilter = document.getElementById("color-search-filter");
  if (colorFilter) {
    colorFilter.value = animalFilter.color || "Choose Color";
  }

  // Set habitat filter
  const habitatFilter = document.getElementById("habitat-search-filter");
  if (habitatFilter) {
    habitatFilter.value = animalFilter.habitat || "Choose Habitat";
  }

  // Set height filter
  const heightFilter = document.getElementById("height-search-filter");
  if (heightFilter) {
    heightFilter.value = animalFilter.height || "";
  }

  // Set predator filter
  if (animalFilter.isPredator !== null) {
    const predatorFilter = document.getElementById(
      animalFilter.isPredator
        ? "predator-check-search-filter"
        : "not-predator-check-search-filter"
    );
    if (predatorFilter) {
      predatorFilter.checked = true;
    }
  }

  // Set name filter
  const nameFilter = document.getElementById("name-search-filter");
  if (nameFilter) {
    nameFilter.value = animalFilter.name || "";
  }

  // Set weight filter
  const weightFilter = document.getElementById("weight-search-filter");
  if (weightFilter) {
    weightFilter.value = animalFilter.weight || "";
  }

  setFilter();
}

function updateAnimalInteraction(visitor, animal, interactionType) {
  if (!visitor[interactionType]) {
    visitor[interactionType] = {};
  }

  if (!visitor[interactionType][animal.name]) {
    visitor[interactionType][animal.name] = {
      count: 0,
      details: animal,
    };
  }

  visitor[interactionType][animal.name].count += 1;
  localStorage.setItem("selectedVisitor", JSON.stringify(visitor));
}

// function to redirect to the animal's page - animal.html and store the selectedAnimal in localStorage
function visitAnimal(animalName) {
  const animals = JSON.parse(localStorage.getItem("animals"));
  const selectedAnimal = animals.find((animal) => animal.name === animalName);
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));

  if (selectedVisitor && selectedAnimal) {
    updateAnimalInteraction(selectedVisitor, selectedAnimal, "visitedAnimals");
    localStorage.setItem("selectedAnimal", JSON.stringify(selectedAnimal));
    window.location.href = "./animal.html";
  } else {
    alert("No Visitor was selected. Redirecting to login.");
    window.location.href = "./login.html";
  }
}

// function to handle clear button visibility
function handleClearButton() {
  const clearButton = document.getElementById("clear-button");
  const animalFilter = JSON.parse(localStorage.getItem("animalFilter"));

  // Check if animalFilter is empty
  const isFilterEmpty =
    !animalFilter ||
    (animalFilter.color === "Choose Color" &&
      animalFilter.habitat === "Choose Habitat" &&
      animalFilter.height === null &&
      animalFilter.weight === null &&
      animalFilter.name === "" &&
      animalFilter.isPredator === null);

  if (isFilterEmpty) {
    clearButton.style.display = "none"; // Hide clear button
    localStorage.removeItem("animalFilter");
    localStorage.removeItem("filteredAnimals");
  } else {
    clearButton.style.display = "block"; // Show clear button
  }
}

// function to reset all search fields
function resetFilters() {
  // reset filter fields to default values
  document.getElementById("color-search-filter").value = "Choose Color";
  document.getElementById("habitat-search-filter").value = "Choose Habitat";
  document.getElementById("height-search-filter").value = "";
  document.getElementById("weight-search-filter").value = "";
  document.getElementById("name-search-filter").value = "";
  document
    .querySelectorAll('input[name="gridRadios"]')
    .forEach((radio) => (radio.checked = false));

  // remove filters from localStorage and re-render animals
  localStorage.removeItem("animalFilter");
  localStorage.removeItem("filteredAnimals");

  // check if there is a selectedAnimal and remove it
  const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));
  if (selectedAnimal) {
    localStorage.removeItem("selectedAnimal");
  }

  handleClearButton();
  renderAvailableAnimals();
}

// function to handle filter the animals cards, by one or more of the search filters
function setFilter() {
  const color = document.getElementById("color-search-filter").value;
  const weightInput = document.getElementById("weight-search-filter").value;
  const heightInput = document.getElementById("height-search-filter").value;
  const name = document
    .getElementById("name-search-filter")
    .value.toLowerCase();
  const habitat = document.getElementById("habitat-search-filter").value;
  const predatorRadioValue = document.querySelector(
    'input[name="gridRadios"]:checked'
  )?.value;

  let isPredator;
  let weight = weightInput ? parseFloat(weightInput) : null;
  let height = heightInput ? parseFloat(heightInput) : null;

  // Set isPredator as boolean
  if (predatorRadioValue === "yes") {
    isPredator = true;
  } else if (predatorRadioValue === "no") {
    isPredator = false;
  } else {
    isPredator = null;
  }

  // check if clear button is necessary
  if (color || weight || height || name || habitat || isPredator) {
    // catch the row div container
    const rowDiv = document.getElementById("second-search-filter-container");
    // create col div
    const colDiv = document.createElement("div");
    colDiv.className = "col-auto";
    // append colDiv to rowDiv
    rowDiv.appendChild(colDiv);
  }

  // Filter logic
  const animals = JSON.parse(localStorage.getItem("animals"));
  let filteredAnimals = animals.filter((animal) => {
    return (
      (color === "Choose Color" || !color || animal.color === color) &&
      (!weight || animal.weight == weight) &&
      (!height || animal.height == height) &&
      (!name || animal.name.toLowerCase().includes(name)) &&
      (habitat === "Choose Habitat" ||
        !habitat ||
        animal.habitat === habitat) &&
      (isPredator === null || animal.isPredator === isPredator)
    );
  });

  // Save the filtered animals in localStorage
  localStorage.setItem("filteredAnimals", JSON.stringify(filteredAnimals));
  localStorage.setItem(
    "animalFilter",
    JSON.stringify({ color, weight, height, name, habitat, isPredator })
  );

  handleClearButton();
  renderAvailableAnimals();
}

// event for loading the page -> trigger loadAnimalsCards
document.addEventListener("DOMContentLoaded", function () {
  if (localStorage.getItem("selectedAnimal")) {
    localStorage.removeItem("selectedAnimal");
  }
  if (localStorage.getItem("relatedAnimals")) {
    localStorage.removeItem("relatedAnimals");
  }
  if (!localStorage.getItem("selectedVisitor")) {
    window.location.href = "./login.html";
  }
  // handle values at search fields at every refresh - from the localStorage
  handleSearchFiltersValues();
  // add eventListener for change in one of the search filters
  document
    .querySelectorAll(
      "#first-search-filter-container input, #first-search-filter-container select, #second-search-filter-container input, #second-search-filter-container select"
    )
    .forEach((element) =>
      element.addEventListener("change", function () {
        setFilter();
      })
    );

  // load the cards for the avaible animals
  renderAvailableAnimals();
});
