function main() {
  addEventWhenUserAddsTask();
}
main();

function whenUserAddsTask() {
  // make sure the input value has something
  const taskName = getInputEl().value.trim();

  const taskNameValido = taskName.length > 0;
  if (!taskNameValido) {
    alert("Assicurati che il nome del task sia non vuoto.");
    return;
  }

  // empty the input value
  getInputEl().value = "";
  // get input value
  // add the input value as task item
  addTask(taskName);
}

function whenUserClicksTaskItemToggleCompleted(ev) {
  const taskItem = ev.currentTarget;
  //  toggle the task completed or not
  toggleTaskCompletato(taskItem);
}

function whenUserClicksRemoveTaskItem(ev) {
  // to get the task item, go up to the parent (list item)
  const removeEl = ev.target;
  const taskItem = removeEl.closest("li");
  // remove the task list item
  taskItem.remove();
}

function toggleTaskCompletato(taskItem) {
  const classCompletato = "task-completato";
  // task item is completed?
  const isCompleted = taskItem.classList.contains(classCompletato);
  // toggle mechanism
  if (isCompleted) {
    taskItem.classList.remove(classCompletato);
  } else {
    taskItem.classList.add(classCompletato);
  }
}

function addTask(taskName) {
  const taskItem = createTaskItem(taskName);
  getTaskList().appendChild(taskItem);
}

function createTaskItem(taskName) {
  // create elements
  const el = document.createElement("li");
  const textEl = document.createElement("span");
  const removeEl = document.createElement("button");
  // fill elements
  textEl.innerText = taskName;
  textEl.addEventListener("click", whenUserClicksTaskItemToggleCompleted);

  removeEl.innerHTML = `<i class="fas fa-trash"></i>`;
  removeEl.addEventListener("click", whenUserClicksRemoveTaskItem);
  removeEl.classList.add("btn-remove-task-item");

  // add elements
  el.appendChild(textEl);
  el.appendChild(removeEl);
  return el;
}

// UI ELEMENTS

function getAddTaskBtnEl() {
  return document.getElementById("add-task");
}

function getInputEl() {
  return document.querySelector(".input-container > input");
}

function getTaskList() {
  return document.querySelector(".output-container > ul");
}

function addEventWhenUserAddsTask() {
  window.addEventListener("load", () => {
    // add event: when user clicks add button
    getAddTaskBtnEl().addEventListener("click", whenUserAddsTask);
    // add event: when user enters
    getInputEl().addEventListener("keyup", (ev) => {
      // check that the user used the enter key
      const key = ev.key;
      const isEnter = key === "Enter";
      if (isEnter) {
        whenUserAddsTask();
      }
    });
  });
}
