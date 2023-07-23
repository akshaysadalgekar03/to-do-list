const currentDate = document.querySelector("#date");
const addButton = document.querySelector("#addButton");
const clearButton = document.querySelector("#clearButton");
let counter = document.querySelector("#counter");
let displayTask = document.querySelector(".grid-item-7-display-task");
let userTasks = document.querySelector("#user-task");
const allTask = document.querySelector(".active");
const pendingTask = document.querySelector(".pending");
const completedTask = document.querySelector(".completed");


// Display Month, Date, Year
const date = new Date();
const month = date.toLocaleString("en-US", {
    month: "long"
});
const day = date.getDate();
const year = date.getFullYear();
const formattedDate = `${month} ${day}, ${year}`;
currentDate.innerHTML = formattedDate;

// Task Count Function
let count = 0;
addButton.addEventListener("click", increaseCount);

function increaseCount() {
    if (userTasks.value === "") {
        return;
    }
    count += 1;
    counter.innerHTML = ` ${count} tasks`;
    createTaskObject();
}

// clear all task
clearButton.addEventListener('click', clearAll)

function clearAll() {
    allTasksList.length = 0;
    displayTask.innerHTML = ""
    count = 0;
    counter.innerHTML = ` ${count} tasks`;
}
// Add Task
let taskId = 1;
let allTasksList = [];

function createTaskObject() {
    // Get the user input from the form element
    let currentTask = document.querySelector("#user-task");
    let taskValue = currentTask.value;

    // Check if the input is not empty
    if (taskValue) {
        // Create a new task object with text, status, and id properties
        let task = {
            text: taskValue,
            status: "pending",
            id: taskId
        };

        // Increment the task id for the next task
        taskId++;

        // Add the task object to the array
        allTasksList.push(task);

        // Call the function that will update the UI with the new task
        createTaskDiv(task);

        // Clear the input field for the next task
        currentTask.value = "";

    }
}
// Create Each Task Div
function createTaskDiv(task) {

    // Create the li element
    let listItem = document.createElement("li");
    listItem.style.listStyle = "none";
    listItem.style.fontSize = '1.8rem';
    listItem.style.padding = "10px"

    // Create the checkbox element
    let checkBox = document.createElement("input");
    checkBox.type = "checkbox";
    checkBox.classList.add("task-checkbox");
    listItem.appendChild(checkBox);

    // Create the task element
    let taskText = document.createElement("span");
    taskText.classList.add("task-name");
    taskText.textContent = task.text;
    taskText.style.paddingLeft = "10px"
    listItem.appendChild(taskText);

    // Set the task ID as an attribute on the li element
    listItem.setAttribute("data-task-id", task.id);

    // Apply strikethrough style if the task is completed
    if (task.status === "completed") {
        taskText.style.textDecoration = "line-through";
        checkBox.checked = true;
    }
    // Append the li element to the displayTask element
    displayTask.appendChild(listItem);

    // Add an event listener to the checkbox that will call the function when clicked
    checkBox.addEventListener("change", handleCheck);
}

// Function to handle the checkbox click event
function handleCheck(event) {
    // Get the checkbox element from the event object
    let checkbox = event.target;

    // Get the task ID from the parent li element's data-task-id attribute
    let id = checkbox.parentElement.getAttribute("data-task-id");

    // Find the task object in the array with the matching id
    let task = allTasksList.find(element => element.id == id);

    // Update its status in the array based on its checked property
    if (checkbox.checked) {
        task.status = "completed";
    } else {
        task.status = "pending";
    }
    // Call the function to update the task status in the UI
    updateTaskStatus(task);

}

// Define a function that will update the UI with the changed status of a task
function updateTaskStatus(task) {
    // Find all the li elements with the matching id in each section
    let getTask = document.querySelector("[data-task-id='" + task.id + "']");
    if (getTask) {
        // Toggle their text-decoration style based on their status
        if (task.status == "pending") {
            getTask.style.textDecoration = "none";
        } else if (task.status == "completed") {
            getTask.style.textDecoration = "line-through";
        }
    }
    // Update the task status in the allTasksList array
    let updatedTask = allTasksList.find(t => t.id === task.id);
    if (updatedTask) {
        updatedTask.status = task.status;
    } else {
        allTasksList.push(task);
    }
}

function displayTasks(status) {
    // Loop through all task divs and update their display based on the status
    console.log("allTasksList", allTasksList)
    if (allTasksList.length >= 1) {
        allTasksList.forEach(task => {
            const taskDiv = document.querySelector(`[data-task-id="${task.id}"]`);
            if (status === "all" || task.status === status) {
                // Show the task div if status is "all" or it matches the provided status
                taskDiv.style.display = "block";
            } else {
                // Hide the task div if it doesn't match the provided status
                taskDiv.style.display = "none";
            }
        });

    }


}

// Event listener for the filter buttons
allTask.addEventListener("click", () => {
    displayTasks("all");
    if (!allTask.classList.contains("active-filter")) {
        allTask.classList.add("active-filter")
    }

    pendingTask.classList.remove("active-filter");
    completedTask.classList.remove("active-filter");

});


pendingTask.addEventListener("click", () => {
    displayTasks("pending");
    allTask.classList.remove("active-filter");
    pendingTask.classList.add("active-filter");
    completedTask.classList.remove("active-filter");
});

completedTask.addEventListener("click", () => {
    displayTasks("completed");
    allTask.classList.remove("active-filter");
    pendingTask.classList.remove("active-filter");
    completedTask.classList.add("active-filter");
});