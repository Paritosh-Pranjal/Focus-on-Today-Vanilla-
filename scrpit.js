const checkBoxList = document.querySelectorAll(".custom-checkbox");
const inputFields = document.querySelectorAll(".goal-input");
const errorLabel = document.querySelector(".error-label");
const progressBar = document.querySelector(".progress-bar");
const progressValue = document.querySelector(".progress-value");
const progressLabel = document.querySelector(".progress-label");

const allQuotes = [
  "Raise the bar by completing your goals!",
  "Well begun is half done!",
  "Just a step away, keep going!",
  "Whoa! You just completed all the goals, time for chill :D",
];

const allGoals = JSON.parse(localStorage.getItem("allGoals")) || {
  first: {
    name: "",
    completed: false,
  },
  second: {
    name: "",
    completed: false,
  },
  third: {
    name: "",
    completed: false,
  },
};

let completedGoalCounts = Object.values(allGoals).filter(
  (goal) => goal.completed
).length;

progressLabel.innerText = allQuotes[completedGoalCounts];

progressValue.style.width = `${(completedGoalCounts / 3) * 100}%`;
progressValue.firstElementChild.innerText = `${completedGoalCounts}/3 Completed`;

checkBoxList.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    const allGoalAdded = [...inputFields].every(function (input) {
      return input.value;
    });
    if (allGoalAdded) {
      checkbox.parentElement.classList.toggle("completed");
      // progressValue.style.width = "33.33%";
      const inputId = checkbox.nextElementSibling.id;
      allGoals[inputId].completed = !allGoals[inputId].completed;

      completedGoalCounts = Object.values(allGoals).filter(
        (goal) => goal.completed
      ).length;

      progressLabel.innerText = allQuotes[completedGoalCounts];

      progressValue.style.width = `${(completedGoalCounts / 3) * 100}%`;
      progressValue.firstElementChild.innerText = `${completedGoalCounts}/3 Completed`;
      localStorage.setItem("allGoals", JSON.stringify(allGoals));
    } else {
      progressBar.classList.add("show-error");
    }
  });
});

inputFields.forEach((input) => {
  input.value = allGoals[input.id].name;

  if (allGoals[input.id].completed) {
    input.parentElement.classList.add("completed");
  }

  input.addEventListener("focus", () => {
    progressBar.classList.remove("show-error");
  });

  input.addEventListener("input", (e) => {
    if (allGoals[input.id].completed) {
      e.target.value = allGoals[input.id].name;
      return;
    }
    allGoals[e.target.id].name = e.target.value;

    localStorage.setItem("allGoals", JSON.stringify(allGoals));
  });
});

// 34:28
