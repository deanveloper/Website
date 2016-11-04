const arrow = document.querySelector("#arrow");
const utils = document.querySelector("#utils");

function onArrowClick() {
    if(utils.style.visibility == "visible") {
        utils.style.visibility = "hidden";
        utils.style.opacity = 0;
    } else {
        utils.style.visibility = "visible";
        utils.style.opacity = 1;
    }
}