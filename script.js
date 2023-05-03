const addTodo = function(todo) {
    const isHidden = todo.dropdown ? "" : "hidden";
    const isChecked = todo.checked ? "checked" : "";
    const dropdownIcon = todo.dropdown ? "fa-solid fa-circle-chevron-up" : "fa-solid fa-circle-chevron-down";
    const rawhtml = `
      <div id="item-ct" >
        <div class="topic" id="topic-ct">
          <span>${todo.title}</span>
          <i class="${dropdownIcon}" type="button" onclick ="toggleDropdown(\'${todo.title}\')"></i>
        </div>
        <div id="dropdown-ct" ${isHidden}>
          <div class="drpbtn"> 
            <span>${todo.date}</span>
            <span>${todo.time}</span>
            <div>
              <i class="fa-solid fa-check-circle"  onclick = "checkItem(\'${todo.title}\')"s></i>
              <i class="fa-solid fa-trash" onclick = "deleteItem(\'${todo.title}\')"></i>
            </div>
          </div>
        </div>  
      </div>
    `;
    var ul = document.getElementById("list");
    var li = document.createElement("li");
    li.className = isChecked;
    li.innerHTML = rawhtml;
    ul.appendChild(li);
  };
  
  const generateTodo = function(todos) {
    const list = document.getElementById("list");
    list.innerHTML = "";
    remainingText.innerHTML = todos.filter(todo => !todo.checked).length;
    todos.forEach(todo => {
      addTodo(todo);
    });
    
    // Store todos in localStorage
    localStorage.setItem("todos", JSON.stringify(todos));
  };
  
  var remainingTask = 0;
  var todos = [];
  const remainingText = document.getElementById("remaining-task");
  
  const toggleDropdown = function(title) {
    todos = todos.map(item => {
      if (item.title === title) {
        return {...item, dropdown: !item.dropdown};
      }
      return item;
    });
    generateTodo(todos);
  };
  
  const deleteItem = function(title) {
    todos = todos.filter(value => value.title != title);
    generateTodo(todos);
  };
  
  const checkItem = function(title) {
    todos = todos.map(item => {
      if (item.title === title) {
        return {...item, checked: true};
      }
      return item;
    });
    generateTodo(todos);
  };
  
  const onAddbtnclicked = function() {
    const titletxt = document.getElementById("topic");
    const datetxt = document.getElementById("date");
    const timetxt = document.getElementById("time");
    todos.push({title: titletxt.value, date: datetxt.value, time: timetxt.value, dropdown: false, checked: false});
    generateTodo(todos);
  };
  
  const clearAll = function() {
    const list = document.getElementById("list");
    list.innerHTML = "";
    todos = [];
    remainingText.innerHTML = 0;
    
    // Remove todos from localStorage
    localStorage.removeItem("todos");
  };
  
  // Retrieve todos from localStorage if they exist
  const storedTodos = localStorage.getItem("todos");
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    generateTodo(todos);
  }
  
  const addButton = document.getElementById("add-btn");
  addButton.addEventListener("click", onAddbtnclicked);
  


    