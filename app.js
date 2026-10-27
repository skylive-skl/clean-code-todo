const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('#new-task + button');
const todoList = document.getElementById('todo-tasks');
const completedList = document.getElementById('completed-tasks');

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');

  const checkbox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editButton = document.createElement('button');

  const deleteButton = document.createElement('button');
  const deleteIcon = document.createElement('img');

  //innerText, not innerHTML: task text comes from user.
  label.innerText = taskText;
  label.className = 'task';

  checkbox.type = 'checkbox';
  editInput.type = 'text';
  editInput.className = 'task';

  editButton.innerText = 'Edit';
  editButton.className = 'edit';

  deleteButton.className = 'delete';
  deleteIcon.src = './remove.svg';
  deleteButton.appendChild(deleteIcon);

  listItem.appendChild(checkbox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!taskInput.value) return;
  const listItem = createTaskElement(taskInput.value);

  appendTaskToList(listItem, todoList, completeTask);

  taskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;

  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label');
  const editButton = listItem.querySelector('.edit');
  const isEditing = listItem.classList.contains('editMode');
  if (isEditing) {
    label.innerText = editInput.value;
    editButton.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editButton.innerText = 'Save';
  }

  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const list = listItem.parentNode;
  list.removeChild(listItem);
};

//Each list needs its own checkbox handler.
const appendTaskToList = function (listItem, list, onCheckboxChange) {
  list.appendChild(listItem);
  bindTaskEvents(listItem, onCheckboxChange);
};

const completeTask = function () {
  appendTaskToList(this.parentNode, completedList, reopenTask);
};

const reopenTask = function () {
  appendTaskToList(this.parentNode, todoList, completeTask);
};

addButton.addEventListener('click', addTask);

const bindTaskEvents = function (listItem, onCheckboxChange) {
  const checkbox = listItem.querySelector('input[type=checkbox]');
  const editButton = listItem.querySelector('button.edit');
  const deleteButton = listItem.querySelector('button.delete');

  //Not addEventListener: moved task must lose its old handler.
  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkbox.onchange = onCheckboxChange;
};

const bindListEvents = function (list, onCheckboxChange) {
  for (const listItem of list.children) {
    bindTaskEvents(listItem, onCheckboxChange);
  }
};

bindListEvents(todoList, completeTask);
bindListEvents(completedList, reopenTask);
