document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const taskDescription = document.getElementById("taskDescription");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach(function(task, index) {
            const li = document.createElement("li");
            li.classList.add("todo-item");
            const title = document.createElement("div");
            title.classList.add("todo-title");
            title.textContent = task.title;
            const description = document.createElement("div");
            description.classList.add("todo-description");
            description.textContent = task.description;
            const deleteButton = document.createElement("button");
            deleteButton.className = "delete-button";
            const trashIcon = document.createElement("i");
            trashIcon.className = "fas fa-trash";
            deleteButton.appendChild(trashIcon);
            deleteButton.addEventListener("click", function() {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            });
            const buttonsContainer = document.createElement("div");
            buttonsContainer.className = "todo-buttons";
            buttonsContainer.appendChild(deleteButton);
            li.appendChild(title);
            li.appendChild(description);
            li.appendChild(buttonsContainer);
            taskList.appendChild(li);
        });
    }

    function saveTasks() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    addButton.addEventListener("click", function() {
        const title = taskInput.value.trim();
        const description = taskDescription.value.trim();
        if (title !== "") {
            tasks.push({ title: title, description: description });
            saveTasks();
            renderTasks();
            taskInput.value = "";
            taskDescription.value = "";
        }
    });

    // Initial rendering
    renderTasks();
});
