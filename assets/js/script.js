let scheduleElement = $("#schedule");
let schedule = [];

// function that gets the date and prints to #currentDay element
function getDay() {
  let currentDay = moment().format("dddd, MMMM Do");
  let date = $("#currentDay");
  date.text(currentDay);
}
getDay();

// loop over 9 - 5 and make an object for each with time and input properties --> pushes into shedule array --> stores into local storage
let hour = moment(09, "HH");

for (let i = 1; i < 10; i++) {
  let block = {
    time: hour.format("ha"),
    input: "",
  };

  schedule.push(block);

  hour.add(1, "h");
}

// updates the object in the schedule array that matches the specific time
function updateSchedule(input, time) {
  schedule.forEach(function (block) {
    if (block.time === time) {
      block.input = input;
    }
  });

  addToLocalStorage(schedule);
}

// loops over the schedule array and outputs each object to the page and adds color classes depending on the currentTime
function renderSchedule(schedule) {
  scheduleElement.html("");

  schedule.forEach(function (block) {
    let state = block.time;
    state = state.slice(0, block.time.length - 2);
    state = Number(state);

    if (state < 6) {
      state = state + 12;
    }

    let currentTime = moment().format("H");
    currentTime = Number(currentTime);

    if (state < currentTime) {
      state = "past";
    } else if (state === currentTime) {
      state = "present";
    } else {
      state = "future";
    }

    let blockElement = $(
      `
      <div class="row time-block">
        <div class="hour">${block.time}</div>
        <textarea class="${state}">${block.input}</textarea>
        <button class="saveBtn">
          <i class="fas fa-save"></i>
        </button>
      </div>
      `
    );

    scheduleElement.append(blockElement);
  });
}

// updates the local storage with the schedule array then calls renderSchedule function
function addToLocalStorage(schedule) {
  localStorage.setItem("schedule", JSON.stringify(schedule));
  renderSchedule(schedule);
}

// gets the local storage array and updates the schedule array
function getFromLocalStorage() {
  let storage = localStorage.getItem("schedule");

  if (storage) {
    schedule = JSON.parse(storage);
  }
  renderSchedule(schedule);
}

getFromLocalStorage();

// save button click event
scheduleElement.on("click", ".saveBtn", function () {
  let input = $(this).prev().val();
  let time = $(this).prev().prev().text();
  console.log($(this));

  updateSchedule(input, time);
  console.log(schedule);
});
