
const alertDiv = document.getElementById('alertMessage');
const form = document.getElementById('itemForm');
const inputItem = document.getElementById('inputItem');
const ordersList = document.getElementById('ordersList');
// Hidden input
const editOrder = document.querySelector("#editOrder");


// Store all the orders in this array
let todoOrders = [];


// Show alert message
const alertMessage = (message, className) => {
    alertDiv.innerHTML = message;
    alertDiv.classList.add(className, "show");
    alertDiv.classList.remove("hide");
    setTimeout(() => {
        alertDiv.classList.add("hide");
        alertDiv.classList.remove("show");
    }, 3000)
    return;
}


const removeOrder = (order) => {
    const removeOrderIndex = todoOrders.indexOf(order);
    todoOrders.splice(removeOrderIndex, 1);
};


const updateOrder = (currentOrderIndex, value) => {
    const newEditedTodo = todoOrders[currentOrderIndex];
    newEditedTodo.orderName = value;
    todoOrders.splice(currentOrderIndex, 1, newEditedTodo);
    setLocalStorage(todoOrders);
};


// Handling Edit and delete buttons
const handleButtons = (todoData) => {
    const todoButtons = document.querySelectorAll('.list-group-item');
    todoButtons.forEach((button) => {
        if (button.querySelector('.todoTitle').getAttribute('data-time') == todoData.addedAt) {
            // edit
            button.querySelector("[data-edit]").addEventListener('click', (e) => {
                e.preventDefault();
                inputItem.value = todoData.orderName;
                editOrder.value = todoOrders.indexOf(todoData);
            })
            // delete
            button.querySelector("[data-delete]").addEventListener('click', function (e) {
                e.preventDefault();
                if(confirm("Are you sure to delete this order?")) {
                    ordersList.removeChild(button);
                    removeOrder(button);
                    setLocalStorage(todoOrders);
                    alertMessage("Order Deleted successfully", "alert-danger");
                    return todoOrders.filter((button) => button != todoData);
                }
            })
        }
    });
}


// Load from local storage to DOM
const loadOrders = (todoOrders) => {
    ordersList.innerHTML = "";

    if (todoOrders.length > 0) {
        todoOrders.forEach((todoOrder) => {
            ordersList.insertAdjacentHTML(
                "beforeend",
                `<li class="list-group-item d-flex justify-content-between align-items-center shadow mb-1">
                <span class="todoTitle" data-time="${todoOrder.addedAt}">${todoOrder.orderName}</span>
                <span>
                    <a href="#" class="mx-1" data-edit><i class="bi bi-pencil-square blue"></i></a>
                    <a href="#" class="mx-1" data-delete><i class="bi bi-x-circle red"></i></a>
                </span>
                </li>
                `
            );
            handleButtons(todoOrder);
        });
    }
};


// Fetch data from Local Storage
const getLocalStorage = () => {
    const todoStorage = localStorage.getItem('orders');
    if (todoStorage === "undefined" || todoStorage === null) {
        todoOrders = [];
    }
    else {
        todoOrders = JSON.parse(todoStorage);
    }
    // console.log(todoOrders);
    loadOrders(todoOrders);
};


// Store in Local Storage
const setLocalStorage = (todoOrders) => {
    // Convert the object to string with JSON.stringify
    localStorage.setItem('orders', JSON.stringify(todoOrders));
};


// For adding value from DOM to an array
document.addEventListener('DOMContentLoaded', () => {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        // trim() to remove whitespaces from start and end.
        const todoOrderName = inputItem.value.trim();
        // console.log(orderName);

        if (todoOrderName.length === 0) {
            alertMessage("Please enter order name", "alert-danger");
        }
        else {
            const currentOrderIndex = editOrder.value;
            if (currentOrderIndex) {
                // update
                updateOrder(currentOrderIndex, todoOrderName);
                editOrder.value = "";
                alertMessage("Order edited successfully", "alert-success");
            }
            else {
                const orderObj = {
                    orderName: todoOrderName,
                    addedAt: new Date().getTime()
                };

                todoOrders.push(orderObj);
                setLocalStorage(todoOrders);
                alertMessage("Order added successfully", "alert-success");
            }
            loadOrders(todoOrders);
        }
        inputItem.value = "";
    });
    getLocalStorage();
});