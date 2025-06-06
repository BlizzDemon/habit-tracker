document.addEventListener("DOMContentLoaded", () => {
  const habitInput = document.getElementById("habitInput");
  const addBtn = document.getElementById("addBtn");
  const habitList = document.getElementById("habitList");
  const darkModeToggle = document.getElementById("darkModeToggle");
  const themeToggle = document.getElementById("themeToggle");
  const reminderToggle = document.getElementById("reminderToggle");

  // Load habits
  function renderHabits() {
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    habitList.innerHTML = "";

    habits.forEach((habit, index) => {
      const habitItem = document.createElement("div");
      habitItem.className = "habit";
      habitItem.innerHTML = `
        <label contenteditable="true">${habit}</label>
        <button class="delete-btn" data-index="${index}">Delete</button>
      `;
      habitList.appendChild(habitItem);
    });

    // Add delete functionality
    document.querySelectorAll(".delete-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const index = e.target.getAttribute("data-index");
        const habits = JSON.parse(localStorage.getItem("habits")) || [];
        habits.splice(index, 1);
        localStorage.setItem("habits", JSON.stringify(habits));
        renderHabits();
      });
    });
  }

  // Add new habit
  function addHabit() {
    const habit = habitInput.value.trim();
    if (!habit) return;
    const habits = JSON.parse(localStorage.getItem("habits")) || [];
    habits.push(habit);
    localStorage.setItem("habits", JSON.stringify(habits));
    habitInput.value = "";
    renderHabits();
  }

  // Add with Enter key
  habitInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addHabit();
  });

  addBtn.addEventListener("click", addHabit);

  // Dark mode toggle
  darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Theme toggle (just example background color swap)
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("alt-theme");
  });

  // Reminders (just logs — no Notification permission logic added yet)
  reminderToggle.addEventListener("click", () => {
    alert("Reminder enabled! (Demo only)");
  });

  // Initialize
  renderHabits();
});
