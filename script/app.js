// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const notification = document.getElementById("notification");
const todoFilter = document.querySelector(".filter-todo");
// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
todoFilter.addEventListener("click", filterTodo);

//Functions
function addTodo(event) {
  event.preventDefault();
  if (todoInput.value === "") {
    notification.innerHTML = " You cant add an empty task";
  } else {
    // Todo DIV
    notification.innerHTML = "";
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");

    // add a div or append a div to the todo div
    todoDiv.appendChild(newTodo);

    //Add todo to local storage
    saveLocalTodos(todoInput.value);
    // Check completion button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Delete completion button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append To List
    todoList.appendChild(todoDiv);

    // Clear the input field
    todoInput.value = "";
    //  eventListeners
    // trashButton.addEventListener("click", deleteBtn);
    completedButton.addEventListener("click", checkTask);

    // Check complete function
    function checkTask() {
      if (newTodo.classList.contains("completed")) {
        newTodo.classList.remove("completed");
      } else {
        console.log("Checked task");
        newTodo.classList.add("completed");
      }
    }
  }
}

// Delete and check completion
function deleteCheck(e) {
  const item = e.target;
  const todo = item.parentElement;

  if (item.classList[0] === "trash-btn") {
    todo.classList.add("remove-out");
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }
  if (item.classList[0] === "complete-btn") {
    todo.classList.toggle("completed");
  }
}

// Filtering the todo
function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";

        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;

      case "incomplete":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
    }
  });
}

function saveLocalTodos(todo) {
  // check for already saved todos
  let todos;
  todos = checkLocalTodo(todos);
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
  let todos;
  todos = checkLocalTodo(todos);
  todos.forEach((todo) => {
    // notification.innerHTML =
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = todo;
    newTodo.classList.add("todo-item");

    // add a div or append a div to the todo div
    todoDiv.appendChild(newTodo);

    // Check completion button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    // Delete completion button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    //append To List
    todoList.appendChild(todoDiv);
  });
}

function checkLocalTodo(todos) {
  if (localStorage.getItem("todos") === null) {
    console.log("There is no todo so we create and empty arry");
    todos = [];
  } else {
    // get the stored todo and save it into the todo array
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  return todos;
}
