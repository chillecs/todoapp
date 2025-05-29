// Logout function
function logout() {
    localStorage.removeItem('loggedInUser');
    window.location.href = 'index.html';
}

// Load tasks from localStorage on page load
document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.getElementById('taskList');
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.textContent = task.text;
        if (task.completed) {
            li.classList.add('strikethrough');
        }
        li.style.width = 'auto';
        li.draggable = true;
        
        // Add drag and drop functionality
        li.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.textContent);
            e.target.classList.add('dragging');
        });

        li.addEventListener('dragend', function(e) {
            e.target.classList.remove('dragging');
            // Remove all drag-over classes
            document.querySelectorAll('.drag-over, .drag-over-above').forEach(item => {
                item.classList.remove('drag-over', 'drag-over-above');
            });
        });

        li.addEventListener('dragover', function(e) {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            if (draggingItem !== this) {
                const rect = this.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                
                // Remove all drag-over classes first
                document.querySelectorAll('.drag-over, .drag-over-above').forEach(item => {
                    item.classList.remove('drag-over', 'drag-over-above');
                });
                
                // Add appropriate class based on position
                if (e.clientY < midY) {
                    this.classList.add('drag-over-above');
                } else {
                    this.classList.add('drag-over');
                }
            }
        });

        li.addEventListener('drop', function(e) {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            if (draggingItem !== this) {
                const rect = this.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (e.clientY < midY) {
                    this.parentNode.insertBefore(draggingItem, this);
                } else {
                    this.parentNode.insertBefore(draggingItem, this.nextSibling);
                }
            }
            // Remove all drag-over classes
            document.querySelectorAll('.drag-over, .drag-over-above').forEach(item => {
                item.classList.remove('drag-over', 'drag-over-above');
            });
            // Update localStorage with new order
            const tasks = Array.from(taskList.children).map(li => ({
                text: li.textContent,
                completed: li.classList.contains('strikethrough')
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        taskList.appendChild(li);
        // Add delete button to each loaded task
        const delBtn = document.createElement('button')
        delBtn.classList.add('delBtn')
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';

        delBtn.addEventListener('click', function () {
            // Remove from DOM
            li.remove();

            // Remove from localStorage
            const index = tasks.findIndex(t => t.text === task.text);
            if (index > -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });
        li.appendChild(delBtn);

        // Add click event for strike-through
        li.addEventListener('click', function(e) {
            // Don't toggle if clicking the delete button
            if (e.target.closest('.delBtn')) return;
            
            li.classList.toggle('strikethrough');
            // Update localStorage
            const tasks = Array.from(taskList.children).map(li => ({
                text: li.textContent,
                completed: li.classList.contains('strikethrough')
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
    });
});

const loginForm = document.getElementById('loginForm');
const loginButton = document.getElementById('submitbtn');
const passwordField = document.getElementById('password');
const usernameField = document.getElementById('username');
const errorMessage = document.getElementById('errorMessage');
const logoutButton = document.getElementById('logoutbtn');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const container = document.getElementsByClassName('container')[0];
const taskListContainer = document.getElementsByClassName('taskListContainer')[0];

addTaskBtn.addEventListener('click', function() {
    const task = taskInput.value.trim();
    if (task) {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.push({ text: task, completed: false });
        
        // Add the task to the list
        const li = document.createElement('li');
        li.textContent = task;
        li.style.width = 'auto';
        li.draggable = true;
        
        // Add drag and drop functionality
        li.addEventListener('dragstart', function(e) {
            e.dataTransfer.setData('text/plain', e.target.textContent);
            e.target.classList.add('dragging');
        });

        li.addEventListener('dragend', function(e) {
            e.target.classList.remove('dragging');
            // Remove all drag-over classes
            document.querySelectorAll('.drag-over, .drag-over-above').forEach(item => {
                item.classList.remove('drag-over', 'drag-over-above');
            });
        });

        li.addEventListener('dragover', function(e) {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            if (draggingItem !== this) {
                const rect = this.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                
                // Remove all drag-over classes first
                document.querySelectorAll('.drag-over, .drag-over-above').forEach(item => {
                    item.classList.remove('drag-over', 'drag-over-above');
                });
                
                // Add appropriate class based on position
                if (e.clientY < midY) {
                    this.classList.add('drag-over-above');
                } else {
                    this.classList.add('drag-over');
                }
            }
        });

        li.addEventListener('drop', function(e) {
            e.preventDefault();
            const draggingItem = document.querySelector('.dragging');
            if (draggingItem !== this) {
                const rect = this.getBoundingClientRect();
                const midY = rect.top + rect.height / 2;
                if (e.clientY < midY) {
                    this.parentNode.insertBefore(draggingItem, this);
                } else {
                    this.parentNode.insertBefore(draggingItem, this.nextSibling);
                }
            }
            // Remove all drag-over classes
            document.querySelectorAll('.drag-over, .drag-over-above').forEach(item => {
                item.classList.remove('drag-over', 'drag-over-above');
            });
            // Update localStorage with new order
            const tasks = Array.from(taskList.children).map(li => ({
                text: li.textContent,
                completed: li.classList.contains('strikethrough')
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });

        taskList.appendChild(li);
        // Add delete button to each new task added
        const delBtn = document.createElement('button')
        delBtn.classList.add('delBtn')
        delBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
        
        delBtn.addEventListener('click', function () {
            // Remove from DOM
            li.remove();
            // Remove from localStorage
            const index = tasks.findIndex(t => t.text === task);
            if (index > -1) {
                tasks.splice(index, 1);
                localStorage.setItem('tasks', JSON.stringify(tasks));
            }
        });
        
        // Add click event for strike-through
        li.addEventListener('click', function(e) {
            // Don't toggle if clicking the delete button
            if (e.target.closest('.delBtn')) return;
            
            li.classList.toggle('strikethrough');
            // Update localStorage
            const tasks = Array.from(taskList.children).map(li => ({
                text: li.textContent,
                completed: li.classList.contains('strikethrough')
            }));
            localStorage.setItem('tasks', JSON.stringify(tasks));
        });
        
        li.appendChild(delBtn)
        taskInput.focus();
        // After adding the task, save to localStorage
        localStorage.setItem('tasks', JSON.stringify(tasks));
        // Clear the input field
        taskInput.value = '';
    } else {
        const para = document.createElement('p')
        para.classList.add('para')
        para.textContent = 'Please enter a task!';
        container.insertBefore(para, taskList)
        setTimeout(() => {
            para.remove();
        }, 3000)
    }
});

// Clear all tasks function
const clearTasksBtn = document.getElementById('clearAllBtn');

clearTasksBtn.addEventListener('click', function() {
    taskList.innerHTML = ''; // Clear the displayed tasks
    localStorage.removeItem('tasks'); // Remove tasks from localStorage
});