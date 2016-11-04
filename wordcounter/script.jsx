import * as autosize from "../util/autosize.min";

autosize.autosize(document.querySelector("#paperlookinthing"));

window.addEventListener("load", () => {
    autosize.autosize(document.querySelector("#paperlookinthing"));
});

function updateStats() {
    const paper = document.querySelector("#paperlookinthing");
    if(paper.value === undefined) {
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