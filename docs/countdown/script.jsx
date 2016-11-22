const moment = require("moment");

const targetDate = moment("12-30-2016", "MM-DD-YYYY");

function update() {
    const now = moment();

    const months = now.diff(targetDate, 'months');
    now.subtract(months, 'months');
    const weeks = now.diff(targetDate, 'weeks');
    now.subtract(weeks, 'weeks');
    const days = now.diff(targetDate, 'days');
    now.subtract(days, 'days');
    const hours = now.diff(targetDate, 'hours');
    now.subtract(hours, 'hours');
    const minutes = now.diff(targetDate, 'minutes');
    now.subtract(minutes, 'minutes');
    const seconds = now.diff(targetDate, 'seconds');
    now.subtract(seconds, 'seconds');

    document.getElementById("months").innerHTML = Math.abs(months).toString();
    document.getElementById("weeks").innerHTML = Math.abs(weeks).toString();
    document.getElementById("days").innerHTML = Math.abs(days).toString();
    document.getElementById("hours").innerHTML = Math.abs(hours).toString();
    document.getElementById("minutes").innerHTML = Math.abs(minutes).toString();
    document.getElementById("seconds").innerHTML = Math.abs(seconds).toString();
}

window.addEventListener("load", () => {
    update();
    setInterval(update, 100);
});

document.ontouchstart = function (e) {
    e.preventDefault();
};

document.ontouchmove = function (e) {
    e.preventDefault();
};
