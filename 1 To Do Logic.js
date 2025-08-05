const btn = document.getElementById("btn");
const list = document.querySelector(".listContainer");
const addTask = document.getElementById("addTask");
const dateTime = document.getElementById("dateTime");
let update = false;
let tid;
let state = {
    task: []
};


const fetchInput = (e) => {
    e.preventDefault();
    if (addTask.value && dateTime.value) {
        const taskArray = {
            id: update ? tid : Date.now(),
            taskText: addTask.value,
            dTtext: dateTime.value
        };
        if (update) {
            const taskIndex = state.task.findIndex((t) => t.id === tid);
            state.task[taskIndex] = taskArray;
            localStorage.setItem("savedTask",JSON.stringify(state.task));
            update = false;
            tid = null;
        }
        else {
            state.task.push(taskArray);
            localStorage.setItem("savedTask",JSON.stringify(state.task))
        }
    }
    if (!addTask.value && !dateTime.value) {
        Toastify({
            text: "Please fill both inputs!",
            duration: 1500,
            gravity: "top",
            position: "center",
            style: { background: "red" }
        }).showToast();
        return;
    }
    else if (!addTask.value) {
        Toastify({
            text: "Please fill task!",
            duration: 1500,
            gravity: "top",
            position: "center",
            style: { background: "red" }
        }).showToast();
        return;
    }
    else if (!dateTime.value) {
        Toastify({
            text: "Please fill date & time!",
            duration: 1500,
            gravity: "top",
            position: "center",
            style: { background: "red" }
        }).showToast();
        return;
    }
    else if (addTask.value && dateTime.value) {
        addTask.value = "";
        dateTime.value = "";
        renderTasks();
    }
}
btn.addEventListener("click", fetchInput);
const renderTasks = () => {
    list.innerHTML = " ";
    const showTask = state.task;
    showTask.forEach((task) => {
        const { id, taskText, dTtext } = task;
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
        list.innerHTML += taskTemplate;
    });
}
const taskComp = (id) => {
    const completed = state.task.find((t) => t.id === id)
    if(completed){
    let completedTasks = JSON.parse(localStorage.getItem("completedTasks")) || [];
    completedTasks.push(completed);
    localStorage.setItem("completedTasks", JSON.stringify(completedTasks));
    }
    state.task = state.task.filter((t) => t.id !== id);
    localStorage.setItem("savedTask",JSON.stringify(state.task))
    renderTasks();
    Toastify({
        text: "Task is done!",
        duration: 1500,
        gravity: "top",
        position: "center",
        style: { background: "orange" }
    }).showToast();
};
const taskDel = (id) => {
    const deleted = state.task.find((t) => t.id === id);
    if (deleted) {
        let deletedTasks = JSON.parse(localStorage.getItem("deletedTasks")) || [];

        deletedTasks.push(deleted);
        localStorage.setItem("deletedTasks", JSON.stringify(deletedTasks))
    }
    state.task = state.task.filter((t) => t.id !== id);
    localStorage.setItem("savedTask",JSON.stringify(state.task))
    renderTasks();
    Toastify({
        text: "Task is deleted!",
        duration: 1500,
        gravity: "top",
        position: "center",
        style: { background: "orange" }
    }).showToast();
};

const editHandler = (id) => {
    const findTransaction = state.task.find((t) => t.id === id);
    const { taskText, dTtext } = findTransaction;
    addTask.value = taskText;
    dateTime.value = dTtext;
    tid = id;
    update = true;

}

window.addEventListener("load" ,()=>{
let savedTask = JSON.parse(localStorage.getItem("savedTask"))||[];
state.task=savedTask;


renderTasks();
})






