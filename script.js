/* Globals */

let taskObj = [];
let addButton = document.querySelector("#addButton");
let noTaskMessage = document.querySelector(".no-tasks-message");
let addSuccess = document.querySelector(".addSuccess");
let addFail = document.querySelector(".addFail");


/* List Out All Tasks */

function listAllTasks() {
    var getTasks = JSON.parse(localStorage.getItem('taskObj'));
    var listOfTasks = document.getElementById("listOfTasks");
    if (localStorage.getItem('taskObj')) {
        listOfTasks.innerHTML = '';
        for (let x = 0; x < getTasks.length; x++) {
            listOfTasks.innerHTML += createTaskListing(x, getTasks[x].id, getTasks[x].name, getTasks[x].taskDue, getTasks[x].important, getTasks[x].completed);
        }

    }  if (listOfTasks.innerHTML === "") {
        listOfTasks.innerHTML = `<li class="list-group-item">
        <div class="row">
          <div class="col">
            <h2><strong class="no-tasks">No Current Tasks</strong></h2>
              <h3>
                Use the form on this page to add/edit a task!
              </h3>
            </p>
          </div>
        </div>
      </li>`;
    }
}

/* Function to create HTML structure for tasks */

function createTaskListing(number, id, name, taskDue, important, completed) {

    if (important) {
        var markImportant = "d-block";
    }

    if (completed) {
        var markCompleted = "d-block";
        var greenAnimation = "completed-green"
    }

    var idx = number;

    var newTask = `<li class="list-group-item task-list-item task${idx} ${greenAnimation}">
    <div class="row">
      <div class="col-7">
        <h3 class="task-info"><strong class="num">No. ${idx + 1} | Task Name: </strong>
          <p class="name">
          ${name}
          </p>
        </h3>
        <h4>Task ID: ${id}</h4>
        <p><strong class="task-due">Due Date: <span>${taskDue}</span></strong>
        </p>
      </div>
      <div class="col-5">
      <div class="d-none is-completed float-right ${markCompleted}"><i class="fas fa-check"></i> Completed!</div>
      <div class="d-none is-important float-right ${markImportant}"><i class="fas fa-exclamation-circle"></i> Important!</div>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <button type="submit" class="btn btn-success btn-complete" onClick="markComplete(${idx})"><i class="far fa-calendar-check"></i> Toggle Completed</button>
        <button type="submit" class="btn btn-warning btn-edit" onClick="editTask(${idx}, ${id})"><i class="far fa-edit"></i> Edit, Re-Add</button>
        <button type="submit" class="btn btn-danger btn-delete-first" onClick="showDelete(${idx})"><i class="far fa-trash-alt"></i> Delete Task</button>
        <button type="submit" class="btn btn-danger btn-delete-second" onClick="deleteTask(${idx})"><i class="far fa-trash-alt"></i> Confirm Delete</button>
      </div>

    </div>
  </li>`;

    return newTask;
}


/* Push new task to list, or edit existing one */

function addTask() {

    var addTaskName = document.querySelector("#add-task .name");
    var addTaskDue = document.querySelector("#add-task .due");
    var addImportant = document.querySelector("#add-task .important");
    var taskID = Math.floor(Math.random() * 20000);
    var dateFormatted = new Date(addTaskDue.value);

    if (addTaskName.value !== '' && addTaskDue.value !== '') {
        if (localStorage.getItem('taskObj')) {
            taskObj = JSON.parse(localStorage.getItem('taskObj'));
        }


        taskObj.push({
            id: taskID,
            name: addTaskName.value,
            taskDue: (dateFormatted.getUTCMonth()+1) + "/" + dateFormatted.getUTCDate() + "/" + dateFormatted.getUTCFullYear(),
            taskDueRaw: addTaskDue.value,
            important: addImportant.checked,
            completed: false
        });
        localStorage.setItem('taskObj', JSON.stringify(taskObj));
        listAllTasks();
        addSuccess.classList.remove("d-none");
        addFail.classList.add("d-none");
        addTaskName.value = "";
        addTaskDue.value = "";
        addImportant.checked = false;
    } else {
        addFail.classList.remove("d-none");
        addSuccess.classList.add("d-none");
    }
}

/* Toggle task as complete */

function markComplete(task) {
    var getTasks = JSON.parse(localStorage.getItem('taskObj'));
    getTasks[task].completed = (getTasks[task].completed === true) ? false : true;
    localStorage.setItem('taskObj', JSON.stringify(getTasks));
    listAllTasks();
}

/* Show the precaution delete button */

function showDelete(task) {
    var btnDeleteFirst = document.getElementsByClassName("btn-delete-first");
    var btnDeleteSecond = document.getElementsByClassName("btn-delete-second");
    btnDeleteFirst[task].style.display = "none";
    btnDeleteSecond[task].style.display = "block";
    document.querySelector(`.task${task}`).classList.remove("completed-green");
    document.querySelector(`.task${task}`).classList.add("deleted");

}

/* Take task back into editor */

function editTask(task, id) {
    var isEditing = id;
    var addTaskName = document.querySelector("#add-task .name");
    var addTaskDue = document.querySelector("#add-task .due");
    var addImportant = document.querySelector("#add-task .important");
    var getTasks = JSON.parse(localStorage.getItem('taskObj'));
    addTaskName.value = getTasks[task].name;
    addTaskDue.value = getTasks[task].taskDueRaw;
    addImportant.checked = getTasks[task].important;

    getTasks.splice(task, 1);
    localStorage.setItem('taskObj', JSON.stringify(getTasks));
    listAllTasks();
}

/* Actually delete a task */

function deleteTask(task) {
   
        var getTasks = JSON.parse(localStorage.getItem('taskObj'));
        getTasks.splice(task, 1);
        localStorage.setItem('taskObj', JSON.stringify(getTasks));
        listAllTasks();
        addSuccess.classList.add("d-none");
    
}

/* Event Listeners */

addButton.addEventListener("click", function (event) {
    event.preventDefault();
    addTask();
});
window.addEventListener("load", listAllTasks);

/* Ryan Koskela 2019 */