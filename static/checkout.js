// Setup

// 'n' keeps track of the highest item ID stored in the session storage
let n = sessionStorage.getItem("highestId") !== null ? sessionStorage.getItem("highestId") : -1;

// 'checkoutItems' is the HTML element that displays the list of items in the checkout menu
const checkoutItems = document.getElementById("checkout_items");

// 'submitCheckout' is the HTML element of the submit button for checkout
const submitCheckout = document.getElementById("submit_checkout");

// 'checkoutForm' is the HTML element of the checkout form
const checkoutForm = document.getElementById("checkout_form");

// 'totalPrice' is the HTML element that displays the total price of the order
const totalPrice = document.getElementById("total_price");

// 'total' keeps track of the total price of the order
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
// If there are items in the checkout menu, the total is displayed; otherwise, the total div is hidden
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