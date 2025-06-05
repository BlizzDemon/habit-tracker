document.addEventListener("DOMContentLoaded", function () {
   const darkModeToggle = document.getElementById("darkModeToggle");
  if (darkModeToggle) {
    darkModeToggle.addEventListener("click", () => {
      document.body.classList.toggle("dark-mode");
    });
  }
  const habitInput = document.getElementById("habitInput");
  const addHabitBtn = document.getElementById("addHabitBtn");
  const habitList = document.getElementById("habitList");
  const toggleDarkMode = document.getElementById("toggleDarkMode");
  const darkModeStatus = document.getElementById("darkModeStatus");
  const themeSelector = document.getElementById("themeSelector");
  const reminderToggle = document.getElementById("reminderToggle");
  const calendar = document.getElementById("calendar");

  let habits = JSON.parse(localStorage.getItem("habits")) || [];
  let completedHabits = JSON.parse(localStorage.getItem("completedHabits")) || {};

  function renderHabits() {
    habitList.innerHTML = "";
    habits.forEach((habit, index) => {
      const habitDiv = document.createElement("div");
      habitDiv.classList.add("habit");

      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      checkbox.checked = completedHabits[habit] || false;
      checkbox.addEventListener("change", () => toggleHabit(habit));

      const label = document.createElement("label");
      label.textContent = habit;

      const editBtn = document.createElement("button");
      editBtn.textContent = "Edit";
      editBtn.classList.add("edit-btn");
      editBtn.addEventListener("click", () => editHabit(index));

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "Delete";
      deleteBtn.classList.add("delete-btn");
      deleteBtn.addEventListener("click", () => deleteHabit(index));

      habitDiv.appendChild(checkbox);
      habitDiv.appendChild(label);
      habitDiv.appendChild(editBtn);
      habitDiv.appendChild(deleteBtn);
      habitList.appendChild(habitDiv);
    });
    updateCalendar();
  }

  function toggleHabit(habit) {
    completedHabits[habit] = !completedHabits[habit];
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
    updateCalendar();
  }

  function addHabit() {
    const habit = habitInput.value.trim();
    if (habit) {
      habits.push(habit);
      habitInput.value = "";
      localStorage.setItem("habits", JSON.stringify(habits));
      renderHabits();
    }
  }

  function deleteHabit(index) {
    const removedHabit = habits.splice(index, 1);
    delete completedHabits[removedHabit];
    localStorage.setItem("habits", JSON.stringify(habits));
    localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
    renderHabits();
  }

  function editHabit(index) {
    const newHabit = prompt("Edit your habit:", habits[index]);
    if (newHabit !== null && newHabit.trim() !== "") {
      const oldHabit = habits[index];
      habits[index] = newHabit.trim();
      if (completedHabits[oldHabit]) {
        completedHabits[newHabit.trim()] = completedHabits[oldHabit];
        delete completedHabits[oldHabit];
      }
      localStorage.setItem("habits", JSON.stringify(habits));
      localStorage.setItem("completedHabits", JSON.stringify(completedHabits));
      renderHabits();
    }
  }

  addHabitBtn.addEventListener("click", addHabit);
  habitInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addHabit();
    }
  });

  toggleDarkMode.addEventListener("change", function () {
    document.body.classList.toggle("dark-mode", toggleDarkMode.checked);
    darkModeStatus.textContent = toggleDarkMode.checked ? "Dark Mode" : "Light Mode";
  });

  themeSelector.addEventListener("change", function () {
    document.body.classList.remove("theme-ocean", "theme-forest", "theme-sunset");
    if (themeSelector.value !== "") {
      document.body.classList.add(`theme-${themeSelector.value}`);
    }
  });

  reminderToggle.addEventListener("change", function () {
    if (reminderToggle.checked) {
      Notification.requestPermission().then(permission => {
        if (permission === "granted") {
          alert("Reminders Enabled!");
        }
      });
    }
  });

  function updateCalendar() {
    const today = new Date().toLocaleDateString();
    const summary = document.getElementById("calendar");
    const completedToday = habits.filter(habit => completedHabits[habit]);
    summary.innerHTML = `✅ ${completedToday.length}/${habits.length} habits completed today (${today})`;
  }

  renderHabits();
});
