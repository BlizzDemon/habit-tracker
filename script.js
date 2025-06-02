const habitInput = document.getElementById("habitInput");
const addHabitBtn = document.getElementById("addHabit");
const habitList = document.getElementById("habitList");
const themeToggle = document.getElementById("themeToggle");
const themeLabel = document.getElementById("themeLabel");
const datePicker = document.getElementById("habitDate");
const summaryText = document.getElementById("summaryText");

let habits = JSON.parse(localStorage.getItem("habits")) || {};
let selectedDate = new Date().toISOString().split("T")[0];
datePicker.value = selectedDate;

function saveHabits() {
  localStorage.setItem("habits", JSON.stringify(habits));
}

function renderHabits() {
  habitList.innerHTML = "";
  const dailyHabits = habits[selectedDate] || [];

  dailyHabits.forEach((habit, index) => {
    const habitDiv = document.createElement("div");
    habitDiv.className = "habit";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = habit.completed;
    checkbox.onchange = () => {
      habit.completed = checkbox.checked;
      saveHabits();
      renderSummary();
    };

    const label = document.createElement("label");
    label.textContent = habit.name;

    const editBtn = document.createElement("button");
    editBtn.className = "edit-btn";
    editBtn.textContent = "Edit";
    editBtn.onclick = () => {
      const newName = prompt("Edit habit name:", habit.name);
      if (newName) {
        habit.name = newName;
        saveHabits();
        renderHabits();
      }
    };

    const deleteBtn = document.createElement("button");
    deleteBtn.className = "delete-btn";
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = () => {
      habits[selectedDate].splice(index, 1);
      saveHabits();
      renderHabits();
      renderSummary();
    };

    habitDiv.appendChild(checkbox);
    habitDiv.appendChild(label);
    habitDiv.appendChild(editBtn);
    habitDiv.appendChild(deleteBtn);
    habitList.appendChild(habitDiv);
  });

  renderSummary();
}

function renderSummary() {
  const dailyHabits = habits[selectedDate] || [];
  const completed = dailyHabits.filter(h => h.completed).length;
  summaryText.textContent = `${completed}/${dailyHabits.length} habits completed`;
}

addHabitBtn.onclick = () => {
  const name = habitInput.value.trim();
  if (name) {
    if (!habits[selectedDate]) habits[selectedDate] = [];
    habits[selectedDate].push({ name, completed: false });
    saveHabits();
    renderHabits();
    habitInput.value = "";
  }
};

habitInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addHabitBtn.click();
  }
});

datePicker.onchange = () => {
  selectedDate = datePicker.value;
  renderHabits();
};

themeToggle.onchange = () => {
  document.body.classList.toggle("dark-mode");
  themeLabel.textContent = document.body.classList.contains("dark-mode")
    ? "Dark Mode"
    : "Normal Mode";
};

window.onload = () => {
  if (document.body.classList.contains("dark-mode")) {
    themeToggle.checked = true;
    themeLabel.textContent = "Dark Mode";
  }
  renderHabits();
};
