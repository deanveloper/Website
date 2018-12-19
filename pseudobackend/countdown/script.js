const moment = require("moment");

let target = localStorage.getItem("time") || "17:00";
let targetTime = moment(target, "hh:mm");

function update() {
    const now = moment();
    let totalSeconds = targetTime.unix() - now.unix();

    const hours = Math.floor(totalSeconds / 60 / 60);
    totalSeconds %= 60 * 60;
    const minutes = Math.floor(totalSeconds / 60);
    totalSeconds %= 60;
    const seconds = totalSeconds;

    document.getElementById("hours").innerText = hours.toString();
    document.getElementById("minutes").innerText = minutes.toString();
    document.getElementById("seconds").innerText = seconds.toString();
}

window.addEventListener("DOMContentLoaded", () => {
    document.getElementById("timeInput").value = target;

    let input = document.getElementById("timeInput");
    input.addEventListener("change", () => {
        target = input.value;
        targetTime = moment(target, "hh:mm");

        localStorage.setItem("time", target);
        update();
    });

    update();
    setInterval(update, 100);
});
