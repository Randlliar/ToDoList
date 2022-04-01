const input = document.getElementById('input');
const btn = document.getElementById('btn');
const result = document.getElementById('result');

let todoItems = [];
let li;
let span;
let checkbox;
let text;
let buttonDelete;
let findElement;
let todoItemIndex;
let todoItem;
let wrapper;

document.addEventListener('DOMContentLoaded', function () {
  initApp();
});

const initApp = () => {
  getFromLocalStorage();
};

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

const drawItem = (newItem) => {
  li = document.createElement('li');
  li.classList.add('todo__item');
  li.setAttribute('id', `todo_${newItem.id}__wrapper`);
  li.classList.add('assigned');

  span = document.createElement('span');
  span.classList.add('todo__span');
  span.innerText = `${newItem.date.getDate()}-${newItem.date.getMonth() + 1}-${newItem.date.getFullYear()}`;

  checkbox = document.createElement('input');
  checkbox.classList.add('check__box');
  checkbox.setAttribute('type', 'checkbox')
  if (newItem.isCompleted) {
    checkbox.setAttribute('checked', newItem.isCompleted);
  }
  checkbox.addEventListener('click', () => changeTaskStatus(newItem.id));
  console.log(newItem.isCompleted);

  text = document.createElement('span');
  text.classList.add('todo__text');
  text.innerText = newItem.value;
  if (newItem.isCompleted) {
    text.classList.add('completed');
    text.classList.remove('assigned');
  } else {
    text.classList.add('assigned');
    text.classList.remove('completed');
  }
  text.setAttribute('id', `todo_${newItem.id}__text`);

  buttonDelete = document.createElement('input');
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

const deleteItem = (id) => {
  findElement = document.getElementById(`todo_${id}__wrapper`);
  findElement.remove();
  todoItems = todoItems.filter((item) => item.id !== id);
  updateLocalStorage();
}

const changeTaskStatus = (id) => {
  todoItemIndex = todoItems.findIndex((todoItem) => todoItem.id === id);

  if (todoItemIndex < 0) {
    return;
  }

  todoItem = todoItems[todoItemIndex];
  todoItem.isCompleted = !todoItem.isCompleted;
  wrapper = document.getElementById(`todo_${todoItem.id}__text`);

  if (todoItem.isCompleted) {
    wrapper.classList.add('completed');
    wrapper.classList.remove('assigned');
  } else {
    wrapper.classList.add('assigned');
    wrapper.classList.remove('completed');
  }

  updateLocalStorage();
};

const updateLocalStorage = () => {
  localStorage.setItem('todos', JSON.stringify(todoItems));
};

const getFromLocalStorage = () => {
  let savedTodoItems = localStorage.getItem('todos');
  if (savedTodoItems) {
    todoItems = JSON.parse(savedTodoItems);
  }

  todoItems.forEach((item) => {
    item.date = new Date(item.date);
    drawItem(item);
  });
};

