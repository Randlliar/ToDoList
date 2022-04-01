const input = document.getElementById('input');
const btn = document.getElementById('btn');
const result = document.getElementById('result');

let todoItems = [];

document.addEventListener("DOMContentLoaded", function () {
  initApp();
});

function initApp() {
  getFromLocalStorage();
}

btn.addEventListener('click', () => {
  if (!input.value) {
    return;
  }

  const newItem = {
    id: Date.now(),
    value: input.value,
    date: new Date(),
    isCompleted: false,
  };

  todoItems.push(newItem);
  input.value = '';
  updateLocalStorage();
  drawItem(newItem);
});

function drawItem(newItem) {
  const li = document.createElement('li');
  li.classList.add('todo__item');
  li.setAttribute('id', `todo_${newItem.id}__wrapper`);
  li.classList.add('assigned');

  const span = document.createElement('span');
  span.classList.add('todo__span');
  span.innerText = `${newItem.date.getDate()}-${newItem.date.getMonth()}-${newItem.date.getFullYear()}`;

  const checkbox = document.createElement('input');
  checkbox.classList.add('check__box');
  checkbox.setAttribute('type', 'checkbox')
  checkbox.addEventListener('click', () => changeTaskStatus(newItem.id));

  const text = document.createElement('span');
  text.classList.add('todo__text');
  text.innerText = newItem.value;
  text.setAttribute('id', `todo_${newItem.id}__text`);

  const buttonDelete = document.createElement('input',);
  buttonDelete.classList.add('btn', 'btn__red');
  buttonDelete.setAttribute('value', 'delete');
  buttonDelete.setAttribute('type', 'submit');
  buttonDelete.addEventListener('click', () => {
    deleteItem(newItem.id);
  });

  li.append(span);
  li.append(text);
  li.append(checkbox);
  li.append(buttonDelete);

  result.append(li);
}

function deleteItem(id) {
  const findElement = document.getElementById(`todo_${id}__wrapper`);
  findElement.remove();
  todoItems = todoItems.filter((item) => item.id !== id);
  updateLocalStorage();
}

function changeTaskStatus(id) {
  const todoItemIndex = todoItems.findIndex((todoItem) => todoItem.id === id);

  if (todoItemIndex < 0) {
    return;
  }

  const todoItem = todoItems[todoItemIndex];
  todoItem.isCompleted = !todoItem.isCompleted;

  const wrapper = document.getElementById(`todo_${todoItem.id}__text`);

  if (todoItem.isCompleted) {
    wrapper.classList.add('completed');
    wrapper.classList.remove('assigned');
  } else {
    wrapper.classList.add('assigned');
    wrapper.classList.remove('completed');
  }
  updateLocalStorage();
}

function updateLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todoItems));
}

function getFromLocalStorage() {
  let savedTodoItems = localStorage.getItem('todos');
  if (savedTodoItems) {
    todoItems = JSON.parse(savedTodoItems);
  }

  todoItems.forEach((item) => {
    item.date = new Date(item.date);
    drawItem(item);
  });
}

