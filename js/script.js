const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const deleteAllBtn = document.getElementById("delete-all-button");

const alertMessage = document.getElementById("alert-message");
// const table = document.querySelector("table");
// const tbody = document.querySelector("tbody");

const todos = JSON.parse(localStorage.getItem("todos")) || [];

console.log(todos);
const generateId = () => {
  return Math.round(
    Math.random() * Math.random() * Math.pow(10, 15).toString()
  );
};

const showAlert = (message, type) => {
  alertMessage.innerHTML = "";
  const alert = document.createElement("p");
  alert.innerText = message;
  alert.classList.add("alert");
  alert.classList.add(`alert-${type}`);
  alertMessage.append(alert);

  setTimeout(() => {
    alert.style.display = "none";
  }, 2000);
};

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const addHandler = () => {
  const task = taskInput.value;
  const date = dateInput.value;
  const todo = {
    id: generateId(),
    completed: false,
    task,
    date,
  };

  if (task) {
    todos.push(todo);
    saveToLocalStorage();
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
    showAlert("Task added successfully", "success");
  } else {
    showAlert("Please add a task", "error");
  }
};

addButton.addEventListener("click", addHandler);
