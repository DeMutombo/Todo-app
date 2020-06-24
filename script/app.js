// Selectors
const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const notification = document.getElementById("notification");

// Event Listeners
todoButton.addEventListener("click", addTodo);

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
    trashButton.addEventListener("click", deleteBtn);
    completedButton.addEventListener("click", checkTask);

    // Functions
    // Delete function
    function deleteBtn() {
      console.log("Button clicked");
      todoDiv.parentNode.removeChild(todoDiv);
    }
  }
}

// Delete Button Function
