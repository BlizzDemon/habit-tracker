let habits = [];

document.addEventListener('DOMContentLoaded', () => {
  renderHabits();
  document.getElementById('addHabitBtn').addEventListener('click', addHabit);
  document.getElementById('habitInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addHabit();
  });

  const themeToggle = document.getElementById('themeToggle');
  themeToggle.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode');
    document.getElementById('themeLabel').textContent = themeToggle.checked ? 'Dark Mode' : 'Light Mode';
  });

  document.getElementById('reminderToggle').addEventListener('change', (e) => {
    if (e.target.checked) {
      alert("Reminders Enabled! (Simulated)");
    }
  });
});

function addHabit() {
  const input = document.getElementById('habitInput');
  const name = input.value.trim();
  if (name !== '') {
    habits.push({ name, dates: [] });
    input.value = '';
    renderHabits();
  }
}

function deleteHabit(index) {
  habits.splice(index, 1);
  renderHabits();
}

function toggleDate(index, date) {
  const habit = habits[index];
  const pos = habit.dates.indexOf(date);
  if (pos > -1) {
    habit.dates.splice(pos, 1);
  } else {
    habit.dates.push(date);
  }
  renderCalendar();
}

function renderHabits() {
  const container = document.getElementById('habitList');
  container.innerHTML = '';
  habits.forEach((habit, index) => {
    const div = document.createElement('div');
    div.className = 'habit';

    const label = document.createElement('label');
    label.textContent = habit.name;

    const delBtn = document.createElement('button');
    delBtn.textContent = 'Delete';
    delBtn.className = 'delete-btn';
    delBtn.onclick = () => deleteHabit(index);

    div.appendChild(label);
    div.appendChild(delBtn);
    container.appendChild(div);
  });

  document.getElementById('habitSummary').textContent =
    habits.length === 0 ? 'No habits yet' : `${habits.length} habit(s) added`;
}

function renderCalendar() {
  const container = document.getElementById('calendarView');
  const selectedMonth = document.getElementById('monthPicker').value;
  if (!selectedMonth) return;

  const [year, month] = selectedMonth.split('-').map(Number);
  const daysInMonth = new Date(year, month, 0).getDate();

  container.innerHTML = '';
  for (let day = 1; day <= daysInMonth; day++) {
    const dayBox = document.createElement('div');
    dayBox.className = 'calendar-day';
    const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    dayBox.innerHTML = `<strong>${day}</strong>`;

    habits.forEach((habit, index) => {
      const btn = document.createElement('button');
      btn.textContent = habit.name;
      btn.style.backgroundColor = habit.dates.includes(dateStr) ? '#4caf50' : '#ccc';
      btn.onclick = () => toggleDate(index, dateStr);
      dayBox.appendChild(btn);
    });

    container.appendChild(dayBox);
  }
}
