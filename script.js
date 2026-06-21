let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let currentFilter = "all";

displayTasks();

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    tasks.push({
        text: taskText,
        completed: false
    });

    saveTasks();
    input.value = "";
    displayTasks();
}

function displayTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    let filteredTasks = tasks.filter(task => {
        if (currentFilter === "active") {
            return !task.completed;
        }
        if (currentFilter === "completed") {
            return task.completed;
        }
        return true;
    });

    filteredTasks.forEach((task, index) => {
        let li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? 'completed' : ''}">
                ${task.text}
            </span>
            <button onclick="toggleTask(${tasks.indexOf(task)})">
                ${task.completed ? 'Undo' : 'Done'}
            </button>
            <button onclick="editTask(${tasks.indexOf(task)})">
                Edit
            </button>
            <button onclick="deleteTask(${tasks.indexOf(task)})">
                Delete
            </button>
        `;

        list.appendChild(li);
    });
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveTasks();
    displayTasks();
}

function editTask(index) {
    let newText = prompt("Edit task:", tasks[index].text);

    if (newText && newText.trim() !== "") {
        tasks[index].text = newText;
        saveTasks();
        displayTasks();
    }
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveTasks();
    displayTasks();
}

function filterTasks(type) {
    currentFilter = type;
    displayTasks();
}
