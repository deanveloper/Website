var targetDate = new XDate(2016, 11, 30); //month is 0-based

function update() {
    var now = new XDate();
    document.getElementById("weeks").innerHTML = Math.floor(now.diffWeeks(targetDate)).toString();
    document.getElementById("days").innerHTML = Math.floor(now.diffDays(targetDate) % 7).toString();
    document.getElementById("hours").innerHTML = Math.floor(now.diffHours(targetDate) % 24).toString();
    document.getElementById("minutes").innerHTML = Math.floor(now.diffMinutes(targetDate) % 60).toString();
    document.getElementById("seconds").innerHTML = Math.floor(now.diffSeconds(targetDate) % 60).toString();
}

window.addEventListener("load", () => {
    update();
    setInterval(update, 100);
});

document.ontouchstart = function(e){
    e.preventDefault();
};

document.ontouchmove = function(e){
    e.preventDefault();
};
