// UI variables
const UIform = document.querySelector('form');
const UItask = document.querySelector('#task');
const UItaskList = document.querySelector('.collection');
const UIclearBtn = document.querySelector('.clear-tasks');
const UIfilter = document.querySelector('#filter');
const UIredAlert = document.querySelector('.alert-red');
const UIgreenAlert = document.querySelector('.alert-green');

loadEventListeners();

// load event listeners
function loadEventListeners() {
  // DOM load Event
  document.addEventListener('DOMContentLoaded', getTasks);
  // Add task Event
  UIform.addEventListener('submit', addTask);
  // Remove Task Event 
  UItaskList.addEventListener('click', removeTask);
  // Remove all Tasks
  UIclearBtn.addEventListener('click', clearTasks);
  // filter tasks
  UIfilter.addEventListener('keyup', filterTasks);
}

// get tasks from LS 
function getTasks() {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach((task) => {
    createTask(task);
  });
}

// addTask function
function addTask(e) {
  if (UItask.value === '' || parseInt(UItask.value) < 0) {
    timeFun(UIredAlert, 'Please Enter A Valid Task', 'tomato', 3000);
  } else {
    createTask(UItask.value);
    // add task to local storage
    storeTaskInLocalStorage(UItask.value);
  }
  UItask.value = '';
  e.preventDefault();
}

function createTask (value){
  const li = document.createElement('li');
    li.classList.add('created-list');
    li.appendChild(document.createTextNode(value));
    const xyDiv = document.createElement('div');
    const xIcon = document.createElement('span');
    const yIcon = document.createElement('span');
    xyDiv.classList.add('xy-div');
    xIcon.classList.add('x-icon');
    yIcon.classList.add('y-icon');
    xyDiv.appendChild(xIcon);
    xyDiv.appendChild(yIcon);
    li.appendChild(xyDiv);
    UItaskList.appendChild(li);
}

function storeTaskInLocalStorage(task) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('xy-div')) {
    e.target.parentElement.parentElement.remove();
    let tasks;
    if (localStorage.getItem('tasks') === null) {
      tasks = [];
    } else {
      tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach((task, index) => {
      if (e.target.parentElement.parentElement.innerText === task) {
        tasks.splice(index, 1);
      }
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }
}

function clearTasks() {
  if (UItaskList.innerHTML === '') {
    timeFun(UIgreenAlert, 'Please enter task first', 'teal', 3000);
  } else {
    if (confirm('Are You Sure!')) {
      UItaskList.innerHTML = '';
      localStorage.clear();
    }
  }
}
// filter tasks
function filterTasks(e) {
  const text = e.target.value.toLowerCase();
  document.querySelectorAll('.created-list').forEach((list) => {
    if(list.innerText.toLowerCase().indexOf(text) !== -1) {
      list.style.display = 'flex';
    } else {
      list.style.display = 'none';
    }
  });
  console.log(text);
}


function timeFun(UIelement, message, color, time) {
  UIelement.innerText = message;
  UIelement.style.backgroundColor = color;
  UIelement.classList.add('alert-on');
  setTimeout(() => {
    UIelement.classList.remove('alert-on');
  }, time);
}