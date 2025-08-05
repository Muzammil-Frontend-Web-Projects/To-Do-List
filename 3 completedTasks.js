window.onload = () =>{
    const completedTasks = JSON.parse(localStorage.getItem("completedTasks"))||[];
    const listContainer = document.querySelector(".listContainer");
    if(completedTasks.length === 0){
        listContainer.innerHTML = "<div style = 'display:grid;place-items:center;height:80vh; font-size:22px;font-weight:500'><p>No completed task</p></div>";
        
        return;
    }
    else{
        completedTasks.forEach((task)=>{
const {id,taskText,dTtext}=task;
console.log(id,taskText,dTtext);
const taskTemplate = `
    <div class="listItem" id = "${id}">
     <div class="icon">
 <i class="fa-solid fa-check" title="Task is completed." onclick = "taskComp(${id})"></i>
 <i class="fa-solid fa-xmark" title="Delete task" onclick = "taskDel(${id})"></i>
        </div>
        <div id="list">
         <div id = "txtIcon">
            <p id="task">${taskText}</p>
            <i class="fa-solid fa-pen" onclick = "editHandler(${id})" ></i>
            </div>
            <div id="dt">
                <p id="date">${dTtext.split("T")[0]}</p>
                <p id="time">${dTtext.split("T")[1]}</p>
            </div>
        </div>
        </div>`;
        listContainer.innerHTML += taskTemplate;

        });
    }
     const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    clearHistoryBtn.addEventListener("click", () => {
        localStorage.removeItem("completedTasks");
        location.reload();
    });
}