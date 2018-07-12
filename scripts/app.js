// UI variables
const UIform = document.querySelector('form');
const UItask = document.querySelector('#task');
const UItaskList = document.querySelector('.collection');
const UIclearBtn = document.querySelector('.clear-tasks');
const UIfilter = document.querySelector('#filter');
const UIgreenAlert = document.querySelector('.green-alert');

loadEventListeners();

// load event listeners
function loadEventListeners() {
  // Add task Event
  UIform.addEventListener('submit', addTask);
  // Remove Task Event 
  UItaskList.addEventListener('click', removeTask);
}

// addTask function
function addTask(e) {
  if (UItask.value === '' || parseInt(UItask.value) < 0) {
    timeFun(UIgreenAlert, 'Please Enter A Valid Task', 'tomato', 3000);
  } else {
    const li = document.createElement('li');
    li.classList.add('created-list');
    li.appendChild(document.createTextNode(UItask.value));
    const xyDiv = document.createElement('div');
    const xIcon = document.createElement('span');
    const yIcon = document.createElement('span');
    xyDiv.classList.add('xy-div');
    xIcon.classList.add('x-icon');
    yIcon.classList.add('y-icon');
    xyDiv.appendChild(xIcon);
    xyDiv.appendChild(yIcon);
    li.appendChild(xyDiv);
    // li.appendChild(xIcon);
    // li.appendChild(yIcon);
    UItaskList.appendChild(li);
  }
  UItask.value = '';
  e.preventDefault();
}

function removeTask(e) {
  if (e.target.parentElement.classList.contains('xy-div')) {
    e.target.parentElement.parentElement.remove();
  }
}


function timeFun(UIelement, message, color, time) {
  UIelement.innerText = message;
  UIelement.style.backgroundColor = color;
  UIelement.classList.add('green-alert-on');
  setTimeout(() => {
    UIelement.classList.remove('green-alert-on');
  }, time);
}