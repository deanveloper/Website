const autosize = require("autosize");

let paperLookinThing;

function init() {
    paperLookinThing = document.querySelector("#paperlookinthing");
    autosize(paperLookinThing);
    paperLookinThing.addEventListener("keydown", updateStats);
    paperLookinThing.addEventListener("keyup", updateStats);
    paperLookinThing.addEventListener("input", updateStats);
}

if (document.readyState === "complete") {
    init()
} else {
    window.addEventListener("load", init);
}

function updateStats() {
    const paper = document.querySelector("#paperlookinthing");
    if (paper.value === undefined) {
        return;
    }
    const words = document.querySelector("#words");
    const letters = document.querySelector("#letters");
    const characters = document.querySelector("#characters");

    words.innerHTML = paper.value.split(/\s+/g).filter((it) => !!it.replace(/\W/g, "").toString()).length;
    letters.innerHTML = countSymbols(paper.value.replace(/\W/g, ""));
    characters.innerHTML = countSymbols(paper.value);
}

function countSymbols(string) {
    return Array.from(string).length;
}