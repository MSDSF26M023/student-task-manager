// Student Task Manager - core logic: add, display, complete, delete
let tasks = [];
let nextId = 1;

const titleInput = document.getElementById('taskTitle');
const descInput = document.getElementById('taskDescription');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');

function addTask() {
  const title = titleInput.value.trim();
  if (!title) { alert('Please enter a task title.'); return; }
  tasks.push({ id: nextId++, title, description: descInput.value.trim(), completed: false });
  titleInput.value = '';
  descInput.value = '';
  renderTasks();
}

function toggleTask(id) {
  const t = tasks.find(t => t.id === id);
  if (t) t.completed = !t.completed;
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  renderTasks();
}

function renderTasks(list = tasks) {
  taskList.innerHTML = '';
  if (list.length === 0) {
    taskList.innerHTML = '<li class="empty">No tasks to show.</li>';
    return;
  }
  list.forEach(t => {
    const li = document.createElement('li');
    li.className = 'task-card' + (t.completed ? ' completed' : '');

    const info = document.createElement('div');
    info.className = 'task-info';
    const h3 = document.createElement('h3');
    h3.textContent = t.title;
    const p = document.createElement('p');
    p.textContent = t.description;
    info.append(h3, p);

    const actions = document.createElement('div');
    actions.className = 'task-actions';
    const doneBtn = document.createElement('button');
    doneBtn.textContent = t.completed ? 'Undo' : 'Complete';
    doneBtn.onclick = () => toggleTask(t.id);
    const delBtn = document.createElement('button');
    delBtn.className = 'danger';
    delBtn.textContent = 'Delete';
    delBtn.onclick = () => deleteTask(t.id);
    actions.append(doneBtn, delBtn);

    li.append(info, actions);
    taskList.appendChild(li);
  });
}

addBtn.addEventListener('click', addTask);
renderTasks();

// ---- Task search ----
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('input', () => {
  const q = searchInput.value.trim().toLowerCase();
  const filtered = tasks.filter(t =>
    t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
  renderTasks(filtered);
});
