// Functions
// Increase the item counter.
function increase(itemId) {

    // Gets the highest item id we used in the session storage
    if (sessionStorage.getItem("highestId") === null) {
        sessionStorage.setItem("highestId", itemId);
    } else if (parseInt(sessionStorage.getItem("highestId")) < itemId) {
        sessionStorage.setItem("highestId", itemId);
    }

    // Increase the selected item's counter and save it in the session storage
    let selectedItemCounter = document.getElementById(`${itemId}_selected_counter`);
    let value = parseInt(selectedItemCounter.innerText);
    value++;
    selectedItemCounter.innerText = value.toString();
    sessionStorage.setItem(`${itemId}_selected_counter`, value.toString());
    const itemName = document.getElementById(`${itemId}_name`);
    sessionStorage.setItem(`${itemId}_name`, itemName.innerText);
    const itemPrice = document.getElementById(`${itemId}_price`);
    sessionStorage.setItem(`${itemId}_price`, itemPrice.innerText);

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

// The following code is written with the help of ChatGPT
// It clears the selected items from the session storage when the user leaves the page
// window.addEventListener('beforeunload', function() {
//         for (let i = 0, n = parseInt(sessionStorage.getItem("highestId")); i <= n; i++) {
//             if (sessionStorage.getItem(`${i}_selected_counter`)) {
//                 sessionStorage.removeItem(`${i}_selected_counter`);
//             }
//         }
// });
