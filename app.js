const STORAGE_KEY = 'todo-list-items';
const THEME_KEY = 'todo-list-theme';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyState = document.getElementById('empty-state');
const remainingCount = document.getElementById('remaining-count');
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = document.getElementById('theme-icon');
const themeLabel = document.getElementById('theme-label');
const filterButtons = document.querySelectorAll('.filter-button');
const systemColorScheme = window.matchMedia('(prefers-color-scheme: dark)');

let currentFilter = 'all';
let followsSystemTheme = true;

// 從瀏覽器讀取已保存的待辦事項。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

let todos = loadTodos();

// 將目前的待辦事項保存到瀏覽器。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

// 更新主題按鈕，並讓未手動選擇時跟隨系統配色。
function updateThemeControl(theme) {
  const isDark = theme === 'dark';
  themeIcon.textContent = isDark ? '☀' : '☾';
  themeLabel.textContent = isDark ? '淺色' : '深色';
  themeToggle.setAttribute('aria-label', isDark ? '切換為淺色模式' : '切換為深色模式');
  themeToggle.setAttribute('aria-pressed', String(isDark));
}

// 載入已保存的主題，沒有設定時保留系統配色。
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY);

  if (savedTheme === 'light' || savedTheme === 'dark') {
    document.documentElement.dataset.theme = savedTheme;
    followsSystemTheme = false;
    updateThemeControl(savedTheme);
    return;
  }

  document.documentElement.removeAttribute('data-theme');
  updateThemeControl(systemColorScheme.matches ? 'dark' : 'light');
}

systemColorScheme.addEventListener('change', (event) => {
  if (followsSystemTheme) {
    updateThemeControl(event.matches ? 'dark' : 'light');
  }
});

themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.dataset.theme
    || (systemColorScheme.matches ? 'dark' : 'light');
  const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

  document.documentElement.dataset.theme = nextTheme;
  localStorage.setItem(THEME_KEY, nextTheme);
  followsSystemTheme = false;
  updateThemeControl(nextTheme);
});

// 根據目前篩選條件取得要顯示的待辦事項。
function getVisibleTodos() {
  if (currentFilter === 'active') {
    return todos.filter((todo) => !todo.completed);
  }
  if (currentFilter === 'completed') {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

// 依照資料更新清單、空狀態提示與未完成數量。
function renderTodos() {
  list.replaceChildren();
  const visibleTodos = getVisibleTodos();

  visibleTodos.forEach((todo) => {
    const item = document.createElement('li');
    item.className = todo.completed ? 'todo-item is-completed' : 'todo-item';
    item.dataset.id = todo.id;

    const checkbox = document.createElement('input');
    checkbox.className = 'todo-checkbox';
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.setAttribute('aria-label', `標記「${todo.text}」為完成`);

    const text = document.createElement('span');
    text.className = 'todo-text';
    text.textContent = todo.text;

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.type = 'button';
    deleteButton.textContent = '×';
    deleteButton.setAttribute('aria-label', `刪除「${todo.text}」`);

    item.append(checkbox, text, deleteButton);
    list.append(item);
  });

  emptyState.hidden = visibleTodos.length > 0;
  if (todos.length === 0) {
    emptyState.textContent = '還沒有任何待辦事項,新增一個吧!';
  } else if (currentFilter === 'active') {
    emptyState.textContent = '目前沒有未完成的待辦事項。';
  } else {
    emptyState.textContent = '目前沒有已完成的待辦事項。';
  }

  filterButtons.forEach((button) => {
    const isActive = button.dataset.filter === currentFilter;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });

  remainingCount.textContent = `未完成:${todos.filter((todo) => !todo.completed).length} 項`;
}

// 送出表單時新增非空白的待辦事項。
form.addEventListener('submit', (event) => {
  event.preventDefault();

  const text = input.value.trim();
  if (!text) return;

  todos.push({
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
    completed: false,
  });

  saveTodos();
  renderTodos();
  form.reset();
  input.focus();
});

// 用事件委派處理每筆待辦的完成狀態與刪除操作。
list.addEventListener('click', (event) => {
  const item = event.target.closest('.todo-item');
  if (!item) return;

  const todo = todos.find((entry) => entry.id === item.dataset.id);
  if (!todo) return;

  if (event.target.matches('.todo-checkbox')) {
    todo.completed = event.target.checked;
  } else if (event.target.matches('.delete-button')) {
    todos = todos.filter((entry) => entry.id !== item.dataset.id);
  } else {
    return;
  }

  saveTodos();
  renderTodos();
});

// 切換目前顯示的待辦篩選條件。
filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    currentFilter = button.dataset.filter;
    renderTodos();
  });
});

initTheme();
renderTodos();