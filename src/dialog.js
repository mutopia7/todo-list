import "./dialog.css"
import {Task , Project} from "./logic.js"
import { renderProject , createProjectElement } from "./dom.js"


const home = new Project("home")


const showButton = document.querySelector("#add-task");
const addDialog = document.querySelector("#add-dialog");
const closeAddDialog = document.querySelector("#close-add-dialog");
const submitAddTask = document.querySelector("#submit-add-task");

showButton.addEventListener("click", () => {
    addDialog.showModal();
    console.log("add")
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

    const newTask = new Task(titleTask, description, dueDate, priority, home);
    addDialog.close();
    console.log(newTask);
    console.log(home)
    renderProject(home)
    return newTask;
    

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
    console.log(newProject);
    createProjectElement(newProject)
    projectDialog.close();
})

export{ home };