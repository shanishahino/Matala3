// animal.js

// function to create a relatedAnimalCard
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

// function to render the selectedAnimal (from localStorage)
function renderAnimal() {
  // get selectedAnimal from localStorage
  const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));

  if (selectedAnimal) {
    // display the selectedAnimal's image
    const imageDiv = document.getElementById("image");
    const imgObj = document.createElement("img");
    imgObj.src = selectedAnimal.image;
    imgObj.alt = "Selected Animal Image";
    imageDiv.appendChild(imgObj);

    // set the values of the elements in the html file
    document.getElementById(
      "name"
    ).textContent = `Name: ${selectedAnimal.name}`;
    document.getElementById(
      "weight"
    ).textContent = `Weight: ${selectedAnimal.weight}`;
    document.getElementById(
      "height"
    ).textContent = `Height: ${selectedAnimal.height}`;
    document.getElementById(
      "color"
    ).textContent = `Color: ${selectedAnimal.color}`;
    document.getElementById(
      "habitat"
    ).textContent = `Habitat: ${selectedAnimal.habitat}`;
    if (selectedAnimal.isPredator) {
      document.getElementById("is-predator").textContent = "Predator";
    } else {
      document.getElementById("is-predator").textContent = "Not Predator";
    }
  } else {
    // redirect to zoo.html - for situation which the selectedAnimal is deleted from the localStorage
    window.location.href = "./zoo.html";
  }
}

// function to render and display all the animals that are the same habitat as the selectedAnimal
function renderRelatedAnimals() {
  // get the animals object from localStorage
  const animals = JSON.parse(localStorage.getItem("animals"));
  // get the selectedAnimal from the localStorage
  const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));

  if (selectedAnimal) {
    // find animals with the same habitat but not the same animal
    const relatedAnimals = animals.filter(
      (animal) =>
        animal.habitat === selectedAnimal.habitat &&
        animal.name !== selectedAnimal.name
    );

    // Check if there are one or more related animals
    if (relatedAnimals.length > 0) {
      // get the container for displaying the animal cards' headline
      const headlineContainer = document.getElementById(
        "headline-related-animals"
      );
      // add headline
      const headline = document.createElement("h1");
      headline.textContent = "Related Animals (same habitat)";
      headlineContainer.appendChild(headline);

      // get the container for displaying the animal cards
      const animalsCradsContainer = document.getElementById("related-animals");
      // clear existing cards
      animalsCradsContainer.innerHTML = "";

      // display related animals
      relatedAnimals.forEach((animal) => {
        const card = createAnimalCard(animal);
        animalsCradsContainer.appendChild(card);
      });

      // store the related animals in localStorage
      localStorage.setItem("relatedAnimals", JSON.stringify(relatedAnimals));
    } else {
      // remove the relatedAnimals from localStorage if none found
      localStorage.removeItem("relatedAnimals");
    }
  }
}

// function to show the modal - feed to selectedAnimal
function showModal(title, bodyText, footerText) {
  const modal = document.getElementById("selected-animal-feed-modal");
  const modalTitle = modal.querySelector(".modal-title");
  const modalBody = modal.querySelector(".modal-body");
  const modalFooter = modal.querySelector(".modal-footer");

  modalTitle.textContent = title;
  modalBody.textContent = bodyText;
  modalFooter.textContent = footerText;

  var bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

// function to update a visitor in the visitors array and save to localStorage
function updateVisitorInArray(updatedVisitor) {
  let visitors = JSON.parse(localStorage.getItem("visitors"));
  const visitorIndex = visitors.findIndex(
    (visitor) => visitor.name === updatedVisitor.name
  );

  if (visitorIndex !== -1) {
    visitors[visitorIndex] = updatedVisitor;
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
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

// function to feed the selectedAnimal
function feedAnimal() {
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));

  if (selectedVisitor && selectedAnimal) {
    if (selectedVisitor.coins >= 2) {
      selectedVisitor.coins -= 2;
      updateAnimalInteraction(selectedVisitor, selectedAnimal, "feededAnimals");
      localStorage.setItem("selectedVisitor", JSON.stringify(selectedVisitor));
      showModal(
        "Feeding Successful",
        "You have successfully fed the animal.",
        `Remaining coins: ${selectedVisitor.coins}`
      );
    } else {
      if (selectedAnimal.isPredator) {
        visitorGotEaten();
      } else {
        animalEscaped();
      }
    }
  }
}

function visitorGotEaten() {
  const visitors = JSON.parse(localStorage.getItem("visitors"));
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  const remainingVisitors = visitors.filter(
    (visitor) => visitor.name !== selectedVisitor.name
  );

  // save to localStorage the updated visitors
  localStorage.setItem("visitors", JSON.stringify(remainingVisitors));

  localStorage.removeItem("selectedVisitor");
  localStorage.removeItem("selectedAnimal");
  localStorage.removeItem("relatedAnimals");

  showModal("Oh no!", "You've been eaten by the animal!", "");

  setTimeout(function () {
    window.location.href = "./login.html";
  }, 3000); // redirect after 3 seconds
}

function animalEscaped() {
  const animals = JSON.parse(localStorage.getItem("animals"));
  const selectedAnimal = JSON.parse(localStorage.getItem("selectedAnimal"));
  const remainingAnimals = animals.filter(
    (animal) => animal.name !== selectedAnimal.name
  );
  localStorage.setItem("animals", JSON.stringify(remainingAnimals));
  localStorage.removeItem("selectedAnimal");
  localStorage.removeItem("relatedAnimals");

  showModal("Oops!", "The animal has escaped from the zoo!", "");

  setTimeout(function () {
    window.location.href = "./zoo.html";
  }, 3000); // redirect after 3 seconds
}

// add eventListener for loading the page - get selectedAnimal from localStorage
document.addEventListener("DOMContentLoaded", function () {
  renderAnimal();
  // render the related (same habitat) animals details into the Carousel element
  renderRelatedAnimals();
});
