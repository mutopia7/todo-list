import "./styles.css"
import "./dialog.js"
import { Project, Task, projects } from "./logic.js"
import { renderProject, work } from "./dom.js"
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

function renderAllProjects(){
    showSection.innerHTML = "";

    const header = document.createElement("h3")
    header.textContent = "All Projects";
    showSection.appendChild(header)

    projects.forEach( (project) => {
        renderProject(project)
    })
}


//render single project

function renderSingleProject(projectName){
    showSection.innerHTML = "";
    const selectedProject = projects.find((project) => project.name === projectName);
    renderProject(selectedProject)
}









// all projects show button//

const allTag = document.querySelector("#all-tag");

// all-tag button clicked at first load//
window.addEventListener("DOMContentLoaded", () => {
    allTag.click();
    allTag.focus();
})

// all-tah button
allTag.addEventListener("click", () =>{
    state.viewState = { type: "all" };
    renderView();
})




function renderView() {
    switch (state.viewState.type) {
      case "all":
        renderAllProjects();
        break;
    //   case "completed":
    //     renderCompletedTasks();
    //     break;
    //   case "today":
    //     renderTodayTasks();
    //     break;
    //   case "scheduled":
    //     renderScheduledTasks();
    //     break;
        case "project":
            renderSingleProject(state.viewState.project);
            break;
    }
  }



export {renderView, state}