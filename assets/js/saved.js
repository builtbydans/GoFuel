// DOM query selectors
var savedSearches = document.querySelector("#saved-searches");
var clearBtn = document.querySelector("#clear");
var savedZips = JSON.parse(localStorage.getItem("zipCode")) || [];

// Clears localStorage and highscores
clearBtn.addEventListener('click', function() {
  localStorage.clear();
  savedSearches.innerHTML = '';
});

// Loops through array of stored items and displays them in table
function displaySearches() {
  for (var i = 0; i < savedZips.length; i++) {
    var li = document.createElement("li");
    li.textContent = `${savedZips[i]}`;
    savedSearches.appendChild(li);
  };
};

// Executing function
displaySearches();
