function addHabit() {
  const habitInput = document.getElementById("habitInput");
  const habitText = habitInput.value.trim();
  if (habitText === "") return;

  const listItem = document.createElement("li");
  listItem.innerText = habitText;
  document.getElementById("habitList").appendChild(listItem);

  habitInput.value = "";
}
