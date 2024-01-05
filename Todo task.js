let todoItemsContainer = document.getElementById("todoItemsContainer");
let AddTodoButtonEl = document.getElementById('AddTodoButton');
let SaveTodoButton = document.getElementById('SaveTodoButton');

function getTodoListFromLocalstorage() {
    let stringifiedTodoList = localStorage.getItem('profiledetails');
    let parsedTodoList = JSON.parse(stringifiedTodoList);
    if (parsedTodoList === null) {
        return [];
    } else {
        return parsedTodoList;
    }
}

let todolist = getTodoListFromLocalstorage();
let todosCount = todolist.length;

SaveTodoButton.onclick = function() {
    localStorage.setItem('profiledetails', JSON.stringify(todolist));
}

function OnTodoStatusChange(checkboxId, labelId, todoId) {
    let checkboxElement = document.getElementById(checkboxId);
    let labelElement = document.getElementById(labelId);
    labelElement.classList.toggle('text-decoration');

    let TodoObjectIndex = todolist.findIndex(function(eachTodo) {
        let eachTodoId = 'todo' + eachTodo.uniqueno;
        if (eachTodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })
    let TodoObject = todolist[TodoObjectIndex];
    if (TodoObject.isChecked === true) {
        TodoObject.isChecked = false;
    } else {
        TodoObject.isChecked = true;
    }
}

function OnDeleteTodo(todoId) {
    let todoElement = document.getElementById(todoId);
    todoItemsContainer.removeChild(todoElement);

    let DeleteIndex = todolist.findIndex(function(eachtodo) {
        let eachtodoId = 'todo' + eachtodo.uniqueno;
        if (eachtodoId === todoId) {
            return true;
        } else {
            return false;
        }
    })
    todolist.splice(DeleteIndex, 1);
}


function CreatetodoList(todo) {
    let checkboxId = "checkboxInput" + todo.uniqueno;
    let labelId = "label" + todo.uniqueno;
    let todoId = 'todo' + todo.uniqueno;

    let todoElement = document.createElement("li");
    todoElement.id = todoId;
    todoElement.classList.add("todo-item-container", "d-flex", "flex-row");
    todoItemsContainer.appendChild(todoElement);

    let inputElement = document.createElement("input");
    inputElement.type = "checkbox";
    inputElement.id = checkboxId;

    inputElement.onclick = function() {
        OnTodoStatusChange(checkboxId, labelId, todoId);
    };

    inputElement.classList.add("checkbox-input");
    inputElement.checked = todo.isChecked;
    todoElement.appendChild(inputElement);

    let labelContainer = document.createElement("div");
    labelContainer.classList.add("d-flex", "flex-row", "label-container");
    todoElement.appendChild(labelContainer);

    let labelElement = document.createElement("label");
    labelElement.setAttribute('for', checkboxId);
    labelElement.classList.add('checkbox-label');
    labelElement.id = labelId;
    labelElement.textContent = todo.text;
    if (todo.isChecked === true) {
        labelElement.classList.add('text-decoration');
    }
    labelContainer.appendChild(labelElement);

    let deleteContainer = document.createElement('div');
    deleteContainer.classList.add('delete-icon-container');
    labelContainer.appendChild(deleteContainer);

    let deleteIcon = document.createElement('i');
    deleteIcon.classList.add('delete-icon', 'far', 'fa-trash-alt');

    deleteIcon.onclick = function() {
        OnDeleteTodo(todoId);
    };

    deleteContainer.appendChild(deleteIcon);
}

function onAddTodo() {
    let userInputElement = document.getElementById('todoUserInput');
    let userInputvalue = userInputElement.value;
    if (userInputvalue === '') {
        alert('Enter valid input');
        return;
    }
    todosCount = todosCount + 1;
    let newTodo = {
        text: userInputvalue,
        uniqueno: todosCount,
        isChecked: false
    };

    CreatetodoList(newTodo);
    todolist.push(newTodo);
    userInputElement.value = '';
}

AddTodoButtonEl.onclick = function() {
    onAddTodo();
}


for (let todo of todolist) {
    CreatetodoList(todo);
}