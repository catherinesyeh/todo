/* ADD NEW TODO
 * When user presses "add" button, we add a todo item with the text from 
 * the text input element
 */
const addButton = document.getElementById("add-button");
const input = document.getElementById("add-input");
const list = document.getElementById("list");

addButton.addEventListener("click", function () {
    var text = input.value;
    if (text == '') { // adapted from W3 schools
        // make sure todo isn't empty and alert user if it is
        alert("Todo cannot be empty!");
        return;
    } 
    // otherwise, add todo to the list
    createTodo(text);
})

function createTodo(text) { 
    // create HTML elements corresponding to new todo item
    var item = document.createElement("LI"); // list item

    var box = document.createElement("INPUT"); // checkbox
    box.setAttribute("type", "checkbox");
    box.addEventListener("click", function() { // add event listener to new checkbox
        toggleCheckbox(this);
    })

    var label = document.createElement("LABEL"); // label
    label.innerHTML = text;

    var options = document.createElement("DIV"); // options menu
    options.classList.add("options");
    options.innerHTML = '<i title="move up" class="fa fa-long-arrow-up" aria-hidden="true" onclick="moveUp(this)"></i>\n' +
                        '<i title="move down" class="fa fa-long-arrow-down" aria-hidden="true" onclick="moveDown(this)"></i>\n' +
                        '<i title="remove" class="fa fa-times" aria-hidden="true" onclick="remove(this)"></i>'

    item.appendChild(box); // append checkbox & label & options to todo item
    item.appendChild(label);
    item.appendChild(options);

    list.prepend(item); // add todo item to list
    recalibrateList(); // recalibrate list if needed
}


/* CHECK OFF TODOS
 * When user selects a checkbox, we check if it's checked off or not:
 * 1) If it's now checked, we cross the item off the list
 * OR...
 * 2) If it's now unchecked, we uncross the item off the list
 * 
 * Some code adapted from W3 schools
 */
const checkboxes = document.querySelectorAll("input[type='checkbox']");
for (var i = 0; i < checkboxes.length; i++) {
    // add event listener for every checkbox
    checkboxes[i].addEventListener("click", function() {
        toggleCheckbox(this);
    })
}

function toggleCheckbox(box) {
    var item = box.parentElement; // this is the todo item itself
    if (box.checked) { // mark todo as done if checkbox is checked
        item.classList.add("done");
    } else { // otherwise, mark as not done
        item.classList.remove("done");
    }
}

/* TO DO LIST ITEM OPTIONS
 * After items are created, users can move them up/down to change priority
 * or remove them 
 */
function remove(icon) { // remove todo item from list
    var item = icon.parentElement.parentElement; // get todo list item itself
    item.remove();
    recalibrateList(); // recalibrate list if needed
}

function moveUp(icon) { // move todo item up list
    var item = icon.parentElement.parentElement; // get todo list item itself
    var prev = item.previousElementSibling;

    item.parentNode.insertBefore(item, prev);
    recalibrateList(); // recalibrate list if needed
}

function moveDown(icon) { // move todo item down list
    var item = icon.parentElement.parentElement; // get todo list item itself
    var next = item.nextElementSibling;

    next.parentNode.insertBefore(next, item);
    recalibrateList(); // recalibrate list if needed
}

// recalibrate option icons when todo list changes (e.g., user adds/removes item, or reorders list)
function recalibrateList() {
    var icons = document.querySelectorAll(".options i:not([fa-times])");
    for (var i = 0; i < icons.length; i++) {
        icons[i].classList.remove("disabled");
    }

    // disable up arrow of first todo item
    list.firstElementChild.lastElementChild.firstElementChild.classList.add("disabled");

    // disable down arrow of last todo item
    list.lastElementChild.lastElementChild.firstElementChild.nextElementSibling.classList.add("disabled");
    
}