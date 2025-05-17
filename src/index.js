import "./styles.css"
import "./dialog.js"
import { Project, Task, projects } from "./logic.js"
import { renderProject, work , createTaskElement } from "./dom.js"
import "./dialog.js"

const showSection = document.querySelector(".show")

// renders

const state = {
    viewState: {
        type: "all",
        project: null
    }
};


// render All projects

function renderAllProjects() {
    showSection.innerHTML = "";

    const header = document.createElement("h3")
    header.textContent = "All Projects";
    showSection.appendChild(header)

    projects.forEach((project) => {
        renderProject(project)
    })
}

// render today projects

function renderTodayTasks() {
    showSection.innerHTML = "";
    const header = document.createElement("h3");
    header.textContent = "Today's Tasks";
    showSection.appendChild(header);

    projects.forEach(project => {
        const todayTasks = project.getTodayTasks();
        if (todayTasks.length > 0) {
            const container = document.createElement("div");
            container.classList.add("project");

            const heading = document.createElement("h4");
            heading.textContent = project.name;
            container.appendChild(heading);

            todayTasks.forEach(task => {
                const taskElement = createTaskElement(task);
                container.appendChild(taskElement);
            });

            showSection.appendChild(container);
        }
    });
}



// render upcoming projects

function renderScheduledTasks() {
    showSection.innerHTML = "";
    const header = document.createElement("h3");
    header.textContent = "Upcoming Tasks";
    showSection.appendChild(header);

    projects.forEach(project => {
        const upComingTasks = project.getScheduledTasks();
        if (upComingTasks.length > 0) {
            const container = document.createElement("div");
            container.classList.add("project");

            const heading = document.createElement("h4");
            heading.textContent = project.name;
            container.appendChild(heading);

            upComingTasks.forEach(task => {
                const taskElement = createTaskElement(task);
                container.appendChild(taskElement);
            });

            showSection.appendChild(container);
        }
    });
}



// render single project

function renderSingleProject(projectName) {
    showSection.innerHTML = "";
    const selectedProject = projects.find((project) => project.name === projectName);
    renderProject(selectedProject)
}


// render completed tasks

function renderCompletedTasks() {
    showSection.innerHTML = "";
    const header = document.createElement("h3");
    header.textContent = "Completed Tasks";
    showSection.appendChild(header);


    projects.forEach((project) => {
        renderProject(project, true)
    });

}








// all projects show button//

const allTag = document.querySelector("#all-tag");

// all-tag button clicked at first load//
window.addEventListener("DOMContentLoaded", () => {
    allTag.click();
    allTag.focus();
})

// all-tag button
allTag.addEventListener("click", () => {
    state.viewState = { type: "all" };
    renderView();
})


// today tasks btn
const todayBtn = document.querySelector("#today-tag");
todayBtn.addEventListener("click", () => {
    state.viewState = { type: "today" };
    renderView();
});

// upcoming tasks btn
const upComingBtn = document.querySelector("#scheduled");
upComingBtn.addEventListener("click", () => {
    state.viewState = { type: "scheduled" };
    renderView();
});


// completed show btn
const completedbtn = document.querySelector("#completed-tag")

completedbtn.addEventListener("click", () => {
    state.viewState = { type: "completed" };
    renderView()
})



function renderView() {
    switch (state.viewState.type) {
        case "all":
            renderAllProjects();
            break;
        case "completed":
            renderCompletedTasks();
            break;
        case "today":
            renderTodayTasks();
            break;
        case "scheduled":
            renderScheduledTasks();
            break;
        case "project":
            renderSingleProject(state.viewState.project);
            break;
    }
}



export { renderView, state }