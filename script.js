const body = document.body;
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");
const submitBtn = document.querySelector("#submit_btn");
const showCompletedTaskBtn = document.querySelector(".show_completed_tasks_btn");


let allTasks = localStorage.getItem("tasks") ? JSON.parse(localStorage.getItem("tasks")) : [];
let editingTaskIndex = null;

const createTask = () => {
    document.querySelectorAll(".createdTaskContainer").forEach(task => task.remove());

    allTasks.forEach((task, index) => {
        const createdTaskContainer = document.createElement("div");
        createdTaskContainer.classList.add("createdTaskContainer");

        const titleContainer = document.createElement("h2");
        titleContainer.classList.add("titleContainer");
        titleContainer.textContent = task.title;

        const descContainer = document.createElement("p");
        descContainer.classList.add("descContainer");
        descContainer.textContent = task.description;

        const category = document.createElement("h4");
        category.classList.add("category");
        category.textContent = task.category;

        const statusContainer = document.createElement("p");
        statusContainer.classList.add("status");
        statusContainer.textContent = task.status;
        statusContainer.classList.add(task.status === "pending" ? "pending" : "completed");

        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "❌";
        deleteBtn.classList.add("deleteBtn");
        deleteBtn.addEventListener("click", () => removeTask(index));

        const checkBoxBtn = document.createElement("button");
        checkBoxBtn.textContent = "✅";
        checkBoxBtn.classList.add("checkbox");
        checkBoxBtn.addEventListener("click", () => toggleTask(index));

        if (task.status === "completed") {
            titleContainer.classList.add("crosstheCompletedTask");
            descContainer.classList.add("crosstheCompletedTask");
        }

        const updatedBtn = document.createElement("button");
        updatedBtn.textContent = "📝";
        updatedBtn.classList.add("updateBtn");
        updatedBtn.addEventListener("click", () => updatedTask(task, index));

        const ctrlBtns = document.createElement("div");
        ctrlBtns.classList.add("ctrl");

        ctrlBtns.appendChild(updatedBtn);
        ctrlBtns.appendChild(checkBoxBtn);
        ctrlBtns.appendChild(deleteBtn);
        createdTaskContainer.appendChild(ctrlBtns);
        createdTaskContainer.appendChild(statusContainer);
        createdTaskContainer.appendChild(category);
        createdTaskContainer.appendChild(titleContainer);
        createdTaskContainer.appendChild(descContainer);

        body.appendChild(createdTaskContainer);
    });
};

const removeTask = (index) => {
    allTasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    createTask();
};

const toggleTask = (index) => {
    allTasks[index].status = allTasks[index].status === "pending" ? "completed" : "pending";
    localStorage.setItem("tasks", JSON.stringify(allTasks));
    createTask();
};
const updatedTask = (task, index) => {
    if (task.status === "completed") {
        alert("You cannot update a completed task.");
        return;
    }
    editingTaskIndex = index;
    titleInput.value = task.title;
    descInput.value = task.description;
    categoryInput.value = task.category;
    submitBtn.textContent = "Save Updates";
    createTask();
};
const filterTask = () => {
    let showCompleted = false;
    showCompletedTaskBtn.addEventListener("click", () => {
        const taskContainers = document.querySelectorAll(".createdTaskContainer");

        taskContainers.forEach((task, index) => {
            const status = allTasks[index].status;
            if (showCompleted) {
                task.style.display = "block";
            } else if (status === "pending") {
                task.style.display = "none";
            } else {
                task.style.display = "block";
            }
        })

        showCompletedTaskBtn.textContent = showCompleted ? "Show Completed Tasks" : "Show All Tasks";

        showCompleted = !showCompleted;
    })
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (editingTaskIndex !== null) {
        allTasks[editingTaskIndex] = {
            title: titleInput.value,
            description: descInput.value,
            category: categoryInput.value,
            status: allTasks[editingTaskIndex].status,
        }
        editingTaskIndex = null;
        submitBtn.textContent = "Add Task";
    } else {
        const createdTask = {
            title: titleInput.value,
            description: descInput.value,
            category: categoryInput.value,
            status: "pending",
        };
        allTasks.push(createdTask);
    }

    localStorage.setItem("tasks", JSON.stringify(allTasks));
    createTask();

    titleInput.value = "";
    descInput.value = "";
    categoryInput.value = "";
});

createTask();
filterTask();
filterTask();