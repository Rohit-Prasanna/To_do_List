const todoList = document.getElementById("list");
const remainingText = document.getElementById("remaining-task");
const addButton = document.getElementById("add-btn");

let todos = [];

function updateUI() {
  todoList.innerHTML = "";
  remainingText.textContent = todos.filter(todo => !todo.checked).length;

  todos.forEach(todo => {
    const li = document.createElement("li");
    li.classList.toggle("checked", todo.checked);
    li.innerHTML = `
      <div id="item-ct">
        <div class="topic" id="topic-ct">
          <span>${todo.title}</span>
          <i class="fa-solid ${todo.dropdown ? "fa-circle-chevron-up" : "fa-circle-chevron-down"}" type="button" onclick="toggleDropdown('${todo.id}')"></i>
        
      </div>
        </div>
        <div id="dropdown-ct-${todo.id}" ${todo.dropdown ? "" : "hidden"}>
          <div class="drpbtn"> 
            <span>${todo.date}</span>
            <span>${todo.time}</span>
            <div>
            <i class="fa-solid fa-edit" type="button" onclick="editItem('${todo.id}')"></i>
              <i class="fa-solid fa-check-circle" onclick="checkItem('${todo.id}')"></i>
              <i class="fa-solid fa-trash" onclick="deleteItem('${todo.id}')"></i>
            </div>
          </div>
        </div>  
      </div>
    `;
    todoList.appendChild(li);
  });

  // Store todos in localStorage
  localStorage.setItem("todos", JSON.stringify(todos));
}

function toggleDropdown(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, dropdown: !todo.dropdown };
    }
    return todo;
  });
  updateUI();
}

function deleteItem(id) {
  todos = todos.filter(todo => todo.id !== id);
  updateUI();
}

function checkItem(id) {
  todos = todos.map(todo => {
    if (todo.id === id) {
      return { ...todo, checked: true };
    }
    return todo;
  });
  updateUI();
}

function onAddButtonClicked() {
  const titleInput = document.getElementById("topic");
  const dateInput = document.getElementById("date");
  const timeInput = document.getElementById("time");

  const newTodo = {
    id: Date.now().toString(),
    title: titleInput.value,date: dateInput.value,time: timeInput.value,
    dropdown: false, checked: false
  };

  todos.push(newTodo);
  updateUI();

  // Clear inputs given prior
  titleInput.value = "";
  dateInput.value = "";
  timeInput.value = "";
}

function clearAll() {
  todos = [];
  updateUI();



    // // Remove todos from localStorage
    // localStorage.removeItem("todos");//not needed
  };
  
  // Retrieve todos from localStorage if they exist
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    updateUI();
  }
  

addButton.addEventListener("click", onAddButtonClicked);


  function editItem(id) {
  const todo = todos.find(todo => todo.id === id);
  const newTitle = prompt("Enter new title", todo.title);
  const newDate = prompt("Enter new date", todo.date);
  const newTime = prompt("Enter new time", todo.time);

  if (newTitle !== null) {
    todo.title = newTitle;
    todo.date = newDate;
    todo.time = newTime;
    updateUI();
  }
}
