/*
This code initializes some variables, gets the username from the URL, and sets up some HTML elements to display the welcome messages and restaurant images.
It then checks if the user is logged in by looking for their username in the browser's local storage.
If the user is not logged in, it displays a welcome message to the visitor and provides a login link.
If the user is logged in, it displays a welcome message to the user and their profile name in the left corner of the screen.
*/

// Setup
let id = 0;
let isFound = false;
let restaurantId = 0;

// Get userName parameter value from the URL
const urlParams = new URL(window.location.toString()).searchParams;
const userName = urlParams.get("username");
if (userName !== null) {
    sessionStorage.setItem("userName", userName);
}
// Div and header variables
const welcomeDiv = document.getElementById("welcomeDiv");
const welcomeHeader = document.getElementById("welcomeHeader");

// Get the welcoming messages from session storage
let welcomeBack = sessionStorage.getItem(`Welcome back, ${userName}`);
let welcome = sessionStorage.getItem(`Welcome, ${userName}`);

// Get restaurant images' elements
const images = document.getElementsByClassName("restaurant_image");

// Check if the login link element exists in the HTML
let loginLink;
if (document.getElementById("login_link") !== null) {
    loginLink = document.getElementById("login_link");
}

// Check if the logout link element exists in the HTML
let logoutLink;
if (document.getElementById("logout_link") !== null) {
    logoutLink = document.getElementById("logout_link");
}

// Functions

// Add new userName to the local storage and display welcome message
function createUser() {
    id = localStorage.length;

    // Adds user name to the local storage
    localStorage.setItem(id.toString(), userName);

    // Set the welcome header text to welcome the user
    welcomeHeader.innerText = `Welcome, ${userName}`;

    // Set the welcome message as visited in session storage
    sessionStorage.setItem(welcomeHeader.innerText, true);
}

// Display welcome back message
function userExists() {
    // Check if the username exists in the browser's local storage
    for (let i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(i.toString()) === userName) {
            // Set the welcome header text to welcome back the user
            welcomeHeader.innerText = `Welcome back, ${userName}`;

            // Set the welcome back message as visited in session storage
            sessionStorage.setItem(welcomeHeader.innerText, true);

            // Return true if the user is found
            return true;
        }
    }
}

// When an image is clicked, go to its restaurant.
// The reload is required to find the elements when going back to the page.
function submitForm(imageId) {
    // Reload the page to find the form elements
    window.location.reload();
    let myForm = document.getElementById("myForm");
    let imageIdField = document.getElementById("imageId");

    // Hide the form
    myForm.style.display = "none";

    // Set the name of the hidden field to restaurant_id
    imageIdField.name = "restaurant_id";

    // Set the value of the hidden field to the imageId parameter
    imageIdField.value = imageId;
    myForm.id = "restaurantForm";
    myForm.submit();
}

// Create the user name profile
function userFoundFun(userName) {
    const userProfile = document.createElement("h3");
    const logoutLink = document.createElement("a");
    welcomeDiv.style.width = "100%";
    welcomeDiv.style.height = "10%";

    // Hide the welcome header
    welcomeHeader.style.display = "none";

    // Show logout button
    logoutLink.innerText = "Logout";
    logoutLink.href = "/login";
    logoutLink.id = "logout_link";
    logoutLink.style.position = "absolute";
    logoutLink.style.top = "5px";
    logoutLink.style.right = "25px";
    logoutLink.style.margin = "10px";
    welcomeDiv.appendChild(logoutLink);

    // Set the text of the user profile to the username
    userProfile.innerText = userName;
    userProfile.id = "userProfile";
    userProfile.style.position = "absolute";
    userProfile.style.top = "5px";
    userProfile.style.left = "25px";
    userProfile.style.margin = "10px";
    welcomeDiv.appendChild(userProfile);
}

// Implementations
if (userName === "" || userName === null) {
    // This condition checks if the user didn't enter the username or it's a new session
    // Display welcome, visitor header and a login link if it's the first time the user opens the page
    if (sessionStorage.getItem("Welcome, visitor") === null) {
        welcomeHeader.innerText = "Welcome, visitor";
    } else {
        welcomeHeader.style.display = "none";
    }

    // Check if the user opened the page before
    let userFound = false;
    let name;
    if (sessionStorage.getItem("userName") !== null) {
        name = sessionStorage.getItem("userName");
        let welcomeFound = sessionStorage.getItem(`Welcome, ${name}`) !== null;
        let welcomeBackFound =
            sessionStorage.getItem(`Welcome back, ${name}`) !== null;
        if (name !== null && (welcomeFound || welcomeBackFound)) {
            userFound = true;
        }
    }

    // If no user found, show the login link. Else show the user profile name
    if (!userFound) {
        const loginLink = document.createElement("a");
        loginLink.innerText = "Login";
        loginLink.href = "/login";
        loginLink.id = "login_link";
        loginLink.style.margin = "10px";
        welcomeDiv.appendChild(loginLink);
    } else {
        userFoundFun(name);
    }

    // Set the current header as visited before.
    sessionStorage.setItem(welcomeHeader.innerText, true);
} else {
    // Hide the login link
    if (document.getElementById("login_link") !== null) {
        loginLink = document.getElementById("login_link");
        loginLink.style.display = "none";
    }

    // Show welcoming header either it's a new user or an old one
    if (welcomeBack == null && welcome == null) {
        isFound = userExists();
        if (!isFound) {
            createUser();
        }
    }

    // Show the username as a profile in the left if it's the first time the user opens the home page after entering his name
    if (welcomeBack != null || welcome != null) {
        userFoundFun(userName);
    }
}
