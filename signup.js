// signup.js

// function to handle redirection to login.html
function toLoginRedirect() {
  window.location.href = "./login.html";
}

function createNewVisitor(event) {
  event.preventDefault();
  // get the visitors object from localStorage
  const visitors = JSON.parse(localStorage.getItem("visitors"));
  // get value of the input field
  const visitorName = document.getElementById("name-field-signup").value;
  // get the choice of gender from the radio buttons
  const gender = document.querySelector(
    'input[name="genderRadios"]:checked'
  ).value;
  let imageUrl;

  if (gender === "male") {
    // male
    imageUrl =
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg";
  } else if (gender === "female") {
    // female
    imageUrl =
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg";
  } else {
    // other
    imageUrl = "./images/visitor_placeholder.jpg";
  }

  // function to validate form's input (name field)
  const validateFormInputs = (name) => {
    // regular expression validation - don't start with a digit or a special char
    const invalidRegex = /^[0-9\W]/;

    // check if the name is empty
    if (!name.trim()) {
      console.log("name is empty");
      alert("Name is required");
      return false;
    }
    // check if the name doesn't start with digit or special char
    if (invalidRegex.test(visitorName)) {
      alert("Name should not start with a digit or special character");
      return false;
    }
    return true;
  };

  // function to check if the visitor is exists with specified name
  const visitorExists = (name) => {
    return visitors.some((visitor) => visitor.name === name);
  };

  // function to push the new visitor to visitors object
  const makeVisitor = (name, image) => {
    visitors.push({
      name: name,
      coins: 50,
      image: image,
    });
    // save to localStorage the new visitors object
    localStorage.setItem("visitors", JSON.stringify(visitors));
  };

  if (!validateFormInputs(visitorName)) {
    // visitor's name is not valid
    console.log("Name is  not valid");
  } else if (!visitorExists()) {
    // successful signup
    makeVisitor(visitorName, imageUrl);
    alert(
      "Great you are registered to the zoo.\nlogin with one of the visitors first"
    );
    toLoginRedirect();
  } else {
    // visitor is already exist
    alert("Visitor is already exist.\nPlease use a different name");
  }
}

// eventListener of the form - pressing the submit button
const createForm = document.getElementById("create-visitor-form");
if (createForm) {
  createForm.addEventListener("submit", createNewVisitor);
}
