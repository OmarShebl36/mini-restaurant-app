const n = sessionStorage.getItem("highestId") !== null ? sessionStorage.getItem("highestId") : 0;
const checkoutItems = document.getElementById("checkout_items");

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