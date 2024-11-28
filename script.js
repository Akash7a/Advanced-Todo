const body = document.body;
const form = document.querySelector("form");
const titleInput = document.querySelector("#title");
const descInput = document.querySelector("#description");
const categoryInput = document.querySelector("#category");

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

        createdTaskContainer.appendChild(updatedBtn);
        createdTaskContainer.appendChild(checkBoxBtn);
        createdTaskContainer.appendChild(deleteBtn);
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
    editingTaskIndex = index;
    titleInput.value = task.title;
    descInput.value = task.description;
    categoryInput.value = task.category;
};

form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (editingTaskIndex !== null) {
        allTasks[editingTaskIndex] = {
            title: titleInput.value,
            description: descInput.value,
            category: categoryInput.value,
            status: allTasks[editingTaskIndex].status,
        };
        editingTaskIndex = null;
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

    // Reset the form
    titleInput.value = "";
    descInput.value = "";
    categoryInput.value = "";
});

createTask();