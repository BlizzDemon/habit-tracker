document.addEventListener("DOMContentLoaded", function () {
  console.log("Script loaded");

  const habitInput = document.getElementById("habit-input");
  const addBtn = document.getElementById("add-btn");
  const habitList = document.getElementById("habit-list");
  const darkModeToggle = document.getElementById("dark-mode-toggle");
  const modeLabel = document.getElementById("mode-label");
  const themeSelect = document.getElementById("theme-select");

  let habits = JSON.parse(localStorage.getItem("habits")) || [];

  function saveHabits() {
    localStorage.setItem("habits", JSON.stringify(habits));
  }

  function renderHabits() {
    habitList.innerHTML = "";
    habits.forEach((habit, index) => {
      const habitItem = document.createElement("div");
      habitItem.className = "habit";

      const label = document.createElement("label");
      label.textContent = habit.name;

      const editBtn = document.createElement("button");
      editBtn.textContent = "✏️";
      editBtn.className = "edit-btn";
      editBtn.onclick = () => {
        const newName = prompt("Edit habit name:", habit.name);
        if (newName) {
          habits[index].name = newName;
          saveHabits();
          renderHabits();
        }
      };

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "🗑️";
      deleteBtn.className = "delete-btn";
      deleteBtn.onclick = () => {
        habits.splice(index, 1);
        saveHabits();
        renderHabits();
      };

      habitItem.appendChild(label);
      habitItem.appendChild(editBtn);
      habitItem.appendChild(deleteBtn);
      habitList.appendChild(habitItem);
    });
  }

  addBtn.addEventListener("click", () => {
    const name = habitInput.value.trim();
    if (name) {
      habits.push({ name });
      saveHabits();
      renderHabits();
      habitInput.value = "";
    }
  });

  habitInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addBtn.click();
    }
  });

  darkModeToggle.addEventListener("change", () => {
    document.body.classList.toggle("dark-mode", darkModeToggle.checked);
    modeLabel.textContent = darkModeToggle.checked ? "Dark Mode" : "Normal Mode";
  });

  themeSelect.addEventListener("change", () => {
    const theme = themeSelect.value;
    document.body.className = ""; // remove all classes
    document.body.classList.add(theme);
    if (darkModeToggle.checked) document.body.classList.add("dark-mode");
  });

  renderHabits();
});
