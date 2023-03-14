// Setup
let id = 0;
let isFound = false;
let restaurantId = 0;

// Get userName parameter value
const urlParams = new URL(window.location.toString()).searchParams;
const userName = urlParams.get("username");

// Div and header variables
const welcomeDiv = document.getElementById("welcomeDiv");
const welcomeHeader = document.getElementById("welcomeHeader");

// Store the welcoming messages
let welcomeBack = sessionStorage.getItem(`Welcome back, ${userName}`);
let welcome = sessionStorage.getItem(`Welcome, ${userName}`);

// Get restaurant images' elements
const images = document.getElementsByClassName("restaurant_image");

if (document.getElementById("login_link") !== null) {
    let loginLink = document.getElementById("login_link");
}

// Functions
// Add new userName to the local storage and display welcome message
function createUser() {
    id = localStorage.length;
    localStorage.setItem(id.toString(), userName);
    welcomeHeader.innerText = `Welcome, ${userName}`;
    sessionStorage.setItem(welcomeHeader.innerText, true);
}

// Display welcome back message
function userExists() {
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i.toString()) == userName) {
            welcomeHeader.innerText = `Welcome back, ${userName}`;
            sessionStorage.setItem(welcomeHeader.innerText, true);
            return true;
        }
    }
}

// When an image is clicked, go to its restaurant.
// The reload is required to find the elements when going back to the page.
function submitForm(imageId) {
    window.location.reload();
    let myForm = document.getElementById("myForm");
    let imageIdField = document.getElementById("imageId");
    myForm.style.display = "none";
    imageIdField.name = "restaurant_id";
    imageIdField.value = imageId;
    myForm.id = "restaurantForm";
    myForm.submit();
}

// Implementations
if ((userName === "" || userName === null)) {
    // This condition checks if the user didn't enter the username or it's a new session
    // Display welcome, visitor header and a login link if it's the first time the user opens the page
    if (sessionStorage.getItem("Welcome, visitor") === null) {
        welcomeHeader.innerText = "Welcome, visitor";
    } else {
        welcomeHeader.style.display = "none";
    }

    const loginLink = document.createElement("a");
    loginLink.innerText = "Login";
    loginLink.href = "/login";
    loginLink.id = "login_link";
    welcomeDiv.appendChild(loginLink);

    // Set the current header as visited before.
    sessionStorage.setItem(welcomeHeader.innerText, true);
} else {
    
    // Hide the login link
    loginLink.style.display = "none";

    if (welcomeBack == null && welcome == null) {
        // Show welcoming header either it's a new user or an old one
        isFound = userExists();
        if (!isFound) {
            createUser();
        }
    }
    // Show the username as a profile in the left if it's the first time the user opens the home page after entering his name
    if (welcomeBack != null || welcome != null) {
        const userProfile = document.createElement("h3");
        welcomeHeader.style.display = "none";
        userProfile.innerText = userName;
        userProfile.id = "userProfile";
        welcomeDiv.appendChild(userProfile);
        welcomeDiv.style.textAlign = "left";
    }
} 