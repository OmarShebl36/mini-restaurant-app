// Setup
let id = 0;
let isFound = false;

// Get userName parameter value
const urlParams = new URL(window.location.toString()).searchParams;
const userName = urlParams.get("username");

// Div and header variables
const welcomeDiv = document.getElementById("welcomeDiv");
const welcomeHeader = document.getElementById("welcomeHeader");

// Get restaurant images' elements
const images = document.getElementsByClassName("restaurant_image");


// Functions
// Add new userName to the local storage and display welcome message
function createUser() {
    id = localStorage.length;
    localStorage.setItem(id.toString(), userName);
    welcomeHeader.innerText = "Welcome " + userName;
    sessionStorage.setItem(welcomeHeader.innerText, true);
}

// Display welcome back message
function userExists() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i.toString()) == userName) {
            welcomeHeader.innerText = "Welcome back, " + userName;
            sessionStorage.setItem(welcomeHeader.innerText, true);
            return true;
        }
    }
}

// Implementations
// Create local storage or display user found function
if (userName != "" && userName != null) {
    isFound = userExists();
    if (!isFound) {
        createUser();
    }
} else if (userName == "" || userName == null) {

    // This condition checks the user didn't enter the username or opened for the home page directly
    // Display welcome, visitor header and a login link if it's the first time the user opens the page
    welcomeHeader.innerText = "Welcome, visitor";
    const loginLink = document.createElement("a");
    loginLink.innerText = "Login";
    loginLink.href = "/login";
    welcomeDiv.appendChild(loginLink);

    // The session storage used to check if the user open the page before or not
    // If it's not the first time, display login link and hide the header
    let welcomeBack = sessionStorage.getItem("Welcome back, " + userName);
    let welcome = sessionStorage.getItem("Welcome, " + userName);
    let welcomeVisitor = sessionStorage.getItem("Welcome, visitor");
    if (welcomeBack == null && welcome == null && welcomeVisitor != null) {
        welcomeHeader.style.display = "none";
        welcomeDiv.style.textAlign = "left";
    }

    // Set the current header as visited before
    sessionStorage.setItem(welcomeHeader.innerText, true);
}

for (let i = 0, n = images.length; i < n; i++) {

    images[i].addEventListener("click", function () {
    // Get the current URL
    let url = window.location.href;
    // Check if the parameter is present
    if (url.indexOf("?") === -1) {
        // If the parameter is not present, add it and reload the page
        let newUrl = url + `?restaurant_id=${images[i].id}`;
        window.history.pushState({path:newUrl},'',newUrl);
        window.location.reload();
    }
});}