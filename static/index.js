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

// Get restaurant images' elements
const images = document.getElementsByClassName("restaurant_image");

// Store the welcoming messages
let welcomeBack = sessionStorage.getItem("Welcome back, " + userName);
let welcome = sessionStorage.getItem("Welcome, " + userName);


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
// Create local storage or display user found function if it's the first time to visit the home page
if (userName != "" && userName != null) {
    
    if ((welcomeBack !== null || welcome !== null) && document.referrer != "/login") {
        welcomeHeader.style.display = "none";
        welcomeDiv.style.textAlign = "left";
    } else {
        isFound = userExists();
        if (!isFound) {
            createUser();
    }
}

} else if (userName === "" || userName === null) {
    // This condition checks the user didn't enter the username or opened for the home page directly
    // Display welcome, visitor header and a login link if it's the first time the user opens the page
    welcomeHeader.innerText = "Welcome, visitor";
    const loginLink = document.createElement("a");
    loginLink.innerText = "Login";
    loginLink.href = "/login";
    welcomeDiv.appendChild(loginLink);

    // The session storage used to check if the user open the page before or not
    // If it's not the first time, display login link and hide the header
    let welcomeVisitor = sessionStorage.getItem("Welcome, visitor");
    if (welcomeBack == null && welcome == null && welcomeVisitor != null) {
        welcomeHeader.style.display = "none";
        welcomeDiv.style.textAlign = "left";
    }

    // Set the current header as visited before.
    sessionStorage.setItem(welcomeHeader.innerText, true);
}
