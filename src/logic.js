import { createProjectElement } from "./dom";

const projects = [];


function getTodayDateStr() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // → "2025-05-17"
}

function deleteProject(projectName){
    const index = projects.findIndex(proj => proj.name === projectName);
    if (index !== -1) {
      projects.splice(index, 1);
      saveToLocalStorage();
    }
}
  

class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        projects.push(this);
    }

    addTask(task) {
        this.tasks.push(task);
    }

    removeTask(task) {
        this.tasks = this.tasks.filter(t => t !== task)
        saveToLocalStorage();
    }

    getCompletedTasks() {
        return this.tasks.filter(task => task.completed);
    }

    getTodayTasks() {
        const todayStr = getTodayDateStr();
        return this.tasks.filter(task => task.dueDate === todayStr);
    }

    getScheduledTasks() {
        const todayStr = getTodayDateStr();
        return this.tasks.filter(task => task.dueDate > todayStr);
    }

}


class Task {
    constructor(title, description, dueDate, priority, project, completed = false) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = completed;

        project.addTask(this);
    }

    toComplete() {
        this.completed = !this.completed;
        saveToLocalStorage();
    }
}


// loacal storage

function saveToLocalStorage() {
    const plainProjects = projects.map(project => ({
      name: project.name,
      tasks: project.tasks.map(task => ({
        title: task.title,
        description: task.description,
        dueDate: task.dueDate,
        priority: task.priority,
        completed: task.completed
      }))
    }));
  
    localStorage.setItem("todo-data", JSON.stringify(plainProjects));
  }
  

  function loadFromLocalStorage() {
    const data = localStorage.getItem("todo-data");
    if (!data) return;
  
    const parsed = JSON.parse(data);
  
    parsed.forEach(proj => {
      const project = new Project(proj.name);
  
      proj.tasks.forEach(task => {
        new Task(task.title, task.description, task.dueDate, task.priority, project, task.completed);
      });
      createProjectElement(project);
    });
  }
  
  
  



export {Project , Task , projects , deleteProject, saveToLocalStorage, loadFromLocalStorage}