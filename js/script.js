const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoCompleted = document.querySelector('.todo-completed');

let toDoData = [];

const render = function() {
  todoList.innerHTML = '';
  todoCompleted.innerHTML = '';
  toDoData.forEach(function (item) {
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.text + '</span>' +
    '<div class="todo-buttons">' +
		'<button class="todo-remove"></button>' +
		'<button class="todo-complete"></button>'+
		'</div>';
    if(item.completed) {
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }
    li.querySelector('.todo-complete').addEventListener('click', function() {
      item.completed = !item.completed;
      render();
    });
    li.querySelector('.todo-remove').addEventListener('click', function() {
      const textTodo = li.querySelector('.text-todo');
      const result = toDoData.findIndex((item) => item.text === textTodo.textContent);
      toDoData.splice(result, 1);
      li.remove();
      localStorage.setItem('toDoData', JSON.stringify(toDoData));
    });
  });
  localStorage.setItem('toDoData', JSON.stringify(toDoData));
};

todoControl.addEventListener('submit', function (event) {
  event.preventDefault();

  const newToDO = {
    text: headerInput.value,
    completed: false,
  };

  if (headerInput.value !== '') {
    toDoData.push(newToDO);
    headerInput.value = '';
    render();
  }
  
});

if (localStorage.getItem('toDoData') !== null) {
  toDoData = JSON.parse(localStorage.getItem('toDoData'));
  render(toDoData);
}
