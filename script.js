// DOM Elements
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const filterBtns = document.querySelectorAll('.filter-btn');

// Tasks array
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText) {
        const newTask = {
            id: Date.now(),
            text: taskText,
            completed: false
        };
        tasks.push(newTask);
        saveTasks();
        renderTasks();
        taskInput.value = '';
    }
}

// Delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

// Toggle task completion
function toggleTask(id) {
    tasks = tasks.map(task => 
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

// Filter tasks
function filterTasks(filter) {
    filterBtns.forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    
    let filteredTasks = [];
    if (filter === 'all') {
        filteredTasks = tasks;
    } else if (filter === 'pending') {
        filteredTasks = tasks.filter(task => !task.completed);
    } else if (filter === 'completed') {
        filteredTasks = tasks.filter(task => task.completed);
    }
    renderTasks(filteredTasks);
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Render tasks
function renderTasks(tasksToRender = tasks) {
    taskList.innerHTML = tasksToRender.map(task => `
        <li class="task-item ${task.completed ? 'completed' : ''}" data-id="${task.id}">
            <span class="task-text">${task.text}</span>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleTask(${task.id})">
                    <i class="fas fa-${task.completed ? 'undo' : 'check'}"></i>
                </button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </li>
    `).join('');
}

// Event Listeners
addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => filterTasks(btn.dataset.filter));
});

// Initial render
renderTasks();