// Setup
let n = sessionStorage.getItem("highestId") !== null ? sessionStorage.getItem("highestId") : -1;
const checkoutItems = document.getElementById("checkout_items");
const submitCheckout = document.getElementById("submit_checkout");
const checkoutForm = document.getElementById("checkout_form");

// Implementaion
// Loop over each item and check if it is selected in the session storage or not
// If selected create a new checkout item and show it in the checkout menu
for (let i = 0; i <= n; i++) {
    if (sessionStorage.getItem(`${i}_selected_counter`) != null) {
        let itemCount = sessionStorage.getItem(`${i}_selected_counter`);
        if (itemCount > 0) {
            let itemCheckoutDiv = document.createElement('div');
            itemCheckoutDiv.className = `checkout_item`;
            itemCheckoutDiv.id = `${i}_checkout_div`;
            let itemName = document.createElement('h2');
            let itemPrice = document.createElement('h3');
            itemName.className = `checkout_item_name`;
            itemName.className = `checkout_item_price`;
            itemName.innerText = sessionStorage.getItem(`${i}_name`);
            itemPrice.innerText = sessionStorage.getItem(`${i}_price`);
            itemCheckoutDiv.appendChild(itemName);
            itemCheckoutDiv.appendChild(itemPrice);
            checkoutItems.appendChild(itemCheckoutDiv);
        }
    }
}

// Clear the selected items from the session storage
// Choose which page to display based on the selected items
submitCheckout.addEventListener('click', () => {
    
    n = sessionStorage.getItem("highestId") !== null ? sessionStorage.getItem("highestId") : -1;
    if (n === -1) {
        checkoutForm.action = "/fail";
    } else {
        
        checkoutForm.action = "/success";
    }
    for (let i = 0; i <= n; i++) {
        sessionStorage.removeItem(`${i}_selected_counter`);
        sessionStorage.removeItem(`${i}_name`);
        sessionStorage.removeItem(`${i}_price`);
    }
    sessionStorage.removeItem("highestId");
});