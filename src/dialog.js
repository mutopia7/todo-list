import "./dialog.css"
import {Task , Project, projects} from "./logic.js"
import { renderProject, createProjectElement, createOptions } from "./dom.js"
import { renderView } from "./index.js";


const showButton = document.querySelector("#add-task");
const addDialog = document.querySelector("#add-dialog");
const closeAddDialog = document.querySelector("#close-add-dialog");
const submitAddTask = document.querySelector("#submit-add-task");

showButton.addEventListener("click", () => {
    addDialog.showModal();
    createOptions();
})

closeAddDialog.addEventListener("click", () => {
    addDialog.close();
})

submitAddTask.addEventListener("click", (e) => {
    e.preventDefault();

    const titleTask = document.querySelector("#task-title").value;
    const description = document.querySelector("#description").value;
    const dueDate = document.querySelector("#due-date").value;
    const priority = document.querySelector("#priority-input").value;

    const selectedIndex =  Number(document.querySelector("#select-project").value);
    const selectedProject = projects[selectedIndex];

    const newTask = new Task(titleTask, description, dueDate, priority, selectedProject);
    renderView()
    
    addDialog.close();
    
})

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

