// Functions
// Increase the item counter.
function increase(itemId) {

    // Gets the highest item id we used in the session storage
    if (sessionStorage.getItem("highestId") === null) {
        sessionStorage.setItem("highestId", itemId);
    } else if (parseInt(sessionStorage.getItem("highestId")) < itemId) {
        sessionStorage.setItem("highestId", itemId);
    }

    // Increase the selected item's counter and save its data in the session storage
    let selectedItemCounter = document.getElementById(`${itemId}_selected_counter`);
    let value = parseInt(selectedItemCounter.innerText);
    const itemName = document.getElementById(`${itemId}_name`);
    const itemPrice = document.getElementById(`${itemId}_price`);
    const selectedRestarantName = document.getElementById(`selected_restarant_name_header`);

    value++;
    selectedItemCounter.innerText = value.toString();

    sessionStorage.setItem(`${itemId}_selected_counter`, value.toString());
    sessionStorage.setItem(`${itemId}_name`, itemName.innerText);
    sessionStorage.setItem(`${itemId}_price`, itemPrice.innerText);
    sessionStorage.setItem(`${itemId}_restaurant_name`, selectedRestarantName.innerText);
}

// Decrease the item counter, if it's not zero.
function decrease(itemId) {

    let selectedItemCounter = document.getElementById(`${itemId}_selected_counter`);
    let value = parseInt(selectedItemCounter.innerText);
    if (value > 0) {
        value--;
        selectedItemCounter.innerText = value.toString();
        if (value > 0) {
            sessionStorage.setItem(`${itemId}_selected_counter`, value.toString());
        }
        else if (sessionStorage.getItem(`${itemId}_selected_counter`) !== null && value == 0) {
            
            sessionStorage.removeItem(`${itemId}_selected_counter`);
            sessionStorage.removeItem(`${itemId}_name`);
            sessionStorage.removeItem(`${itemId}_price`);
            sessionStorage.removeItem(`${itemId}_restaurant_name`);


            // Gets the next highest item id in the session storage
            if (sessionStorage.getItem("highestId") == itemId && value == 0) {
                let max = -1;
                for (let i = 0; i < itemId; i++) {   
                    let item = sessionStorage.getItem(`${i}_selected_counter`);
                    if (item !== null && i > max) {
                        max = i;
                    }
                }

                // If no item found remove the highestId from the session storage
                if (max === -1) {
                    sessionStorage.removeItem("highestId");
                } else {
                    sessionStorage.setItem("highestId", max);
                }
            }
        }
    }
}

let submitForm = document.getElementById("submit_items_form")
submitForm.addEventListener('click', () => {
    if (sessionStorage.getItem("highestId") === null) {
        submitForm.action = "/fail";
    } else {
        submitForm.action = "/checkout";
    }
});