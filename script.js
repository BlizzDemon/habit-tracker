// script.js

let habits = JSON.parse(localStorage.getItem("habits")) || [];
let isDarkMode = JSON.parse(localStorage.getItem("darkMode")) || false;

const habitList = document.getElementById("habitList");
const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabit");
const themeToggle = document.getElementById("themeToggle");
const summaryText = document.getElementById("summaryText");

document.body.classList.toggle("dark", isDarkMode);
themeToggle.checked = isDarkMode;

function saveToLocalStorage() {
  localStorage.setItem("habits", JSON.stringify(habits));
  localStorage.setItem("darkMode", JSON.stringify(themeToggle.checked));
}

function updateSummary() {
  const completed = habits.filter(h => h.done).length;
  summaryText.textContent = `${completed}/${habits.length} habits completed`;
}

function renderHabits() {
  habitList.innerHTML = "";
  habits.forEach((habit, index) => {
    const habitItem = document.createElement("div");
    habitItem.className = "habit-item";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.done;
    checkbox.addEventListener("change", () => {
      habits[index].done = checkbox.checked;
      saveToLocalStorage();
      updateSummary();
    });

    const label = document.createElement("label");
    label.textContent = habit.name;

    habitItem.appendChild(checkbox);
    habitItem.appendChild(label);
    habitList.appendChild(habitItem);
  });
  updateSummary();
}

addHabitBtn.addEventListener("click", () => {
  const habitName = habitInput.value.trim();
  if (habitName) {
    habits.push({ name: habitName, done: false });
    habitInput.value = "";
    saveToLocalStorage();
    renderHabits();
  }
});

themeToggle.addEventListener("change", () => {
  document.body.classList.toggle("dark", themeToggle.checked);
  saveToLocalStorage();
});

renderHabits();
