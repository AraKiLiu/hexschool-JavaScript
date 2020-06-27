var newTodo = document.getElementById('newTodo');
var addList = document.getElementById('addTodo');
var clearTask = document.getElementById('clearTask');
var todoList = document.getElementById('todoList');
var taskCount = document.getElementById('taskCount');

addList.addEventListener('click', addTodoList);
clearTask.addEventListener('click', clearList);
todoList.addEventListener('click', editItem);

var todoData = [];

// 當程式收到新增按鈕按下，將代辦事項欄位中的內容傳遞至strNewTodo，再依照時間產生id，要是newTodo不是空值，就將資料推送至todoData陣列，並重新渲染todoList清單，再將代辦事項欄位清空。
function addTodoList() {
  var strNewTodo = newTodo.value.trim();
  var timeStamp = Math.floor(Date.now());
  if (newTodo.value !== '') {
    todoData.push({
      id: timeStamp,
      title: strNewTodo,
      done: false,
    });
    render(todoData);
    newTodo.value = '';
  }
}

// 將點選todolist的動作集中，抓取Html中data-action的設定名稱，回存於dataAction，抓取Html中data-id的設定名稱，回存於id，再用dataAction來判斷，現在點擊到的物體，並將id回到對應的方法。
function editItem(e) {
  var dataAction = e.target.dataset.action;
  var id = e.target.dataset.id;
  if (dataAction == 'remove') {
    removeItem(id);
  } else if (dataAction === 'complete') {
    checkItem(id);
  }
}

// 創建一個todoIndex，從todoData陣列中根據現在選擇的項目依照id收尋，找出位於陣列中的index，定存入todoIndex，再將todoData陣列中todoIndex位置的直刪除，重新渲染todoList清單。
function removeItem(id) {
  var todoIndex = 0;
  todoData.forEach(function (item, index) {
    if (id == item.id) {
      todoIndex = index;
    }
  });
  todoData.splice(todoIndex, 1);
  render(todoData);
}

// 從todoData陣列中根據現在選擇的項目依照id收尋，要是id相同就將其ccheckBox反向，重新渲染todoList清單。
function checkItem(id) {
  todoData.forEach(function (item, index) {
    if (id == item.id) {
      item.done = !item.done;
    }
  });
  render(todoData);
}

// 清除todoData資料後，重新渲染todoList清單。
// e.preventDefault()取消事件的預設行為
function clearList(e) {
  e.preventDefault();
  todoData = [];
  render(todoData);
}

// 重新渲染List列表的方法。
function render(data) {
  var str = '';
  todoData.forEach(function (item) {
    str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check">
<input type="checkbox" class="form-check-input" ${
      item.done ? "checked" : ""
    } data-action="complete" data-id="${item.id}">
<label class="form-check-label ${
      item.done ? "completed" : ""
    }" data-action="complete" data-id="${item.id}"> ${item.title}</label>
</div>
<button type="button" class="close ml-auto" aria-label="Close">
<span aria-hidden="true" data-action="remove" data-id="${
      item.id
    }">&times;</span>
</button>
</div>
</li>`;
  });
  todoList.innerHTML = str;
  taskCount.textContent = data.length;
}