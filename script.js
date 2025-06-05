// JavaScript file for Habit Tracker
let habits = JSON.parse(localStorage.getItem('habits')) || [];
let selectedDate = new Date().toISOString().split('T')[0];

const habitInput = document.getElementById('habit-input');
const addBtn = document.getElementById('add-btn');
const habitList = document.getElementById('habit-list');
const toggleSwitch = document.getElementById('darkModeToggle');
const modeLabel = document.getElementById('modeLabel');
const calendarDate = document.getElementById('calendar-date');
const progressBar = document.getElementById('progress-bar');

function saveHabits() {
  localStorage.setItem('habits', JSON.stringify(habits));
}

function renderHabits() {
  habitList.innerHTML = '';
  const todayHabits = habits.filter(h => h.date === selectedDate);
  let completedCount = 0;

  todayHabits.forEach((habit, index) => {
    const div = document.createElement('div');
    div.className = 'habit animate';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = habit.completed;
    checkbox.addEventListener('change', () => {
      habit.completed = checkbox.checked;
      saveHabits();
      renderHabits();
    });

    const label = document.createElement('label');
    label.textContent = habit.name;

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-btn';
    editBtn.textContent = 'Edit';
    editBtn.onclick = () => {
      const newName = prompt('Edit your habit:', habit.name);
      if (newName) {
        habit.name = newName;
        saveHabits();
        renderHabits();
      }
    };

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.onclick = () => {
      habits = habits.filter((_, i) => !(i === index && habit.date === selectedDate));
      saveHabits();
      renderHabits();
    };

    if (habit.completed) completedCount++;

    div.appendChild(checkbox);
    div.appendChild(label);
    div.appendChild(editBtn);
    div.appendChild(deleteBtn);
    habitList.appendChild(div);
  });

  // Update progress bar
  const percent = todayHabits.length ? (completedCount / todayHabits.length) * 100 : 0;
  progressBar.style.width = percent + '%';
  progressBar.textContent = `${Math.round(percent)}% Completed`;
}

function addHabit() {
  const name = habitInput.value.trim();
  if (name) {
    habits.push({ name, completed: false, date: selectedDate });
    habitInput.value = '';
    saveHabits();
    renderHabits();
    playSound();
  }
}

addBtn.addEventListener('click', addHabit);
habitInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') addHabit();
});

calendarDate.addEventListener('change', e => {
  selectedDate = e.target.value;
  renderHabits();
});

toggleSwitch.addEventListener('change', () => {
  document.body.classList.toggle('dark-mode');
  modeLabel.textContent = document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';
});

function playSound() {
  const audio = new Audio('https://www.soundjay.com/buttons/sounds/button-16.mp3');
  audio.play();
}

// Initial render
calendarDate.value = selectedDate;
renderHabits();
modeLabel.textContent = document.body.classList.contains('dark-mode') ? 'Dark Mode' : 'Light Mode';
