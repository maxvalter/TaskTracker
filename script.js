import { initializeDummyTasks } from "./dummyTasks.js";


document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");
  const input = form.querySelector("input[type='text']");
  const list = document.querySelector(".list");
  let taskIndex = 0; // Counter to assign unique IDs to tasks

  // Initialize form submission listener
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent form submission
    handleFormSubmit(input, list, taskIndex++);
  });

  // Add some dummy tasks on initialization
  initializeDummyTasks(list, taskIndex, createTaskElement);
});

// Handle form submission
function handleFormSubmit(input, list, taskIndex) {
  const taskDescription = input.value.trim();
  if (taskDescription === "") {
    alert("Task description cannot be empty!");
    return;
  }

  const taskElem = createTaskElement(taskDescription, taskIndex);
  list.appendChild(taskElem);

  // Clear the input field
  input.value = "";
}

// Create a new task element
function createTaskElement(taskDescription, taskIndex) {
  const taskElem = document.createElement("div");
  taskElem.classList.add("elem-unfinished");
  taskElem.setAttribute("data-task-index", taskIndex); // Assign unique task index

  const toggleFinished = createToggleFinished(taskElem);
  const taskText = createTaskText(taskDescription);
  const eraseButton = createEraseButton(taskElem);

  // Append elements to the task element
  taskElem.appendChild(toggleFinished);
  taskElem.appendChild(taskText);
  taskElem.appendChild(eraseButton);

  return taskElem;
}

function createToggleFinished(taskElem) {
  const toggleFinished = document.createElement("div");
  toggleFinished.classList.add("toggle-finished");

  toggleFinished.addEventListener("click", () => {
    const list = taskElem.parentNode;

    if (!list) {
      console.error("The list is null or undefined.");
      return;
    }

    handleTaskAnimation(taskElem, () => {
      toggleTaskCompletion(taskElem, toggleFinished);
    });
  });

  return toggleFinished;
}

// Handle the animation for toggling tasks
function handleTaskAnimation(taskElem, callback) {
  taskElem.classList.add("moving");

  // Wait for the animation to complete before executing the callback
  setTimeout(() => {
    callback();
    taskElem.classList.remove("moving");
  }, 300); // Match the duration of the CSS transition (0.3s)
}

// Toggle the completion state of a task
function toggleTaskCompletion(taskElem, toggleFinished) {
  if (taskElem.classList.contains("completed")) {
    // Task is being toggled back to unfinished
    taskElem.classList.remove("completed");
    toggleFinished.classList.remove("completed");
  } else {
    // Task is being marked as completed
    taskElem.classList.add("completed");
    toggleFinished.classList.add("completed");
  }
}

// Sort tasks by their index, keeping unfinished tasks above completed ones
function sortTasksByIndex(list) {
  const tasks = Array.from(list.children);

  tasks.sort((a, b) => {
    const isCompletedA = a.classList.contains("completed");
    const isCompletedB = b.classList.contains("completed");

    if (isCompletedA !== isCompletedB) {
      // Unfinished tasks come before completed tasks
      return isCompletedA ? 1 : -1;
    }

    // If both tasks are in the same category, sort by task index in descending order
    const indexA = parseInt(a.getAttribute("data-task-index"), 10);
    const indexB = parseInt(b.getAttribute("data-task-index"), 10);
    return indexB - indexA; // Higher index (newer tasks) appear first
  });

  // Reorder the tasks in the list
  tasks.forEach((task) => list.appendChild(task));
}

// Create the task text element
function createTaskText(taskDescription) {
  const taskText = document.createElement("p");
  taskText.textContent = taskDescription;
  return taskText;
}

// Create the erase button
function createEraseButton(taskElem) {
  const eraseButton = document.createElement("button");
  eraseButton.classList.add("erase");
  eraseButton.type = "button";

  eraseButton.addEventListener("click", () => {
    taskElem.remove();
  });

  return eraseButton;
}