import "./dialog.css"
import {Task , Project, projects} from "./logic.js"
import { renderProject, createProjectElement, createOptions } from "./dom.js"
import { renderView } from "./index.js";


let taskBeingEdited = null; // null → for add | otherwise > for edit

const showButton = document.querySelector("#add-task");
const addDialog = document.querySelector("#add-dialog");
const closeAddDialog = document.querySelector("#close-add-dialog");
const submitAddTask = document.querySelector("#submit-add-task");

function openTaskDialog(task = null) {
    taskBeingEdited = task || null;

    const dialog = document.querySelector("#add-dialog");
    const form = dialog.querySelector("form");
  
    const titleEl = document.querySelector("#task-title");
    const descEl = document.querySelector("#description");
    const dateEl = document.querySelector("#due-date");
    const priorityEl = document.querySelector("#priority-input");
    const projectEl = document.querySelector("#select-project");

    createOptions(); // for sure updating options
  
    // add mode
    if (!task) {
      dialog.querySelector("h3").textContent = "Add Task";
      submitAddTask.textContent = "Done";
      form.reset();
      taskBeingEdited = null;
    }
  
    // edit mode
    else {
      dialog.querySelector("h3").textContent = "Edit Task";
      submitAddTask.textContent = "Save";
  
      titleEl.value = task.title;
      descEl.value = task.description;
      dateEl.value = task.dueDate;
      priorityEl.value = task.priority;
  
      // should find index project
      const projectIndex = projects.findIndex(p => p === task.project);
      projectEl.value = projectIndex;
  
      taskBeingEdited = task;
    }
  
    
    dialog.showModal();
  }
  




showButton.addEventListener("click", () => {
    taskBeingEdited = null
    openTaskDialog()
})

closeAddDialog.addEventListener("click", () => {
    addDialog.close();
})

submitAddTask.addEventListener("click", (e) => {
    e.preventDefault();
  
    const title = document.querySelector("#task-title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority-input").value;
    const selectedProject = projects[+document.querySelector("#select-project").value];
  
    if (taskBeingEdited) {
      // edit mode
      const oldProject = taskBeingEdited.project;
      
      taskBeingEdited.title = title;
      taskBeingEdited.description = description;
      taskBeingEdited.dueDate = dueDate;
      taskBeingEdited.priority = priority;
  
      // if project change, transfor it
      if (selectedProject !== oldProject) {
        oldProject.removeTask(taskBeingEdited); // این متد رو تو کلاس Project تعریف کن
        selectedProject.addTask(taskBeingEdited);
        taskBeingEdited.project = selectedProject;
      }
  
    } else {
      // add mode
      new Task(title, description, dueDate, priority, selectedProject);
    }
  
    taskBeingEdited = null;
    addDialog.close();
    renderView();
  });
  

// submitAddTask.addEventListener("click", (e) => {
//     e.preventDefault();

//     const titleTask = document.querySelector("#task-title").value;
//     const description = document.querySelector("#description").value;
//     const dueDate = document.querySelector("#due-date").value;
//     const priority = document.querySelector("#priority-input").value;

//     const selectedIndex =  Number(document.querySelector("#select-project").value);
//     const selectedProject = projects[selectedIndex];

//     const newTask = new Task(titleTask, description, dueDate, priority, selectedProject);
//     renderView()
    
//     addDialog.close();
    
// })

// add project dialog //

const showAddProject = document.querySelector("#add-project");
const projectDialog = document.querySelector("#project-dialog")
const closeAddProject = document.querySelector("#close-project-dialog");
const submitAddProject = document.querySelector("#submit-add-project");

showAddProject.addEventListener("click", () => {
    projectDialog.showModal();
});

closeAddProject.addEventListener("click", () => {

    projectDialog.close();
});

submitAddProject.addEventListener("click", (e) => {
    e.preventDefault();

    const addProjectInput = document.querySelector("#add-project-input");
    
    const newProject = new Project(addProjectInput.value);
    createProjectElement(newProject);
    console.log(projects)
    projectDialog.close();
})



export{ openTaskDialog }