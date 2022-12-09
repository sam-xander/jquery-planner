var textArea = $("textarea");
var scheduleElement = $("#schedule");

var schedule = [];

// function that gets the date and adds to #currentDay
function getDay() {
  var currentDay = moment().format("dddd, MMMM Do");
  var date = $("#currentDay");
  date.text(currentDay);
}
getDay();

// loop over 9 - 5 and make an object for each with time and input properties
var hour = moment(09, "HH");

for (var i = 1; i < 10; i++) {
  var block = {
    time: hour.format("ha"),
    input: "",
  };

  schedule.push(block);

  hour.add(1, "h");
}

function updateSchedule(input, time) {
  schedule.forEach(function (block) {
    if (block.time === time) {
      block.input = input;
    }
  });

  addToLocalStorage(schedule);
}

function renderSchedule(schedule) {
  scheduleElement.html("");

  schedule.forEach(function (block) {
    var state = block.time;
    state = state.slice(0, block.time.length - 2);

    if (state < 6) {
      state = +state + 12;
    }
    console.log(+state);
    var currentTime = moment().format("H");
    console.log(+currentTime);
    if (+state < +currentTime) {
      state = "past";
    } else if (+state === +currentTime) {
      state = "present";
    } else {
      state = "future";
    }

    var blockElement = $(
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

function addToLocalStorage(schedule) {
  localStorage.setItem("schedule", JSON.stringify(schedule));
  renderSchedule(schedule);
}

function getFromLocalStorage() {
  var storage = localStorage.getItem("schedule");

  if (storage) {
    schedule = JSON.parse(storage);
  }
  renderSchedule(schedule);
}

getFromLocalStorage();

scheduleElement.on("click", ".saveBtn", function () {
  var input = $(this).prev().val();
  var time = $(this).prev().prev().text();
  console.log($(this));

  updateSchedule(input, time);
  console.log(schedule);
});
