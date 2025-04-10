export function initializeDummyTasks(list, taskIndex, createTaskElement) {
    const dummyTasks = [
      "Buy groceries",
      "Complete project report",
      "Call the plumber",
      "Schedule a meeting",
      "Read a book"
    ];
  
    dummyTasks.forEach((taskDescription) => {
      const taskElem = createTaskElement(taskDescription, taskIndex++);
      list.appendChild(taskElem);
    });
  }