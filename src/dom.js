import { renderView, state } from "./index.js";
import { Project, Task, projects, deleteProject, saveToLocalStorage } from "./logic.js"
import { openTaskDialog } from "./dialog.js";



if (!localStorage.getItem("todo-data")) {
    const work = new Project("Work");
    const home = new Project("Home");

    const taskHome1 = new Task("cook", "make lunch", "2027-05-17", "high", home)
    const taskWork1 = new Task("project dialog", "Add dialog for project sec", "2026-05-17", "low", work)
    const taskWork2 = new Task("style", "style show section", "2024-05-17", "med", work)

    createProjectElement(home);
    createProjectElement(work)
    saveToLocalStorage(); // ذخیره پروژه‌های نمونه
}




function createTaskElement(task) {


    const divTask = document.createElement("div");
    divTask.classList.add("task");


    const divTitle = document.createElement("div");
    divTitle.classList.add("title");

    const titleTaskLabel = document.createElement("label");
    titleTaskLabel.classList.add("title-task");

    const titleTask = document.createElement("p");
    titleTask.textContent = task.title;
    titleTask.classList.add("title-task-p")


    const taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";
    taskCheckBox.classList.add("task-checkbox");
    taskCheckBox.checked = task.completed;

    if (task.completed) { divTask.classList.add("completed") } // for style completed task at completed section

    taskCheckBox.addEventListener("change", () => {
        task.toComplete();
        saveToLocalStorage();
        divTask.classList.toggle("completed", task.completed);
    })

    titleTaskLabel.append(taskCheckBox, titleTask)



    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add(task.priority);

    divTitle.append(titleTaskLabel, prioritySpan);

    const taskExplain = document.createElement("p");
    taskExplain.classList.add("task-explain");
    taskExplain.textContent = task.description;

    const taskDate = document.createElement("p");
    taskDate.classList.add("task-date");
    taskDate.textContent = task.dueDate;

    const deleteTask = document.createElement("button");
    deleteTask.classList.add("delete-task");
    deleteTask.textContent = "Delete";
    deleteTask.addEventListener("click", () => {
        task.project.removeTask(task);
        renderView();
    });

    const editTask = document.createElement("button");
    editTask.classList.add("edit-task");
    editTask.textContent = "Edit"
    editTask.addEventListener("click", () => {
        openTaskDialog(task)
    })





    divTask.append(divTitle, taskExplain, taskDate, deleteTask, editTask);


    return divTask;

}

function renderProject(project, completeMode = false) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");

    const heading = document.createElement("h4");
    heading.textContent = project.name;

    const deleteProjectBtn = document.createElement("button");
    deleteProjectBtn.textContent = "Delete"
    deleteProjectBtn.addEventListener("click", (e) => {
        const confirmDelete = confirm(`Are you sure you want to delete "${project.name}"?`);
        if (confirmDelete) {
            deleteProject(project.name);
            deleteProjectElement(project.name);

            if (state.viewState.type === "project" && state.viewState.project === project.name) {
                state.viewState = { type: "all" };
            }

            renderView();
        }
    });

    projectContainer.append(heading, deleteProjectBtn);

    const tasksToRender = completeMode ? project.getCompletedTasks() : project.tasks;

    if (Array.isArray(project.tasks) && tasksToRender.length > 0 && completeMode === false) {
        tasksToRender.forEach((task) => {
            const taskElement = createTaskElement(task);
            projectContainer.appendChild(taskElement);
        });
    }

    if (Array.isArray(project.tasks) && tasksToRender.length > 0 && completeMode === true) {
        tasksToRender.forEach((task) => {
            const taskElement = createTaskElement(task);
            projectContainer.appendChild(taskElement);
        })
    }

    document.querySelector(".show").appendChild(projectContainer);
}




function createProjectElement(project) {
    const projectsList = document.querySelector(".projects");

    const projectButton = document.createElement("button");
    projectButton.classList.add("project-items");
    projectButton.dataset.projectName = project.name;
    projectButton.textContent = project.name;

    projectButton.addEventListener("click", () => {
        const showSection = document.querySelector(".show");
        showSection.innerHTML = "";
        state.viewState = { type: "project", project: project.name }
        renderView()
    });

    projectsList.appendChild(projectButton);
}

function deleteProjectElement(projectName) {
    const btn = document.querySelector(`[data-project-name="${projectName}"]`);
    if (btn) btn.remove();
}


// add project options to the select at add dialog //

function createOptions() {
    const selectProject = document.querySelector("#select-project");
    selectProject.innerHTML = "";

    projects.forEach((proj, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = proj.name;
        selectProject.appendChild(option)
    })
}

export { renderProject, createProjectElement, createOptions, createTaskElement, deleteProjectElement }