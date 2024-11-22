// DOM Elements
const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTask');
const todoList = document.getElementById('todoList');
const taskCount = document.getElementById('taskCount');
const clearCompletedBtn = document.getElementById('clearCompleted');
const filterBtns = document.querySelectorAll('.filter-btn');

// State
let todos = [];
let currentFilter = 'all';

// API Functions
async function fetchTodos() {
    const response = await fetch('http://localhost:5000/api/todos');
    todos = await response.json();
    renderTodos();
}

async function createTodo(text) {
    const response = await fetch('http://localhost:5000/api/todos', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text }),
    });
    const newTodo = await response.json();
    todos.push(newTodo);
    renderTodos();
}

async function updateTodo(id, completed) {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ completed }),
    });
}

async function deleteTodoApi(id) {
    await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: 'DELETE',
    });
}

async function clearCompletedApi() {
    await fetch('http://localhost:5000/api/todos/clear-completed', {
        method: 'DELETE',
    });
}

// Event Listeners
addTaskBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});
clearCompletedBtn.addEventListener('click', clearCompleted);

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;
        renderTodos();
    });
});

// Functions
async function addTask() {
    const text = taskInput.value.trim();
    if (text) {
        await createTodo(text);
        taskInput.value = '';
    }
}

async function toggleTodo(id) {
    const todo = todos.find(t => t.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        await updateTodo(id, todo.completed);
        renderTodos();
    }
}

async function deleteTodo(id) {
    await deleteTodoApi(id);
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}

async function clearCompleted() {
    await clearCompletedApi();
    todos = todos.filter(todo => !todo.completed);
    renderTodos();
}

function getFilteredTodos() {
    switch (currentFilter) {
        case 'active':
            return todos.filter(todo => !todo.completed);
        case 'completed':
            return todos.filter(todo => todo.completed);
        default:
            return todos;
    }
}

function renderTodos() {
    const filteredTodos = getFilteredTodos();
    todoList.innerHTML = '';
    
    filteredTodos.forEach(todo => {
        const li = document.createElement('li');
        li.className = `todo-item ${todo.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" ${todo.completed ? 'checked' : ''}>
            <span class="todo-text">${todo.text}</span>
            <button class="delete-btn"><i class="fas fa-trash"></i></button>
        `;
        
        const checkbox = li.querySelector('.todo-checkbox');
        const deleteBtn = li.querySelector('.delete-btn');
        
        checkbox.addEventListener('change', () => toggleTodo(todo.id));
        deleteBtn.addEventListener('click', () => deleteTodo(todo.id));
        
        todoList.appendChild(li);
    });
    
    const activeTodos = todos.filter(todo => !todo.completed);
    taskCount.textContent = `${activeTodos.length} task${activeTodos.length === 1 ? '' : 's'} left`;
}

// Initial load
fetchTodos();
