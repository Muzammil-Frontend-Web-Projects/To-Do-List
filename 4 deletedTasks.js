window.onload = () =>{
    const deletedTasks = JSON.parse(localStorage.getItem("deletedTasks"))||[];
    
    const listContainer = document.querySelector(".listContainer");
    if(deletedTasks.length === 0){
        listContainer.innerHTML = "<div style = 'display:grid;place-items:center;height:80vh; font-size:22px;font-weight:500'><p>No deleted task</p></div>";
        
        return;
    }
    else{
        deletedTasks.forEach((task)=>{
const {id,taskText,dTtext}=task;
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
        console.log(deletedTasks);
        
    }
     const clearHistoryBtn = document.getElementById("clearHistoryBtn");
    clearHistoryBtn.addEventListener("click", () => {
        localStorage.removeItem("deletedTasks");
        location.reload()
console.log(deletedTasks);

    });
}