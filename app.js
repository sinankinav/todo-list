function initializeTasks(tasks) {
    const columns = {
        "To Do": document.getElementById("todo"),
        "In Progress": document.getElementById("in-progress"),
        "Done": document.getElementById("done")
    };

    tasks.forEach(task => {
        const taskElement = createTaskElement(task);
        columns[task.status].appendChild(taskElement);
    });
}

function createTaskElement(task) {
    const taskElement = document.createElement("div");
    taskElement.className = "task";
    taskElement.draggable = true;
    taskElement.ondragstart = drag;
    taskElement.id = `task-${Date.now()}`;

    const title = document.createElement("h3");
    title.innerText = task.title;

    const description = document.createElement("p");
    description.innerText = task.description;

    const assignee = document.createElement("small");
    assignee.innerText = `Assigned to: ${task.assignee}`;

    taskElement.appendChild(title);
    taskElement.appendChild(description);
    taskElement.appendChild(assignee);

    return taskElement;
}

document.addEventListener("DOMContentLoaded", () => {
    fetch('tasks.json')
        .then(response => response.json())
        .then(tasks => initializeTasks(tasks))
        .catch(error => console.error('Error loading tasks:', error));

    document.getElementById("new-task-form").addEventListener("submit", event => {
        event.preventDefault();

        const title = document.getElementById("title").value;
        const description = document.getElementById("description").value;
        const assignee = document.getElementById("assignee").value;
        const status = document.getElementById("status").value;

        const newTask = {
            title,
            description,
            assignee,
            status
        };

        const taskElement = createTaskElement(newTask);
        const columns = {
            "To Do": document.getElementById("todo"),
            "In Progress": document.getElementById("in-progress"),
            "Done": document.getElementById("done")
        };
        columns[status].appendChild(taskElement);

        // Clear the form
        event.target.reset();
    });
});

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData("text");
    const task = document.getElementById(data);
    ev.target.appendChild(task);
}

module.exports = { initializeTasks, createTaskElement, allowDrop, drag, drop };
