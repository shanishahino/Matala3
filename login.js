// login.html

// function to create the search input element
function createSearchInput() {
  // catch the rowContainer
  const rowContainer = document.getElementById("search-input");

  // create div element
  const colDiv = document.createElement("div");
  colDiv.className = "col-sm-6";

  // create div input group
  const inputGroup = document.createElement("div");
  inputGroup.className = "input-group";

  // create span element
  const spanLabel = document.createElement("span");
  spanLabel.className = "input-group-text";
  spanLabel.id = "basic-addon1";
  spanLabel.textContent = "Search";

  // create input element
  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.className = "form-control";
  inputField.placeholder = "Enter Visitor's Name";
  inputField.setAttribute("aria-label", "Search");
  inputField.setAttribute("aria-describedby", "basic-addon1");
  // eventListener on the inputField
  inputField.addEventListener("input", handleSearchInput);

  // append to inputGroup
  inputGroup.appendChild(spanLabel);
  inputGroup.appendChild(inputField);

  // append inputGroup to colDiv
  colDiv.appendChild(inputGroup);

  // append the colDiv to the row div
  rowContainer.appendChild(colDiv);
}

// function to handle search input change
function handleSearchInput(event) {
  // get the search query from the input field and convert to lower letters
  const searchQuery = event.target.value.toLowerCase();
  // catch the rowContainer of the visitors cards
  const rowContainer = document.querySelector(".row-cols-md-4");
  // clear existing cards
  rowContainer.innerHTML = "";

  // get the visitors object from the localStorage
  let visitors = JSON.parse(localStorage.getItem("visitors"));
  if (visitors) {
    // search by the Visitor's name
    let filteredVisitors = visitors.filter((visitor) =>
      visitor.name.toLowerCase().includes(searchQuery)
    );
    if (searchQuery === "" || filteredVisitors.length == 0) {
      loadVisitorCards();
    } else {
      // display filteredVisitors cards
      filteredVisitors.forEach((visitor) => {
        const card = createVisitorCard(visitor);
        rowContainer.appendChild(card);
      });
    }
  }
}

// function to create a card for a visitor = div with className='card'
function createVisitorCard(visitor) {
  const colDiv = document.createElement("div");
  colDiv.className = "col";

  // build the card for each visitor
  const cardDiv = document.createElement("div");
  cardDiv.className = "card";
  // add eventListener for click event - trigger loginAtVisitor
  cardDiv.addEventListener("click", function () {
    loginAsVisitor(visitor.name);
  });

  // image build
  const img = document.createElement("img");
  img.className = "card-visitor-img-top";
  img.src = visitor.image;
  img.alt = "Image of " + visitor.name;

  // card body build
  const cardBody = document.createElement("div");
  cardBody.className = "card-body";

  const cardTitle = document.createElement("h5");
  cardTitle.className = "card-title";
  cardTitle.textContent = "Name: " + visitor.name;

  const cardText = document.createElement("p");
  cardText.className = "card-text";
  cardText.textContent = "Number of coins: " + visitor.coins;

  // create coin icon
  const coinIcon = document.createElement("i");
  coinIcon.className = "fa-regular fa-coin";

  // append coin icon to card text
  cardText.appendChild(coinIcon);

  // append object to body
  cardBody.appendChild(cardTitle);
  cardBody.appendChild(cardText);

  // append the elements to the card div
  cardDiv.appendChild(img);
  cardDiv.appendChild(cardBody);
  colDiv.appendChild(cardDiv);

  return colDiv;
}

// function to load the visitors details into the cards
function loadVisitorCards() {
  let visitors = JSON.parse(localStorage.getItem("visitors"));
  if (visitors) {
    // get the rowContainer
    const container = document.querySelector(".row-cols-md-4");

    visitors.forEach((visitor) => {
      const card = createVisitorCard(visitor);
      container.appendChild(card);
    });
  }
}

// function to create the modal element there is selectedVisitor in localStorage
function createSelectedVisitorModal(visitor) {
  // Bootstrap's modal structure build
  const modal = document.createElement("div");
  modal.className = "modal fade";
  modal.id = "selected-visitor-modal";
  modal.tabIndex = -1;
  modal.setAttribute("aria-labelledby", "modalLabel");
  modal.setAttribute("aria-hidden", "true");

  const modalDialog = document.createElement("div");
  modalDialog.className = "modal-dialog modal-dialog-centered";
  const modalContent = document.createElement("div");
  modalContent.className = "modal-content";

  // header build
  const modalHeader = document.createElement("div");
  modalHeader.className = "modal-header";

  // title build
  const title = document.createElement("h3");
  title.className = "modal-title";
  title.textContent = "Selected Visitor's details";

  // close button build
  const closeButton = document.createElement("button");
  closeButton.type = "button";
  closeButton.className = "btn-close";
  closeButton.setAttribute("data-bs-dismiss", "modal");
  closeButton.setAttribute("aria-label", "Close");

  // body build
  const modalBody = document.createElement("div");
  modalBody.className = "modal-body";
  modalBody.textContent = `Name: ${visitor.name}\nNumber of coins: ${visitor.coins}`;

  // appending elements to modal-header
  modalHeader.appendChild(title);
  modalHeader.appendChild(closeButton);
  // appending modal-header and modal-body to the modal object
  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalDialog.appendChild(modalContent);
  modal.appendChild(modalDialog);

  // catch the row div for displaying the modal
  const rowContainer = document.querySelector("row-cols-md-4");
  rowContainer.appendChild(modal);

  // trigger the modal to be visible
  var bsModal = new bootstrap.Modal(
    document.getElementById("selected-visitor-modal")
  );
  bsModal.show();
}

// function to show and populate the modal with content
function showSelectedVisitorModal(visitor) {
  // get the modal element
  const modal = document.getElementById("selected-visitor-modal");

  // clear all existing content in the modal's body and footer
  const modalBody = modal.querySelector(".modal-body");
  const modalFooter = modal.querySelector(".modal-footer");
  modalBody.innerHTML = "";
  if (modalFooter) modalFooter.remove();

  // add Visitor's image
  const img = document.createElement("img");
  img.src = visitor.image;
  img.alt = `Image of ${visitor.name}`;
  img.className = "img-fluid";
  modalBody.appendChild(img);

  // add Visitor's details
  const details = document.createElement("p");
  details.textContent = `Name: ${visitor.name}, Number of coins: ${visitor.coins}`;
  modalBody.appendChild(details);

  // create a modal footer
  const footer = document.createElement("div");
  footer.className = "modal-footer";

  // create disconnect button
  const disconnectBtn = document.createElement("button");
  disconnectBtn.className = "btn btn-danger";
  disconnectBtn.textContent = "Disconnect";
  disconnectBtn.onclick = function () {
    // remove the selectedVisitore from localStorage
    localStorage.removeItem("selectedVisitor");
    bsModal.hide();
    document.getElementById("disconnect-button").style.display = "none";
    // show the search input field and the visitors cards
    createSearchInput();
    loadVisitorCards();
  };
  footer.appendChild(disconnectBtn);

  // create cancel button
  const cancelButton = document.createElement("button");
  cancelButton.className = "btn btn-secondary";
  cancelButton.textContent = "Cancel";
  cancelButton.setAttribute("data-bs-dismiss", "modal");
  footer.appendChild(cancelButton);

  // Append footer to the modal
  modal.querySelector(".modal-content").appendChild(footer);

  // Show the modal
  var bsModal = new bootstrap.Modal(modal);
  bsModal.show();
}

// function to hide the modal
function hideSelectedVisitorModal() {
  var bsModal = bootstrap.Modal.getInstance(
    document.getElementById("selected-visitor-modal")
  );
  if (bsModal) {
    // hide the modal
    bsModal.hide();
  }
}

// event for loading the page - trigger loadVisitorsCards
document.addEventListener("DOMContentLoaded", function () {
  let selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));

  if (selectedVisitor) {
    // display disconnect button
    document.getElementById("disconnect-button").style.display = "block";
    // Populate and show the modal
    showSelectedVisitorModal(selectedVisitor);
  } else {
    // Hide the modal and proceed with the normal flow
    hideSelectedVisitorModal();
    // show the search input field and the visitors cards
    createSearchInput();
    loadVisitorCards();
  }
});

// main function - login opertaion success with save selecteVisitor to localStorage and redirect to zoo.html
function loginAsVisitor(visitorName) {
  // get the visitors object from localStorage
  let visitors = JSON.parse(localStorage.getItem("visitors"));

  // find the selectedVisitor in the visitors object
  let selectedVisitor = visitors.find(
    (visitor) => visitor.name === visitorName
  );

  // found the visitor
  if (selectedVisitor) {
    // save selectedVisitor in localStorage
    localStorage.setItem("selectedVisitor", JSON.stringify(selectedVisitor));
    console.log("selectedVisitor was saved to localStorage: ", selectedVisitor);
    alert(
      `Logged in with: ${selectedVisitor.name}\nNumber of coins: ${selectedVisitor.coins}`
    );
    // redirect to zoo.html
    window.location.href = "./zoo.html";
  } else {
    // visitor was not found
    console.error("Visitor was not found: ", visitorName);
  }
}
