// When the page gets opened clear the selected items found in the session storage
let highest = sessionStorage.getItem("highestId") !== null ? sessionStorage.getItem("highestId") : -1;
for (let i = 0; i <= highest; i++) {
    if (sessionStorage.getItem(`${i}_selected_counter`)!== null) {
        sessionStorage.removeItem(`${i}_selected_counter`);
        sessionStorage.removeItem(`${i}_name`);
        sessionStorage.removeItem(`${i}_price`);
        sessionStorage.removeItem(`${i}_restaurant_name`);
    }
}
sessionStorage.removeItem("highestId");

// Functions

// This function increases the selected counter of an item and saves its data in the session storage.
// It also updates the highest item id used in the session storage.
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

/* 
This function decreases the selected counter of an item if it's not zero.
If the selected counter becomes zero, it removes the item's data from the session storage.
It also updates the highest item id used in the session storage.
*/
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

            // If the selected counter becomes zero, remove the item's data from the session storage
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

/*
This code adds an event listener to the submit button of the form.
If no item has been selected, it sets the form action to "/fail".
If there are selected items, it sets the form action to "/checkout".
*/
let submitForm = document.getElementById("submit_items_form")
submitForm.addEventListener('click', () => {
    if (sessionStorage.getItem("highestId") === null) {
        submitForm.action = "\\fail";
    } else {
        submitForm.action = "\\checkout";
    }
});