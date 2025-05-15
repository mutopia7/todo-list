import { Project, Task , projects } from "./logic.js"

// const show = document.querySelector(".show")



const work = new Project("work");
const school = new Project("school");


const task1 = new Task("project dialog", "Add dialog for project sec", "22/12/2023", "high", work )






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

    taskCheckBox.addEventListener("change", () => {
        task.toComplete();
        divTask.classList.toggle("completed", task.completed);
    })

    titleTaskLabel.append(taskCheckBox , titleTask)

    

    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add(task.priority);

    divTitle.append( titleTaskLabel, prioritySpan);

    const taskExplain = document.createElement("p");
    taskExplain.classList.add("task-explain");
    taskExplain.textContent = task.description;

    const taskDate = document.createElement("p");
    taskDate.classList.add("task-date");
    taskDate.textContent = task.dueDate;




    divTask.append(divTitle, taskExplain, taskDate);


    return divTask;

}

function renderProject(project) {
    const projectContainer = document.createElement("div");
    projectContainer.classList.add("project");
  
    const heading = document.createElement("h4");
    heading.textContent = project.name;
  
    projectContainer.appendChild(heading);
  
    if (project.tasks !== ""){
        project.tasks.forEach((task) => {
            const taskElement = createTaskElement(task);
            projectContainer.appendChild(taskElement);
        });
    }
  
    document.querySelector(".show").appendChild(projectContainer);
}
  



function createProjectElement(project) {
    const projectsList = document.querySelector(".projects");

    const projectButton = document.createElement("button");
    projectButton.classList.add("project-items");
    projectButton.textContent = project.name;

    projectButton.addEventListener("click", () => {
        const showSection = document.querySelector(".show");
        showSection.innerHTML = "";
        renderProject(project);
        console.log("project button is running")
    });

    projectsList.appendChild(projectButton);
}


// add project options to the select at add dialog //

function createOptions() {
    const selectProject = document.querySelector("#select-project");

    projects.forEach((proj, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = proj.name;
        selectProject.appendChild(option)
    })
}

export {renderProject , work , createProjectElement, createOptions}