// Setup
let n = sessionStorage.getItem("highestId") !== null ? sessionStorage.getItem("highestId") : -1;
const checkoutItems = document.getElementById("checkout_items");
const submitCheckout = document.getElementById("submit_checkout");
const checkoutForm = document.getElementById("checkout_form");
const totalPrice = document.getElementById("total_price");
let total = 0;

// Implementaion
// Loop over each item and check if it is selected in the session storage or not
// If selected create a new checkout item and show it in the checkout menu
for (let i = 0; i <= n; i++) {
    if (sessionStorage.getItem(`${i}_selected_counter`) != null) {
        let itemCount = sessionStorage.getItem(`${i}_selected_counter`);
        if (itemCount > 0) {
            let price = parseFloat(sessionStorage.getItem(`${i}_price`));
            let itemCheckoutDiv = document.createElement('div');
            let itemName = document.createElement('h2');
            let itemPrice = document.createElement('h3');
            itemCheckoutDiv.className = `checkout_item`;
            itemCheckoutDiv.id = `${i}_checkout_div`;
            itemName.className = `checkout_item_name`;
            itemPrice.className = `checkout_item_price`;
            // Adds the count the item got selected
            if (itemCount > 1) {
                itemName.innerText = `${itemCount}x ${sessionStorage.getItem(`${i}_name`)}`;
            } else {
                itemName.innerText = sessionStorage.getItem(`${i}_name`);
            }
            // Calculate the total of the item
            itemPrice.innerText = (price * itemCount).toFixed(2);
            total += price * itemCount;
            itemCheckoutDiv.appendChild(itemName);
            itemCheckoutDiv.appendChild(itemPrice);
            checkoutItems.appendChild(itemCheckoutDiv);
        }
    }
}

// Displays the total of the order
if (total > 0) {
    totalPrice.innerText = total.toFixed(2);
} else {
    let totalDiv = document.getElementById("total_div");
    totalDiv.style.display = "none";
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
        sessionStorage.removeItem(`${i}_restaurant_name`);
        sessionStorage.removeItem(`${i}_selected_counter`);
        sessionStorage.removeItem(`${i}_name`);
        sessionStorage.removeItem(`${i}_price`);
    }
    sessionStorage.removeItem("highestId");
});