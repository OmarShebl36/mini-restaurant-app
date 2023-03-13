// Setup
let selectedItems = {};

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

    // Save the value in the dictionary (Object)
    selectedItems[itemId] = value;
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
        else if (sessionStorage.getItem(`${itemId}_selected_counter`) != null) {
            sessionStorage.removeItem(`${itemId}_selected_counter`);
        }
        // Save the value in the dictionary (Object)
        selectedItems[itemId] = value;
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
