const apiUrl = "https://verbose-meme-5g9p7q9j5659f7vqj-8080.app.github.dev/api/tasks";
const taskList = document.getElementById("task-list");
const taskForm = document.getElementById("task-form");
const taskNameInput = document.getElementById("task-name");

// Fetch and display tasks
function loadTasks() {
  fetch(apiUrl)
    .then(res => {
      if (!res.ok) throw new Error(`Failed to load tasks: ${res.status}`);
      return res.json();
    })
    .then(tasks => {
      taskList.innerHTML = "";
      tasks.forEach(task => {
        const div = document.createElement("div");
        div.className = "task";
        div.innerHTML = `
          <input type="checkbox" ${task.completed ? "checked" : ""} 
            onclick="toggleTask(${task.id}, ${!task.completed}, '${task.name.replace(/'/g, "\\'")}')">
          ${task.name}
          <button onclick="deleteTask(${task.id})">Delete</button>
        `;
        taskList.appendChild(div);
      });
    })
    .catch(err => {
      console.error(err);
      taskList.innerHTML = "<p style='color:red;'>Failed to load tasks</p>";
    });
}

// Add a new task
taskForm.addEventListener("submit", e => {
  e.preventDefault();
  const name = taskNameInput.value.trim();
  if (!name) return;

  fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, completed: false })
  })
    .then(res => {
      if (!res.ok) throw new Error(`Failed to add task: ${res.status}`);
      return res.json();
    })
    .then(() => {
      taskNameInput.value = "";
      loadTasks();
    })
    .catch(err => {
      console.error(err);
      alert("Failed to add task.");
    });
});

// Mark task as completed / not completed
function toggleTask(id, completed, name) {
  fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, name, completed })
  })
    .then(res => {
      if (!res.ok) throw new Error(`Failed to update task: ${res.status}`);
      return res.json();
    })
    .then(loadTasks)
    .catch(err => {
      console.error(err);
      alert("Failed to update task.");
    });
}

// Delete a task
function deleteTask(id) {
  fetch(`${apiUrl}/${id}`, { method: "DELETE" })
    .then(res => {
      if (!res.ok) throw new Error(`Failed to delete task: ${res.status}`);
      return res.text(); // usually no body for DELETE
    })
    .then(loadTasks)
    .catch(err => {
      console.error(err);
      alert("Failed to delete task.");
    });
}

// Load tasks initially
loadTasks();
