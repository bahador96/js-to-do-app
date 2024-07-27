const taskInput = document.getElementById("task-input");
const dateInput = document.getElementById("date-input");
const addButton = document.getElementById("add-button");
const deleteAllBtn = document.getElementById("delete-all-button");
const alertMessage = document.getElementById("alert-message");
const todoBody = document.querySelector("tbody");

let todos = JSON.parse(localStorage.getItem("todos")) || [];

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

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

const displayTodos = () => {
  todoBody.innerHTML = "";
  if (!todos.length) {
    todoBody.innerHTML = "<tr><td colspan='4'>No tasks added</td></tr>";
    return;
  }

  todos.forEach((todo) => {
    todoBody.innerHTML += `
    <tr>
    <td>${todo.task}</td>
    <td>${todo.date || "No date"}</td>
    <td>${todo.completed ? "Completed" : "Pending"}</td>
    <td>
    <button>Edit</button>
    <button>Do</button>
    <button>Delete</button>
    </td>
    </tr>
    `;
  });
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
    displayTodos();
    taskInput.value = "";
    dateInput.value = "";
    console.log(todos);
    showAlert("Task added successfully", "success");
  } else {
    showAlert("Please add a task", "error");
  }
};

deleteAllHandler = () => {
  if (!todos.length) {
    showAlert("No tasks to delete", "error");
    return;
  }
  todos = [];
  saveToLocalStorage();
  displayTodos();
  showAlert("All tasks deleted successfully", "success");
};

window.addEventListener("load", displayTodos);

addButton.addEventListener("click", addHandler);

deleteAllBtn.addEventListener("click", deleteAllHandler);
