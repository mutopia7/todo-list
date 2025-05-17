const projects = [];


function getTodayDateStr() {
    const today = new Date();
    return today.toISOString().split("T")[0]; // → "2025-05-17"
}

function deleteProject(projectName){
    const index = projects.findIndex(proj => proj.name === projectName);
    if (index !== -1) {
      projects.splice(index, 1);
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
    constructor(title, description, dueDate, priority, project) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.project = project;
        this.completed = false;

        project.addTask(this);
    }

    toComplete() {
        this.completed = !this.completed;
    }
}



export {Project , Task , projects , deleteProject}