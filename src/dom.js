import { Project, Task } from "./logic.js"

// const show = document.querySelector(".show")

const projects = [];

const work = new Project("کار");
const school = new Project("مدرسه");
projects.push(work, school);

const task1 = new Task("تحویل گزارش", "گزارش پروژه رو بنویس", "فردا", "بالا", work);
const task2 = new Task("درس خوندن", "مطالعه فصل ۲", "جمعه", "متوسط", work);





function createTaskElement(task) {


    const divTask = document.createElement("div");
    divTask.classList.add("task");


    const divTitle = document.createElement("div");
    divTitle.classList.add("title");

    const titleTaskLabel = document.createElement("label");
    titleTaskLabel.classList.add("title-task");
    
    const titleTask = document.createElement("p");
    titleTask.textContent = task.title;
    

    const taskCheckBox = document.createElement("input");
    taskCheckBox.type = "checkbox";
    taskCheckBox.classList.add("task-checkbox");
    taskCheckBox.checked = task.completed;

    titleTaskLabel.append(taskCheckBox , titleTask)

    

    const prioritySpan = document.createElement("span");
    prioritySpan.classList.add("priority")

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
  
    project.tasks.forEach((task) => {
      const taskElement = createTaskElement(task);
      projectContainer.appendChild(taskElement);
    });
  
    document.querySelector(".show").appendChild(projectContainer);
  }
  

export {renderProject , work }