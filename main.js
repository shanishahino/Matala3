// מערכים גלובלים שישמשו אותנו בכל העמודים
let visitors = [
  {
    name: "John Smith",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Emily Johnson",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "Michael Williams",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Jessica Brown",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "Christopher Jones",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Ashley Davis",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "Matthew Miller",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Amanda Wilson",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "David Moore",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Sarah Taylor",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "James Anderson",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Jennifer Thomas",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "Robert Jackson",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Elizabeth White",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "Daniel Harris",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Melissa Martin",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "William Thompson",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Linda Garcia",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
  {
    name: "Joseph Martinez",
    image:
      "https://www.svgrepo.com/show/382105/male-avatar-boy-face-man-user-5.svg",
    coins: 50,
  },
  {
    name: "Karen Robinson",
    image:
      "https://www.svgrepo.com/show/382100/female-avatar-girl-face-woman-user-7.svg",
    coins: 50,
  },
];

let animals = [
  {
    name: "Lion",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/lion.jpg",
  },
  {
    name: "Elephant",
    isPredator: false,
    weight: 1200,
    height: 200,
    color: "grey",
    habitat: "land",
    image: "./images/elephant.jpg",
  },
  {
    name: "Giraffe",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/giraffe.jpg",
  },
  {
    name: "Tiger",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/tiger.jpg",
  },
  {
    name: "Monkey",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/monkey.jpg",
  },
  {
    name: "Kangaroo",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/kangaroo.jpg",
  },
  {
    name: "Penguin",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "sea",
    image: "./images/penguin.jpg",
  },
  {
    name: "Zebra",
    isPredator: false,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/zebra.jpg",
  },
  {
    name: "Cheetah",
    isPredator: true,
    weight: 100,
    height: 120,
    color: "brown",
    habitat: "land",
    image: "./images/cheetah.jpg",
  },
];

function generateDataset() {
  if (localStorage.getItem("visitors")) {
    visitors = JSON.parse(localStorage.getItem("visitors"));
  } else {
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }
  if (localStorage.getItem("animals")) {
    animals = JSON.parse(localStorage.getItem("animals"));
  } else {
    localStorage.setItem("animals", JSON.stringify(animals));
  }

  console.log(visitors);
}

// eventListener to load visitors dropdown list
document.addEventListener("DOMContentLoaded", function () {
  generateDataset();
  displayVisitorsInDropdown();
  displayVisitorDetails();
});

// function to handle logout operation
function logout() {
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));
  if (selectedVisitor) {
    // Update the visitors array with the current state of selectedVisitor
    let visitors = JSON.parse(localStorage.getItem("visitors")) || [];
    const visitorIndex = visitors.findIndex(
      (visitor) => visitor.name === selectedVisitor.name
    );
    if (visitorIndex !== -1) {
      visitors[visitorIndex] = selectedVisitor;
    } else {
      visitors.push(selectedVisitor);
    }
    localStorage.setItem("visitors", JSON.stringify(visitors));
  }

  // Remove items from localStorage and redirect
  localStorage.removeItem("selectedVisitor");
  localStorage.removeItem("selectedAnimal");
  localStorage.removeItem("relatedAnimals");
  localStorage.removeItem("animalFilter");
  localStorage.removeItem("filteredAnimals");

  window.location.href = "./login.html";
  document.getElementById("disconnect-button").style.display = "none";
}

// function to reset all data in all pages
function resetData() {
  localStorage.clear();
  alert("All data was cleared and regenerated to the localStorage");
  setTimeout(function () {
    generateDataset();
  }, 3000);
  window.location.href = "./login.html";
}

// function to load all the visitors details in a sropdown list
function displayVisitorsInDropdown() {
  // get visitors from localStorage
  const visitors = JSON.parse(localStorage.getItem("visitors"));
  // get the html element - dropsown list
  const dropdownList = document.querySelector(".navbar .dropdown-menu");
  dropdownList.innerHTML = "";

  // loop through the visitors object and write each name into a row in the list
  visitors.forEach((visitor) => {
    const dropdownItem = document.createElement("a");
    dropdownItem.className = "dropdown-item";
    dropdownItem.href = "./login.html";
    dropdownItem.textContent = visitor.name;
    dropdownList.appendChild(dropdownItem);
  });
}

// function to handle displaying visitor's name
function displayVisitorDetails() {
  // get the selectedVisitor from localStorage
  const selectedVisitor = JSON.parse(localStorage.getItem("selectedVisitor"));

  if (selectedVisitor) {
    // get the html element - dropsown list
    const navItem = document.getElementById("visitor-details");
    navItem.textContent = `Name: ${selectedVisitor.name}, Coins: ${selectedVisitor.coins}`;
  }
}
