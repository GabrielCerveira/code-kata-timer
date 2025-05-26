let interval;

// inputs
const inputHours = document.getElementById("timer-hours");
const inputMinutes = document.getElementById("timer-minutes");
const inputSeconds = document.getElementById("timer-seconds");

// buttons
const btnPlay = document.getElementById("btn-play");
const btnReset = document.getElementById("btn-reset");
const btnFullScreen = document.getElementById("btn-full-screen");

// Icons
const imgPlay = document.getElementById("img-play");

btnFullScreen.addEventListener("click", () => {
  if (document.fullscreenElement) {
    document.exitFullscreen().catch((err) => console.error(err));
  } else {
    document.documentElement.requestFullscreen();
  }
});

btnPlay.addEventListener("click", () => {
  if (interval) {
    imgPlay.src = "./assets/play.svg";
    stopTime();
  } else {
    imgPlay.src = "./assets/pause.svg";
    interval = setInterval(startTime, 1000);
  }
});

btnReset.addEventListener("click", () => {
  setValues(30, 0, 0);
  stopTime;
});

const stopTime = () => {
  clearInterval(interval);
  interval = undefined;
};

const startTime = () => {
  let valueSeconds = Number(inputSeconds.textContent) - 1;
  let valueMinutes = Number(inputMinutes.textContent);
  let valueHours = Number(inputHours.textContent);
  if (valueHours || valueMinutes || valueSeconds) {
    if (valueSeconds < 0) {
      valueSeconds = 59;
      valueMinutes--;
      if (valueMinutes > 0) {
        if (valueHours > 0) valueMinutes = 59;
        valueHours--;
      }
    }
  } else {
    stopTime(valueSeconds, valueMinutes, valueHours);
  }

  if (valueSeconds <= 10 && valueHours == 0 && valueMinutes == 0) {
    inputHours.className = "hidden";
    inputMinutes.className = "hidden";
    inputSeconds.className = "timer__number--large";
    let elements = document.querySelectorAll(".timer__points, .main__btns");
    Array.from(elements).forEach((element) => {
      element.classList.add("hidden");
    });
    const body = document.getElementById("body");

    // Ativar animação
    body.classList.add("animate-bg");
    console.log("[44m [ body ]-70 [0m", body);
  }

  setValues(valueSeconds, valueMinutes, valueHours);
};

const setValues = (seconds, minutes, hours) => {
  inputSeconds.textContent = formatNumber(Number(seconds));
  inputMinutes.textContent = formatNumber(Number(minutes));
  inputHours.textContent = formatNumber(Number(hours));
};

const formatNumber = (number) => {
  if (number < 10) {
    return number.toString().padStart(2, "0");
  } else {
    return number.toString();
  }
};
