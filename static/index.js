// Setup
let id = 0;
let isFound = false;
// Get userName parameter value
const urlParams = new URL(window.location.toLocaleString()).searchParams;
const userName = urlParams.get("username");
// Div and header variables
const welcomeDiv = document.getElementById("welcomeDiv");
const welcomeHeader = document.getElementById("welcomeHeader");

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
    welcomeHeader.innerText = "Welcome, visitor";
    const loginLink = document.createElement("a");
    loginLink.innerText = "Login";
    loginLink.href = "/login";
    welcomeDiv.appendChild(loginLink);
    let welcomeBack = sessionStorage.getItem("Welcome back, " + userName);
    let welcome = sessionStorage.getItem("Welcome, " + userName);
    let welcomeVisitor = sessionStorage.getItem("Welcome, visitor");
    if (welcomeBack == null && welcome == null && welcomeVisitor != null) {
        welcomeHeader.style.display = "none";
        welcomeDiv.style.textAlign = "left";
    }
    sessionStorage.setItem(welcomeHeader.innerText, true);
}
