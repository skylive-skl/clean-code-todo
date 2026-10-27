const taskInput = document.getElementById('new-task');
const addButton = document.querySelector('#new-task + button');
const todoList = document.getElementById('todo-tasks');
const completedList = document.getElementById('completed-tasks');

const createElement = function (tagName, properties) {
  return Object.assign(document.createElement(tagName), properties);
};

const createDeleteButton = function () {
  const deleteButton = createElement('button', { className: 'delete' });
  deleteButton.appendChild(createElement('img', { src: './remove.svg' }));
  return deleteButton;
};

const createTaskElement = function (taskText) {
  const listItem = document.createElement('li');
  listItem.append(
    createElement('input', { type: 'checkbox' }),
    //innerText, not innerHTML: task text comes from user.
    createElement('label', { className: 'task', innerText: taskText }),
    createElement('input', { type: 'text', className: 'task' }),
    createElement('button', { className: 'edit', innerText: 'Edit' }),
    createDeleteButton(),
  );
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
